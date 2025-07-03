"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "lucide-react"
import { supabase } from "../../lib/supabaseClient"

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    preferredDate: "",
    preferredTime: "",
    reason: "",
    doctor: "", // doctor id
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [doctors, setDoctors] = useState<Array<{ id: string; name: string; specialty: string }>>([])

  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select(`
          id,
          specialty,
          users ( full_name )
        `)

      if (!error && data) {
        setDoctors(
          data.map((d: any) => ({
            id: d.id,
            name: d.users.full_name,
            specialty: d.specialty,
          }))
        )
      } else {
        console.error("Error fetching doctors:", error)
      }
    }

    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedDoctor = doctors.find((d) => d.id === formData.doctor)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      const userId = sessionData.session?.user.id

      if (sessionError || !userId) {
        setError("User not logged in.")
        setIsLoading(false)
        return
      }

      const { error: insertError } = await supabase.from("appointments").insert({
        user_id: userId,
        doctor_id: formData.doctor,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        reason_for_visit: formData.reason,
        status: "pending",
      })

      if (insertError) {
        setError("Failed to book appointment: " + insertError.message)
        setIsLoading(false)
        return
      }

      alert("Appointment booked successfully!")
      router.push("/")
    } catch (err: any) {
      console.error(err)
      setError("Unexpected error: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen pt-32 pb-12 flex flex-col bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">Book an Appointment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Available Hours Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Hours</h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-medium text-gray-900">Monday</h4>
                <p className="text-gray-600">9:00 AM - 5:00 PM</p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-medium text-gray-900">Wednesday</h4>
                <p className="text-gray-600">9:00 AM - 5:00 PM</p>
              </div>
              <div className="pb-4">
                <h4 className="font-medium text-gray-900">Friday</h4>
                <p className="text-gray-600">9:00 AM - 5:00 PM</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Important Notes</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Please arrive 15 minutes before your appointment</li>
                <li>• Bring your ID and insurance card</li>
                <li>• Wear comfortable clothing</li>
                <li>• Bring any relevant medical records</li>
              </ul>
            </div>
          </div>

          {/* Appointment Form */}
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-[#004d40] sm:text-sm text-gray-900 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-[#004d40] sm:text-sm text-gray-900 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-[#004d40] sm:text-sm text-gray-900 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-[#004d40] sm:text-sm text-gray-900 transition duration-150 ease-in-out bg-white"
                  >
                    <option value="">Select a time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Visit
                </label>
                <div className="mt-1 relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <textarea
                    id="reason"
                    name="reason"
                    rows={3}
                    required
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Please describe your reason for visit"
                    className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-[#004d40] sm:text-sm text-gray-900 transition duration-150 ease-in-out resize-none"
                  />
                </div>
              </div>

              {/* Searchable Doctor Selection */}
              <div>
                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Doctor
                </label>
                <div className="mt-1 relative" ref={dropdownRef}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search and select a doctor..."
                    value={isDropdownOpen ? searchQuery : (selectedDoctor ? `${selectedDoctor.name} - ${selectedDoctor.specialty}` : "")}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setIsDropdownOpen(true)
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="appearance-none block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-[#004d40] sm:text-sm text-gray-900 transition duration-150 ease-in-out bg-white"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                          <div
                            key={doctor.id}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, doctor: doctor.id }))
                              setSearchQuery("")
                              setIsDropdownOpen(false)
                            }}
                          >
                            <div className="font-medium text-gray-900">{doctor.name}</div>
                            <div className="text-sm text-gray-600">{doctor.specialty}</div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-500">No doctors found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full flex justify-center py-4 px-6 border border-transparent rounded-full shadow-lg hover:shadow-xl text-base font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Booking...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Book Appointment
                      <Calendar className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

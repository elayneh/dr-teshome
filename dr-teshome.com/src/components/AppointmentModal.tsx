import { Dispatch, SetStateAction, useState } from "react"
import { createAppointment } from "../services/appointmentService"
import { Calendar } from "lucide-react"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedSlot: { day: string; time: string } | null
  setSelectedSlot: Dispatch<SetStateAction<{ day: string; time: string } | null>>
}

export default function AppointmentModal({ isOpen, onClose, selectedSlot, setSelectedSlot }: AppointmentModalProps) {
  if (!isOpen) return null

  const [appointmentData, setAppointmentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    date: selectedSlot?.day + " " + selectedSlot?.time,
    reason: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmitBooking = async () => {
    try {
      setIsSubmitting(true)
      setError(null)
      await createAppointment(appointmentData)
      onClose()
    } catch (err) {
      setError('Failed to book appointment. Please try again.')
      console.error('Error booking appointment:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-0 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center px-8 pt-8 mb-2">
          <h3 className="text-2xl font-bold text-gray-900">Book Appointment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left: Slot Info and Notes */}
          <div className="bg-white rounded-l-2xl p-8 flex flex-col border-b md:border-b-0 md:border-r border-gray-100 min-h-[400px]">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Selected Slot</h4>
            {selectedSlot ? (
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-green-800 font-semibold">{selectedSlot.day}</div>
                <div className="text-green-700">{selectedSlot.time}</div>
              </div>
            ) : (
              <div className="mb-6 text-gray-500">No slot selected.</div>
            )}
            <div className="mt-auto">
              <h5 className="font-medium text-gray-900 mb-2">Important Notes</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Please arrive 15 minutes before your appointment</li>
                <li>• Bring your ID and insurance card</li>
                <li>• Wear comfortable clothing</li>
                <li>• Bring any relevant medical records</li>
              </ul>
            </div>
          </div>
          {/* Right: Form */}
          <div className="bg-white rounded-r-2xl p-8">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmitBooking(); }}>
          <div>
                <label htmlFor="modal-first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
                  id="modal-first-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                  placeholder="Enter first name"
                  value={appointmentData.firstName}
                  onChange={(e) => setAppointmentData({ ...appointmentData, firstName: e.target.value })}
            />
          </div>
          <div>
                <label htmlFor="modal-last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
                  type="text"
                  id="modal-last-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                  placeholder="Enter last name"
                  value={appointmentData.lastName}
                  onChange={(e) => setAppointmentData({ ...appointmentData, lastName: e.target.value })}
            />
          </div>
          <div>
                <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
                  type="email"
                  id="modal-email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                  placeholder="Enter your email"
                  value={appointmentData.email}
                  onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })}
            />
          </div>
          <div>
                <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="modal-phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                  placeholder="Enter your phone number"
                  value={appointmentData.phoneNumber}
                  onChange={(e) => setAppointmentData({ ...appointmentData, phoneNumber: e.target.value })}
                />
          </div>
          <div>
                <label htmlFor="modal-reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
            <textarea
                  id="modal-reason"
              rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-gray-900 bg-white"
                  placeholder="Brief description of your visit reason"
                  value={appointmentData.reason}
                  onChange={(e) => setAppointmentData({ ...appointmentData, reason: e.target.value })}
            ></textarea>
          </div>
              {error && (
                <div className="text-red-600 text-sm mt-2">
                  {error}
                </div>
              )}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
          <button
            type="submit"
                  className="group flex-1 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Booking...' : (
                    <span className="flex items-center justify-center">
                      Confirm Booking
                      <Calendar className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
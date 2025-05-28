import { Dispatch, SetStateAction } from "react"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedSlot: { day: string; time: string } | null
  setSelectedSlot: Dispatch<SetStateAction<{ day: string; time: string } | null>>
}

export default function AppointmentModal({ isOpen, onClose, selectedSlot, setSelectedSlot }: AppointmentModalProps) {
  if (!isOpen) return null

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
            <form className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="modal-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="modal-email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="modal-phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="modal-reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <textarea
                  id="modal-reason"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-gray-900 bg-white"
                  placeholder="Brief description of your visit reason"
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 
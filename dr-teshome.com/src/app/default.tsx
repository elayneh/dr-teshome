"use client"

export default function Default() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-blue-700 dark:text-blue-300">
        Dr. Teshome T., MD
      </h1>
      <h2 className="text-xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
        Trauma & Orthopedic Surgery Subspecialist
      </h2>

      <p className="max-w-xl text-gray-600 dark:text-gray-300 mb-6">
        Dedicated to providing advanced trauma care and surgical expertise to restore mobility and improve lives.
        With years of experience in complex fracture management, emergency trauma response, and orthopedic reconstruction,
        Dr. Teshome is committed to compassionate and evidence-based treatment.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="/about"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Learn More
        </a>
        <a
          href="/appointments"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
        >
          Book Appointment
        </a>
      </div>
    </div>
  )
}

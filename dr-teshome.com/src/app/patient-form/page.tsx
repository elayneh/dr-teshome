"use client"

import Link from "next/link"
import { ArrowLeft, Download, FileText, Clock, CheckCircle } from "lucide-react"
import { forms } from "../../constants/patientForms"

export default function PatientFormsPage() {
  const requiredForms = forms.filter((form) => form.required)
  const optionalForms = forms.filter((form) => !form.required)

  return (
    <main className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Patient Forms</h1>
          <p className="text-xl text-gray-600">
            Download and complete these forms before your visit to save time during your appointment.
          </p>
        </div>

        {/* Instructions */}
        <section className="mb-12 p-8 bg-green-50 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Before Your Visit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For New Patients</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Download and complete all required forms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Bring completed forms to your appointment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Arrive 15 minutes early for check-in</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Bring</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Photo identification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Current insurance card</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">List of current medications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Previous medical records (if applicable)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Required Forms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Required Forms for New Patients</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {requiredForms.map((form, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{form.title}</h3>
                    <p className="text-gray-600 mb-3">{form.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{form.estimatedTime}</span>
                    </div>
                  </div>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-4">
                    Required
                  </span>
                </div>
                <a
                  href={form.downloadUrl}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Optional Forms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Additional Forms</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {optionalForms.map((form, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{form.title}</h3>
                    <p className="text-gray-600 mb-3">{form.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{form.estimatedTime}</span>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-4">
                    Optional
                  </span>
                </div>
                <a
                  href={form.downloadUrl}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Online Portal */}
        <section className="p-8 bg-gray-50 rounded-2xl">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Online Patient Portal</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Forms Online</h3>
              <p className="text-gray-600 mb-4">
                Save time by completing your forms online through our secure patient portal. You can fill out forms at
                your convenience and submit them electronically before your visit.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Secure and HIPAA compliant</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Save and resume later</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Automatic submission to our office</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Portal Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• View and download completed forms</li>
                <li>• Access lab results and medical records</li>
                <li>• Schedule appointments online</li>
                <li>• Request prescription refills</li>
                <li>• Secure messaging with our team</li>
                <li>• Pay bills online</li>
              </ul>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Access Patient Portal
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

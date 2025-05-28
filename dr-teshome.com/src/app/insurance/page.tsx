"use client"

import Link from "next/link"
import { ArrowLeft, Check, FileText, Phone, Mail, CreditCard, Shield, Building } from "lucide-react"
import { acceptedInsurance, governmentPrograms } from "../../constants/insurance"

export default function InsurancePage() {

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
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Insurance & Payment Information</h1>
          <p className="text-xl text-gray-600">
            We work with Ethiopian insurance providers and government health programs to make orthopedic care accessible
            to all patients.
          </p>
        </div>

        {/* Government Health Programs */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Building className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Government Health Programs</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {governmentPrograms.map((program, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Coverage Includes:</h4>
                  <p className="text-sm text-gray-600">{program.coverage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Private Insurance Companies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Accepted Private Insurance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {acceptedInsurance.map((insurance, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300"
              >
                <div className="flex items-center justify-center h-16 mb-4">
                  <img
                    src={insurance.logo || "/placeholder.svg"}
                    alt={insurance.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{insurance.name}</h3>
                <div className="space-y-2">
                  {insurance.plans.map((plan, planIndex) => (
                    <div key={planIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-600">{plan}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Insurance Verification */}
        <section className="mb-16 p-8 bg-green-50 rounded-2xl">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Insurance Verification Process</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Before Your Visit</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                  <span className="text-gray-600">Bring your insurance card or CBHI/SHI membership card</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                  <span className="text-gray-600">Verify your coverage includes orthopedic services</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                  <span className="text-gray-600">Check if referral is required from primary care physician</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                  <span className="text-gray-600">Understand your co-payment requirements</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">We Can Help</h3>
              <p className="text-gray-600 mb-4">
                Our administrative team can assist you with insurance verification and help you understand your coverage
                for orthopedic treatments. Please contact us before your appointment if you have questions.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="tel:+251911234567"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Office
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Payment Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center mb-4">
                <CreditCard className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Accepted Payment Methods</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Cash (Ethiopian Birr)</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Bank transfers</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Mobile money (M-Birr, HelloCash)</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Credit/Debit cards (Visa, MasterCard)</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Employer direct billing</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Payment Policies</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Payment required at time of service for uninsured patients</li>
                <li>• Insurance co-payments due at visit</li>
                <li>• Payment plans available for surgical procedures</li>
                <li>• Emergency cases treated regardless of payment ability</li>
                <li>• Financial counseling available upon request</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Self-Pay Options */}
        <section className="mb-16 p-8 bg-gray-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Self-Pay & Uninsured Patients</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Affordable Orthopedic Care</h3>
              <p className="text-gray-600 mb-4">
                We believe quality orthopedic care should be accessible to everyone. For patients without insurance, we
                offer competitive rates and flexible payment options.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Discounted self-pay rates</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Interest-free payment plans</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Sliding scale fees based on income</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Emergency care regardless of ability to pay</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Self-Pay Rates (ETB)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Initial Consultation</span>
                  <span className="font-semibold text-gray-900">ETB 1,500</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Follow-up Visit</span>
                  <span className="font-semibold text-gray-900">ETB 800</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">X-Ray (per view)</span>
                  <span className="font-semibold text-gray-900">ETB 300</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Physical Therapy Session</span>
                  <span className="font-semibold text-gray-900">ETB 400</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">*Surgical procedures quoted individually based on complexity</p>
            </div>
          </div>
        </section>

        {/* International Patients */}
        <section className="mb-16 p-8 bg-blue-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">International Patients & Medical Tourism</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Services for International Patients</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Medical visa assistance</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Airport pickup and accommodation arrangements</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Translation services</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">International insurance coordination</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Options</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• USD, EUR, and other major currencies accepted</li>
                <li>• International wire transfers</li>
                <li>• Travel insurance billing</li>
                <li>• Package deals for surgery + recovery</li>
                <li>• Advance payment discounts available</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="p-8 bg-green-50 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Insurance or Payment?</h2>
          <p className="text-gray-600 mb-6">
            Our patient services team is here to help you understand your insurance benefits and payment options for
            orthopedic care.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+251911234567"
              className="inline-flex items-center px-6 py-3 bg-white border border-green-500 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: +251 91 123 4567
            </a>
            <a
              href="mailto:billing@drteshome.com"
              className="inline-flex items-center px-6 py-3 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Patient Services
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}

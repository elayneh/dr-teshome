"use client"

import Link from "next/link"
import { ArrowLeft, Video, Shield, Clock, CheckCircle, Monitor, Smartphone, Wifi } from "lucide-react"
import { telehealthServices, requirements } from "../../constants/telehealth"
import { useState } from "react"

export default function TelehealthPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

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
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">TeleHealth Services</h1>
          <p className="text-xl text-gray-600">
            Access quality healthcare from the comfort of your home with our secure telehealth platform.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-16 p-8 bg-green-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Benefits of TeleHealth</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Time</h3>
              <p className="text-gray-600">No travel time or waiting room delays</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Safe</h3>
              <p className="text-gray-600">Reduce exposure to illness in waiting rooms</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Convenient</h3>
              <p className="text-gray-600">Access care from anywhere with internet</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Care</h3>
              <p className="text-gray-600">Face-to-face consultation with Dr. Teshome</p>
            </div>
          </div>
        </section>

        {/* Services Available */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">TeleHealth Services Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {telehealthServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* When TeleHealth is NOT Appropriate */}
        <section className="mb-16 p-8 bg-red-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">When In-Person Visits Are Required</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Physical Examinations</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Annual physical exams</li>
                <li>• Diagnostic procedures requiring physical examination</li>
                <li>• Blood pressure checks (if you don't have a home monitor)</li>
                <li>• Skin condition examinations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Emergency Situations</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Chest pain or difficulty breathing</li>
                <li>• Severe injuries or trauma</li>
                <li>• High fever with severe symptoms</li>
                <li>• Any life-threatening emergency</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Requirements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Requirements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {requirements.map((req, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{req.title}</h3>
                <ul className="space-y-2">
                  {req.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How to Schedule */}
        <section className="mb-16 p-8 bg-gray-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Schedule a TeleHealth Appointment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule</h3>
              <p className="text-gray-600">
                Call our office or use the online booking system to schedule your telehealth appointment
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare</h3>
              <p className="text-gray-600">
                Test your technology, find a quiet space, and gather your medications and health information
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600">Click the secure link sent to you 5 minutes before your appointment time</p>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Privacy & Security</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">HIPAA Compliant</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our telehealth platform is fully HIPAA compliant and uses end-to-end encryption to protect your health
                information.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Encrypted video and audio</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Secure data transmission</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">No recordings stored</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Wifi className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Secure Connection</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Use a secure, private internet connection for your telehealth appointment to ensure confidentiality.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Avoid public Wi-Fi</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Use private, secure location</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-600">Close other applications</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="p-8 bg-green-50 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Try TeleHealth?</h2>
          <p className="text-gray-600 mb-6">
            Contact our office to schedule your first telehealth appointment or to learn more about our virtual care
            options.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+11234567890"
              className="inline-flex items-center px-6 py-3 bg-white border border-green-500 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
            >
              <Video className="w-5 h-5 mr-2" />
              Schedule TeleHealth Visit
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors"
            >
              Test Your Connection
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}

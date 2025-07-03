"use client"
import Image from "next/image"
import { Calendar, Heart, Shield, Stethoscope, Mail, Phone } from "lucide-react"
import { useState } from "react"
import AppointmentModal from "../components/AppointmentModal"
import { appointmentSlots } from "../constants/appointments"
import { patientResources } from "../constants/patientResources"
import Link from "next/link"
import { blogposts } from "../constants/blogposts"

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="pt-6 bg-white">
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-gray-900 mb-8 leading-tight">
              Welcome to Dr. Teshome's Practice
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Providing exceptional healthcare services with compassion, expertise, and cutting-edge medical care
            </p>
            <button
              onClick={() => scrollToSection("appointments")}
              className="group bg-green-600 text-white px-10 py-4 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-semibold"
            >
              Book an Appointment
              <Calendar className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-16 text-center">About Dr. Teshome</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Dr. Teshome is a highly experienced medical professional dedicated to providing the highest quality of
                care to all patients. With years of experience and a commitment to staying current with the latest
                medical advancements, Dr. Teshome ensures that each patient receives personalized, comprehensive care.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our practice is built on the foundation of trust, compassion, and excellence in healthcare delivery. We
                believe in treating not just the condition, but the whole person.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 font-medium">Compassionate Care</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 font-medium">Trusted Expertise</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/dr-tesh.jpeg" 
                  alt="Dr. Teshome" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare solutions tailored to your unique needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Primary Care",
                description:
                  "Comprehensive healthcare services for patients of all ages with personalized treatment plans",
                icon: Stethoscope,
                gradient: "from-green-500 to-emerald-600",
              },
              {
                title: "Specialized Care",
                description: "Expert treatment for specific medical conditions with state-of-the-art technology",
                icon: Heart,
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                title: "Preventive Care",
                description: "Regular check-ups and health screenings to maintain optimal wellness",
                icon: Shield,
                gradient: "from-teal-500 to-green-600",
              },
            ].map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl shadow-lg hover:border-2 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section id="appointments" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Book an Appointment</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Schedule your visit with Dr. Teshome and take the first step towards better health
            </p>
          </div>
          <div className="max-w-4xl mx-auto p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Available Appointment Times</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointmentSlots.map((slot, index) => (
                <div key={index} className="border border-green-500 rounded-md p-4">
                  <h4 className="font-semibold text-gray-700">{slot.day}</h4>
                  <p className="text-gray-600 mb-3">{slot.time}</p>
                  <button
                    onClick={() => {
                      setSelectedSlot(slot)
                      setIsModalOpen(true)
                    }}
                    className="group w-full bg-green-600 text-white px-4 py-3 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm font-semibold"
                  >
                    <span className="flex items-center justify-center">
                      Book This Slot
                      <Calendar className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Office Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM to 5:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM to 2:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Contact</h3>
              <p className="text-gray-600">
                In case of emergency, please call: <span className="font-medium">(123) 456-7890</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Resources Section */}
      <section id="patient-resources" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Patient Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a smooth and informed healthcare experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patientResources.map((resource, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{resource.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{resource.description}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href={resource.link}
                    className="inline-block px-6 py-2 border border-transparent rounded-lg text-green-600 font-semibold transition-all duration-200 hover:border-green-500 hover:bg-transparent focus:outline-none"
                    style={{ background: "none" }}
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Latest from Our Blog</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest health insights and medical updates
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogposts.map((post, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-green-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with our friendly team for any questions or concerns
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="p-10 rounded-3xl shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      <strong className="text-gray-900">Address:</strong>
                      <br />
                      Addis Ababa, Ethiopia
                      <br />
                      Suite 100
                      <br />
                      City, State 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Phone:</strong>
                      <br />
                      +251911111111
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Email:</strong>
                      <br />
                      drteshome@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-10 rounded-3xl shadow-xl hover:border-1 hover:border-green-500 transition-all duration-300">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="Your Name"
                    className="w-full px-4 py-4 text-gray-900 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-300 text-lg placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="Your Email"
                    className="w-full px-4 py-4 text-gray-900 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-300 text-lg placeholder-gray-500"
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-4 text-gray-900 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-300 text-lg placeholder-gray-500 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-gray-900 px-6 py-4 rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-lg font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      {isModalOpen && (
        <AppointmentModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      )}
    </main>
  )
}

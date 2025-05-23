"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import AppointmentModal from '../components/AppointmentModal';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="pt-16 bg-white">
      {/* Hero Section */}
      <section id="home" className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Dr. Teshome Tena
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Orthopedic Surgeon, Trauma and Arthroplasty Subspecialist
            </p>
            <button
              onClick={() => router.push('/appointment')}
              className="bg-[#006837] text-white px-8 py-3 rounded-full hover:bg-[#005129] transition-colors"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About Dr. Teshome Tena</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                Dr. Teshome Tena is an orthopedic surgeon specializing in trauma and arthroplasty in Addis Ababa. 
                With over ten years of experience in diagnosing and treating joint, bone, and muscle disorders, 
                he is a former Assistant Professor of orthopedic surgery at Arba Minch University and currently 
                serves as a consultant surgeon at Bethezata Hospital.
              </p>
              <p className="text-gray-600 mb-4">
                Dr. Tena is actively involved in research-based activities and has authored studies demonstrating 
                his expertise in managing complex fractures. His dedication to patient care is evident through his 
                work with EMERGENCY ONG Onlus, providing free healthcare services to victims of war and poverty.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Education</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>M.D from the University of Gondar (2007-2013)</li>
                  <li>Orthopedic surgery residency training from Addis Ababa University (2015-2019)</li>
                  <li>Fellowship in orthopedic trauma from Addis Ababa University (2021-2023)</li>
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Memberships</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Ethiopian Medical Association</li>
                  <li>Ethiopian Society of Orthopaedic and Traumatology (ESOT)</li>
                </ul>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/images/dr-tesh.jpeg"
                alt="Dr. Teshome Tena"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Orthopedic Surgery",
                description: "Comprehensive surgical treatments for bone and joint conditions"
              },
              {
                title: "Trauma Care",
                description: "Expert treatment for fractures and complex injuries"
              },
              {
                title: "Joint Replacement",
                description: "Advanced arthroplasty procedures for improved mobility"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section id="appointments" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book an Appointment</h2>
          <div className="text-center">
            <p className="text-gray-600 mb-8">
              To schedule an appointment, please contact us directly through one of the following methods:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
                <p className="text-gray-600">Bethezata Hospital</p>
                <p className="text-gray-600">Addis Ababa, Ethiopia</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hours</h3>
                <p className="text-gray-600">Monday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Wednesday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Friday: 9:00 AM - 5:00 PM</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact</h3>
                <p className="text-gray-600">WhatsApp Available</p>
                <p className="text-gray-600">Typically replies within 1 minute</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Resources Section */}
      <section id="patient-resources" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Patient Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Insurance & Payments",
                description: "We accept cash, credit cards, bank transfers, and mobile payments"
              },
              {
                title: "Accessibility",
                description: "Wheelchair accessible facility with air conditioning"
              },
              {
                title: "Home Services",
                description: "Available for patients who require home visits"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{resource.title}</h3>
                <p className="text-gray-600">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Latest from Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Understanding Joint Replacement",
                excerpt: "Learn about the latest advancements in joint replacement surgery"
              },
              {
                title: "Trauma Care Excellence",
                excerpt: "Expert insights into managing complex orthopedic trauma cases"
              },
              {
                title: "Research & Innovation",
                excerpt: "Stay informed about our latest research in orthopedic surgery"
              }
            ].map((post, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <strong>Hospital:</strong><br />
                  Bethezata Hospital<br />
                  Addis Ababa, Ethiopia
                </p>
                <p className="text-gray-600">
                  <strong>Hours:</strong><br />
                  Monday: 9:00 AM - 5:00 PM<br />
                  Wednesday: 9:00 AM - 5:00 PM<br />
                  Friday: 9:00 AM - 5:00 PM
                </p>
                <p className="text-gray-600">
                  <strong>WhatsApp:</strong><br />
                  Available for quick responses
                </p>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#006837] focus:border-[#006837] text-gray-900 placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#006837] focus:border-[#006837] text-gray-900 placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#006837] focus:border-[#006837] text-gray-900 placeholder-gray-400"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#006837] text-white px-4 py-2 rounded-md hover:bg-[#005129] transition-colors focus:outline-none focus:ring-2 focus:ring-[#006837] focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
  );
}

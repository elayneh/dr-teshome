"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>("general")
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({})

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category)
  }

  // Real FAQ data from tirutena.com
  const faqCategories = [
    {
      id: "general",
      title: "General Information",
      questions: [
        {
          id: "q1",
          question: "Who is Dr. Teshome Tena?",
          answer:
            "Dr. Teshome Tena is an orthopedic surgeon specializing in trauma and arthroplasty in Addis Ababa. He is a former Assistant Professor at Arba Minch University and currently a consultant at Ethio Istanbul General Hospital. He has over ten years of experience in diagnosing and treating joint, bone, and muscle disorders.",
        },
        {
          id: "q2",
          question: "What languages does Dr. Teshome Tena speak?",
          answer: "English, Amharic.",
        },
        {
          id: "q3",
          question: "Is Dr. Teshome Tena available for online consultations?",
          answer: "Yes, online telemedicine consultations are available.",
        },
      ],
    },
    {
      id: "education",
      title: "Education",
      questions: [
        {
          id: "q4",
          question: "What is Dr. Teshome Tena's educational background?",
          answer:
            "- M.D. from University of Gondar (2007–2013)\n- Orthopedic Surgery Residency at Addis Ababa University (2015–2019)\n- Fellowship in Orthopedic Trauma at Addis Ababa University (2021–2023)",
        },
      ],
    },
    {
      id: "experience",
      title: "Experience",
      questions: [
        {
          id: "q5",
          question: "What is Dr. Teshome Tena's professional experience?",
          answer:
            "- Lecturer at Arba Minch University (2013–2015)\n- Assistant Professor at Arba Minch University (2020–2021)\n- Orthopedic Surgeon at Armed Forces General Hospital, Addis Ababa (2023–2024)\n- Orthopedic Surgeon at EMERGENCY ONG Onlus (Currently)\n- Orthopedic Surgeon at Ethio Istanbul General Hospital (Currently)",
        },
        {
          id: "q6",
          question: "Is Dr. Teshome Tena a member of any professional organizations?",
          answer: "Yes, he is a member of the Ethiopian Medical Association and the Ethiopian Society of Orthopaedic and Traumatology (ESOT).",
        },
      ],
    },
    {
      id: "services",
      title: "Services & Pricing",
      questions: [
        {
          id: "q7",
          question: "What services does Dr. Teshome Tena offer?",
          answer:
            "Dr. Teshome Tena offers orthopedic surgery, trauma care, arthroplasty, diagnosis and treatment of joint, bone, and muscle disorders, and physiotherapy and rehabilitation.",
        },
        {
          id: "q8",
          question: "What are the estimated costs for services?",
          answer:
            `Consultation Fees: 1,038 – 2,595 ETB\nDiagnosis (Imaging & Blood Tests): 2,086 – 5,739 ETB\nOrthopedic Surgery: 751,758 – 1,581,019 ETB\nOnline Telemedicine Consultations: 2,646 – 10,343 ETB\nFractures and Dislocations: 543,603 – 1,344,487 ETB\nJoint Pain: 339,539 – 1,057,099 ETB\nBone and Joint Infections: 543,603 – 1,144,321 ETB\nPediatric Musculoskeletal Conditions: 238,774 – 1,091,485 ETB\nFoot Problems: 442,135 – 941,366 ETB\nJoint Replacements: 644,926 – 840,368 ETB\nSport Injuries: 543,603 – 767,199 ETB\nBack Pain: 237,722 – 358,641 ETB\nKnee Replacement Surgery: 959,713 – 1,222,832 ETB\nHerniated Disc: 894,778 – 1,341,663 ETB\nHip Replacement: 1,190,452 – 1,278,222 ETB\nLower Back Pain Treatment: 922,216 – 1,020,737 ETB\nKnee Replacement: 1,078,378 – 1,228,861 ETB\n...`,
        },
      ],
    },
    {
      id: "clinic",
      title: "Clinic Information",
      questions: [
        {
          id: "q9",
          question: "Where does Dr. Teshome Tena practice?",
          answer: "Ethio Istanbul General Hospital, XQQW+M2F, Addis Ababa.",
        },
        {
          id: "q10",
          question: "What are the clinic's hours?",
          answer: "24 hours open (except Wednesday: Day Off).",
        },
        {
          id: "q11",
          question: "Is the clinic wheelchair accessible?",
          answer: "Yes, the clinic is wheelchair accessible.",
        },
        {
          id: "q12",
          question: "What payment methods are accepted?",
          answer: "Cash, Credit Cards, Bank Transfer, Mobile Payments.",
        },
      ],
    },
    {
      id: "booking",
      title: "Booking & Contact",
      questions: [
        {
          id: "q13",
          question: "How do I book a consultation with Dr. Teshome Tena?",
          answer: "You can book a consultation via the website or WhatsApp. Online telemedicine consultations are also available.",
        },
        {
          id: "q14",
          question: "How can I contact Dr. Teshome Tena?",
          answer: "Contact via Ethio Istanbul General Hospital or WhatsApp as listed on the website.",
        },
      ],
    },
    {
      id: "reviews",
      title: "Reviews",
      questions: [
        {
          id: "q15",
          question: "What do patients say about Dr. Teshome Tena?",
          answer: "Dr. Teshome Tena is highly recommended for his accurate diagnosis and effective treatment. Patients appreciate his promptness and expertise.",
        },
      ],
    },
  ]

  const filteredFAQs = searchQuery
    ? faqCategories.map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
    : faqCategories

  return (
    <main className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about Dr. Teshome Tena, his background, services, and clinic.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search FAQs..."
            className="block w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 text-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category) => (
            <div key={category.id} className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full flex justify-between items-center p-6 text-left rounded-t-2xl ${
                  activeCategory === category.id ? "bg-green-50" : "bg-white"
                } hover:bg-green-50 transition-colors`}
              >
                <h2 className="text-2xl font-semibold text-gray-900">{category.title}</h2>
                {activeCategory === category.id ? (
                  <ChevronUp className="h-6 w-6 text-green-600" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400" />
                )}
              </button>

              {activeCategory === category.id && (
                <div className="p-6 bg-white rounded-b-2xl">
                  {category.questions.length > 0 ? (
                    <div className="space-y-4">
                      {category.questions.map((faq) => (
                        <div
                          key={faq.id}
                          className="border border-gray-200 rounded-xl overflow-hidden hover:border-green-300 transition-colors"
                        >
                          <button
                            onClick={() => toggleQuestion(faq.id)}
                            className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                            {expandedQuestions[faq.id] ? (
                              <ChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          {expandedQuestions[faq.id] && (
                            <div className="p-5 bg-gray-50 border-t border-gray-200">
                              <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No matching questions in this category.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 p-8 bg-green-50 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            If you couldn't find the answer you were looking for, please don't hesitate to contact us directly.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+11234567890"
              className="inline-flex items-center px-6 py-3 bg-white border border-green-500 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us: (123) 456-7890
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send a Message
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

// Import the necessary icons
function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

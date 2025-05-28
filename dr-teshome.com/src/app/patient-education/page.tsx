"use client"

import Link from "next/link"
import { ArrowLeft, Bone, Activity, Shield, Search, Zap, Heart, Users } from "lucide-react"
import { useState } from "react"
import { orthopedicCategories } from "../../constants/patient-education"

export default function PatientEducationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>("all")

  const filteredCategories =
    activeCategory === "all" ? orthopedicCategories : orthopedicCategories.filter((cat) => cat.id === activeCategory)

  const searchFilteredCategories = searchQuery
    ? filteredCategories
        .map((category) => ({
          ...category,
          articles: category.articles.filter(
            (article) =>
              article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              article.description.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.articles.length > 0)
    : filteredCategories

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
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Orthopedic Patient Education</h1>
          <p className="text-xl text-gray-600">
            Comprehensive information about bone, joint, and musculoskeletal health to help you make informed decisions
            about your orthopedic care.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search orthopedic topics..."
            className="block w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 text-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === "all" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Topics
            </button>
            {orthopedicCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Education Content */}
        <div className="space-y-12">
          {searchFilteredCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <section key={category.id}>
                <div className="flex items-center mb-8">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${category.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.articles.map((article, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300 cursor-pointer"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                      <p className="text-gray-600 mb-4">{article.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                        <button className="text-green-600 hover:text-green-700 font-medium">Read More →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Orthopedic Health Tips */}
        <section className="mt-16 p-8 bg-green-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Daily Orthopedic Health Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Maintain Good Posture</h3>
              <p className="text-gray-600 text-sm">
                Keep your shoulders back and spine aligned whether sitting or standing.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Stay Active Daily</h3>
              <p className="text-gray-600 text-sm">Regular movement keeps joints flexible and muscles strong.</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Lift Properly</h3>
              <p className="text-gray-600 text-sm">Bend your knees, not your back, when lifting heavy objects.</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Warm Up Before Exercise</h3>
              <p className="text-gray-600 text-sm">Always warm up muscles and joints before physical activity.</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Wear Proper Footwear</h3>
              <p className="text-gray-600 text-sm">Choose supportive shoes appropriate for your activities.</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Listen to Your Body</h3>
              <p className="text-gray-600 text-sm">
                Don't ignore persistent pain - seek medical attention when needed.
              </p>
            </div>
          </div>
        </section>

        {/* Orthopedic Resources */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Additional Orthopedic Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exercise Videos</h3>
              <p className="text-gray-600 mb-4">Guided exercise videos for rehabilitation and injury prevention.</p>
              <button className="text-green-600 hover:text-green-700 font-medium">Watch Videos →</button>
            </div>
            <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Anatomy Guide</h3>
              <p className="text-gray-600 mb-4">Interactive anatomy guide to understand your musculoskeletal system.</p>
              <button className="text-green-600 hover:text-green-700 font-medium">Explore Anatomy →</button>
            </div>
            <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-2 hover:border-green-500 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recovery Trackers</h3>
              <p className="text-gray-600 mb-4">Downloadable forms to track your recovery progress and symptoms.</p>
              <button className="text-green-600 hover:text-green-700 font-medium">Download Forms →</button>
            </div>
          </div>
        </section>

        {/* Emergency Information */}
        <section className="mt-16 p-8 bg-red-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">When to Seek Emergency Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Immediate Medical Attention Required</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Severe bone deformity or open fracture</li>
                <li>• Complete loss of function in a limb</li>
                <li>• Severe, uncontrolled pain</li>
                <li>• Signs of infection (fever, redness, warmth)</li>
                <li>• Numbness or tingling that doesn't improve</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Our Office For</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Persistent joint pain or stiffness</li>
                <li>• Gradual loss of mobility</li>
                <li>• Recurring back pain</li>
                <li>• Sports injury evaluation</li>
                <li>• Questions about treatment options</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 p-8 bg-gray-50 rounded-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated on Orthopedic Health</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest orthopedic health tips, treatment updates, and injury
              prevention advice.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

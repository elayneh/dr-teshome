"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

type Language = {
  code: string
  name: string
  nativeName: string
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("Patient")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    code: "en",
    name: "English",
    nativeName: "English",
  })

  const pathname = usePathname()
  const router = useRouter()

  // Check if user is logged in from localStorage on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    const storedUserName = localStorage.getItem("userName")

    if (loggedInStatus === "true") {
      setIsLoggedIn(true)
    }

    if (storedUserName) {
      setUserName(storedUserName)
    }
  }, [])

  const resourcesRef = useRef<HTMLDivElement>(null)
  const languageRef = useRef<HTMLDivElement>(null)

  const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "am", name: "Amharic", nativeName: "አማርኛ" },
  ]

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen)
  }

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen)
  }

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language)
    setIsLanguageOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userName")
    window.location.href = "/"
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false)
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? "py-2 shadow-md" : "py-4 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top bar with logo */}
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span
              className={`font-bold text-[#006837] transition-all duration-300 ${scrolled ? "text-xl" : "text-2xl"}`}
            >
              Dr. Teshome
            </span>
          </Link>

          {/* Main navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-[#006837] transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-[#006837] transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-[#006837] transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="text-gray-700 hover:text-[#006837] transition-colors font-medium"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-[#006837] transition-colors font-medium"
            >
              Contact
            </button>

            {/* Patient Resources Dropdown */}
            <div className="relative group" ref={resourcesRef}>
              <button
                className="text-gray-700 hover:text-[#006837] transition-colors font-medium flex items-center"
                onClick={toggleResources}
                aria-expanded={isResourcesOpen}
                aria-haspopup="true"
              >
                Patient Resources
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isResourcesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu */}
              <div
                className={`
                  absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 
                  transition-all duration-200 ease-in-out origin-top-right z-10
                  ${isResourcesOpen ? "transform opacity-100 scale-100" : "transform opacity-0 scale-95 invisible"}
                `}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    onClick={() => scrollToSection('patient-resources')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#006837]"
                    role="menuitem"
                  >
                    Patient Forms
                  </button>
                  <button
                    onClick={() => scrollToSection('patient-resources')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#006837]"
                    role="menuitem"
                  >
                    Insurance Information
                  </button>
                  <button
                    onClick={() => scrollToSection('patient-resources')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#006837]"
                    role="menuitem"
                  >
                    Frequently Asked Questions
                  </button>
                  <button
                    onClick={() => scrollToSection('patient-resources')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#006837]"
                    role="menuitem"
                  >
                    Patient Education
                  </button>
                  <button
                    onClick={() => scrollToSection('patient-resources')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#006837]"
                    role="menuitem"
                  >
                    Telehealth Services
                  </button>
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="relative" ref={languageRef}>
              <button
                className="text-gray-700 hover:text-[#006837] transition-colors font-medium flex items-center"
                onClick={toggleLanguage}
                aria-expanded={isLanguageOpen}
                aria-haspopup="true"
              >
                {currentLanguage.nativeName}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isLanguageOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Language dropdown */}
              <div
                className={`
                  absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 
                  transition-all duration-200 ease-in-out origin-top-right z-10
                  ${isLanguageOpen ? "transform opacity-100 scale-100" : "transform opacity-0 scale-95 invisible"}
                `}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currentLanguage.code === language.code
                          ? "bg-gray-100 text-[#006837] font-medium"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[#006837]"
                      }`}
                      role="menuitem"
                      onClick={() => changeLanguage(language)}
                    >
                      {language.nativeName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Book appointment button */}
            <button
              onClick={() => router.push('/appointment')}
              className={`bg-[#006837] hover:bg-[#005129] text-white font-bold rounded-md transition-all duration-300 ${
                scrolled ? "py-1.5 px-3 text-sm" : "py-2 px-4 text-base"
              }`}
            >
              Book Here
            </button>

            {/* Authentication Links - Conditional rendering based on login state */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-[#006837] transition-colors font-medium flex items-center"
              >
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="text-gray-700 hover:text-[#006837] transition-colors font-medium"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile menu button - hidden on desktop */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - conditionally shown based on state */}
      <div
        className={`
        absolute top-full left-0 w-full bg-white border-t border-gray-200 transform transition-all duration-300 ease-in-out origin-top
        ${isMenuOpen ? "opacity-100 max-h-[1000px] translate-y-0" : "opacity-0 max-h-0 -translate-y-4 overflow-hidden"}
      `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            onClick={() => scrollToSection('home')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
          >
            Services
          </button>

          {/* Mobile Patient Resources Dropdown */}
          <div>
            <button
              className="flex justify-between items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              Patient Resources
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${isResourcesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mobile dropdown items */}
            <div
              className={`
              pl-4 transition-all duration-300 ease-in-out overflow-hidden
              ${isResourcesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
            `}
            >
              <button
                onClick={() => scrollToSection('patient-resources')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
              >
                Patient Forms
              </button>
              <button
                onClick={() => scrollToSection('patient-resources')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
              >
                Insurance Information
              </button>
              <button
                onClick={() => scrollToSection('patient-resources')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('patient-resources')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
              >
                Patient Education
              </button>
              <button
                onClick={() => scrollToSection('patient-resources')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
              >
                Telehealth Services
              </button>
            </div>
          </div>

          <button
            onClick={() => scrollToSection('blog')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
          >
            Blog
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
          >
            Contact
          </button>

          {/* Mobile Language Selector */}
          <div>
            <button
              className="flex justify-between items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              {currentLanguage.nativeName}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${isLanguageOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mobile language options */}
            <div
              className={`
              pl-4 transition-all duration-300 ease-in-out overflow-hidden
              ${isLanguageOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}
            `}
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={`block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200 ${
                    currentLanguage.code === language.code ? "font-medium" : ""
                  }`}
                  onClick={() => {
                    changeLanguage(language)
                    setIsMenuOpen(false)
                  }}
                >
                  {language.nativeName}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => router.push('/appointment')}
            className="block w-full px-3 py-2 bg-[#006837] hover:bg-[#005129] text-white font-bold rounded-md transition-colors duration-200"
          >
            Book Here
          </button>

          {/* Mobile Authentication Links */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
            >
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#006837] rounded-md transition-colors duration-200"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

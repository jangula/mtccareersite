'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExploreDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const exploreLinks = [
    { href: '/culture', label: 'Our Culture', desc: 'Life at MTC' },
    { href: '/benefits', label: 'Benefits', desc: 'What we offer' },
    { href: '/pathways', label: 'Career Pathways', desc: 'Graduate & internship programmes' },
    { href: '/diversity', label: 'Diversity & Inclusion', desc: 'Our commitment to D&I' },
    { href: '/faq', label: 'FAQ', desc: 'Common questions answered' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <div className="bg-[#E30613] text-white font-bold text-2xl px-3 py-1 rounded">
                  MTC
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">Careers</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/jobs"
              className="text-gray-700 hover:text-[#E30613] font-medium transition-colors"
            >
              Browse Jobs
            </Link>

            {/* Explore Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-[#E30613] font-medium transition-colors"
              >
                Explore
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${exploreDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {exploreDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setExploreDropdownOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="block font-medium text-gray-900">{link.label}</span>
                      <span className="block text-sm text-gray-500">{link.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/portal"
              className="text-gray-700 hover:text-[#E30613] font-medium transition-colors"
            >
              Applicant Portal
            </Link>
            <Link
              href="/login"
              className="btn-primary"
            >
              Login / Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-[#E30613] p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/jobs"
                className="text-gray-700 hover:text-[#E30613] font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Jobs
              </Link>

              {/* Mobile Explore Section */}
              <div className="border-t pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Explore</p>
                {exploreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-gray-700 hover:text-[#E30613] font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t pt-4">
                <Link
                  href="/portal"
                  className="block py-2 text-gray-700 hover:text-[#E30613] font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Applicant Portal
                </Link>
                <Link
                  href="/login"
                  className="btn-primary text-center mt-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

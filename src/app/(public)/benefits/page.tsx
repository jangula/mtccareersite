import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Benefits',
  description: 'Discover the comprehensive benefits package at MTC Namibia - from competitive salaries to health benefits and professional development.',
}

const benefits = [
  {
    category: 'Health & Wellness',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    items: [
      { title: 'Medical Aid', description: 'Comprehensive medical aid coverage for you and your family' },
      { title: 'Wellness Programs', description: 'Access to gym memberships and wellness initiatives' },
      { title: 'Mental Health Support', description: 'Employee assistance programs for mental well-being' },
      { title: 'Annual Health Checks', description: 'Free annual health screenings' },
    ],
  },
  {
    category: 'Financial Benefits',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    items: [
      { title: 'Competitive Salary', description: 'Market-related salaries reviewed annually' },
      { title: 'Performance Bonus', description: 'Annual performance-based bonus scheme' },
      { title: 'Pension Fund', description: 'Employer-contributed retirement fund' },
      { title: 'Staff Discounts', description: 'Special discounts on MTC products and services' },
    ],
  },
  {
    category: 'Work-Life Balance',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    items: [
      { title: 'Flexible Working', description: 'Hybrid work arrangements where possible' },
      { title: 'Generous Leave', description: '22+ days annual leave plus public holidays' },
      { title: 'Parental Leave', description: 'Paid maternity and paternity leave' },
      { title: 'Study Leave', description: 'Paid leave for examinations and study' },
    ],
  },
  {
    category: 'Growth & Development',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    items: [
      { title: 'Training Programs', description: 'Access to internal and external training' },
      { title: 'Certification Support', description: 'Sponsorship for professional certifications' },
      { title: 'Career Progression', description: 'Clear career paths and promotion opportunities' },
      { title: 'Mentorship', description: 'Structured mentorship programs' },
    ],
  },
]

export default function BenefitsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E30613] to-[#B8050F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Employee Benefits</h1>
            <p className="text-xl text-white/90">
              At MTC, we believe in taking care of our people. Explore the comprehensive
              benefits package designed to support your well-being and career growth.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((category) => (
              <div key={category.category} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-[#E30613]">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 ml-4">{category.category}</h2>
                </div>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.title} className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Perks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Perks</h2>
            <p className="text-xl text-gray-600">Extra benefits that make MTC a great place to work</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: '📱', text: 'Free Phone Allowance' },
              { icon: '🎉', text: 'Team Events' },
              { icon: '☕', text: 'Free Refreshments' },
              { icon: '🚗', text: 'Parking' },
              { icon: '🎓', text: 'Study Support' },
              { icon: '🏆', text: 'Recognition Awards' },
            ].map((perk) => (
              <div key={perk.text} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{perk.icon}</div>
                <p className="text-gray-700 font-medium">{perk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience these benefits firsthand. Browse our current openings and
            take the next step in your career.
          </p>
          <Link href="/jobs" className="btn-primary py-3 px-8 text-lg">
            View Open Positions
          </Link>
        </div>
      </section>
    </div>
  )
}

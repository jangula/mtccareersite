import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Culture',
  description: 'Discover the culture and values that make MTC Namibia a great place to work. Learn about our commitment to innovation, diversity, and community.',
}

const values = [
  {
    title: 'Customer First',
    description: 'We put our customers at the center of everything we do, striving to exceed expectations and deliver exceptional experiences.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'We embrace change and continuously seek new ways to improve our products, services, and processes.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Integrity',
    description: 'We act with honesty and transparency in all our dealings, building trust with our stakeholders.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    description: 'We pursue the highest standards in everything we do, constantly raising the bar for ourselves and our industry.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Teamwork',
    description: 'We collaborate across boundaries, leveraging our diverse skills and perspectives to achieve shared goals.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Community',
    description: 'We are committed to making a positive impact in Namibia through various social responsibility initiatives.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function CulturePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E30613] to-[#B8050F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Culture</h1>
            <p className="text-xl text-white/90">
              At MTC, we&apos;re more than a telecommunications company. We&apos;re a community
              of passionate individuals working together to connect Namibia and shape
              its digital future.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-14 h-14 bg-[#E30613] rounded-full flex items-center justify-center mb-6">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg">
                To provide innovative telecommunications solutions that empower
                Namibians to connect, communicate, and thrive in the digital age.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-14 h-14 bg-[#E30613] rounded-full flex items-center justify-center mb-6">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg">
                To be Namibia&apos;s most trusted and innovative technology company,
                leading the nation&apos;s digital transformation and connecting
                every Namibian to opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide our decisions and define how we work together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-[#E30613] mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Environment */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Life at MTC</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience a workplace that values growth, celebrates diversity, and fosters innovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 rounded-xl p-8 mb-4">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Diverse & Inclusive</h3>
                <p className="text-gray-600">
                  We celebrate diversity and create an inclusive environment where everyone belongs.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-xl p-8 mb-4">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation Hub</h3>
                <p className="text-gray-600">
                  Work on cutting-edge projects that shape the future of telecommunications.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-xl p-8 mb-4">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Collaborative Spirit</h3>
                <p className="text-gray-600">
                  Join teams that support each other and celebrate collective success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Making a Difference</h2>
              <p className="text-lg text-gray-400 mb-6">
                At MTC, we believe in giving back to the communities we serve. Through
                various CSR initiatives, we&apos;re committed to making a positive impact
                on Namibian society.
              </p>
              <ul className="space-y-4">
                {[
                  'Education scholarships and ICT training programs',
                  'Rural connectivity initiatives',
                  'Environmental sustainability projects',
                  'Youth development and sports sponsorships',
                  'Healthcare support initiatives',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <svg className="h-6 w-6 text-[#E30613] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-[#E30613]">N$50M+</div>
                  <div className="text-gray-400 mt-1">CSR Investment</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#E30613]">500+</div>
                  <div className="text-gray-400 mt-1">Scholarships</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#E30613]">100+</div>
                  <div className="text-gray-400 mt-1">Community Projects</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#E30613]">25+</div>
                  <div className="text-gray-400 mt-1">Years of Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Be Part of Something Great
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a company that values your growth, celebrates your contributions,
            and makes a real difference in Namibia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/jobs" className="btn-primary py-3 px-8 text-lg">
              Explore Opportunities
            </Link>
            <Link href="/benefits" className="btn-outline py-3 px-8 text-lg">
              View Benefits
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

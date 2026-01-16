import Link from 'next/link'

const pathways = [
  {
    id: 'graduate',
    title: 'Graduate Programme',
    duration: '24 months',
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    description: 'Launch your career with our comprehensive graduate development programme designed for recent university graduates.',
    highlights: [
      'Rotational assignments across departments',
      'Dedicated mentor and career coach',
      'Leadership development workshops',
      'International exposure opportunities',
      'Fast-track to management roles',
    ],
    eligibility: [
      'Recent graduate (within 2 years)',
      'Bachelor\'s degree or higher',
      'Strong academic record',
      'Namibian citizen or permanent resident',
    ],
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'internship',
    title: 'Internship Programme',
    duration: '3-6 months',
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: 'Gain valuable industry experience while completing your studies with our structured internship programme.',
    highlights: [
      'Real project assignments',
      'Monthly stipend provided',
      'Flexible scheduling for students',
      'Skills workshops and training',
      'Potential conversion to full-time',
    ],
    eligibility: [
      'Currently enrolled university student',
      'Completed at least 2 years of study',
      'Relevant field of study',
      'Available for minimum 3 months',
    ],
    color: 'from-green-500 to-green-700',
  },
  {
    id: 'apprenticeship',
    title: 'Technical Apprenticeship',
    duration: '12-18 months',
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    description: 'Learn telecommunications technology hands-on while earning a nationally recognized qualification.',
    highlights: [
      'NQA-accredited certification',
      'Hands-on technical training',
      'Work alongside experienced technicians',
      'Equipment and tools provided',
      'Guaranteed job offer upon completion',
    ],
    eligibility: [
      'Grade 12 certificate with Maths & Science',
      'Technical aptitude and interest',
      'Valid driver\'s license (preferred)',
      'Willing to work in different locations',
    ],
    color: 'from-orange-500 to-orange-700',
  },
  {
    id: 'leadership',
    title: 'Leadership Development',
    duration: 'Ongoing',
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: 'Accelerate your career growth with our internal leadership development track for high-potential employees.',
    highlights: [
      'Executive coaching sessions',
      'Cross-functional project leadership',
      'International secondment opportunities',
      'MBA sponsorship programme',
      'Board exposure and presentations',
    ],
    eligibility: [
      'Minimum 3 years at MTC',
      'Strong performance record',
      'Demonstrated leadership potential',
      'Manager nomination required',
    ],
    color: 'from-purple-500 to-purple-700',
  },
]

export default function PathwaysPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-[#E30613] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Career Pathway at MTC
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Whether you&apos;re just starting out or looking to advance, we have programmes
            designed to help you reach your full potential.
          </p>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {pathways.map((pathway) => (
              <div
                key={pathway.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${pathway.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      {pathway.icon}
                      <h2 className="text-2xl font-bold mt-4">{pathway.title}</h2>
                      <p className="text-white/80">{pathway.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{pathway.description}</p>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Programme Highlights</h3>
                    <ul className="space-y-2">
                      {pathway.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Eligibility</h3>
                    <ul className="space-y-2">
                      {pathway.eligibility.map((req, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-[#E30613] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/jobs?pathway=${pathway.id}`}
                    className="block w-full text-center py-3 bg-gray-100 hover:bg-[#E30613] hover:text-white rounded-lg font-medium transition-colors"
                  >
                    View {pathway.title} Opportunities
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Application Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Apply Online', desc: 'Submit your application through our careers portal' },
              { step: 2, title: 'Assessment', desc: 'Complete online assessments and aptitude tests' },
              { step: 3, title: 'Interview', desc: 'Meet with our HR team and hiring managers' },
              { step: 4, title: 'Offer', desc: 'Receive and accept your offer to join MTC' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto bg-[#E30613] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#E30613] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8">
            Explore our current opportunities and take the first step towards an exciting career at MTC.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center px-8 py-4 bg-white text-[#E30613] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse All Opportunities
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

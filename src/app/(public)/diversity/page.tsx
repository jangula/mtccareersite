import Link from 'next/link'

const initiatives = [
  {
    title: 'Gender Equality',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    description: 'We are committed to achieving gender balance across all levels of our organization, with a target of 50% women in leadership by 2030.',
    stats: '42% women in leadership roles',
  },
  {
    title: 'Youth Empowerment',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: 'Our graduate and internship programmes provide opportunities for young Namibians to build their careers in telecommunications.',
    stats: '150+ young professionals trained annually',
  },
  {
    title: 'Disability Inclusion',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    description: 'We provide accessible workplaces and reasonable accommodations to ensure all employees can thrive and contribute their best.',
    stats: 'Fully accessible headquarters',
  },
  {
    title: 'Regional Representation',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'We actively recruit from all 14 regions of Namibia, ensuring our workforce reflects the communities we serve.',
    stats: 'Employees from all 14 regions',
  },
]

const values = [
  {
    title: 'Respect',
    description: 'We treat everyone with dignity and respect, valuing each person\'s unique contributions.',
  },
  {
    title: 'Belonging',
    description: 'We create an environment where everyone feels welcome, valued, and able to be their authentic selves.',
  },
  {
    title: 'Equity',
    description: 'We ensure fair treatment, access, and opportunity for all, removing barriers that prevent full participation.',
  },
  {
    title: 'Growth',
    description: 'We invest in developing all our people, providing pathways for advancement regardless of background.',
  },
]

export default function DiversityPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E30613]/80 to-purple-900/80" />
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/600')] opacity-20 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Diversity & Inclusion at MTC
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            At MTC, we believe that our diversity is our strength. We are committed to creating
            an inclusive workplace where every person can thrive and contribute to connecting Namibia.
          </p>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
              <p className="text-lg text-gray-600 mb-6">
                As Namibia&apos;s leading telecommunications company, we recognize our responsibility
                to reflect the rich diversity of the nation we serve. Our commitment to diversity
                and inclusion isn&apos;t just about doing what&apos;s right—it&apos;s about building a stronger,
                more innovative company.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We actively work to remove barriers, challenge biases, and create opportunities
                for underrepresented groups. From our hiring practices to our leadership development
                programmes, diversity and inclusion are woven into everything we do.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E30613] to-purple-600 border-2 border-white flex items-center justify-center text-white text-sm font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-gray-600">Join our diverse team of 1,500+ employees</span>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#E30613] to-[#B8050F] p-6 rounded-2xl text-white">
                  <p className="text-4xl font-bold">42%</p>
                  <p className="text-white/80">Women in leadership</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl text-white">
                  <p className="text-4xl font-bold">14</p>
                  <p className="text-white/80">Regions represented</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-white">
                  <p className="text-4xl font-bold">12</p>
                  <p className="text-white/80">Languages spoken</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl text-white">
                  <p className="text-4xl font-bold">150+</p>
                  <p className="text-white/80">Youth trained yearly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Inclusion Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#E30613] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Our Initiatives
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We&apos;re taking concrete actions to build a more diverse and inclusive workplace.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((initiative) => (
              <div
                key={initiative.title}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-[#E30613]/10 rounded-xl text-[#E30613]">
                    {initiative.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {initiative.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{initiative.description}</p>
                    <p className="text-sm font-medium text-[#E30613]">{initiative.stats}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Resource Groups */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Employee Resource Groups
          </h2>
          <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Our employee-led communities provide support, networking, and professional development.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Women@MTC', desc: 'Supporting and advancing women in telecommunications' },
              { name: 'NextGen', desc: 'Connecting and developing young professionals' },
              { name: 'MTC Cares', desc: 'Community outreach and employee wellness initiatives' },
            ].map((group) => (
              <div key={group.name} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
                <p className="text-gray-400">{group.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Adjustments */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-4 bg-white rounded-2xl shadow-sm mb-6 md:mb-0 md:mr-8">
                <svg className="h-12 w-12 text-[#E30613]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Need Application Adjustments?
                </h2>
                <p className="text-gray-600 mb-4">
                  We&apos;re committed to providing an accessible recruitment process. If you need any
                  adjustments or accommodations during your application or interview, please let us know.
                </p>
                <a
                  href="mailto:accessibility@mtc.com.na"
                  className="inline-flex items-center text-[#E30613] font-medium hover:underline"
                >
                  Contact our accessibility team
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#E30613] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Diverse Team</h2>
          <p className="text-xl text-white/90 mb-8">
            Be part of a company that celebrates who you are and supports who you want to become.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center px-8 py-4 bg-white text-[#E30613] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Open Positions
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

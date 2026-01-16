import Link from 'next/link'
import prisma from '@/lib/prisma'
import JobCard from '@/components/ui/JobCard'
import EmployeeStories from '@/components/public/EmployeeStories'

export const dynamic = 'force-dynamic'

async function getFeaturedJobs() {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    })
    return jobs
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featuredJobs = await getFeaturedJobs()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E30613] to-[#B8050F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Shape the Future of Telecommunications in Namibia
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Join MTC and be part of a team that connects millions of Namibians every day.
              Discover opportunities that match your ambitions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/jobs" className="bg-white text-[#E30613] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
                Browse All Jobs
              </Link>
              <Link href="/culture" className="bg-transparent border-2 border-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E30613]">2.5M+</div>
              <div className="text-gray-600 mt-1">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E30613]">1,200+</div>
              <div className="text-gray-600 mt-1">Employees</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E30613]">25+</div>
              <div className="text-gray-600 mt-1">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E30613]">95%</div>
              <div className="text-gray-600 mt-1">Network Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join MTC Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join MTC?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer more than just a job. At MTC, you&apos;ll find a community that supports
              your growth and values your contribution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-[#E30613]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation First</h3>
              <p className="text-gray-600">
                Work with cutting-edge technology and be at the forefront of Namibia&apos;s digital transformation.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-[#E30613]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous Learning</h3>
              <p className="text-gray-600">
                Access training programs, certifications, and development opportunities to grow your career.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-[#E30613]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Inclusive Culture</h3>
              <p className="text-gray-600">
                Be part of a diverse team where everyone&apos;s voice matters and collaboration thrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Opportunities</h2>
              <p className="text-gray-600">Explore our latest job openings</p>
            </div>
            <Link href="/jobs" className="btn-outline hidden md:inline-block">
              View All Jobs
            </Link>
          </div>

          {featuredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">No open positions at the moment. Check back soon!</p>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/jobs" className="btn-primary">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Employee Stories */}
      <EmployeeStories />

      {/* Career Pathways Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your Career Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you&apos;re a student, recent graduate, or experienced professional,
              we have pathways to help you grow.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/pathways#graduate" className="group p-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl text-white hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-2">Graduate Programme</h3>
              <p className="text-white/80 mb-4">24-month development programme for recent graduates</p>
              <span className="inline-flex items-center font-medium group-hover:underline">
                Learn more →
              </span>
            </Link>
            <Link href="/pathways#internship" className="group p-6 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl text-white hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-2">Internships</h3>
              <p className="text-white/80 mb-4">Gain real experience while completing your studies</p>
              <span className="inline-flex items-center font-medium group-hover:underline">
                Learn more →
              </span>
            </Link>
            <Link href="/pathways#apprenticeship" className="group p-6 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl text-white hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-2">Apprenticeships</h3>
              <p className="text-white/80 mb-4">Hands-on technical training with certification</p>
              <span className="inline-flex items-center font-medium group-hover:underline">
                Learn more →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Take the first step towards an exciting career at MTC. Create your profile
            and apply to positions that match your skills.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/jobs" className="btn-primary py-3 px-8 text-lg">
              Explore Opportunities
            </Link>
            <Link href="/portal" className="bg-transparent border-2 border-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors text-lg">
              Access Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

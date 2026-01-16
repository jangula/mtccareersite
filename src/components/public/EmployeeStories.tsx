'use client'

import { useState } from 'react'

interface EmployeeStory {
  id: number
  name: string
  role: string
  department: string
  years: number
  image: string
  quote: string
  story: string
}

const employeeStories: EmployeeStory[] = [
  {
    id: 1,
    name: 'Maria Shikongo',
    role: 'Senior Network Engineer',
    department: 'Technology',
    years: 8,
    image: '/api/placeholder/150/150',
    quote: "MTC gave me the opportunity to grow from a junior technician to leading major infrastructure projects across Namibia.",
    story: "I joined MTC straight out of university. The company invested in my training, sending me to international conferences and certifications. Today, I lead a team of 12 engineers managing our 5G rollout. The work-life balance and support for women in tech has been exceptional."
  },
  {
    id: 2,
    name: 'Johannes Haufiku',
    role: 'Regional Sales Manager',
    department: 'Sales',
    years: 12,
    image: '/api/placeholder/150/150',
    quote: "What I love about MTC is how we're not just a company - we're connecting communities across Namibia.",
    story: "Starting as a sales representative in Oshakati, I've grown with the company for over a decade. MTC's commitment to developing local talent means I was able to advance while staying connected to my community. Now I manage sales operations across the entire northern region."
  },
  {
    id: 3,
    name: 'Selma Amukwaya',
    role: 'Customer Experience Lead',
    department: 'Customer Service',
    years: 5,
    image: '/api/placeholder/150/150',
    quote: "Every day, I get to help people stay connected with their loved ones. That's what makes this job meaningful.",
    story: "I was attracted to MTC's strong focus on customer service. The training programs here are world-class, and I've been able to develop skills in leadership and team management. The company culture encourages innovation - my team recently implemented a new support system that reduced wait times by 40%."
  },
  {
    id: 4,
    name: 'David Nangolo',
    role: 'Finance Analyst',
    department: 'Finance',
    years: 3,
    image: '/api/placeholder/150/150',
    quote: "The graduate program at MTC was the perfect launchpad for my career in corporate finance.",
    story: "I joined through MTC's graduate program after completing my BCom. The structured rotation through different departments gave me a holistic understanding of the business. My mentors have been instrumental in my development, and I'm now working on strategic financial planning for major company initiatives."
  },
]

export default function EmployeeStories() {
  const [activeStory, setActiveStory] = useState<EmployeeStory | null>(null)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stories from Our People
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from the talented individuals who make MTC Namibia&apos;s leading telecommunications company.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {employeeStories.map((employee) => (
            <div
              key={employee.id}
              onClick={() => setActiveStory(employee)}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E30613] to-[#FF6B6B] flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#E30613] transition-colors">
                  {employee.name}
                </h3>
                <p className="text-sm text-[#E30613] font-medium">{employee.role}</p>
                <p className="text-sm text-gray-500">{employee.department}</p>
                <p className="text-xs text-gray-400 mt-1">{employee.years} years at MTC</p>
                <p className="mt-4 text-sm text-gray-600 italic line-clamp-3">
                  &ldquo;{employee.quote}&rdquo;
                </p>
                <span className="mt-3 text-sm text-[#E30613] font-medium group-hover:underline">
                  Read full story →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Story Modal */}
        {activeStory && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveStory(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-[#E30613] to-[#B8050F] p-6 text-white rounded-t-2xl">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                    {activeStory.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{activeStory.name}</h3>
                    <p className="text-white/90">{activeStory.role}</p>
                    <p className="text-white/70 text-sm">{activeStory.department} • {activeStory.years} years</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <blockquote className="text-lg text-gray-700 italic border-l-4 border-[#E30613] pl-4 mb-6">
                  &ldquo;{activeStory.quote}&rdquo;
                </blockquote>
                <p className="text-gray-600 leading-relaxed">
                  {activeStory.story}
                </p>
                <button
                  onClick={() => setActiveStory(null)}
                  className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

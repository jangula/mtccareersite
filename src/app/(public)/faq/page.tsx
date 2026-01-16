'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  // Application Process
  {
    category: 'Application Process',
    question: 'How do I apply for a job at MTC?',
    answer: 'You can apply for any position through our online careers portal. Simply browse our available positions, click on a role that interests you, and click the "Apply Now" button. You\'ll need to create an account or log in, then complete the application form and upload your CV.',
  },
  {
    category: 'Application Process',
    question: 'Can I apply for multiple positions at once?',
    answer: 'Yes, you can apply for multiple positions that match your skills and experience. However, we recommend focusing on roles that best align with your qualifications and career goals to ensure the strongest possible application.',
  },
  {
    category: 'Application Process',
    question: 'What documents do I need to apply?',
    answer: 'At minimum, you\'ll need an updated CV/resume. Depending on the position, you may also be asked to provide a cover letter, academic transcripts, professional certifications, and copies of your ID. Specific requirements are listed in each job posting.',
  },
  {
    category: 'Application Process',
    question: 'How long does the application process take?',
    answer: 'The timeline varies depending on the role and number of applicants. Typically, you can expect to hear from us within 2-3 weeks if your application is shortlisted. Our recruitment team reviews all applications carefully, which may take longer for senior positions.',
  },
  {
    category: 'Application Process',
    question: 'How can I check the status of my application?',
    answer: 'You can track your application status by logging into your applicant portal. You\'ll also receive email notifications when your application status changes (e.g., when you\'re shortlisted or invited for an interview).',
  },

  // Interviews
  {
    category: 'Interviews',
    question: 'What should I expect during the interview process?',
    answer: 'Our interview process typically includes an initial phone screening, followed by one or two in-person or video interviews. Depending on the role, you may also be asked to complete technical assessments, presentations, or case studies. We\'ll provide you with all the details before each stage.',
  },
  {
    category: 'Interviews',
    question: 'How should I prepare for an interview at MTC?',
    answer: 'Research MTC\'s services, values, and recent news. Review the job description thoroughly and prepare examples of your relevant experience. Think about questions you\'d like to ask about the role and team. Dress professionally and arrive 10-15 minutes early.',
  },
  {
    category: 'Interviews',
    question: 'Will I receive feedback if I\'m not selected?',
    answer: 'Yes, we strive to provide constructive feedback to all candidates who reach the interview stage. This may take a few days after the decision is made. We encourage you to use this feedback for future applications.',
  },

  // Working at MTC
  {
    category: 'Working at MTC',
    question: 'What benefits does MTC offer?',
    answer: 'MTC offers a comprehensive benefits package including competitive salary, medical aid, pension fund, annual bonus, staff phone discounts, professional development opportunities, and more. Specific benefits may vary by position and level. Visit our Benefits page for more details.',
  },
  {
    category: 'Working at MTC',
    question: 'Does MTC offer remote or hybrid work options?',
    answer: 'We offer flexible working arrangements for many positions. The availability of remote or hybrid work depends on the nature of the role and business requirements. This information is usually included in the job posting or can be discussed during the interview.',
  },
  {
    category: 'Working at MTC',
    question: 'What is the company culture like at MTC?',
    answer: 'MTC has a dynamic, innovative culture focused on connecting Namibians. We value teamwork, customer focus, integrity, and excellence. Our diverse workforce brings together people from all backgrounds, and we actively promote inclusion and professional growth.',
  },
  {
    category: 'Working at MTC',
    question: 'Are there opportunities for career growth at MTC?',
    answer: 'Absolutely! We believe in developing our talent from within. MTC offers various career development programmes, training opportunities, leadership development tracks, and internal mobility. Many of our senior leaders started their careers at entry-level positions.',
  },

  // Graduate & Internship
  {
    category: 'Graduate & Internship',
    question: 'Does MTC offer internships?',
    answer: 'Yes, we offer internship programmes for university students typically lasting 3-6 months. Internships are available across various departments and provide real work experience, mentorship, and a monthly stipend. Check our Pathways page for current opportunities.',
  },
  {
    category: 'Graduate & Internship',
    question: 'What is the Graduate Programme?',
    answer: 'Our 24-month Graduate Programme is designed for recent university graduates. It includes rotational assignments across departments, dedicated mentorship, leadership development, and international exposure opportunities. Successful graduates often move into management roles.',
  },
  {
    category: 'Graduate & Internship',
    question: 'When does recruitment for graduate programmes open?',
    answer: 'Graduate programme recruitment typically opens in August-September each year, with the programme starting in January. Internship positions are available year-round. Sign up for our talent community to receive notifications about upcoming opportunities.',
  },

  // Technical
  {
    category: 'Technical',
    question: 'I\'m having trouble submitting my application. What should I do?',
    answer: 'First, ensure you\'re using a supported browser (Chrome, Firefox, Safari, or Edge) and that your documents are in the correct format (PDF or Word). If issues persist, try clearing your browser cache or using a different device. Contact careers@mtc.com.na if you need further assistance.',
  },
  {
    category: 'Technical',
    question: 'What file formats are accepted for CV uploads?',
    answer: 'We accept PDF and Microsoft Word (.doc, .docx) formats for CV uploads. The maximum file size is 5MB. We recommend PDF format to ensure your formatting is preserved.',
  },
]

const categories = ['All', 'Application Process', 'Interviews', 'Working at MTC', 'Graduate & Internship', 'Technical']

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#E30613] to-[#B8050F] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 mb-8">
            Find answers to common questions about careers at MTC
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pl-12 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-[#E30613] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600">No questions found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-4 text-[#E30613] font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                    <svg
                      className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${
                        openQuestion === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openQuestion === index && (
                    <div className="px-6 pb-4">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Can&apos;t find what you&apos;re looking for? Our recruitment team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@mtc.com.na"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#E30613] text-white rounded-lg font-medium hover:bg-[#B8050F] transition-colors"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Browse Open Positions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

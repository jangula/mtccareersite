'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Job {
  id: string
  title: string
  department: string
  location: string
}

interface ApplyPageProps {
  params: Promise<{ id: string }>
}

export default function ApplyPage({ params }: ApplyPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    linkedinUrl: '',
    experienceYears: '',
    currentPosition: '',
    coverLetter: '',
    gender: '',
    race: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [privacyConsent, setPrivacyConsent] = useState(false)

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${id}`)
      if (!response.ok) throw new Error('Job not found')
      const data = await response.json()
      setJob(data)
    } catch {
      setError('Job not found')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Resume file must be less than 5MB')
        return
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setError('Resume must be a PDF or Word document')
        return
      }
      setResumeFile(file)
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate privacy consent
    if (!privacyConsent) {
      setError('You must agree to the Privacy Policy and Data Processing terms to submit your application.')
      return
    }

    setSubmitting(true)

    try {
      let resumePath = ''

      // Upload resume if provided
      if (resumeFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', resumeFile)

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        })

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload resume')
        }

        const uploadData = await uploadResponse.json()
        resumePath = uploadData.path
      }

      // Create or update applicant
      const applicantResponse = await fetch('/api/applicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone || null,
          linkedinUrl: formData.linkedinUrl || null,
          experienceYears: formData.experienceYears ? parseInt(formData.experienceYears) : null,
          currentPosition: formData.currentPosition || null,
          resumePath: resumePath || null,
          gender: formData.gender || null,
          race: formData.race || null,
        }),
      })

      if (!applicantResponse.ok) {
        const data = await applicantResponse.json()
        throw new Error(data.error || 'Failed to create applicant profile')
      }

      const applicantData = await applicantResponse.json()

      // Submit application
      const applicationResponse = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: id,
          applicantId: applicantData.id,
          coverLetter: formData.coverLetter || null,
        }),
      })

      if (!applicationResponse.ok) {
        const data = await applicationResponse.json()
        throw new Error(data.error || 'Failed to submit application')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-[#E30613]" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <Link href="/jobs" className="btn-primary">
            Browse Jobs
          </Link>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for applying for the <strong>{job.title}</strong> position.
            We&apos;ve sent a confirmation email to your address. You can track your application
            status in the applicant portal.
          </p>
          <div className="space-y-3">
            <Link href="/portal" className="btn-primary w-full block">
              Go to Applicant Portal
            </Link>
            <Link href="/jobs" className="btn-secondary w-full block">
              Browse More Jobs
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#E30613] text-white py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/jobs/${id}`}
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Job Details
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">Apply for {job.title}</h1>
          <p className="text-white/80 mt-2">{job.department} • {job.location}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Information</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="name" className="label">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="input-field"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="label">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="input-field"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input-field"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+264 81 123 4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedinUrl" className="label">LinkedIn Profile</label>
              <input
                type="url"
                id="linkedinUrl"
                name="linkedinUrl"
                className="input-field"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentPosition" className="label">Current Position</label>
              <input
                type="text"
                id="currentPosition"
                name="currentPosition"
                className="input-field"
                value={formData.currentPosition}
                onChange={handleInputChange}
                placeholder="Software Engineer"
              />
            </div>

            <div className="form-group">
              <label htmlFor="experienceYears" className="label">Years of Experience</label>
              <input
                type="number"
                id="experienceYears"
                name="experienceYears"
                min="0"
                max="50"
                className="input-field"
                value={formData.experienceYears}
                onChange={handleInputChange}
                placeholder="5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender" className="label">Gender *</label>
              <select
                id="gender"
                name="gender"
                required
                className="input-field"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Required for employment equity reporting</p>
            </div>

            <div className="form-group">
              <label htmlFor="race" className="label">Race *</label>
              <select
                id="race"
                name="race"
                required
                className="input-field"
                value={formData.race}
                onChange={handleInputChange}
              >
                <option value="">Select race</option>
                <option value="BLACK">Black</option>
                <option value="COLOURED">Coloured</option>
                <option value="WHITE">White</option>
                <option value="BASTER">Baster</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Required for employment equity reporting</p>
            </div>
          </div>

          <div className="form-group mt-6">
            <label htmlFor="resume" className="label">Resume/CV</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#E30613] transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="resume" className="relative cursor-pointer rounded-md font-medium text-[#E30613] hover:text-[#B8050F]">
                    <span>Upload a file</span>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF or Word up to 5MB</p>
                {resumeFile && (
                  <p className="text-sm text-green-600 font-medium mt-2">
                    Selected: {resumeFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="form-group mt-6">
            <label htmlFor="coverLetter" className="label">Cover Letter</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={6}
              className="input-field"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            />
          </div>

          {/* Privacy Consent */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacyConsent"
                checked={privacyConsent}
                onChange={(e) => setPrivacyConsent(e.target.checked)}
                className="mt-1 h-4 w-4 text-[#E30613] focus:ring-[#E30613] border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="privacyConsent" className="ml-3 text-sm text-gray-700 cursor-pointer">
                I have read and agree to the{' '}
                <Link href="/privacy" target="_blank" className="text-[#E30613] hover:underline font-medium">
                  Privacy Policy & Data Processing Terms
                </Link>
                . I consent to MTC collecting and processing my personal data, including demographic information,
                for recruitment purposes and employment equity compliance. I understand that my data will be
                handled in accordance with the policy and I can withdraw my consent at any time. *
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={submitting || !privacyConsent}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
            <Link href={`/jobs/${id}`} className="btn-secondary text-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

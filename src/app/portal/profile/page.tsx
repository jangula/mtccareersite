'use client'

import { useState, useEffect } from 'react'

interface Applicant {
  id: string
  email: string
  name: string | null
  phone: string | null
  resumePath: string | null
  linkedinUrl: string | null
  bio: string | null
  experienceYears: number | null
  currentPosition: string | null
}

export default function ProfilePage() {
  const [applicant, setApplicant] = useState<Applicant | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    linkedinUrl: '',
    bio: '',
    experienceYears: '',
    currentPosition: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/applicants/me')
      if (response.ok) {
        const data = await response.json()
        setApplicant(data)
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          linkedinUrl: data.linkedinUrl || '',
          bio: data.bio || '',
          experienceYears: data.experienceYears?.toString() || '',
          currentPosition: data.currentPosition || '',
        })
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setResumeFile(file)
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSaving(true)

    try {
      let resumePath = applicant?.resumePath || null

      // Upload new resume if provided
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

      // Update profile
      const response = await fetch('/api/applicants/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || null,
          phone: formData.phone || null,
          linkedinUrl: formData.linkedinUrl || null,
          bio: formData.bio || null,
          experienceYears: formData.experienceYears ? parseInt(formData.experienceYears) : null,
          currentPosition: formData.currentPosition || null,
          resumePath,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const updatedApplicant = await response.json()
      setApplicant(updatedApplicant)
      setResumeFile(null)
      setSuccess(true)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-[#E30613]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information and resume</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Profile updated successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input
                type="email"
                id="email"
                value={applicant?.email || ''}
                disabled
                className="input-field bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label htmlFor="name" className="label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-field"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>

            <div>
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

            <div>
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
          </div>
        </div>

        {/* Professional Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
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

            <div>
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

            <div className="md:col-span-2">
              <label htmlFor="bio" className="label">Professional Summary</label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="input-field"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Brief description of your professional background and career objectives..."
              />
            </div>
          </div>
        </div>

        {/* Resume */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume / CV</h2>

          {applicant?.resumePath && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-8 w-8 text-[#E30613] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Current Resume</p>
                  <p className="text-sm text-gray-500">{applicant.resumePath.split('/').pop()}</p>
                </div>
              </div>
              <a
                href={applicant.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E30613] hover:underline text-sm font-medium"
              >
                View
              </a>
            </div>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#E30613] transition-colors">
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="resume" className="cursor-pointer">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                <span className="text-[#E30613] font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF or Word document up to 5MB</p>
            </label>
            {resumeFile && (
              <p className="mt-4 text-sm text-green-600 font-medium">
                Selected: {resumeFile.name}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewJobPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'FULL_TIME',
    description: '',
    requirements: '',
    benefits: '',
    salaryRange: '',
    status: 'DRAFT',
    closesAt: '',
  })

  const departments = ['Technology', 'Marketing', 'Customer Service', 'Finance', 'HR', 'Sales', 'Operations', 'Legal']
  const locations = ['Windhoek, Namibia', 'Oshakati, Namibia', 'Walvis Bay, Namibia', 'Swakopmund, Namibia', 'Remote']
  const jobTypes = [
    { value: 'FULL_TIME', label: 'Full Time' },
    { value: 'PART_TIME', label: 'Part Time' },
    { value: 'CONTRACT', label: 'Contract' },
    { value: 'INTERNSHIP', label: 'Internship' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent, publishNow: boolean = false) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: publishNow ? 'PUBLISHED' : formData.status,
          closesAt: formData.closesAt || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create job')
      }

      router.push('/admin/jobs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/jobs" className="text-gray-600 hover:text-gray-900">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Post New Job</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="label">Job Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="input-field"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div>
              <label htmlFor="department" className="label">Department *</label>
              <select
                id="department"
                name="department"
                required
                className="input-field"
                value={formData.department}
                onChange={handleInputChange}
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="label">Location *</label>
              <select
                id="location"
                name="location"
                required
                className="input-field"
                value={formData.location}
                onChange={handleInputChange}
              >
                <option value="">Select location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type" className="label">Employment Type *</label>
              <select
                id="type"
                name="type"
                required
                className="input-field"
                value={formData.type}
                onChange={handleInputChange}
              >
                {jobTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="salaryRange" className="label">Salary Range</label>
              <input
                type="text"
                id="salaryRange"
                name="salaryRange"
                className="input-field"
                value={formData.salaryRange}
                onChange={handleInputChange}
                placeholder="e.g., N$30,000 - N$45,000 per month"
              />
            </div>

            <div>
              <label htmlFor="closesAt" className="label">Application Deadline</label>
              <input
                type="date"
                id="closesAt"
                name="closesAt"
                className="input-field"
                value={formData.closesAt}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="description" className="label">Description *</label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                className="input-field"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
              />
              <p className="text-xs text-gray-500 mt-1">Use line breaks to separate paragraphs</p>
            </div>

            <div>
              <label htmlFor="requirements" className="label">Requirements *</label>
              <textarea
                id="requirements"
                name="requirements"
                required
                rows={6}
                className="input-field"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="List the qualifications, skills, and experience required for this role. Start each item with a dash (-) for bullet points."
              />
              <p className="text-xs text-gray-500 mt-1">Start each requirement with - for bullet points</p>
            </div>

            <div>
              <label htmlFor="benefits" className="label">Benefits</label>
              <textarea
                id="benefits"
                name="benefits"
                rows={4}
                className="input-field"
                value={formData.benefits}
                onChange={handleInputChange}
                placeholder="List the benefits and perks offered with this position. Start each item with a dash (-)."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Link href="/admin/jobs" className="btn-secondary text-center">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-outline"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Saving...' : 'Publish Job'}
          </button>
        </div>
      </form>
    </div>
  )
}

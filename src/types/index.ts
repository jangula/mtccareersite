export type UserRole = 'ADMIN' | 'HR'
export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP'
export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED'
export type ApplicationStatus = 'PENDING' | 'REVIEWED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED'
export type MagicLinkType = 'HR' | 'APPLICANT'
export type EmailType = 'MAGIC_LINK' | 'APPLICATION_RECEIVED' | 'APPLICATION_REVIEWED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface Applicant {
  id: string
  email: string
  name: string | null
  phone: string | null
  resumePath: string | null
  linkedinUrl: string | null
  bio: string | null
  experienceYears: number | null
  currentPosition: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Job {
  id: string
  title: string
  department: string
  location: string
  type: JobType
  description: string
  requirements: string
  benefits: string | null
  salaryRange: string | null
  status: JobStatus
  createdAt: Date
  updatedAt: Date
  closesAt: Date | null
}

export interface Application {
  id: string
  jobId: string
  applicantId: string
  coverLetter: string | null
  status: ApplicationStatus
  createdAt: Date
  updatedAt: Date
  job?: Job
  applicant?: Applicant
}

export interface ApplicationWithDetails extends Application {
  job: Job
  applicant: Applicant
}

export interface JobWithApplicationCount extends Job {
  _count: {
    applications: number
  }
}

export interface DashboardStats {
  totalJobs: number
  publishedJobs: number
  totalApplications: number
  pendingApplications: number
  shortlistedCandidates: number
  hiredCandidates: number
}

export interface ApplicantDashboardStats {
  totalApplications: number
  pendingApplications: number
  shortlistedApplications: number
  rejectedApplications: number
}

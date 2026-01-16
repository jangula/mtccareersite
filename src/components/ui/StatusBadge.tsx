interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md' | 'lg'
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  REVIEWED: 'bg-blue-100 text-blue-800',
  SHORTLISTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  HIRED: 'bg-purple-100 text-purple-800',
  DRAFT: 'bg-gray-100 text-gray-800',
  PUBLISHED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-red-100 text-red-800',
  FULL_TIME: 'bg-blue-100 text-blue-800',
  PART_TIME: 'bg-orange-100 text-orange-800',
  CONTRACT: 'bg-purple-100 text-purple-800',
  INTERNSHIP: 'bg-teal-100 text-teal-800',
}

const statusLabels: Record<string, string> = {
  PENDING: 'Pending',
  REVIEWED: 'Reviewed',
  SHORTLISTED: 'Shortlisted',
  REJECTED: 'Rejected',
  HIRED: 'Hired',
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  CLOSED: 'Closed',
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800'
  const label = statusLabels[status] || status

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colorClass} ${sizeClasses[size]}`}>
      {label}
    </span>
  )
}

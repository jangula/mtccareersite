import { PrismaClient, ApplicationStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with comprehensive demo data...')

  // Clear existing data
  await prisma.emailLog.deleteMany()
  await prisma.application.deleteMany()
  await prisma.magicLink.deleteMany()
  await prisma.applicant.deleteMany()
  await prisma.job.deleteMany()
  await prisma.user.deleteMany()

  // Create HR users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@mtc.com.na',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })
  console.log('Created admin user:', adminUser.email)

  const hrUser = await prisma.user.create({
    data: {
      email: 'hr@mtc.com.na',
      name: 'HR Manager',
      role: 'HR',
    },
  })
  console.log('Created HR user:', hrUser.email)

  // Create comprehensive job listings
  const jobsData = [
    // Technology Department
    {
      title: 'Senior Software Engineer',
      department: 'Technology',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `We are looking for a Senior Software Engineer to join our Technology team.`,
      requirements: `- 5+ years of experience in software development\n- Strong proficiency in TypeScript, Python, or Java`,
      benefits: `- Competitive salary package\n- Medical aid contribution`,
      salaryRange: 'N$45,000 - N$65,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Network Engineer',
      department: 'Technology',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Join our infrastructure team to help maintain and expand our network.`,
      requirements: `- CCNA/CCNP certification\n- 3+ years experience`,
      benefits: `- Competitive salary\n- Medical aid`,
      salaryRange: 'N$35,000 - N$50,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Junior Developer',
      department: 'Technology',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Start your career in software development with MTC.`,
      requirements: `- Degree in Computer Science\n- Basic programming knowledge`,
      benefits: `- Mentorship program\n- Training opportunities`,
      salaryRange: 'N$15,000 - N$22,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Data Analyst',
      department: 'Technology',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Analyze data to drive business decisions.`,
      requirements: `- Experience with SQL and Python\n- 2+ years experience`,
      benefits: `- Competitive salary\n- Flexible hours`,
      salaryRange: 'N$28,000 - N$40,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'IT Support Technician',
      department: 'Technology',
      location: 'Oshakati, Namibia',
      type: 'FULL_TIME' as const,
      description: `Provide technical support to internal users.`,
      requirements: `- IT Diploma\n- Hardware troubleshooting skills`,
      benefits: `- Competitive salary\n- Medical aid`,
      salaryRange: 'N$12,000 - N$18,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    },

    // Marketing Department
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Lead our marketing initiatives and brand strategy.`,
      requirements: `- 5+ years marketing experience\n- MBA preferred`,
      benefits: `- Company vehicle\n- Performance bonus`,
      salaryRange: 'N$50,000 - N$70,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Drive our digital marketing campaigns.`,
      requirements: `- 3+ years digital marketing\n- Google certified`,
      benefits: `- Competitive salary\n- Professional development`,
      salaryRange: 'N$25,000 - N$35,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Content Creator',
      department: 'Marketing',
      location: 'Windhoek, Namibia',
      type: 'CONTRACT' as const,
      description: `Create engaging content for MTC's social media channels.`,
      requirements: `- Portfolio of work\n- Video editing skills`,
      benefits: `- Competitive rate\n- Flexible schedule`,
      salaryRange: 'N$20,000 - N$28,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },

    // Customer Service Department
    {
      title: 'Customer Service Representative',
      department: 'Customer Service',
      location: 'Oshakati, Namibia',
      type: 'FULL_TIME' as const,
      description: `Deliver exceptional service to our customers in the north.`,
      requirements: `- 2+ years customer service\n- Fluent in Oshiwambo`,
      benefits: `- Medical aid\n- Staff discounts`,
      salaryRange: 'N$12,000 - N$18,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Call Center Agent',
      department: 'Customer Service',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Handle inbound customer calls professionally.`,
      requirements: `- Good communication skills\n- Shift work flexibility`,
      benefits: `- Shift allowances\n- Medical aid`,
      salaryRange: 'N$10,000 - N$14,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Customer Service Team Lead',
      department: 'Customer Service',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Lead a team of customer service representatives.`,
      requirements: `- 4+ years experience\n- Leadership skills`,
      benefits: `- Competitive salary\n- Leadership training`,
      salaryRange: 'N$22,000 - N$30,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },

    // Finance Department
    {
      title: 'Finance Intern',
      department: 'Finance',
      location: 'Windhoek, Namibia',
      type: 'INTERNSHIP' as const,
      description: `Gain experience in corporate finance.`,
      requirements: `- BCom/BAcc student or graduate\n- Strong Excel skills`,
      benefits: `- Monthly stipend\n- Mentorship`,
      salaryRange: 'N$8,000 per month (stipend)',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Financial Accountant',
      department: 'Finance',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Manage financial reporting and compliance.`,
      requirements: `- CA(NAM) or equivalent\n- 3+ years experience`,
      benefits: `- Professional fees paid\n- Medical aid`,
      salaryRange: 'N$35,000 - N$50,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },

    // Human Resources Department
    {
      title: 'HR Business Partner',
      department: 'Human Resources',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Partner with business units on HR solutions.`,
      requirements: `- 5+ years HR experience\n- Labour law knowledge`,
      benefits: `- Competitive salary\n- Professional development`,
      salaryRange: 'N$40,000 - N$55,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Recruitment Coordinator',
      department: 'Human Resources',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Coordinate recruitment activities.`,
      requirements: `- HR diploma\n- 2+ years recruitment experience`,
      benefits: `- Career growth\n- Medical aid`,
      salaryRange: 'N$18,000 - N$25,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    },

    // Sales Department
    {
      title: 'Sales Executive - Enterprise',
      department: 'Sales',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Drive enterprise sales and manage key accounts.`,
      requirements: `- 4+ years B2B sales\n- Telecommunications experience`,
      benefits: `- Company vehicle\n- Commission structure`,
      salaryRange: 'N$30,000 - N$45,000 + commission',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Retail Sales Consultant',
      department: 'Sales',
      location: 'Walvis Bay, Namibia',
      type: 'FULL_TIME' as const,
      description: `Sell MTC products in our retail store.`,
      requirements: `- 1+ year retail experience\n- Sales driven`,
      benefits: `- Commission\n- Product discounts`,
      salaryRange: 'N$10,000 - N$15,000 + commission',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Regional Sales Manager',
      department: 'Sales',
      location: 'Oshakati, Namibia',
      type: 'FULL_TIME' as const,
      description: `Manage sales operations in the northern region.`,
      requirements: `- 6+ years sales experience\n- Team management`,
      benefits: `- Company vehicle\n- Performance bonus`,
      salaryRange: 'N$40,000 - N$55,000 per month',
      status: 'PUBLISHED' as const,
      closesAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    },

    // Closed job for variety
    {
      title: 'Chief Technology Officer',
      department: 'Executive',
      location: 'Windhoek, Namibia',
      type: 'FULL_TIME' as const,
      description: `Lead MTC's technology strategy.`,
      requirements: `- 15+ years technology leadership`,
      benefits: `- Executive package`,
      salaryRange: 'Competitive executive package',
      status: 'CLOSED' as const,
      closesAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  ]

  const jobs = await Promise.all(jobsData.map(job => prisma.job.create({ data: job })))
  console.log(`Created ${jobs.length} jobs`)

  // Create applicants with gender and race demographics
  const applicantsData = [
    { email: 'johannes.shipanga@email.com', name: 'Johannes Shipanga', phone: '+264 81 234 5678', bio: 'Senior developer with 6 years experience', experienceYears: 6, currentPosition: 'Senior Developer at Bank Windhoek', gender: 'MALE' as const, race: 'BLACK' as const },
    { email: 'maria.nangolo@email.com', name: 'Maria Nangolo', phone: '+264 81 345 6789', bio: 'Network specialist with CCNP', experienceYears: 4, currentPosition: 'Network Administrator', gender: 'FEMALE' as const, race: 'BLACK' as const },
    { email: 'petrus.amukwaya@email.com', name: 'Petrus Amukwaya', phone: '+264 81 456 7890', bio: 'Fresh NUST graduate', experienceYears: 0, currentPosition: 'Fresh Graduate', gender: 'MALE' as const, race: 'BLACK' as const },
    { email: 'selma.shikongo@email.com', name: 'Selma Shikongo', phone: '+264 81 567 8901', bio: 'Data analyst with Python skills', experienceYears: 3, currentPosition: 'Junior Analyst at FNB', gender: 'FEMALE' as const, race: 'BLACK' as const },
    { email: 'david.haufiku@email.com', name: 'David Haufiku', phone: '+264 81 678 9012', bio: 'Marketing professional', experienceYears: 7, currentPosition: 'Marketing Manager', gender: 'MALE' as const, race: 'BLACK' as const },
    { email: 'anna.iipumbu@email.com', name: 'Anna Iipumbu', phone: '+264 81 789 0123', bio: 'Digital marketing specialist', experienceYears: 3, currentPosition: 'Digital Marketer', gender: 'FEMALE' as const, race: 'BLACK' as const },
    { email: 'thomas.nghifikwa@email.com', name: 'Thomas Nghifikwa', phone: '+264 81 890 1234', bio: 'Customer service professional', experienceYears: 5, currentPosition: 'CS Lead at Standard Bank', gender: 'MALE' as const, race: 'BLACK' as const },
    { email: 'emma.nakale@email.com', name: 'Emma Nakale', phone: '+264 81 901 2345', bio: 'Energetic CS representative', experienceYears: 2, currentPosition: 'Sales Assistant', gender: 'FEMALE' as const, race: 'BLACK' as const },
    { email: 'michael.shilongo@email.com', name: 'Michael Shilongo', phone: '+264 81 012 3456', bio: 'CA(NAM) qualified accountant', experienceYears: 5, currentPosition: 'Audit Senior at PwC', gender: 'MALE' as const, race: 'BLACK' as const },
    { email: 'grace.amutenya@email.com', name: 'Grace Amutenya', phone: '+264 81 123 4567', bio: 'Final year accounting student', experienceYears: 0, currentPosition: 'Student', gender: 'FEMALE' as const, race: 'BLACK' as const },
    { email: 'sarah.nekongo@email.com', name: 'Sarah Nekongo', phone: '+264 81 234 5670', bio: 'HR generalist', experienceYears: 6, currentPosition: 'HR Manager', gender: 'FEMALE' as const, race: 'BLACK' as const },
    { email: 'james.muller@email.com', name: 'James Müller', phone: '+264 81 345 6780', bio: 'Top sales executive', experienceYears: 8, currentPosition: 'Sales Manager', gender: 'MALE' as const, race: 'WHITE' as const },
    { email: 'linda.nghipondoka@email.com', name: 'Linda Nghipondoka', phone: '+264 81 456 7891', bio: 'Retail sales professional', experienceYears: 2, currentPosition: 'Sales Consultant', gender: 'FEMALE' as const, race: 'BLACK' as const },
    { email: 'nelson.angula@email.com', name: 'Nelson Angula', phone: '+264 81 567 8902', bio: 'Telecom technician', experienceYears: 4, currentPosition: 'Field Technician', gender: 'MALE' as const, race: 'BLACK' as const },
    { email: 'martha.beukes@email.com', name: 'Martha Beukes', phone: '+264 81 678 9013', bio: 'Tech graduate', experienceYears: 0, currentPosition: 'Graduate', gender: 'FEMALE' as const, race: 'COLOURED' as const },
    { email: 'peter.van.wyk@email.com', name: 'Peter van Wyk', phone: '+264 81 789 0124', bio: 'Software developer', experienceYears: 3, currentPosition: 'Developer at local startup', gender: 'MALE' as const, race: 'WHITE' as const },
    { email: 'julia.kandongo@email.com', name: 'Julia Kandongo', phone: '+264 81 890 1235', bio: 'Marketing coordinator', experienceYears: 2, currentPosition: 'Marketing Assistant', gender: 'FEMALE' as const, race: 'BLACK' as const },
    { email: 'simon.isaacks@email.com', name: 'Simon Isaacks', phone: '+264 81 901 2346', bio: 'Call center supervisor', experienceYears: 4, currentPosition: 'CS Supervisor', gender: 'MALE' as const, race: 'BASTER' as const },
    { email: 'rachel.amupolo@email.com', name: 'Rachel Amupolo', phone: '+264 81 012 3457', bio: 'HR coordinator', experienceYears: 3, currentPosition: 'HR Coordinator', gender: 'FEMALE' as const, race: 'BLACK' as const },
    { email: 'joseph.afrikaner@email.com', name: 'Joseph Afrikaner', phone: '+264 81 123 4568', bio: 'Enterprise sales rep', experienceYears: 5, currentPosition: 'Account Executive', gender: 'MALE' as const, race: 'COLOURED' as const },
  ]

  const applicants = await Promise.all(applicantsData.map(a => prisma.applicant.create({ data: a })))
  console.log(`Created ${applicants.length} applicants`)

  // Create applications with various statuses
  const now = new Date()
  const publishedJobs = jobs.filter(j => j.status === 'PUBLISHED')
  let appCount = 0

  for (const job of publishedJobs) {
    // Each job gets 4-12 random applicants
    const numApplicants = Math.floor(Math.random() * 9) + 4
    const shuffled = [...applicants].sort(() => Math.random() - 0.5)
    const jobApplicants = shuffled.slice(0, numApplicants)

    for (const applicant of jobApplicants) {
      const daysAgo = Math.floor(Math.random() * 45) + 1
      const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

      // Weighted status distribution
      const rand = Math.random()
      let status: ApplicationStatus
      let updatedAt = new Date(createdAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)

      if (rand < 0.20) {
        status = ApplicationStatus.PENDING
        updatedAt = createdAt
      } else if (rand < 0.40) {
        status = ApplicationStatus.REVIEWED
      } else if (rand < 0.60) {
        status = ApplicationStatus.SHORTLISTED
        updatedAt = new Date(createdAt.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000)
      } else if (rand < 0.85) {
        status = ApplicationStatus.REJECTED
        updatedAt = new Date(createdAt.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000)
      } else {
        status = ApplicationStatus.HIRED
        updatedAt = new Date(createdAt.getTime() + (Math.random() * 21 + 7) * 24 * 60 * 60 * 1000)
      }

      // Ensure updatedAt is not in the future
      if (updatedAt > now) updatedAt = now

      try {
        await prisma.application.create({
          data: {
            jobId: job.id,
            applicantId: applicant.id,
            status,
            coverLetter: `I am excited to apply for the ${job.title} position at MTC. With my experience as ${applicant.currentPosition}, I believe I can make a strong contribution to your team.\n\nI am passionate about MTC's mission to connect Namibians and would welcome the opportunity to discuss how my skills align with this role.\n\nThank you for your consideration.`,
            createdAt,
            updatedAt,
          },
        })
        appCount++
      } catch {
        // Skip duplicates
      }
    }
  }

  console.log(`Created ${appCount} applications`)

  // Create email logs
  const hiredApps = await prisma.application.findMany({
    where: { status: { in: ['HIRED', 'SHORTLISTED'] } },
    include: { applicant: true },
  })

  for (const app of hiredApps) {
    await prisma.emailLog.create({
      data: {
        applicationId: app.id,
        recipientEmail: app.applicant.email,
        emailType: app.status === 'HIRED' ? 'HIRED' : 'SHORTLISTED',
        subject: app.status === 'HIRED' ? 'Congratulations! Job Offer from MTC' : 'Great News! You have been shortlisted',
        status: 'SENT',
      },
    })
  }

  console.log('Created email logs')
  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

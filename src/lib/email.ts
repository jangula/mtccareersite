import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import prisma from './prisma'
import { EmailType } from '@prisma/client'

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

const FROM_EMAIL = process.env.SES_FROM_EMAIL || 'careers@mtc.com.na'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

interface EmailParams {
  to: string
  subject: string
  htmlBody: string
  textBody: string
  emailType: EmailType
  applicationId?: string
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  const { to, subject, htmlBody, textBody, emailType, applicationId } = params

  // Check if AWS credentials are configured
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('AWS SES not configured. Email would be sent to:', to)
    console.log('Subject:', subject)
    console.log('Body:', textBody)

    // Log the email even if not sent (for development)
    await prisma.emailLog.create({
      data: {
        applicationId,
        recipientEmail: to,
        emailType,
        subject,
        status: 'SIMULATED',
      },
    })

    return true
  }

  try {
    const command = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8',
          },
          Text: {
            Data: textBody,
            Charset: 'UTF-8',
          },
        },
      },
    })

    await sesClient.send(command)

    // Log successful email
    await prisma.emailLog.create({
      data: {
        applicationId,
        recipientEmail: to,
        emailType,
        subject,
        status: 'SENT',
      },
    })

    return true
  } catch (error) {
    console.error('Failed to send email:', error)

    // Log failed email
    await prisma.emailLog.create({
      data: {
        applicationId,
        recipientEmail: to,
        emailType,
        subject,
        status: 'FAILED',
      },
    })

    return false
  }
}

export async function sendMagicLinkEmail(email: string, magicLink: string, isHR: boolean): Promise<boolean> {
  const portalType = isHR ? 'HR Admin Portal' : 'Applicant Portal'

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #E30613; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .button { display: inline-block; background: #E30613; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>MTC Careers</h1>
        </div>
        <div class="content">
          <h2>Login to ${portalType}</h2>
          <p>Click the button below to securely log in to your account. This link will expire in 15 minutes.</p>
          <p style="text-align: center;">
            <a href="${magicLink}" class="button">Login to MTC Careers</a>
          </p>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${magicLink}</p>
          <p>If you didn't request this login link, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Mobile Telecommunications Company (MTC) Namibia. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const textBody = `
Login to MTC Careers ${portalType}

Click the link below to securely log in to your account. This link will expire in 15 minutes.

${magicLink}

If you didn't request this login link, you can safely ignore this email.

© ${new Date().getFullYear()} Mobile Telecommunications Company (MTC) Namibia. All rights reserved.
  `

  return sendEmail({
    to: email,
    subject: `Login to MTC Careers ${portalType}`,
    htmlBody,
    textBody,
    emailType: 'MAGIC_LINK',
  })
}

export async function sendApplicationReceivedEmail(
  email: string,
  applicantName: string,
  jobTitle: string,
  applicationId: string
): Promise<boolean> {
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #E30613; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .button { display: inline-block; background: #E30613; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>MTC Careers</h1>
        </div>
        <div class="content">
          <h2>Application Received</h2>
          <p>Dear ${applicantName || 'Applicant'},</p>
          <p>Thank you for applying for the <strong>${jobTitle}</strong> position at MTC. We have received your application and our team will review it shortly.</p>
          <p>You can track the status of your application by logging into your applicant portal.</p>
          <p style="text-align: center;">
            <a href="${APP_URL}/portal" class="button">View Application Status</a>
          </p>
          <p>We appreciate your interest in joining the MTC team!</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Mobile Telecommunications Company (MTC) Namibia. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const textBody = `
Application Received

Dear ${applicantName || 'Applicant'},

Thank you for applying for the ${jobTitle} position at MTC. We have received your application and our team will review it shortly.

You can track the status of your application by visiting: ${APP_URL}/portal

We appreciate your interest in joining the MTC team!

© ${new Date().getFullYear()} Mobile Telecommunications Company (MTC) Namibia. All rights reserved.
  `

  return sendEmail({
    to: email,
    subject: `Application Received: ${jobTitle} at MTC`,
    htmlBody,
    textBody,
    emailType: 'APPLICATION_RECEIVED',
    applicationId,
  })
}

export async function sendStatusUpdateEmail(
  email: string,
  applicantName: string,
  jobTitle: string,
  status: 'REVIEWED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED',
  applicationId: string
): Promise<boolean> {
  const statusMessages = {
    REVIEWED: {
      title: 'Application Under Review',
      message: 'Your application is currently being reviewed by our hiring team. We will be in touch soon with an update.',
      emailType: 'APPLICATION_REVIEWED' as EmailType,
    },
    SHORTLISTED: {
      title: 'Congratulations! You\'ve Been Shortlisted',
      message: 'We are pleased to inform you that you have been shortlisted for the next stage of our recruitment process. A member of our team will contact you shortly to discuss the next steps.',
      emailType: 'SHORTLISTED' as EmailType,
    },
    REJECTED: {
      title: 'Application Update',
      message: 'After careful consideration, we regret to inform you that we will not be moving forward with your application at this time. We encourage you to apply for other positions that match your skills and experience.',
      emailType: 'REJECTED' as EmailType,
    },
    HIRED: {
      title: 'Welcome to MTC!',
      message: 'Congratulations! We are thrilled to offer you the position. Our HR team will be in contact shortly with the details of your offer and next steps.',
      emailType: 'HIRED' as EmailType,
    },
  }

  const { title, message, emailType } = statusMessages[status]

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #E30613; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .button { display: inline-block; background: #E30613; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
        .status-reviewed { background: #FFF3CD; color: #856404; }
        .status-shortlisted { background: #D4EDDA; color: #155724; }
        .status-rejected { background: #F8D7DA; color: #721C24; }
        .status-hired { background: #CCE5FF; color: #004085; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>MTC Careers</h1>
        </div>
        <div class="content">
          <h2>${title}</h2>
          <p>Dear ${applicantName || 'Applicant'},</p>
          <p>Regarding your application for: <strong>${jobTitle}</strong></p>
          <p><span class="status-badge status-${status.toLowerCase()}">${status}</span></p>
          <p>${message}</p>
          <p style="text-align: center;">
            <a href="${APP_URL}/portal" class="button">View Application Details</a>
          </p>
          <p>Thank you for your interest in MTC.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Mobile Telecommunications Company (MTC) Namibia. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const textBody = `
${title}

Dear ${applicantName || 'Applicant'},

Regarding your application for: ${jobTitle}

Status: ${status}

${message}

View your application details at: ${APP_URL}/portal

Thank you for your interest in MTC.

© ${new Date().getFullYear()} Mobile Telecommunications Company (MTC) Namibia. All rights reserved.
  `

  return sendEmail({
    to: email,
    subject: `${title} - ${jobTitle} at MTC`,
    htmlBody,
    textBody,
    emailType,
    applicationId,
  })
}

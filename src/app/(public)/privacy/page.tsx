import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#E30613] to-[#B8050F] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy & Data Processing</h1>
          <p className="text-white/90 text-lg">
            How we collect, use, and protect your personal information during the recruitment process
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 space-y-8">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Mobile Telecommunications Limited (MTC) is committed to protecting and respecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information
                when you apply for employment opportunities through our career portal.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                By submitting an application through our careers portal, you consent to the collection and
                processing of your personal data as described in this policy.
              </p>
            </div>

            {/* Data We Collect */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Personal Data We Collect</h2>
              <p className="text-gray-600 mb-3">When you apply for a position at MTC, we collect the following information:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Contact Information:</strong> Full name, email address, phone number</li>
                <li><strong>Professional Information:</strong> CV/resume, cover letter, work history, qualifications, certifications</li>
                <li><strong>Educational Background:</strong> Academic qualifications, training, and certifications</li>
                <li><strong>Demographic Data:</strong> Gender, race (for employment equity purposes as required by Namibian law)</li>
                <li><strong>Employment Preferences:</strong> Position applied for, salary expectations, availability</li>
                <li><strong>References:</strong> Contact details of professional references (if provided)</li>
                <li><strong>Additional Documents:</strong> Supporting documents you choose to upload</li>
              </ul>
            </div>

            {/* Purpose of Processing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Purpose of Data Processing</h2>
              <p className="text-gray-600 mb-3">We process your personal data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Evaluating your application and qualifications for the position applied for</li>
                <li>Communicating with you about your application status and next steps</li>
                <li>Scheduling and conducting interviews (in-person, telephonic, or virtual)</li>
                <li>Conducting background verification checks (with your consent)</li>
                <li>Complying with legal obligations, including employment equity requirements</li>
                <li>Considering you for other suitable positions at MTC (with your consent)</li>
                <li>Improving our recruitment processes and career portal</li>
              </ul>
            </div>

            {/* Legal Basis */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Legal Basis for Processing</h2>
              <p className="text-gray-600 leading-relaxed">
                We process your personal data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-3">
                <li><strong>Consent:</strong> You have given explicit consent for processing your application</li>
                <li><strong>Contractual Necessity:</strong> Processing is necessary for steps prior to entering into an employment contract</li>
                <li><strong>Legal Obligation:</strong> We are required to collect certain information under Namibian employment and labor laws</li>
                <li><strong>Legitimate Interest:</strong> Processing is necessary for our legitimate interest in recruiting qualified candidates</li>
              </ul>
            </div>

            {/* Employment Equity */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Employment Equity Compliance</h2>
              <p className="text-gray-600 leading-relaxed">
                In accordance with the Affirmative Action (Employment) Act of Namibia, we collect demographic
                information including gender and race. This information is used solely for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-3">
                <li>Compliance with national employment equity legislation</li>
                <li>Monitoring and reporting on workforce diversity</li>
                <li>Supporting our commitment to fair representation in the workplace</li>
              </ul>
              <p className="text-gray-600 mt-3">
                This information is kept strictly confidential and does not influence individual hiring decisions
                beyond ensuring compliance with legal requirements.
              </p>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal data for the following periods:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-3">
                <li><strong>Successful Applicants:</strong> Your data will be transferred to your employee file upon employment</li>
                <li><strong>Unsuccessful Applicants:</strong> Data is retained for 24 months to consider you for future opportunities, unless you request earlier deletion</li>
                <li><strong>Withdrawn Applications:</strong> Data is deleted within 30 days of withdrawal</li>
              </ul>
              <p className="text-gray-600 mt-3">
                After the retention period, your data will be securely deleted or anonymized for statistical purposes.
              </p>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Sharing and Disclosure</h2>
              <p className="text-gray-600 mb-3">Your personal data may be shared with:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Internal Teams:</strong> HR personnel, hiring managers, and interview panel members involved in the recruitment process</li>
                <li><strong>Service Providers:</strong> Third-party vendors who assist with recruitment processes (bound by confidentiality agreements)</li>
                <li><strong>Background Check Providers:</strong> With your explicit consent, for verification purposes</li>
                <li><strong>Regulatory Bodies:</strong> Government authorities when required by law</li>
              </ul>
              <p className="text-gray-600 mt-3">
                We do not sell, trade, or rent your personal information to third parties.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-3">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure access controls and authentication</li>
                <li>Regular security assessments and audits</li>
                <li>Staff training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your Rights</h2>
              <p className="text-gray-600 mb-3">You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
                <li><strong>Restriction:</strong> Request limitation of processing in certain circumstances</li>
                <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time (without affecting prior processing)</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mt-4">
                <p className="font-semibold text-gray-900">MTC Human Resources Department</p>
                <p className="text-gray-600 mt-2">
                  Email: <a href="mailto:privacy@mtc.com.na" className="text-[#E30613] hover:underline">privacy@mtc.com.na</a>
                </p>
                <p className="text-gray-600">
                  Tel: <a href="tel:+26461280000" className="text-[#E30613] hover:underline">+264 61 280 2000</a>
                </p>
                <p className="text-gray-600 mt-2">
                  MTC Head Office<br />
                  Corner of Independence Avenue & Fidel Castro Street<br />
                  Windhoek, Namibia
                </p>
              </div>
            </div>

            {/* Updates */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Policy Updates</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or
                legal requirements. The updated policy will be posted on this page with a revised effective date.
                We encourage you to review this policy periodically.
              </p>
              <p className="text-gray-500 mt-4 text-sm">
                Last updated: January 2026
              </p>
            </div>

            {/* Back Button */}
            <div className="pt-6 border-t border-gray-200">
              <Link
                href="/jobs"
                className="inline-flex items-center text-[#E30613] font-medium hover:underline"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Job Listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

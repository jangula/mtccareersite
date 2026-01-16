import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

const BASE_URL = 'http://localhost:3001'
const SCREENSHOTS_DIR = path.join(process.cwd(), 'screenshots')

// Helper function to wait
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Pages to screenshot
const pages = [
  { name: '01_homepage', url: '/', fullPage: true },
  { name: '02_jobs_listing', url: '/jobs', fullPage: true },
  { name: '03_job_detail', url: '/jobs', fullPage: true, clickFirst: '.bg-white.rounded-lg' }, // Click first job card
  { name: '04_application_form', url: '/jobs', fullPage: true, navigateToApply: true },
  { name: '05_career_pathways', url: '/pathways', fullPage: true },
  { name: '06_benefits', url: '/benefits', fullPage: true },
  { name: '07_culture', url: '/culture', fullPage: true },
  { name: '08_diversity', url: '/diversity', fullPage: true },
  { name: '09_faq', url: '/faq', fullPage: true },
  { name: '10_privacy_policy', url: '/privacy', fullPage: true },
  { name: '11_login_portal_selector', url: '/login', fullPage: false },
  { name: '12_admin_dashboard', url: '/admin', fullPage: true },
  { name: '13_admin_analytics', url: '/admin/analytics', fullPage: true },
  { name: '14_admin_jobs', url: '/admin/jobs', fullPage: true },
  { name: '15_admin_applications', url: '/admin/applications', fullPage: true },
  { name: '16_applicant_portal', url: '/portal', fullPage: true },
]

async function takeScreenshots() {
  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true })
  }

  console.log('Launching browser...')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()

  // Set viewport to desktop size
  await page.setViewport({ width: 1920, height: 1080 })

  for (const pageConfig of pages) {
    try {
      console.log(`Taking screenshot: ${pageConfig.name}...`)

      await page.goto(`${BASE_URL}${pageConfig.url}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      })

      // Wait for content to load
      await delay(1000)

      // Take desktop screenshot
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${pageConfig.name}_desktop.png`),
        fullPage: pageConfig.fullPage,
      })
      console.log(`  ✓ Desktop: ${pageConfig.name}_desktop.png`)

      // Take mobile screenshot
      await page.setViewport({ width: 375, height: 812 })
      await delay(500)
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${pageConfig.name}_mobile.png`),
        fullPage: pageConfig.fullPage,
      })
      console.log(`  ✓ Mobile: ${pageConfig.name}_mobile.png`)

      // Reset to desktop viewport
      await page.setViewport({ width: 1920, height: 1080 })

    } catch (error) {
      console.error(`  ✗ Error capturing ${pageConfig.name}:`, error)
    }
  }

  // Take special screenshots for job detail and application form
  try {
    console.log('Taking screenshot: Job Detail page...')
    await page.goto(`${BASE_URL}/jobs`, { waitUntil: 'networkidle0' })
    await delay(1000)

    // Find and click the first job card link
    const jobLinks = await page.$$('a[href^="/jobs/"]')
    if (jobLinks.length > 0) {
      await jobLinks[0].click()
      await page.waitForNavigation({ waitUntil: 'networkidle0' })
      await delay(1000)

      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '03_job_detail_desktop.png'),
        fullPage: true,
      })
      console.log('  ✓ Desktop: 03_job_detail_desktop.png')

      // Now click Apply and capture application form
      const applyButton = await page.$('a[href*="/apply"]')
      if (applyButton) {
        await applyButton.click()
        await page.waitForNavigation({ waitUntil: 'networkidle0' })
        await delay(1000)

        await page.screenshot({
          path: path.join(SCREENSHOTS_DIR, '04_application_form_desktop.png'),
          fullPage: true,
        })
        console.log('  ✓ Desktop: 04_application_form_desktop.png')

        // Mobile version
        await page.setViewport({ width: 375, height: 812 })
        await delay(500)
        await page.screenshot({
          path: path.join(SCREENSHOTS_DIR, '04_application_form_mobile.png'),
          fullPage: true,
        })
        console.log('  ✓ Mobile: 04_application_form_mobile.png')
      }
    }
  } catch (error) {
    console.error('Error capturing job detail/application:', error)
  }

  // Take application detail screenshot (admin view)
  try {
    console.log('Taking screenshot: Application Detail (Admin)...')
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(`${BASE_URL}/admin/applications`, { waitUntil: 'networkidle0' })
    await delay(1000)

    // Find and click first application
    const applicationLinks = await page.$$('a[href^="/admin/applications/"]')
    if (applicationLinks.length > 0) {
      await applicationLinks[0].click()
      await page.waitForNavigation({ waitUntil: 'networkidle0' })
      await delay(1000)

      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '17_admin_application_detail_desktop.png'),
        fullPage: true,
      })
      console.log('  ✓ Desktop: 17_admin_application_detail_desktop.png')
    }
  } catch (error) {
    console.error('Error capturing application detail:', error)
  }

  await browser.close()
  console.log('\n✅ Screenshots complete! Check the ./screenshots directory.')
}

takeScreenshots().catch(console.error)

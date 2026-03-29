import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Terms and Conditions | AppBoost Labs',
  description: 'Terms and Conditions for AppBoost Labs - Read our terms of service and usage policies.',
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Terms and Conditions
              </h1>
              <p className="mt-4 text-muted-foreground">
                Last updated: March 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">1. Agreement to Terms</h2>
                  <p className="mt-4 text-muted-foreground">
                    By accessing or using the AppBoost Labs website and services, you agree to be bound by these 
                    Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">2. Description of Services</h2>
                  <p className="mt-4 text-muted-foreground">
                    AppBoost Labs provides app optimization services, user engagement strategies, and data-driven 
                    growth solutions for mobile applications. Our services include:
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li>App performance optimization</li>
                    <li>User experience enhancement</li>
                    <li>Data analysis and reporting</li>
                    <li>Strategic promotion and marketing</li>
                    <li>Task-based engagement programs</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">3. User Accounts</h2>
                  <p className="mt-4 text-muted-foreground">
                    When you create an account with us, you must provide accurate and complete information. 
                    You are responsible for safeguarding the password and for all activities that occur under your account.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">4. Payment Terms</h2>
                  <p className="mt-4 text-muted-foreground">
                    For our task-based programs:
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li>Trial period members receive $5 per regular task completed</li>
                    <li>Official members receive $10 per regular task completed</li>
                    <li>Daily check-in rewards are $10 per day</li>
                    <li>Node tasks offer higher rewards based on availability and complexity</li>
                    <li>Payments are processed according to our payment schedule</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">5. Task Requirements</h2>
                  <p className="mt-4 text-muted-foreground">
                    Participants in our task-based programs agree to:
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li>Complete 10 tasks daily during the designated time period (10:00 AM - 5:30 PM EST)</li>
                    <li>Follow all task instructions accurately</li>
                    <li>Maintain the quality standards required for each task</li>
                    <li>Not use automated tools or bots to complete tasks</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">6. Intellectual Property</h2>
                  <p className="mt-4 text-muted-foreground">
                    The Service and its original content, features, and functionality are owned by AppBoost Labs 
                    and are protected by international copyright, trademark, patent, trade secret, and other 
                    intellectual property laws.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">7. Prohibited Activities</h2>
                  <p className="mt-4 text-muted-foreground">
                    You agree not to engage in any of the following activities:
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li>Violating any applicable laws or regulations</li>
                    <li>Impersonating another person or entity</li>
                    <li>Attempting to gain unauthorized access to our systems</li>
                    <li>Interfering with the proper functioning of our services</li>
                    <li>Engaging in fraudulent activities</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">8. Limitation of Liability</h2>
                  <p className="mt-4 text-muted-foreground">
                    In no event shall AppBoost Labs, its directors, employees, partners, agents, suppliers, 
                    or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, 
                    including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">9. Termination</h2>
                  <p className="mt-4 text-muted-foreground">
                    We may terminate or suspend your account immediately, without prior notice or liability, 
                    for any reason whatsoever, including without limitation if you breach the Terms. 
                    Upon termination, your right to use the Service will immediately cease.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">10. Governing Law</h2>
                  <p className="mt-4 text-muted-foreground">
                    These Terms shall be governed by and construed in accordance with the laws of the State of Florida, 
                    United States, without regard to its conflict of law provisions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">11. Changes to Terms</h2>
                  <p className="mt-4 text-muted-foreground">
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                    we will try to provide at least 30 days&apos; notice prior to any new terms taking effect.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">12. Contact Us</h2>
                  <p className="mt-4 text-muted-foreground">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="mt-4 rounded-lg bg-muted/50 p-4 text-muted-foreground">
                    <p><strong className="text-foreground">AppBoost Labs</strong></p>
                    <p>Brickell, Miami, Florida, USA</p>
                    <p>Email: contact@appboostlabs.com</p>
                    <p>Phone: +1 (305) 555-0123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

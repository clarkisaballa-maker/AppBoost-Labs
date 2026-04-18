'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { FileText } from 'lucide-react'

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`${className} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      {children}
    </div>
  )
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary">
                <FileText className="h-4 w-4" />
                Legal
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="gradient-text">Terms and Conditions</span>
              </h1>
              <p className="mt-4 text-muted-foreground">
                Last updated: March 2026
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <AnimatedSection delay={100}>
              <Card className="glass">
                <CardContent className="pt-6">
                  <div className="space-y-8">

                    {/* 1 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        1. Agreement to Terms
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        By accessing or using the AppBoost Labs website and services, you agree to comply with these
                        Terms and Conditions. If you do not agree, please refrain from using our services.
                      </p>
                    </div>

                    {/* 2 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        2. Description of Services
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        AppBoost Labs provides digital growth and optimization solutions for mobile applications
                        and online platforms. Our services may include:
                      </p>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li>Application performance optimization</li>
                        <li>User experience (UX) improvements</li>
                        <li>Data analysis and reporting</li>
                        <li>Marketing strategy support</li>
                        <li>Partner-based data optimization programs</li>
                      </ul>
                    </div>

                    {/* 3 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        3. Collaboration & Engagement Terms
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        AppBoost Labs may collaborate with independent partners or contractors for specific
                        data optimization projects.
                      </p>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li>Participation is voluntary and project-based</li>
                        <li>Compensation (if applicable) is defined per project agreement</li>
                        <li>No guaranteed earnings or fixed salary unless stated in a formal contract</li>
                        <li>All onboarding or trial processes are communicated transparently</li>
                      </ul>
                    </div>

                    {/* 4 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        4. Work Guidelines
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        Participants involved in data optimization programs are expected to:
                      </p>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li>Follow provided instructions and guidelines</li>
                        <li>Maintain quality and accuracy in submitted work</li>
                        <li>Complete assigned activities within agreed timelines</li>
                        <li>Use only authorized tools and methods</li>
                      </ul>
                    </div>

                    {/* 5 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        5. Working Hours
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        Our operational hours are Monday to Sunday, 9:00 AM to 5:30 PM (Eastern Time).
                        Support and coordination are available during these hours.
                      </p>
                    </div>

                    {/* 6 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        6. User Accounts
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        Users must provide accurate and complete information when creating an account.
                        You are responsible for maintaining the confidentiality of your account credentials.
                      </p>
                    </div>

                    {/* 7 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        7. Prohibited Activities
                      </h2>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li>Violating applicable laws or regulations</li>
                        <li>Misrepresenting identity or affiliation</li>
                        <li>Attempting unauthorized access to systems</li>
                        <li>Using automation or bots without permission</li>
                        <li>Engaging in fraudulent or misleading activities</li>
                      </ul>
                    </div>

                    {/* 8 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        8. Compensation Disclaimer
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        Compensation varies depending on project scope, role, and agreement terms.
                        AppBoost Labs does not guarantee fixed income, daily rewards, or employment
                        unless explicitly stated in a signed agreement.
                      </p>
                    </div>

                    {/* 9 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        9. Limitation of Liability
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        AppBoost Labs shall not be liable for indirect or consequential damages,
                        including loss of data, revenue, or business opportunities.
                      </p>
                    </div>

                    {/* 10 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        10. Termination
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        We reserve the right to suspend or terminate accounts that violate these Terms
                        or engage in harmful activities.
                      </p>
                    </div>

                    {/* 11 */}
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        11. Contact
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        For inquiries, please contact: contact@appboostlabs.org
                      </p>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

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
      className={`${className} transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                    <div>
                      <h2 className="text-xl font-bold text-foreground">1. Agreement to Terms</h2>
                      <p className="mt-4 text-muted-foreground">
                        By accessing or using the AppBoost Labs website and services, you agree to be bound by these 
                        Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">2. Description of Services</h2>
                      <p className="mt-4 text-muted-foreground">
                        AppBoost Labs provides app optimization services, user engagement strategies, and data-driven 
                        growth solutions. Our services include:
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
                      <h2 className="text-xl font-bold text-foreground">3. Employment Terms</h2>
                      <p className="mt-4 text-muted-foreground">
                        For our task-based programs:
                      </p>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li><strong className="text-foreground">Probation Period:</strong> 3-day probation at $200 base salary per day</li>
                        <li><strong className="text-foreground">After Probation:</strong> You&apos;ll receive $600 as a lump sum for the 3-day probation period</li>
                        <li><strong className="text-foreground">Full-Time Staff:</strong> $6,000 monthly base salary</li>
                        <li>Daily check-in rewards of $10 per day</li>
                        <li>Additional earnings through regular tasks and Node tasks</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">4. Task Requirements</h2>
                      <p className="mt-4 text-muted-foreground">
                        Participants in our task-based programs agree to:
                      </p>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li>Complete 10 tasks daily during business hours</li>
                        <li>Start tasks at 10:00 AM Eastern Time</li>
                        <li>Complete last task by 5:30 PM Eastern Time</li>
                        <li>Option to complete all tasks at once after they are posted</li>
                        <li>Follow all task instructions accurately</li>
                        <li>Maintain the quality standards required for each task</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">5. Business Hours</h2>
                      <p className="mt-4 text-muted-foreground">
                        Our standard business hours are Monday through Sunday, 9:00 AM to 5:30 PM Eastern Time. 
                        Tasks are available during these hours and support is provided throughout this period.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">6. User Accounts</h2>
                      <p className="mt-4 text-muted-foreground">
                        When you create an account with us, you must provide accurate and complete information. 
                        You are responsible for safeguarding the password and for all activities under your account.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">7. Prohibited Activities</h2>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li>Violating any applicable laws or regulations</li>
                        <li>Impersonating another person or entity</li>
                        <li>Attempting to gain unauthorized access to our systems</li>
                        <li>Using automated tools or bots to complete tasks</li>
                        <li>Engaging in fraudulent activities</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">8. Limitation of Liability</h2>
                      <p className="mt-4 text-muted-foreground">
                        In no event shall AppBoost Labs be liable for any indirect, incidental, special, consequential, 
                        or punitive damages, including without limitation, loss of profits, data, use, goodwill, or 
                        other intangible losses.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">9. Termination</h2>
                      <p className="mt-4 text-muted-foreground">
                        We may terminate or suspend your account immediately, without prior notice, for any reason 
                        whatsoever, including without limitation if you breach these Terms.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">10. Contact Us</h2>
                      <p className="mt-4 text-muted-foreground">
                        If you have any questions about these Terms, please contact us at contact@appboostlabs.com
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

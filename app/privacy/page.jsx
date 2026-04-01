'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Shield } from 'lucide-react'

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

export default function PrivacyPage() {
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
                <Shield className="h-4 w-4" />
                Legal
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="gradient-text">Privacy Policy</span>
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
                      <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
                      <p className="mt-4 text-muted-foreground">
                        AppBoost Labs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                        when you visit our website or use our services.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
                      <p className="mt-4 text-muted-foreground">
                        We may collect information about you in a variety of ways, including:
                      </p>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li><strong className="text-foreground">Personal Data:</strong> Name, email address, phone number, and other contact information you provide voluntarily.</li>
                        <li><strong className="text-foreground">Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, and pages visited.</li>
                        <li><strong className="text-foreground">Communication Data:</strong> Records of correspondence when you contact us.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">3. How We Use Your Information</h2>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li>To provide and maintain our services</li>
                        <li>To notify you about changes to our services</li>
                        <li>To provide customer support</li>
                        <li>To gather analysis or valuable information to improve our services</li>
                        <li>To monitor the usage of our services</li>
                        <li>To detect, prevent, and address technical issues</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">4. Disclosure of Your Information</h2>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li><strong className="text-foreground">By Law or to Protect Rights:</strong> If we believe the release of information is necessary to respond to legal process or protect rights.</li>
                        <li><strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                        <li><strong className="text-foreground">Third-Party Service Providers:</strong> To help us operate our business and provide services to you.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">5. Security of Your Information</h2>
                      <p className="mt-4 text-muted-foreground">
                        We use administrative, technical, and physical security measures to help protect your personal information. 
                        While we have taken reasonable steps to secure the personal information you provide to us, 
                        no security measures are perfect, and no method of data transmission can be guaranteed.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">6. Your Rights</h2>
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li>The right to access your personal data</li>
                        <li>The right to rectify inaccurate personal data</li>
                        <li>The right to erasure of your personal data</li>
                        <li>The right to restrict processing of your personal data</li>
                        <li>The right to data portability</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">7. Contact Us</h2>
                      <p className="mt-4 text-muted-foreground">
                        If you have questions about this Privacy Policy, please contact us at contact@appboostlabs.org
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

'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Globe,
  MapPin,
  ShieldCheck,
  Ban,
  Eye,
  MessageSquareWarning,
  FileWarning,
  UserX
} from 'lucide-react'

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

export default function SecurityNoticePage() {
  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-background to-primary/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-destructive/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float delay-500" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/20 px-4 py-2 text-sm font-medium text-destructive">
                <ShieldAlert className="h-4 w-4" />
                Important Security Notice
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-destructive">Beware of Fraudulent Activities</span>
              </h1>
              <p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">
                We are aware of unauthorized third parties attempting to misuse the AppBoost Labs name and branding. This notice is provided to help visitors recognize unofficial communications and protect their personal information.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Warning Alert Section */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <AnimatedSection delay={100}>
              <div className="rounded-2xl border-2 border-destructive/50 bg-destructive/5 p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-destructive mb-3">Security Advisory</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We have become aware that certain individuals and fake companies are sending fraudulent emails, creating fake websites, and impersonating AppBoost Labs representatives to deceive users. Unauthorized parties may request personal information, financial details, or account access under false pretenses. We strongly recommend verifying all communications through our official channels.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* What to Watch Out For */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">Common Security Risks to Watch For</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Be vigilant and recognize these warning signs of fraudulent activities.
              </p>
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedSection delay={100}>
                <Card className="hover-lift hover-glow h-full border-destructive/20">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
                      <Mail className="h-6 w-6 text-destructive" />
                    </div>
                    <CardTitle className="text-lg">Fake Emails</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Scammers send emails that appear to be from AppBoost Labs but use unofficial email addresses. They may ask for sensitive information, or direct you to fake websites.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={150}>
                <Card className="hover-lift hover-glow h-full border-destructive/20">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
                      <Globe className="h-6 w-6 text-destructive" />
                    </div>
                    <CardTitle className="text-lg">Fake Websites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Fraudulent websites mimicking our official site may collect your personal data or trick you into making payments. Always verify the URL before entering any information.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Card className="hover-lift hover-glow h-full border-destructive/20">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
                      <UserX className="h-6 w-6 text-destructive" />
                    </div>
                    <CardTitle className="text-lg">Impersonators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Individuals may claim to be AppBoost Labs employees or partners on social media, messaging apps, or phone calls. These individuals are not affiliated with AppBoost Labs in any way, and any such claims should be treated as fraudulent and ignored.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Card className="hover-lift hover-glow h-full border-destructive/20">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
                      <FileWarning className="h-6 w-6 text-destructive" />
                    </div>
                    <CardTitle className="text-lg">Fake Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Scammers may send fake contracts, offer letters, or official-looking documents using our branding. Always verify documents directly with us before taking any action.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* How to Stay Safe */}
        <section className="bg-card/30 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">How to Protect Yourself</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Follow these guidelines to stay safe and avoid falling victim to scams.
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2">
              <AnimatedSection delay={100}>
                <Card className="hover-lift hover-glow h-full border-2 border-primary/30">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl gradient-text">Do This</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Only visit our official website: <strong className="text-foreground">www.appboostlabs.org</strong></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Contact us only through official channels listed on this website</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Verify any communication by reaching out to us directly</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Report suspicious activities to our official email immediately</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Double-check email sender addresses for authenticity</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Card className="hover-lift hover-glow h-full border-2 border-destructive/30">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center mb-4">
                      <XCircle className="h-7 w-7 text-destructive" />
                    </div>
                    <CardTitle className="text-xl text-destructive">Please Avoid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Never share personal or financial information with unverified sources</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Do not click on suspicious links in emails or messages</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Never make payments to unofficial accounts or individuals</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Avoid downloading attachments from unknown senders</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Official Contact Information */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">Official Contact Sources</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                These are the <strong className="text-foreground">only</strong> legitimate ways to contact AppBoost Labs. Any other source claiming to represent us should be considered suspicious.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <Card className="hover-lift border-2 border-primary max-w-3xl mx-auto">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl gradient-text">Verified Official Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Official Website</p>
                        <p className="font-semibold text-foreground">www.appboostlabs.org</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Official Email</p>
                        <p className="font-semibold text-foreground">contact@appboostlabs.org</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Official Phone</p>
                        <p className="font-semibold text-foreground">+1 (332) 256-6866</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Office Address</p>
                        <p className="font-semibold text-foreground">1450 S Miami Ave, Miami, FL 33130</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Eye className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Important:</strong> Always verify that any communication you receive matches these official channels. If you are unsure about the legitimacy of any message or contact, please reach out to us directly through the channels listed above.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* Final Notice */}
        <section className="bg-card/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl mb-4">
                  <span className="gradient-text">Your Safety is Our Priority</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  AppBoost Labs is committed to maintaining secure communication standards and protecting clients and visitors from unauthorized third-party activity.
                </p>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  If you have encountered any suspicious activity or believe you have been contacted by someone impersonating AppBoost Labs, please report it to us immediately at <strong className="text-foreground">contact@appboostlabs.org</strong>. Maintaining secure communication practices helps protect both our clients and the integrity of our services.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

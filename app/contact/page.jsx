'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  MessageSquare,
  Briefcase,
  MapPin,
  ExternalLink
} from 'lucide-react'
import Form from '../../components/form/Index'

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

export default function ContactPage() {

  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary">
                <MessageSquare className="h-4 w-4" />
                Get in Touch
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="gradient-text">Contact Us</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Have questions or ready to improve your product performance? We'd love to hear from you.
                Fill out the form below to request a consultation or connect with our team.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Consultation Request Form */}
              <AnimatedSection delay={100}>
                <Card className="hover-glow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Request a Consultation</CardTitle>
                        <CardDescription>Tell us about your business goals</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <Form />
                </Card>
              </AnimatedSection>

              {/* Contact Info */}
              <AnimatedSection delay={200} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    <span className="gradient-text">Get in Touch</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Our team is here to help you achieve your goals.
                    Whether you have questions about our services or are ready to discuss your project,
                    we&apos;re always happy to connect.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4 hover-lift p-4 rounded-lg glass">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="mt-1 text-muted-foreground">
                        contact@appboostlabs.org
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 hover-lift p-4 rounded-lg glass">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <p className="mt-1 text-muted-foreground">
                        +1 (332) 256-6866
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 hover-lift p-4 rounded-lg glass">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Business Hours</h3>
                      <p className="mt-1 text-muted-foreground">
                        Monday - Sunday: 9:00 AM - 5:30 PM (EST)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 hover-lift p-4 rounded-lg glass">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Office Location</h3>
                      <p className="mt-1 text-muted-foreground">
                        1450 S Miami Ave, Miami, FL 33130, USA
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Section */}
                <Card className="glass border-primary/20 hover-glow overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">AppBoost Labs</CardTitle>
                          <CardDescription>Our Office Location</CardDescription>
                        </div>
                      </div>
                      <a
                        href="https://www.google.com/maps/search/AppBoost+Labs+miami+FL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <span>Open in Maps</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <a
                      href="https://www.google.com/maps/search/AppBoost+Labs+miami+FL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative"
                    >
                      <div className="relative w-full h-64 bg-muted">
                        <iframe
                          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=AppBoost+Labs,+1450+S+Miami+Ave,+Miami,+FL+33130&zoom=17"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="AppBoost Labs Location"
                          className="absolute inset-0"
                        />
                        {/* Overlay with business name */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                              <MapPin className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">AppBoost Labs</p>
                              <p className="text-xs text-muted-foreground">1450 S Miami Ave, Miami, FL 33130</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </CardContent>
                </Card>

                <Card className="glass border-primary/20 hover-glow">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground">Why Choose AppBoost Labs?</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Professional mobile app consulting services
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Transparent project management and reporting
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Quality assurance testing and UX optimization
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Dedicated client support and strategic guidance
                      </li>
                    </ul>
                    <Button variant="outline" className="mt-6 hover-lift w-full" asChild>
                      <Link href="/">Learn More About Our Services</Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

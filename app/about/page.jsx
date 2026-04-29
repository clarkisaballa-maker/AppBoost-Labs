'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Target,
  Lightbulb,
  Users,
  BarChart3,
  Globe2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Rocket
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

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary">
                <Target className="h-4 w-4" />
                About Us
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="gradient-text">About AppBoost Labs</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We provide professional mobile app performance analysis, quality assurance testing, user experience optimization, and product growth consulting for digital businesses.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <AnimatedSection delay={100}>
                <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary">
                  <Target className="h-4 w-4" />
                  Our Mission
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="gradient-text">Empowering Apps to Reach New Heights</span>
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  At AppBoost Labs, we believe every app has the potential for greatness. Our mission is to bridge the gap between
                  where your app is today and where it could be tomorrow. Through cutting-edge optimization techniques,
                  deep user experience analysis, and strategic promotion, we transform apps into market leaders.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  Whether you&apos;re a startup looking to gain traction or an enterprise seeking to optimize your existing app portfolio,
                  our team of experts is dedicated to delivering measurable results that drive sustainable growth.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200} className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="text-center hover-lift hover-glow">
                    <CardContent className="pt-6">
                      <Sparkles className="mx-auto h-10 w-10 text-primary" />
                      <h3 className="mt-4 font-semibold text-foreground">Innovation</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Cutting-edge strategies</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center hover-lift hover-glow">
                    <CardContent className="pt-6">
                      <BarChart3 className="mx-auto h-10 w-10 text-primary" />
                      <h3 className="mt-4 font-semibold text-foreground">Data-Driven</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Analytics-based decisions</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center hover-lift hover-glow">
                    <CardContent className="pt-6">
                      <Users className="mx-auto h-10 w-10 text-primary" />
                      <h3 className="mt-4 font-semibold text-foreground">User-Focused</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Experience optimization</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center hover-lift hover-glow">
                    <CardContent className="pt-6">
                      <Globe2 className="mx-auto h-10 w-10 text-primary" />
                      <h3 className="mt-4 font-semibold text-foreground">Global Reach</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Worldwide impact</p>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="bg-card/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">What We Do</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our comprehensive approach covers every aspect of app growth and optimization.
              </p>
            </AnimatedSection>

            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
              <AnimatedSection delay={100}>
                <div className="flex gap-4 hover-lift p-6 rounded-lg glass">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">App Optimization</h3>
                    <p className="mt-2 text-muted-foreground">
                      We analyze and enhance every aspect of your app to maximize performance,
                      from load times to user interface responsiveness, ensuring a seamless experience.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="flex gap-4 hover-lift p-6 rounded-lg glass">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">User Experience Enhancement</h3>
                    <p className="mt-2 text-muted-foreground">
                      Our UX experts identify friction points and implement solutions that keep users
                      engaged, leading to higher retention rates and increased lifetime value.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <div className="flex gap-4 hover-lift p-6 rounded-lg glass">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Data Analysis</h3>
                    <p className="mt-2 text-muted-foreground">
                      We leverage advanced analytics to understand user behavior, identify trends,
                      and make data-driven decisions that drive measurable improvements.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <div className="flex gap-4 hover-lift p-6 rounded-lg glass">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Globe2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Product Growth Strategy</h3>
                    <p className="mt-2 text-muted-foreground">
                      We help improve product visibility, user engagement, and sustainable long-term growth through data-driven planning and market positioning.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">Why Choose AppBoost Labs</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We stand out with our commitment to excellence and results.
              </p>
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedSection delay={100}>
                <Card className="hover-lift hover-glow h-full">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground">Proven Track Record</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Supporting digital products with measurable performance improvements
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Card className="hover-lift hover-glow h-full">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground">Expert Team</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Industry professionals with years of experience
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Card className="hover-lift hover-glow h-full">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground">24/7 Support</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Reliable support for all client projects
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <Card className="hover-lift hover-glow h-full">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground">Dedicated Client Support</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Responsive communication and ongoing project guidance
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={500}>
                <Card className="hover-lift hover-glow h-full">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground">Transparent Project Management</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Clear workflows, reporting, and measurable business outcomes
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={600}>
                <Card className="hover-lift hover-glow h-full">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground">Professional Consulting Approach</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Structured solutions tailored to your business goals
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to Improve Your Product Performance?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Let’s discuss how AppBoost Labs can support your app’s growth, user experience, and long-term product success.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" className="hover-lift" asChild>
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

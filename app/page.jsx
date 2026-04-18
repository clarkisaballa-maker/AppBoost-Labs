'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Rocket,
  BarChart3,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  Briefcase,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  Quote,
  Sparkles,
  Heart,
  Award
} from 'lucide-react'
import Form from '@/components/form/Index'

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

const galleryImages = [
  {
    src: 'https://res.cloudinary.com/dm2zkwqqb/image/upload/v1774915578/photo_2026-03-30_19-56-30_qi3cbj.webp',
    alt: 'Company Gallery 1'
  },
  {
    src: 'https://res.cloudinary.com/dm2zkwqqb/image/upload/v1774915579/photo_2026-03-30_19-56-28_wjp1hl.webp',
    alt: 'Company Gallery 2'
  },
  {
    src: 'https://res.cloudinary.com/dm2zkwqqb/image/upload/v1774915579/photo_2026-03-30_19-56-28_2_mrd0fl.webp',
    alt: 'Company Gallery 3'
  },
  {
    src: 'https://res.cloudinary.com/dm2zkwqqb/image/upload/v1774915578/photo_2026-03-30_19-56-29_2_e1uuqw.webp',
    alt: 'Company Gallery 4'
  },
  {
    src: 'https://res.cloudinary.com/dm2zkwqqb/image/upload/v1774915578/photo_2026-03-30_19-56-29_dbkrn1.webp',
    alt: 'Company Gallery 5'
  }
]

export default function HomePage() {

  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float delay-500" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary">
                <Rocket className="h-4 w-4" />
                App Optimization & Growth Platform
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
                <span className="gradient-text">Accelerate Your App&apos;s Growth</span>
                <br />
                <span className="text-foreground">with Data-Driven Strategies</span>
              </h1>
              <p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">
                AppBoost Labs helps apps optimize performance, increase user engagement, and achieve sustainable growth. Join our platform and unlock your app&apos;s full potential through proven, data-driven methodologies.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="animate-pulse-glow" asChild>
                  <Link href="/contact">
                    Join Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="hover-lift" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Promotional Video Section */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">

            <AnimatedSection className="text-center mb-10">
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="gradient-text">Welcome to AppBoost Labs</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A glimpse into our company, our people, and what we’re building together.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl hover-lift">

                <video
                  controls
                  playsInline
                  muted
                  preload="metadata"
                  poster="https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776107082/compressed_photo_2026-04-09_15-33-31_j1si81.webp"
                  className="w-full h-full object-cover"
                >
                  {/* MP4 FIRST (important for iOS) */}
                  <source
                    src="https://res.cloudinary.com/dm2zkwqqb/video/upload/q_auto/f_auto/v1776106842/homepage_oheniz.mp4"
                    type="video/mp4"
                  />

                  {/* WebM fallback */}
                  <source
                    src="https://res.cloudinary.com/dm2zkwqqb/video/upload/q_auto/f_auto/v1776106842/homepage_oheniz.webm"
                    type="video/webm"
                  />

                  Your browser does not support the video tag.
                </video>

              </div>
            </AnimatedSection>

          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-card/50 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <AnimatedSection delay={100} className="text-center hover-lift p-4 rounded-lg">
                <p className="text-3xl font-bold gradient-text">500+</p>
                <p className="mt-1 text-sm text-muted-foreground">Apps Optimized</p>
              </AnimatedSection>
              <AnimatedSection delay={200} className="text-center hover-lift p-4 rounded-lg">
                <p className="text-3xl font-bold gradient-text">High User Satisfaction</p>
              </AnimatedSection>
              <AnimatedSection delay={300} className="text-center hover-lift p-4 rounded-lg">
                <p className="text-3xl font-bold gradient-text">Growing Global User Base</p>
              </AnimatedSection>
              <AnimatedSection delay={400} className="text-center hover-lift p-4 rounded-lg">
                <p className="text-xl font-bold gradient-text">9:30AM - 9:30PM</p>
                <p className="mt-1 text-sm text-muted-foreground">Support Hours (EST)</p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">Simple & Structured Workflow</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform provides flexible, easy-to-follow workflows designed to help users contribute effectively and grow with real project experience.
              </p>
            </AnimatedSection>

            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">

              {/* Card 1 */}
              <AnimatedSection delay={100}>
                <Card className="relative overflow-hidden hover-lift hover-glow h-full">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/20" />
                  <CardHeader>
                    <Clock className="h-10 w-10 text-primary" />
                    <CardTitle className="mt-4">Flexible Work Structure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Activities are available daily based on project needs
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Work can be completed at your own pace
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Tasks are released in batches throughout the day
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Designed to be simple and time-efficient
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Complete multiple activities in a single session if preferred
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Card 2 */}
              <AnimatedSection delay={200}>
                <Card className="relative overflow-hidden hover-lift hover-glow h-full">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/20" />
                  <CardHeader>
                    <DollarSign className="h-10 w-10 text-primary" />
                    <CardTitle className="mt-4">Engagement & Incentives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Incentives are based on participation and activity completion
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Different contribution levels unlock additional opportunities
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Reward structures vary depending on project scope
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Performance-based bonuses may be available
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Card 3 */}
              <AnimatedSection delay={300}>
                <Card className="relative overflow-hidden hover-lift hover-glow h-full md:col-span-2 lg:col-span-1">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/20" />
                  <CardHeader>
                    <Star className="h-10 w-10 text-primary" />
                    <CardTitle className="mt-4">Advanced Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Access to more advanced project assignments
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Availability depends on experience and performance
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Guidance and support provided by our team
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Opportunities to take on more impactful work
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* Probation & Employment Section */}
        <section className="bg-card/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">Growth Path & Opportunities</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We provide a structured path for users to learn, contribute, and gradually unlock more advanced opportunities within our platform.
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-3">

              {/* Stage 1 */}
              <AnimatedSection delay={100}>
                <Card className="hover-lift hover-glow h-full border-2 border-border">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <CardDescription>Getting Started</CardDescription>
                    <CardTitle className="text-2xl gradient-text">Onboarding Phase</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Introduction to platform tools and workflow
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Guided onboarding and learning resources
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Hands-on experience with basic activities
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        No prior experience required
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Stage 2 */}
              <AnimatedSection delay={200}>
                <Card className="hover-lift hover-glow h-full border-2 border-primary relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold">
                    PROGRESSION
                  </div>
                  <CardHeader className="text-center pt-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                    <CardDescription>After Initial Participation</CardDescription>
                    <CardTitle className="text-2xl gradient-text">Active Contributor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Access to more advanced platform features
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Increased participation opportunities
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Performance-based incentives may apply
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Ongoing support from our team
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Stage 3 */}
              <AnimatedSection delay={300}>
                <Card className="hover-lift hover-glow h-full border-2 border-accent">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                      <Briefcase className="h-8 w-8 text-accent" />
                    </div>
                    <CardDescription>Long-Term Growth</CardDescription>
                    <CardTitle className="text-2xl gradient-text">Advanced Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Opportunity to work on larger-scale projects
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Potential leadership or specialized roles
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Long-term collaboration opportunities
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Continued skill and experience development
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* Profit Model Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <AnimatedSection delay={100}>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="gradient-text">Data-Driven Profit Model</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our proven strategy focuses on increasing app traffic through optimized engagement,
                  leading to higher rankings, more exposure, and increased revenue.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex gap-4 hover-lift p-4 rounded-lg glass">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Increase Clicks</h3>
                      <p className="text-sm text-muted-foreground">
                        Drive targeted engagement to boost app interaction metrics.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 hover-lift p-4 rounded-lg glass">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Higher Rankings</h3>
                      <p className="text-sm text-muted-foreground">
                        Improved engagement leads to better app store rankings.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 hover-lift p-4 rounded-lg glass">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">More Users</h3>
                      <p className="text-sm text-muted-foreground">
                        Greater visibility attracts more organic users.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 hover-lift p-4 rounded-lg glass">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Higher Revenue</h3>
                      <p className="text-sm text-muted-foreground">
                        Increased user base translates to higher monetization.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200} className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl bg-primary/10 animate-pulse-glow" />
                  <div className="relative grid grid-cols-2 gap-4">
                    <Card className="text-center hover-lift">
                      <CardContent className="pt-6">
                        <TrendingUp className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 text-2xl font-bold gradient-text">300%</p>
                        <p className="text-xs text-muted-foreground">Avg. Traffic Increase</p>
                      </CardContent>
                    </Card>
                    <Card className="text-center hover-lift">
                      <CardContent className="pt-6">
                        <Users className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 text-2xl font-bold gradient-text">150%</p>
                        <p className="text-xs text-muted-foreground">User Growth Rate</p>
                      </CardContent>
                    </Card>
                    <Card className="text-center hover-lift">
                      <CardContent className="pt-6">
                        <BarChart3 className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 text-2xl font-bold gradient-text">Top 10</p>
                        <p className="text-xs text-muted-foreground">Ranking Position</p>
                      </CardContent>
                    </Card>
                    <Card className="text-center hover-lift">
                      <CardContent className="pt-6">
                        <DollarSign className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 text-2xl font-bold gradient-text">200%</p>
                        <p className="text-xs text-muted-foreground">Revenue Boost</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Customer Information Form */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <AnimatedSection delay={100}>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="gradient-text">Work With Us</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Ready to collaborate with AppBoost Labs? Fill out your basic information and our team will contact you within 24 hours.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 glass p-4 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">No experience required</span>
                  </div>
                  <div className="flex items-center gap-3 glass p-4 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Flexible remote work</span>
                  </div>
                  <div className="flex items-center gap-3 glass p-4 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Start contributing to projects within a few days after onboarding</span>
                  </div>
                  <div className="flex items-center gap-3 glass p-4 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Professional training provided</span>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Card className="hover-glow">
                  <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>Fill in your details to get started</CardDescription>
                  </CardHeader>
                  <Form />
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
                Ready to Grow with AppBoost Labs?
              </h2>

              <p className="mt-4 text-lg text-primary-foreground/80">
                Join our platform to collaborate on real projects, build valuable experience, and explore new opportunities in a flexible digital environment.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

                <Button size="lg" variant="secondary" className="hover-lift" asChild>
                  <Link href="/contact">
                    Get Started
                    <Rocket className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover-lift"
                  asChild
                >
                  <Link href="/events">Explore Opportunities</Link>
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

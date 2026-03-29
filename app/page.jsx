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
  MessageSquare,
  Video,
  Upload,
  Briefcase
} from 'lucide-react'

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

export default function HomePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    availability: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ fullName: '', email: '', phone: '', experience: '', availability: '' })
  }

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

        {/* Stats Section */}
        <section className="border-y border-border bg-card/50 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <AnimatedSection delay={100} className="text-center hover-lift p-4 rounded-lg">
                <p className="text-3xl font-bold gradient-text">500+</p>
                <p className="mt-1 text-sm text-muted-foreground">Apps Optimized</p>
              </AnimatedSection>
              <AnimatedSection delay={200} className="text-center hover-lift p-4 rounded-lg">
                <p className="text-3xl font-bold gradient-text">98%</p>
                <p className="mt-1 text-sm text-muted-foreground">Success Rate</p>
              </AnimatedSection>
              <AnimatedSection delay={300} className="text-center hover-lift p-4 rounded-lg">
                <p className="text-3xl font-bold gradient-text">10K+</p>
                <p className="mt-1 text-sm text-muted-foreground">Active Members</p>
              </AnimatedSection>
              <AnimatedSection delay={400} className="text-center hover-lift p-4 rounded-lg">
                <p className="text-3xl font-bold gradient-text">24/7</p>
                <p className="mt-1 text-sm text-muted-foreground">Support Available</p>
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
                Our streamlined daily task system ensures consistent earnings with minimal effort.
              </p>
            </AnimatedSection>

            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedSection delay={100}>
                <Card className="relative overflow-hidden hover-lift hover-glow h-full">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/20" />
                  <CardHeader>
                    <Clock className="h-10 w-10 text-primary" />
                    <CardTitle className="mt-4">Daily Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        10 tasks per day
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Start at 10:00 AM EST
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Last task by 5:30 PM EST
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        1-2 minutes per task
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Complete all at once or throughout day
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Card className="relative overflow-hidden hover-lift hover-glow h-full">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/20" />
                  <CardHeader>
                    <DollarSign className="h-10 w-10 text-primary" />
                    <CardTitle className="mt-4">Task Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        $10 daily check-in reward
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Trial: $5 per regular task
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Official: $10 per regular task
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Node tasks: Higher rewards
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Card className="relative overflow-hidden hover-lift hover-glow h-full md:col-span-2 lg:col-span-1">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/20" />
                  <CardHeader>
                    <Star className="h-10 w-10 text-primary" />
                    <CardTitle className="mt-4">Node Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        High-reward special tasks
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Limited availability
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Professional guidance
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Higher income potential
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
                <span className="gradient-text">Career Path & Compensation</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clear progression from probation to full-time employment with competitive pay.
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-3">
              <AnimatedSection delay={100}>
                <Card className="hover-lift hover-glow h-full border-2 border-border">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <CardDescription>3-Day Probation Period</CardDescription>
                    <CardTitle className="text-3xl gradient-text">$200/day</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Base salary during training
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Learn the platform
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Professional guidance
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        No experience required
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Card className="hover-lift hover-glow h-full border-2 border-primary relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold">
                    MOST POPULAR
                  </div>
                  <CardHeader className="text-center pt-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                    <CardDescription>After Successful Probation</CardDescription>
                    <CardTitle className="text-3xl gradient-text">$600/day</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Official member status
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Access to Node tasks
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Higher earning potential
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Priority support
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Card className="hover-lift hover-glow h-full border-2 border-accent">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                      <Briefcase className="h-8 w-8 text-accent" />
                    </div>
                    <CardDescription>Full-Time Staff</CardDescription>
                    <CardTitle className="text-3xl gradient-text">$6,000/mo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Monthly base salary
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Performance bonuses
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Leadership opportunities
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Full benefits package
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

        {/* Video & Screenshots Section */}
        <section className="bg-card/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">Success Stories & Testimonials</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See real results from our community members through videos and chat screenshots.
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2">
              <AnimatedSection delay={100}>
                <Card className="hover-lift hover-glow h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Video Testimonials</CardTitle>
                        <CardDescription>Watch success stories from our members</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center p-6">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Video content area</p>
                        <p className="text-sm text-muted-foreground mt-2">Member success videos will be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Card className="hover-lift hover-glow h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Chat Screenshots</CardTitle>
                        <CardDescription>Real conversations from satisfied members</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center p-6">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Screenshot gallery area</p>
                        <p className="text-sm text-muted-foreground mt-2">Member chat screenshots will be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                  <span className="gradient-text">Join Our Team</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Ready to start earning with AppBoost Labs? Fill out your basic information and our team will contact you within 24 hours.
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
                    <span className="text-muted-foreground">Start earning within 3 days</span>
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
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">Thank You!</h3>
                        <p className="text-muted-foreground mt-2">
                          We&apos;ve received your information. Our team will contact you within 24 hours.
                        </p>
                        <Button 
                          className="mt-6" 
                          variant="outline"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Submit Another
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Previous Experience</Label>
                          <Input
                            id="experience"
                            name="experience"
                            placeholder="Brief description (or 'None')"
                            value={formData.experience}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="availability">Availability</Label>
                          <Input
                            id="availability"
                            name="availability"
                            placeholder="e.g., Full-time, Part-time, Weekdays only"
                            value={formData.availability}
                            onChange={handleChange}
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                      </form>
                    )}
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
                Ready to Boost Your Income?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Join AppBoost Labs today and start earning with our flexible, remote work opportunity.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" className="hover-lift" asChild>
                  <Link href="/contact">
                    Get Started
                    <Rocket className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover-lift" asChild>
                  <Link href="/events">View Events</Link>
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

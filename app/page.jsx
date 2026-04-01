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
  Images
} from 'lucide-react'
import Form from '../components/form/Index'

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

function SuccessGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  return (
    <section className="bg-card/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary">
            <Images className="h-4 w-4" />
            Our Company
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="gradient-text">Company Gallery</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Take a look inside AppBoost Labs. Click any image to view in full screen.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryImages.map((image, index) => (
            <AnimatedSection key={index} delay={100 + index * 50}>
              <div
                className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group hover-lift"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>

          <div
            className="max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <p className="text-center text-white/70 mt-4 text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        </div>
      )}
    </section>
  )
}

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    otherOccupation: '',
    phone: '',
    cityState: '',
    paymentMethod: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [phoneError, setPhoneError] = useState('')

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '')
    const phoneNumberLength = phoneNumber.length

    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const validateUSAPhone = (phone) => {
    const phoneNumber = phone.replace(/\D/g, '')
    if (phoneNumber.length !== 10) return false
    const firstDigit = phoneNumber[0]
    if (firstDigit === '0' || firstDigit === '1') return false
    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value)
      setFormData(prev => ({ ...prev, phone: formattedPhone }))

      const rawPhone = value.replace(/\D/g, '')
      if (rawPhone.length === 10) {
        if (!validateUSAPhone(value)) {
          setPhoneError('Please enter a valid USA phone number')
        } else {
          setPhoneError('')
        }
      } else if (rawPhone.length > 0) {
        setPhoneError('')
      }
      return
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateUSAPhone(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit USA phone number')
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setPhoneError('')
    setFormData({ name: '', age: '', otherOccupation: '', phone: '', cityState: '', paymentMethod: '', email: '' })
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
                        You can complete it all at once after all the tasks are released
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
                    <CardDescription>After 3-Day Trial Period</CardDescription>
                    <CardTitle className="text-3xl gradient-text">$600</CardTitle>
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

        {/* Success Stories Image Gallery Section */}
        <SuccessGallery />

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

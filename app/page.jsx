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
}

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Texas",
    avatar: "SM",
    rating: 5,
    earnings: "$790",
    period: "Day 3",
    message: "I just completed my third node task and I am literally in tears of joy! When I saw $790 hit my account, I couldn't believe it. The mentor guided me through every step. This has changed my life!",
    highlight: "Node task reward exceeded expectations"
  },
  {
    id: 2,
    name: "Michael R.",
    location: "California",
    avatar: "MR",
    rating: 5,
    earnings: "$1,090",
    period: "Probation Complete",
    message: "Just finished my 3-day probation and received my full payout - $600 base plus all my commissions! The node tasks were the key. My mentor was available 24/7 and helped me maximize my earnings.",
    highlight: "Completed probation successfully"
  },
  {
    id: 3,
    name: "Jennifer L.",
    location: "Florida",
    avatar: "JL",
    rating: 5,
    earnings: "$85",
    period: "Day 2",
    message: "Day 2 node task done! $30 reward plus my regular tasks. I was nervous about the deposit but got my refund code immediately. The whole process is so smooth and professional!",
    highlight: "Smooth refund process"
  },
  {
    id: 4,
    name: "David K.",
    location: "New York",
    avatar: "DK",
    rating: 5,
    earnings: "$70",
    period: "Day 1",
    message: "First day and already earned $70! The node task gave me $15 plus regular tasks. I registered my work account and my mentor walked me through everything. Can't wait for day 2!",
    highlight: "Great first day experience"
  },
  {
    id: 5,
    name: "Amanda T.",
    location: "Arizona",
    avatar: "AT",
    rating: 5,
    earnings: "$600",
    period: "Trial Salary",
    message: "The moment I received my $600 trial completion payment, I knew this was real. Three days of work, professional guidance, and a life-changing opportunity. I'm now a full-time member!",
    highlight: "Became full-time employee"
  },
  {
    id: 6,
    name: "Robert J.",
    location: "Ohio",
    avatar: "RJ",
    rating: 5,
    earnings: "$390",
    period: "Node Refund",
    message: "Got my full node task refund today - $390! Combined with my commissions and base salary, this probation period has been incredibly rewarding. The partner companies are legitimate!",
    highlight: "Full refund received"
  },
  {
    id: 7,
    name: "Emily W.",
    location: "Georgia",
    avatar: "EW",
    rating: 5,
    earnings: "$100+",
    period: "Commissions",
    message: "My commissions alone are over $100! Each regular task pays $5-10 and the node tasks are even better. My mentor from the partner company made sure I understood every step.",
    highlight: "High commission earnings"
  },
  {
    id: 8,
    name: "James P.",
    location: "Michigan",
    avatar: "JP",
    rating: 5,
    earnings: "$790",
    period: "Day 3",
    message: "Day 3 was incredible! The $300 deposit felt scary but my mentor reassured me. When I completed the node task and got my $90 reward plus the $700 in refunds and tasks, I was overwhelmed with happiness!",
    highlight: "Highest single-day earnings"
  },
  {
    id: 9,
    name: "Lisa H.",
    location: "Colorado",
    avatar: "LH",
    rating: 5,
    earnings: "$155",
    period: "Days 1-2",
    message: "First two days: $70 + $85 = $155 earned! The node tasks from the BYBIT partnership are amazing. Professional mentors, clear instructions, and fast payouts. This is the real deal!",
    highlight: "Consistent daily earnings"
  },
  {
    id: 10,
    name: "Chris B.",
    location: "Washington",
    avatar: "CB",
    rating: 5,
    earnings: "$6,000",
    period: "First Month",
    message: "Just got my first full-time monthly salary - $6,000! Started as a skeptic during probation but the node tasks proved this company is legit. Now I'm earning more than my old 9-5 job!",
    highlight: "Full-time employee success"
  },
  {
    id: 11,
    name: "Nicole S.",
    location: "Nevada",
    avatar: "NS",
    rating: 5,
    earnings: "$45",
    period: "Regular Tasks",
    message: "Completed all 9 regular tasks today in under 20 minutes! $45 just like that, plus my $10 check-in bonus. The node task was the cherry on top. This flexible work is perfect for me!",
    highlight: "Quick and easy tasks"
  },
  {
    id: 12,
    name: "Kevin M.",
    location: "Illinois",
    avatar: "KM",
    rating: 5,
    earnings: "$200",
    period: "Day 1 Base",
    message: "My $200 base salary for day 1 is secured! Plus all the task rewards. The probation period is designed to help us learn while earning. My mentor explained everything about the partner app tasks.",
    highlight: "Base salary guaranteed"
  },
  {
    id: 13,
    name: "Rachel G.",
    location: "Pennsylvania",
    avatar: "RG",
    rating: 5,
    earnings: "$90",
    period: "Node Reward",
    message: "Day 3 node task reward: $90! This was my highest single task payment. The partner company mentor helped me complete it perfectly. I received my refund code within minutes!",
    highlight: "Highest node task reward"
  },
  {
    id: 14,
    name: "Steven C.",
    location: "Virginia",
    avatar: "SC",
    rating: 5,
    earnings: "$1,000+",
    period: "Total Probation",
    message: "Total earnings after 3-day probation: over $1,000! The combination of base salary, regular task commissions, and node task rewards is incredible. I'm so glad I took this opportunity!",
    highlight: "Exceeded income expectations"
  },
  {
    id: 15,
    name: "Michelle D.",
    location: "North Carolina",
    avatar: "MD",
    rating: 5,
    earnings: "$600",
    period: "Lump Sum",
    message: "Received my $600 lump sum payment after completing probation! The node tasks during these 3 days were the fastest way to earn extra. Now I understand why they say to take advantage during probation!",
    highlight: "Probation bonus received"
  },
  {
    id: 16,
    name: "Andrew F.",
    location: "Tennessee",
    avatar: "AF",
    rating: 5,
    earnings: "$30",
    period: "Day 2 Node",
    message: "Day 2 node task complete - $30 reward! Combined with my $100 deposit refund and regular tasks, today was amazing. The professional guidance makes all the difference.",
    highlight: "Day 2 success story"
  }
]

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check screen size for responsive display
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const testimonialsPerPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)

  const goToPage = (index) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % totalPages)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const currentTestimonials = testimonials.slice(
    currentIndex * testimonialsPerPage,
    (currentIndex + 1) * testimonialsPerPage
  )

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float delay-700" />
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse-glow delay-500" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Real Member Experiences
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            <span className="gradient-text">Success Stories from Our Members</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Hear from real members who completed their node tasks and transformed their income.
            Their journeys from probation to full-time success will inspire you!
          </p>

          {/* Stats Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span className="text-sm font-medium">10,000+ Happy Members</span>
            </div>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">$2M+ Paid Out</span>
            </div>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-6 z-10 p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110 group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>

          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-6 z-10 p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110 group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>

          {/* Testimonial Cards Slider */}
          <div className="overflow-hidden mx-8 lg:mx-12">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="w-full flex-shrink-0 grid gap-6 grid-cols-1 lg:grid-cols-3 px-1"
                >
                  {testimonials
                    .slice(pageIndex * testimonialsPerPage, (pageIndex + 1) * testimonialsPerPage)
                    .map((testimonial) => (
                      <Card
                        key={testimonial.id}
                        className="h-full relative overflow-hidden group hover-lift hover-glow border-border/50 bg-card/80 backdrop-blur-sm"
                      >
                        {/* Gradient accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

                        {/* Quote icon */}
                        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                          <Quote className="h-16 w-16 text-primary" />
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              {/* Avatar */}
                              <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                                  {testimonial.avatar}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                                  <CheckCircle2 className="h-3 w-3 text-white" />
                                </div>
                              </div>

                              {/* Name and Location */}
                              <div>
                                <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                <CardDescription className="text-xs">{testimonial.location}</CardDescription>
                              </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-0.5">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                              ))}
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Earnings Badge */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-semibold">
                              <DollarSign className="h-3.5 w-3.5" />
                              {testimonial.earnings}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {testimonial.period}
                            </span>
                          </div>

                          {/* Testimonial Message */}
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                            &ldquo;{testimonial.message}&rdquo;
                          </p>

                          {/* Highlight Tag */}
                          <div className="pt-2 border-t border-border/50">
                            <span className="inline-flex items-center gap-1.5 text-xs text-primary font-medium">
                              <Sparkles className="h-3 w-3" />
                              {testimonial.highlight}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              disabled={isAnimating}
              className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${currentIndex === index
                ? 'w-8 h-3 bg-primary'
                : 'w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        {/* Page indicator */}
        <div className="flex items-center justify-center mt-4">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {totalPages}
          </span>
        </div>

        {/* CTA */}
        <AnimatedSection delay={300} className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Ready to start your own success story?</p>
          <Button size="lg" className="animate-pulse-glow hover-lift" asChild>
            <Link href="/contact">
              Join AppBoost Labs Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
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

        {/* Success Stories Image Gallery Section */}
        {/* <SuccessGallery /> */}

        {/* Member Testimonials Section */}
        {/* <TestimonialsSection /> */}

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

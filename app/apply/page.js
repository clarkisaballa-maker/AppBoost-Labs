'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Header from '@/components/header'
import Footer from '@/components/footer'
import {
  CheckCircle2,
  DollarSign,
  Clock,
  Smartphone,
  Home,
  Briefcase,
  TrendingUp,
  Shield,
  Star,
  Loader2
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

function ApplyPageContent() {
  const searchParams = useSearchParams()
  const source = searchParams.get('source') || 'direct'

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [serverError, setServerError] = useState('')

  const sourceLabel = source === 'fb' ? 'Facebook' : source === 'tk' ? 'TikTok' : 'Direct'

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
    setServerError('') // reset error

    try {
      const response = await fetch('https://app-boost-labs-backend.vercel.app/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: source
        }),
      })

      const data = await response.json() // ✅ IMPORTANT

      if (!response.ok) {
        // ❌ backend error show karo
        setServerError(data.message || 'Something went wrong')
        return
      }

      // ✅ success
      setIsSubmitted(true)
      setPhoneError('')
      setFormData({ name: '', age: '', phone: '', message: '' })

    } catch (error) {
      console.error('Error submitting form:', error)
      setServerError('Network error, please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: <Home className="h-6 w-6" />,
      title: "100% Remote",
      description: "Work from the comfort of your home"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Friendly",
      description: "Complete tasks using just your phone"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Hours",
      description: "3-5 minutes per task, 10 tasks daily"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Great Pay",
      description: "Earn up to $6,000 per month"
    }
  ]

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">

          {/* Left Column - Job Details */}
          <div className="space-y-8">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary mb-6">
                <Briefcase className="h-4 w-4" />
                Now Hiring - Remote Position
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                <span className="gradient-text">Start Earning From Home</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of people who are earning extra income with simple mobile tasks. No experience required!
              </p>
            </AnimatedSection>

            {/* Benefits Grid */}
            <AnimatedSection delay={100}>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl glass hover-lift transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-3">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Job Description Card */}
            <AnimatedSection delay={200}>
              <Card className="glass border-border/50 overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-primary/5">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Star className="h-5 w-5 text-primary" />
                    Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Our work involves browsing applications developed by merchants, helping them increase product exposure, downloads, and attract more users, thereby earning commissions. These online tasks are very simple and require no experience.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        This is a completely remote job you can complete it directly from home using your mobile phone. You will need to complete 10 tasks each day, each of which only takes 3-5 minutes!
                      </p>
                    </div>
                  </div>

                  {/* Earnings Highlight */}
                  <div className="rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 p-4 sm:p-6 border border-primary/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-base sm:text-lg">Earning Potential</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Competitive daily and monthly rates</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      <div className="text-center p-2 sm:p-4 rounded-lg bg-background/50">
                        <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">$200</p>
                        <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">Daily Wage</p>
                      </div>
                      <div className="text-center p-2 sm:p-4 rounded-lg bg-background/50">
                        <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">$6,000</p>
                        <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">Max Monthly</p>
                      </div>
                    </div>
                  </div>

                  {/* Trial Period Info */}
                  <div className="rounded-xl bg-accent/10 p-5 border border-accent/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-accent" />
                      Trial Period (First 3 Days)
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        $5 for each completed task
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        10 tasks per day = $50 daily wage
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        Top performers can earn over $250/day!
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Right Column - Application Form */}
          <AnimatedSection delay={300}>
            <div className="lg:sticky lg:top-8">
              <Card className="glass border-border/50 overflow-hidden hover-glow">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10 py-8 px-6">
                  <CardTitle className="text-2xl text-center">
                    Apply Now
                  </CardTitle>
                  <p className="text-center text-muted-foreground mt-3">
                    Fill out the form below to get started
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 animate-scale-in">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">Application Submitted!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for your interest. Our team will contact you within 24 hours to get you started.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                        className="hover-lift"
                      >
                        Submit Another Application
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-12 text-base bg-background/50 border-border/50 focus:border-primary/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-base">Age *</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          placeholder="Enter your age"
                          value={formData.age}
                          onChange={handleChange}
                          required
                          min="18"
                          className="h-12 text-base bg-background/50 border-border/50 focus:border-primary/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base">Phone Number (USA) *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          maxLength={14}
                          className={`h-12 text-base bg-background/50 border-border/50 focus:border-primary/50 ${phoneError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                        {phoneError && (
                          <p className="text-sm text-red-500">{phoneError}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-base">Message (Optional)</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about yourself or ask any questions..."
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="text-base bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full h-14 text-lg font-semibold animate-pulse-glow hover-lift"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            'Submit Application'
                          )}
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground text-center bg-muted/30 p-3 rounded-lg">
                        <Shield className="inline h-3 w-3 mr-1" />
                        Your information is secure and will only be used to contact you about this opportunity.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>No Experience Needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Start Today</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ApplyPageContent />
    </Suspense>
  )
}

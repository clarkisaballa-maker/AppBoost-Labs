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

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    otherOccupation: '',
    phone: '',
    cityState: '',
    paymentMethod: '',
    email: ''
  })

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
                Have questions or ready to get started? We&apos;d love to hear from you. 
                Fill out the form below to apply or reach out to our team.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Application Form */}
              <AnimatedSection delay={100}>
                <Card className="hover-glow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Apply Now</CardTitle>
                        <CardDescription>Join our team today</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 animate-scale-in">
                          <CheckCircle2 className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-foreground">Application Submitted!</h3>
                        <p className="mt-2 text-muted-foreground">
                          Thank you for applying. We&apos;ll review your application and get back to you soon.
                        </p>
                        <Button 
                          className="mt-6 hover-lift" 
                          variant="outline"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Submit Another Application
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            name="age"
                            type="number"
                            placeholder="Enter your age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="otherOccupation">Other Occupation</Label>
                          <Input
                            id="otherOccupation"
                            name="otherOccupation"
                            placeholder="Your current occupation (if any)"
                            value={formData.otherOccupation}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number (USA)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            maxLength={14}
                            className={phoneError ? 'border-red-500 focus-visible:ring-red-500' : ''}
                          />
                          {phoneError && (
                            <p className="text-sm text-red-500">{phoneError}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cityState">Current City/State</Label>
                          <Input
                            id="cityState"
                            name="cityState"
                            placeholder="e.g., Miami, FL"
                            value={formData.cityState}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paymentMethod">Do you use Cash App or PayPal?</Label>
                          <Input
                            id="paymentMethod"
                            name="paymentMethod"
                            placeholder="Cash App / PayPal / Both"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
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
                        <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                          <strong>Note:</strong> Rest assured, all information will be kept strictly confidential and used only for payment purposes. Your privacy and data security are our top priority.
                        </p>
                        <Button type="submit" className="w-full hover-lift" disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                      </form>
                    )}
                  </CardContent>
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
                    Whether you have questions about our opportunities or are ready to join, 
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
                        contact@appboostlabs.com
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
                        +1 (305) 555-0123
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
                        Monday - Sunday: 9:00 AM - 5:30 PM (ET)
                      </p>
                    </div>
                  </div>
                </div>

                <Card className="glass border-primary/20 hover-glow">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground">Why Join AppBoost Labs?</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Flexible remote work opportunity
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Competitive daily compensation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Simple daily tasks
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Fast payment via Cash App or PayPal
                      </li>
                    </ul>
                    <Button variant="outline" className="mt-6 hover-lift w-full" asChild>
                      <Link href="/">Learn More About Opportunities</Link>
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

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
    const urlSource = searchParams.get('source')

    // Get source from URL or localStorage, default to 'direct'
    const [source, setSource] = useState('direct')

    useEffect(() => {
        // If source is in URL, save it to localStorage
        if (urlSource) {
            localStorage.setItem('appboost_source', urlSource)
            setSource(urlSource)
        } else {
            // If no source in URL, try to get it from localStorage
            const savedSource = localStorage.getItem('appboost_source')
            if (savedSource) {
                setSource(savedSource)
            }
        }
    }, [urlSource])

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        message: '',
        contactMethod: '',
        contactValue: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const sourceLabel = source === 'fb' ? 'Facebook' : source === 'tk' ? 'TikTok' : 'Direct'

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.contactMethod || !formData.contactValue) {
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch('https://app-boost-labs-backend.vercel.app/api/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    age: formData.age,
                    email: formData.email,
                    message: formData.message,
                    source,

                    contactMethod: formData.contactMethod,

                    telegram:
                        formData.contactMethod === 'telegram'
                            ? formData.contactValue
                            : '',

                    whatsapp:
                        formData.contactMethod === 'whatsapp'
                            ? formData.contactValue
                            : '',

                    phone:
                        formData.contactMethod === 'sms_call'
                            ? formData.contactValue
                            : ''
                }),
            })

            if (response.ok) {
                // Fire BEFORE state changes, and add a safety check
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead', {
                        value: 50.00,
                        currency: 'USD',
                        content_name: 'Job Application',
                        content_category: 'Career'
                    });
                }

                // TikTok Pixel ✅
                if (typeof ttq !== 'undefined') {
                    ttq.track('CompleteRegistration', {
                        value: 50.00,
                        currency: 'USD',
                        content_name: 'Job Application'
                    });
                }
                setIsSubmitted(true)
                setPhoneError('')
                setFormData({
                    name: '',
                    age: '',
                    email: '',
                    message: '',
                    contactMethod: '',
                    contactValue: ''
                })
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const benefits = [
        {
            icon: <Home className="h-6 w-6" />,
            title: "Flexible Work Environment",
            description: "Work remotely or on-site according to your needs."
        },
        {
            icon: <Smartphone className="h-6 w-6" />,
            title: "Career Growth",
            description: "Continuous learning and development opportunities."
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "Work-Life Balance",
            description: "Flexible schedules to maintain personal and professional life."
        },
        {
            icon: <DollarSign className="h-6 w-6" />,
            title: "Competitive Compensation",
            description: "Attractive salary and performance-based bonuses."
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


                    {/* Form here */}
                    {/* Right Column - Application Form */}
                    <AnimatedSection delay={300}>
                        <div className="lg:sticky lg:top-8">
                            <Card className="glass border-border/50 overflow-hidden hover-glow">
                                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10 py-8 px-6">
                                    <CardTitle className="text-2xl text-center">
                                        Apply for a Job
                                    </CardTitle>
                                    <p className="text-center text-muted-foreground mt-3">
                                        Fill out the form below to submit your application. Our HR team will review your information and contact you if your profile matches any current openings.
                                    </p>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {isSubmitted ? (
                                        <div className="text-center py-12">
                                            <div className="mx-auto w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 animate-scale-in">
                                                <CheckCircle2 className="h-10 w-10 text-green-500" />
                                            </div>
                                            <h3 className="text-2xl font-semibold mb-3">Consultation Request Submitted!</h3>
                                            <p className="text-muted-foreground mb-6">
                                                Thank you for your interest. Our team will contact you within 24 hours to discuss your project requirements.
                                            </p>
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsSubmitted(false)}
                                                className="hover-lift"
                                            >
                                                Submit Another Request
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

                                            <div className="space-y-4">
                                                <Label className="text-base">
                                                    How do you want us to contact you? *
                                                </Label>

                                                <div className="grid gap-3">
                                                    {[
                                                        {
                                                            label: 'Telegram',
                                                            value: 'telegram'
                                                        },
                                                        {
                                                            label: 'WhatsApp',
                                                            value: 'whatsapp'
                                                        },
                                                        {
                                                            label: 'SMS or Call',
                                                            value: 'sms_call'
                                                        }
                                                    ].map((option) => (
                                                        <label
                                                            key={option.value}
                                                            className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all ${formData.contactMethod === option.value
                                                                ? 'border-primary bg-primary/10'
                                                                : 'border-border/50'
                                                                }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="contactMethod"
                                                                value={option.value}
                                                                checked={
                                                                    formData.contactMethod === option.value
                                                                }
                                                                onChange={handleChange}
                                                                className="h-4 w-4"
                                                                required
                                                            />

                                                            <span className="font-medium">
                                                                {option.label}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>

                                                {formData.contactMethod && (
                                                    <div className="animate-in fade-in duration-300">
                                                        <Label
                                                            htmlFor="contactValue"
                                                            className="text-base"
                                                        >
                                                            {formData.contactMethod === 'telegram'
                                                                ? 'Telegram Username *'
                                                                : formData.contactMethod ===
                                                                    'whatsapp'
                                                                    ? 'WhatsApp Number *'
                                                                    : 'Phone Number *'}
                                                        </Label>

                                                        <Input
                                                            id="contactValue"
                                                            name="contactValue"
                                                            type="text"
                                                            placeholder={
                                                                formData.contactMethod ===
                                                                    'telegram'
                                                                    ? '@username'
                                                                    : formData.contactMethod ===
                                                                        'whatsapp'
                                                                        ? '+1 555 123 4567'
                                                                        : '(555) 123-4567'
                                                            }
                                                            value={formData.contactValue}
                                                            onChange={handleChange}
                                                            required
                                                            className="h-12 text-base bg-background/50 border-border/50 focus:border-primary/50 mt-2"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-base">Email *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="h-12 text-base bg-background/50 border-border/50 focus:border-primary/50"
                                                />
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
                                                Your personal information is securely processed and will only be used to evaluate your job application. We never charge fees for applying, and this is an official recruitment page of AppBoost Labs.
                                            </p>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Trust Indicators */}
                            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>Professional Support</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>Fast Response</span>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Left Column - Career Details */}
                    <div className="space-y-8">
                        <AnimatedSection>
                            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary mb-6">
                                <Briefcase className="h-4 w-4" />
                                Careers & Job Opportunities
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                                <span className="gradient-text">Join Our Team at AppBoost Labs</span>
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We are hiring! Explore current job opportunities at AppBoost Labs and submit your application below. All applications are processed securely and directly by our HR team.
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
                                        Job Overview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                We are seeking talented individuals to join our team in various roles, including product development, marketing, and operations. Our team members contribute to innovative projects that drive growth and impact.
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                As a part of our team, you will collaborate with experienced professionals and gain exposure to a dynamic and growth-oriented work environment.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Career Growth Highlight */}
                                    <div className="rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 p-4 sm:p-6 border border-primary/20">

                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0">
                                                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-bold text-base sm:text-lg">Career Growth & Development</h4>
                                                <p className="text-xs sm:text-sm text-muted-foreground">
                                                    Opportunities designed to enhance skills, accelerate learning, and foster long-term career growth in a dynamic on-site environment
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 sm:gap-4">

                                            <div className="text-center p-2 sm:p-4 rounded-lg bg-background/50">
                                                <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">
                                                    Skill
                                                </p>
                                                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">
                                                    Enhancement
                                                </p>
                                            </div>

                                            <div className="text-center p-2 sm:p-4 rounded-lg bg-background/50">
                                                <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">
                                                    Career
                                                </p>
                                                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">
                                                    Advancement
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    {/* Job Application Consultation Info */}
                                    <div className="rounded-xl bg-accent/10 p-5 border border-accent/20">

                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-accent" />
                                            Candidate Consultation Process
                                        </h4>

                                        <ul className="space-y-2 text-sm text-muted-foreground">

                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                Initial application review and assessment of your skills and experience
                                            </li>

                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                Discussion of the role, responsibilities, and performance expectations
                                            </li>

                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                Personalized guidance on how to succeed during the on-site process
                                            </li>

                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                Clear next steps for interviews, assessments, and joining the AppBoost Labs team
                                            </li>

                                        </ul>

                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>
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

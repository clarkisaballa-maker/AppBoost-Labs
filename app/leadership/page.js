'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Users, 
  ArrowRight,
  Linkedin,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  Award,
  Target,
  Sparkles
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

const executives = [
  {
    name: 'Daniel Carter',
    title: 'Chief Executive Officer',
    shortTitle: 'CEO',
    bio: 'Daniel brings over 15 years of experience in technology leadership and strategic growth. Under his vision, AppBoost Labs has grown into a leading force in app optimization and user acquisition.',
    images: [
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855041/compressed_openart-image_FQRyhyI5_1775777996882_raw_sukrfc.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855041/compressed_openart-image_r1JTmMJV_1775774010334_raw_diw615.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855041/compressed_openart-image_TfcvTITU_1775776263577_raw_ftwnec.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855041/compressed_openart-image_fqEC5P2S_1775774341457_raw_glfikh.webp',
    ]
  },
  {
    name: 'Kevin Thompson',
    title: 'Product Manager (Mobile Apps)',
    shortTitle: 'Product Manager',
    bio: 'Kevin oversees our mobile app product strategy, ensuring our solutions meet the evolving needs of our clients. His expertise in mobile technology has been instrumental in our product innovation.',
    images: [
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855512/compressed_openart-image_tyhlsIxc_1775851033355_raw_qavooo.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855511/compressed_openart-image_A6UHWY6K_1775851150942_raw_tpva9m.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855510/compressed_openart-image_2ESCtodj_1775851251896_raw_pmfyha.webp',
    ]
  },
  {
    name: 'Andrew Collins',
    title: 'Director of Data Analytics',
    shortTitle: 'Analytics Director',
    bio: 'Andrew leads our data analytics division, transforming complex data into actionable insights. His analytical approach drives our evidence-based optimization strategies.',
    images: [
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855365/compressed_openart-image_vSGus52L_1775850423030_raw_xzabn6.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855364/compressed_openart-image_726OfP9h_1775850663119_raw_un5ea9.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855364/compressed_openart-image_5aoM9EKf_1775850360384_raw_t8yk5p.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855363/compressed_openart-image_4wPsPz5Q_1775850715864_raw_gtprq7.webp',
    ]
  },
  {
    name: 'Jessica Brown',
    title: 'Director of User Acquisition',
    shortTitle: 'Acquisition Director',
    bio: 'Jessica spearheads our user acquisition efforts, developing innovative campaigns that drive sustainable growth. Her strategic vision has helped countless apps reach their target audiences.',
    images: [
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855304/compressed_openart-image_U3DF903B_1775851794548_raw_ix81xd.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855303/compressed_openart-image_iopjfuh8_1775851745574_raw_eggvx4.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855302/compressed_openart-image_0J_DhyPd_1775851692743_raw_kpnpeo.webp',
    ]
  },
  {
    name: 'Richard Bennett',
    title: 'Operations Manager',
    shortTitle: 'Operations Manager',
    bio: 'Richard ensures seamless operations across all departments, optimizing processes and fostering collaboration. His operational excellence keeps AppBoost Labs running at peak efficiency.',
    images: [
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855452/compressed_openart-image_TRBe_ZtV_1775852166358_raw_yz05nu.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855451/compressed_openart-image_sb_Btg6E_1775852057633_raw_yr8nip.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855450/compressed_openart-image_i6xBdXTE_1775851985776_raw_hcapgv.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1775855449/compressed_openart-image_FQYTU0GF_1775852114270_raw_mgek2f.webp',
    ]
  },
]

const bestEmployees = [
  {
    name: 'Maria',
    title: 'Senior App Strategist',
    bio: 'Maria has consistently delivered exceptional results in app optimization, helping our clients achieve record-breaking growth metrics.',
    images: [
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776027440/compressed_photo_2026-03-07_00-31-13_hmkea7.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776027439/compressed_photo_2026-03-04_00-32-59_eci7bk.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776027437/compressed_photo_2026-03-10_00-40-25_qt8ubx.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776027436/compressed_photo_2026-03-11_23-38-54_gopbwe.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776027435/compressed_photo_2026-03-10_00-40-23_kkjpt7.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776027434/compressed_photo_2026-03-03_00-49-22_bx16di.webp',
    ]
  },
  {
    name: 'Susan',
    title: 'Lead Growth Analyst',
    bio: 'Susan excels at transforming data into actionable strategies, driving remarkable user acquisition results for our partner apps.',
    images: [
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776027457/compressed_photo_2026-04-13_04-51-22_atzxj9.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776027456/compressed_photo_2026-04-13_04-53-05_baelnb.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776027456/compressed_photo_2026-04-13_04-42-54_v5jl1k.webp',
      'https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776027457/compressed_photo_2026-04-13_04-54-10_ufqzlb.webp',
    ]
  },
]

function ExecutiveCard({ executive, delay, onViewGallery }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % executive.images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [executive.images.length])

  return (
    <AnimatedSection delay={delay}>
      <Card className="group overflow-hidden hover-lift hover-glow h-full bg-card/50 backdrop-blur-sm border-border/50">
        <div className="relative aspect-[4/5] overflow-hidden">
          {executive.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${executive.name} - Photo ${idx + 1}`}
              fill
              className={`object-cover transition-all duration-700 ${
                idx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ))}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {executive.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`View photo ${idx + 1}`}
              />
            ))}
          </div>

          {/* View gallery button */}
          <button
            onClick={() => onViewGallery(executive)}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
            aria-label="View gallery"
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </button>

          {/* Title badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/90 text-primary-foreground backdrop-blur-sm">
              <Award className="h-3 w-3" />
              {executive.shortTitle}
            </span>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {executive.name}
          </h3>
          <p className="text-sm text-primary font-medium mt-1">
            {executive.title}
          </p>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {executive.bio}
          </p>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}

function GalleryModal({ executive, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrentIndex(prev => prev === 0 ? executive.images.length - 1 : prev - 1)
      if (e.key === 'ArrowRight') setCurrentIndex(prev => prev === executive.images.length - 1 ? 0 : prev + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [executive.images.length, onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pt-20">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Close button - fixed position at top right of screen */}
      <button
        onClick={onClose}
        className="fixed top-24 right-6 flex items-center gap-2 px-5 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors shadow-xl z-[110]"
        aria-label="Close gallery"
      >
        <X className="h-5 w-5" />
        <span>Close</span>
      </button>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-4">
        {/* Main image */}
        <div className="relative aspect-[3/4] sm:aspect-[4/3] rounded-xl overflow-hidden bg-card">
          {executive.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${executive.name} - Photo ${idx + 1}`}
              fill
              className={`object-contain transition-all duration-500 ${
                idx === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority={idx === currentIndex}
            />
          ))}

          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentIndex(prev => prev === 0 ? executive.images.length - 1 : prev - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentIndex(prev => prev === executive.images.length - 1 ? 0 : prev + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Info bar */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-foreground">{executive.name}</h3>
          <p className="text-sm text-primary">{executive.title}</p>
          
          {/* Thumbnails */}
          <div className="flex justify-center gap-2 mt-4">
            {executive.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LeadershipPage() {
  const [selectedExecutive, setSelectedExecutive] = useState(null)

  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary">
                <Users className="h-4 w-4" />
                Our Leadership
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="gradient-text">Meet Our Executive Team</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                The visionary leaders driving innovation and excellence at AppBoost Labs. 
                Together, they bring decades of experience in technology, analytics, and business growth.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* CEO Featured Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection delay={100}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                    <Image
                      src={executives[0].images[0]}
                      alt={executives[0].name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
                </div>
                
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary mb-6">
                    <Award className="h-4 w-4" />
                    Chief Executive Officer
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    <span className="gradient-text">{executives[0].name}</span>
                  </h2>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                    {executives[0].bio}
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Daniel&apos;s leadership philosophy centers on empowering teams, fostering innovation, 
                    and maintaining an unwavering commitment to client success. His strategic vision 
                    has positioned AppBoost Labs at the forefront of the app optimization industry.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <Button 
                      variant="outline" 
                      className="hover-lift"
                      onClick={() => setSelectedExecutive(executives[0])}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      View Gallery
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Other Executives Grid */}
        <section className="bg-card/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary mb-6">
                <Target className="h-4 w-4" />
                Leadership Team
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">Our Department Heads</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Experienced professionals leading their respective domains with expertise and dedication.
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {executives.slice(1).map((executive, index) => (
                <ExecutiveCard
                  key={executive.name}
                  executive={executive}
                  delay={100 + index * 100}
                  onViewGallery={setSelectedExecutive}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Best Employees Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 mb-6">
                <Award className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-amber-500">Star Performers</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">Best Employees</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Recognizing the outstanding individuals who drive our success through dedication and excellence.
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {bestEmployees.map((employee, idx) => (
                <AnimatedSection key={employee.name} delay={idx * 150}>
                  <Card className="group overflow-hidden hover-lift hover-glow h-full bg-card/50 backdrop-blur-sm border-amber-500/20">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {employee.images.map((img, imgIdx) => (
                        <Image
                          key={imgIdx}
                          src={img}
                          alt={`${employee.name} - Photo ${imgIdx + 1}`}
                          fill
                          className={`object-cover transition-all duration-700 ${
                            imgIdx === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-0'
                          } group-hover:scale-105`}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ))}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                      
                      {/* Award badge */}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      
                      {/* Info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-foreground">{employee.name}</h3>
                        <p className="text-amber-500 font-medium">{employee.title}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">{employee.bio}</p>
                      <Button 
                        variant="outline" 
                        className="mt-4 w-full border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
                        onClick={() => setSelectedExecutive(employee)}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        View Gallery
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">Our Leadership Values</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The principles that guide our executive team in every decision.
              </p>
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-3">
              <AnimatedSection delay={100}>
                <Card className="text-center hover-lift hover-glow h-full">
                  <CardContent className="pt-8 pb-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Vision</h3>
                    <p className="mt-3 text-muted-foreground">
                      We see beyond the present, anticipating industry trends and positioning our clients for future success.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Card className="text-center hover-lift hover-glow h-full">
                  <CardContent className="pt-8 pb-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Collaboration</h3>
                    <p className="mt-3 text-muted-foreground">
                      We believe in the power of teamwork, fostering an environment where ideas flow freely and innovation thrives.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Card className="text-center hover-lift hover-glow h-full">
                  <CardContent className="pt-8 pb-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Excellence</h3>
                    <p className="mt-3 text-muted-foreground">
                      We hold ourselves to the highest standards, continuously striving to exceed expectations in everything we do.
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
                Ready to Work With Us?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Join our team or partner with us to achieve extraordinary results.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="hover-lift" asChild>
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="hover-lift bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/apply">
                    Join Our Team
                    <Users className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />

      {/* Gallery Modal */}
      {selectedExecutive && (
        <GalleryModal
          executive={selectedExecutive}
          onClose={() => setSelectedExecutive(null)}
        />
      )}
    </div>
  )
}

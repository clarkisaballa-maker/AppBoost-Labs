'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Video,
  MapPin,
  Star,
  CheckCircle2
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

const upcomingEvents = [
  {
    id: 1,
    title: 'App Growth Summit 2026',
    description: 'Join industry leaders for a comprehensive summit on app growth strategies, featuring keynote speakers and networking opportunities.',
    date: 'April 15, 2026',
    time: '10:00 AM - 4:00 PM EST',
    type: 'Summit',
    attendees: 500,
    image: '/images/event-summit.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'ASO Mastery Workshop',
    description: 'Learn advanced App Store Optimization techniques from our expert team. Hands-on workshop with practical exercises.',
    date: 'April 22, 2026',
    time: '2:00 PM - 5:00 PM EST',
    type: 'Workshop',
    attendees: 100,
    image: '/images/event-workshop.jpg',
    featured: false
  },
  {
    id: 3,
    title: 'Member Networking Night',
    description: 'Connect with fellow members, share experiences, and build valuable relationships in our exclusive networking event.',
    date: 'May 5, 2026',
    time: '6:00 PM - 9:00 PM EST',
    type: 'Networking',
    attendees: 150,
    image: '/images/event-networking.jpg',
    featured: false
  },
  {
    id: 4,
    title: 'Weekly Webinar: Task Excellence',
    description: 'Our weekly webinar covering best practices for task completion, tips for maximizing earnings, and Q&A session.',
    date: 'Every Thursday',
    time: '3:00 PM EST',
    type: 'Webinar',
    attendees: 200,
    image: '/images/event-webinar.jpg',
    featured: false
  }
]

const pastEvents = [
  {
    id: 5,
    title: 'New Year Kickoff 2026',
    description: 'Started the year strong with our annual kickoff event featuring 2026 roadmap and exciting announcements.',
    date: 'January 10, 2026',
    type: 'Summit',
    attendees: 450,
    highlights: ['Roadmap reveal', '10+ speakers', 'Live demos']
  },
  {
    id: 6,
    title: 'Advanced Monetization Strategies',
    description: 'Deep dive into app monetization techniques that our top performers use to maximize their earnings.',
    date: 'February 15, 2026',
    type: 'Workshop',
    attendees: 120,
    highlights: ['Case studies', 'Expert panels', 'Networking']
  },
  {
    id: 7,
    title: 'Member Success Stories',
    description: 'Celebrating our community with inspiring stories from members who achieved remarkable results.',
    date: 'March 1, 2026',
    type: 'Webinar',
    attendees: 300,
    highlights: ['Success stories', 'Tips shared', 'Live Q&A']
  }
]

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')

  return (
    <div className="flex min-h-screen flex-col bg-grid-pattern">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-primary">
                <Calendar className="h-4 w-4" />
                Events & Updates
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="gradient-text">Upcoming Events</span>
                <br />
                <span className="text-foreground">& Company Updates</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Stay connected with the AppBoost Labs community through our events, workshops, webinars, and networking opportunities.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Featured Event */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection delay={100}>
              <div className="relative overflow-hidden rounded-2xl glass">
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto">
                    <Image
                      src="/images/event-summit.jpg"
                      alt="App Growth Summit 2026"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent lg:bg-gradient-to-l" />
                    <Badge className="absolute top-4 left-4 bg-primary">Featured Event</Badge>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-4">Summit</Badge>
                    <h2 className="text-2xl font-bold lg:text-3xl gradient-text">
                      App Growth Summit 2026
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                      Join industry leaders for a comprehensive summit on app growth strategies, featuring keynote speakers and networking opportunities. This is our biggest event of the year.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        April 15, 2026
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        10:00 AM - 4:00 PM EST
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        500+ Attendees Expected
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button className="hover-lift animate-pulse-glow">
                        Coming soon
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Events Tabs */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection delay={150}>
              <div className="flex justify-center mb-12">
                <div className="inline-flex rounded-lg glass p-1">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeTab === 'upcoming'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Upcoming Events
                  </button>
                  <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeTab === 'past'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Past Events
                  </button>
                </div>
              </div>
            </AnimatedSection>

            {activeTab === 'upcoming' && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.filter(e => !e.featured).map((event, index) => (
                  <AnimatedSection key={event.id} delay={200 + index * 100}>
                    <Card className="overflow-hidden hover-lift hover-glow h-full">
                      <div className="relative aspect-video">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-3 right-3" variant="secondary">
                          {event.type}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            {event.attendees}+ Expected
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-4 hover-lift">
                          Coming soon
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}

            {activeTab === 'past' && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event, index) => (
                  <AnimatedSection key={event.id} delay={200 + index * 100}>
                    <Card className="hover-lift h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{event.type}</Badge>
                          <span className="text-xs text-muted-foreground">{event.date}</span>
                        </div>
                        <CardTitle className="text-lg mt-2">{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Users className="h-4 w-4 text-primary" />
                          {event.attendees} Attendees
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {event.highlights.map((highlight, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Weekly Schedule */}
        <section className="py-20 lg:py-28 bg-card/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="gradient-text">Weekly Schedule</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Regular events and sessions to help you succeed
              </p>
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <AnimatedSection delay={100}>
                <Card className="hover-lift text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Monday</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Onboarding Session<br />
                      <span className="text-primary">10:00 AM EST</span>
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Card className="hover-lift text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Wednesday</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Team Check-in<br />
                      <span className="text-primary">2:00 PM EST</span>
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Card className="hover-lift text-center h-full border-2 border-primary">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Thursday</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Weekly Webinar<br />
                      <span className="text-primary">3:00 PM EST</span>
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <Card className="hover-lift text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Friday</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Q&A Session<br />
                      <span className="text-primary">4:00 PM EST</span>
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
                Don&apos;t Miss Out on Our Events
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Join AppBoost Labs to get access to all our exclusive events, workshops, and networking opportunities.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" className="hover-lift" asChild>
                  <Link href="/contact">
                    Join Now
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

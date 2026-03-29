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
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

export const metadata = {
  title: 'About Us | AppBoost Labs',
  description: 'Learn about AppBoost Labs - your partner in app optimization, user experience enhancement, and data-driven growth strategies. Based in Brickell, Miami, Florida.',
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                About AppBoost Labs
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We are a leading app optimization company headquartered in the heart of Brickell, Miami, Florida. 
                Our mission is to help apps achieve their full potential through innovative, data-driven strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Target className="h-4 w-4" />
                  Our Mission
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Empowering Apps to Reach New Heights
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
              </div>
              
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Sparkles className="mx-auto h-10 w-10 text-primary" />
                      <h3 className="mt-4 font-semibold text-foreground">Innovation</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Cutting-edge strategies</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <BarChart3 className="mx-auto h-10 w-10 text-primary" />
                      <h3 className="mt-4 font-semibold text-foreground">Data-Driven</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Analytics-based decisions</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Users className="mx-auto h-10 w-10 text-primary" />
                      <h3 className="mt-4 font-semibold text-foreground">User-Focused</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Experience optimization</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Globe2 className="mx-auto h-10 w-10 text-primary" />
                      <h3 className="mt-4 font-semibold text-foreground">Global Reach</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Worldwide impact</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="bg-muted/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What We Do
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our comprehensive approach covers every aspect of app growth and optimization.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
              <div className="flex gap-4">
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

              <div className="flex gap-4">
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

              <div className="flex gap-4">
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

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Globe2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Strategic Promotion</h3>
                  <p className="mt-2 text-muted-foreground">
                    Our promotion strategies are designed to increase visibility, drive downloads, 
                    and build a loyal user base through targeted marketing initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 lg:order-1">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <div className="text-center">
                      <Building2 className="mx-auto h-16 w-16 text-primary" />
                      <p className="mt-4 text-xl font-semibold text-foreground">Brickell, Miami</p>
                      <p className="text-muted-foreground">Financial District</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Building2 className="h-4 w-4" />
                  Our Location
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Headquartered in Miami&apos;s Tech Hub
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  AppBoost Labs is proudly headquartered in Brickell, Miami&apos;s premier business and technology district. 
                  Known as the &quot;Manhattan of the South,&quot; Brickell provides the perfect environment for innovation 
                  and growth.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Access to top-tier tech talent
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Strategic gateway to Latin American markets
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Thriving startup and tech ecosystem
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Business-friendly environment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to Partner with Us?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Join the growing list of apps that have achieved remarkable success with AppBoost Labs.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

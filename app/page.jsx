import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Rocket, 
  BarChart3, 
  Users, 
  Clock, 
  DollarSign, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Star
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 lg:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMDA4IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <MapPin className="h-4 w-4" />
                Based in Brickell, Miami, Florida
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Accelerate Your App&apos;s Growth with Data-Driven Strategies
              </h1>
              <p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">
                AppBoost Labs helps apps optimize performance, increase user engagement, and achieve sustainable growth. Join our platform and unlock your app&apos;s full potential through proven, data-driven methodologies.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Join Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="mt-1 text-sm text-muted-foreground">Apps Optimized</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="mt-1 text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="mt-1 text-sm text-muted-foreground">Active Members</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="mt-1 text-sm text-muted-foreground">Support Available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Simple & Structured Workflow
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our streamlined daily task system ensures consistent earnings with minimal effort.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="relative overflow-hidden">
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10" />
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
                      Last task at 5:30 PM EST
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      1-2 minutes per task
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10" />
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

              <Card className="relative overflow-hidden md:col-span-2 lg:col-span-1">
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10" />
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
            </div>
          </div>
        </section>

        {/* Profit Model Section */}
        <section className="bg-muted/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Data-Driven Profit Model
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our proven strategy focuses on increasing app traffic through optimized engagement, 
                  leading to higher rankings, more exposure, and increased revenue.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex gap-4">
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

                  <div className="flex gap-4">
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

                  <div className="flex gap-4">
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

                  <div className="flex gap-4">
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
              </div>

              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl bg-primary/5" />
                  <div className="relative grid grid-cols-2 gap-4">
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <TrendingUp className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 text-2xl font-bold text-foreground">300%</p>
                        <p className="text-xs text-muted-foreground">Avg. Traffic Increase</p>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <Users className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 text-2xl font-bold text-foreground">150%</p>
                        <p className="text-xs text-muted-foreground">User Growth Rate</p>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <BarChart3 className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 text-2xl font-bold text-foreground">Top 10</p>
                        <p className="text-xs text-muted-foreground">Ranking Position</p>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <DollarSign className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 text-2xl font-bold text-foreground">200%</p>
                        <p className="text-xs text-muted-foreground">Revenue Boost</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Income Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Transparent Income System
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Earn consistently with our clear and fair compensation structure.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardDescription>Trial Period</CardDescription>
                  <CardTitle className="text-3xl">$60+</CardTitle>
                  <CardDescription>Daily Potential</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      $10 daily check-in bonus
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      $5 per regular task (10 tasks)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Flexible remote work
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      No experience required
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary">
                <CardHeader className="bg-primary/5">
                  <CardDescription>Official Member</CardDescription>
                  <CardTitle className="text-3xl">$110+</CardTitle>
                  <CardDescription>Daily Potential</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      $10 daily check-in bonus
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      $10 per regular task (10 tasks)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Access to Node tasks
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Professional guidance
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Higher income opportunities
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to Boost Your Income?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Join AppBoost Labs today and start earning with our flexible, remote work opportunity.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Get Started
                    <Rocket className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/about">Learn More</Link>
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

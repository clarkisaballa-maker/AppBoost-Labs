import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Music,
  ArrowUpRight,
  Rocket,
  Globe,
  Shield
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background via-card/80 to-card">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/3 to-transparent rounded-full" />
      </div>

      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/images/logo.png"
                  alt="AppBoost Labs"
                  width={200}
                  height={50}
                  className="relative transition-all duration-300 group-hover:scale-105 h-12 w-auto"
                />
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Helping apps optimize performance, increase user engagement, and achieve growth through data-driven strategies.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">Verified Business</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <Globe className="h-3.5 w-3.5 text-green-500" />
                <span className="text-xs font-medium text-green-500">Global Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-sm font-medium text-foreground mb-3">Connect With Us</p>
              <div className="flex items-center gap-2">
                <a 
                  href="https://www.facebook.com/share/1aJRp4ja4C/?mibextid=wwXIfr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
                >
                  <Facebook className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </a>
                <a 
                  href="https://www.instagram.com/appboostlabs?igsh=YTI3YmFkbmlkMzg1&utm_source=qr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300"
                >
                  <Instagram className="h-4 w-4 text-muted-foreground group-hover:text-pink-500 transition-colors" />
                </a>
                <a 
                  href="https://x.com/appboostlabs?s=21" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-sky-500 hover:bg-sky-500/10 transition-all duration-300"
                >
                  <Twitter className="h-4 w-4 text-muted-foreground group-hover:text-sky-500 transition-colors" />
                </a>
                <a 
                  href="https://www.tiktok.com/@appboostlabs_" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-foreground hover:bg-foreground/10 transition-all duration-300"
                >
                  <Music className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-primary" />
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: '/', label: 'Home' },
                    { href: '/about', label: 'About Us' },
                    { href: '/events', label: 'Events' },
                    { href: '/contact', label: 'Contact' },
                    { href: '/apply', label: 'Apply Now' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Legal
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: '/privacy', label: 'Privacy Policy' },
                    { href: '/terms', label: 'Terms & Conditions' },
                    { href: '/security-notice', label: 'Security Notice' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="col-span-2">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Get In Touch
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://maps.google.com/?q=1450+S+Miami+Ave,+Miami,+FL+33130"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <span className="pt-1">1450 S Miami Ave, Miami, FL 33130, USA</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="mailto:contact@appboostlabs.org"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <span>contact@appboostlabs.org</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="tel:+13322566866"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <span>+1 (332) 256-6866</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <span>Mon - Sat, 9:00 AM - 5:30 PM (EST)</span>
                  </li>
                </ul>

                {/* Quick contact buttons */}
                <div className="flex gap-2 mt-4">
                  <a 
                    href="https://wa.me/+13322566866" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium hover:bg-green-500/20 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <a 
                    href="https://t.me/AppBoostLabs" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-500 text-sm font-medium hover:bg-sky-500/20 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    Telegram
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} AppBoost Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <span className="text-xs text-muted-foreground">
                Made with care in Miami
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

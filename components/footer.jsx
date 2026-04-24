import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Phone, Clock, MessageCircle, Send } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="AppBoost Labs"
                width={240}
                height={60}
                className="transition-all duration-300 group-hover:scale-105 h-14 sm:h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Helping apps optimize performance, increase user engagement, and achieve growth through data-driven strategies.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Apply
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>1450 S Miami Ave, Miami, FL 33130, USA</span>
              </li>

              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>contact@appboostlabs.org</span>
              </li>

              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+1 (332) 256-6866</span>
              </li>

              {/* WhatsApp */}
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4 shrink-0 text-green-500" />
                <a
                  href="https://wa.me/+13322566866"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>

              {/* Telegram */}
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Send className="h-4 w-4 shrink-0 text-sky-500" />
                <a
                  href="https://t.me/AppBoostLabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Telegram Support
                </a>
              </li>

              {/* Common Notice */}
              <li className="text-xs text-muted-foreground pl-6">
                Live support isn’t available on weekends
              </li>

              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>Mon - Friday: 9:00 AM - 5:30 PM (EST)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} AppBoost Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

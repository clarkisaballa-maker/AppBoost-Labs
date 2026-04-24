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
  Music
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">

          {/* Logo + About */}
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
              Helping apps optimize performance, increase user engagement,
              and achieve growth through data-driven strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/events" className="footer-link">Events</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
              <li><Link href="/apply" className="footer-link">Apply</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="footer-item">
                <MapPin className="footer-icon" />
                <span>1450 S Miami Ave, Miami, FL 33130, USA</span>
              </li>

              <li className="footer-item">
                <Mail className="footer-icon" />
                <span>contact@appboostlabs.org</span>
              </li>

              <li className="footer-item">
                <Phone className="footer-icon" />
                <span>+1 (332) 256-6866</span>
              </li>

              <li className="footer-item">
                <MessageCircle className="h-4 w-4 text-green-500" />
                <a href="https://wa.me/+13322566866" target="_blank">
                  WhatsApp Support
                </a>
              </li>

              <li className="footer-item">
                <Send className="h-4 w-4 text-sky-500" />
                <a href="https://t.me/AppBoostLabs" target="_blank">
                  Telegram Support
                </a>
              </li>

              <li className="footer-item">
                <Clock className="footer-icon" />
                <span>Mon–Sat, 9:00 AM – 5:30 PM (EST)</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Follow Us</h3>
            <div className="flex items-center gap-3">

              <a href="https://www.facebook.com/share/1aJRp4ja4C/?mibextid=wwXIfr" target="_blank" className="social-icon">
                <Facebook size={18} />
              </a>

              <a href="https://www.instagram.com/appboostlabs?igsh=YTI3YmFkbmlkMzg1&utm_source=qr" target="_blank" className="social-icon">
                <Instagram size={18} />
              </a>

              <a href="https://x.com/appboostlabs?s=21" target="_blank" className="social-icon">
                <Twitter size={18} />
              </a>

              <a href="https://www.tiktok.com/@appboostlabs_" target="_blank" className="social-icon">
                <Music size={18} />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} AppBoost Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
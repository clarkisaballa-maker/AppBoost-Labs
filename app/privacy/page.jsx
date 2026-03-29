import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy | AppBoost Labs',
  description: 'Privacy Policy for AppBoost Labs - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-4 text-muted-foreground">
                Last updated: March 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
                  <p className="mt-4 text-muted-foreground">
                    AppBoost Labs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                    when you visit our website or use our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
                  <p className="mt-4 text-muted-foreground">
                    We may collect information about you in a variety of ways, including:
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li><strong className="text-foreground">Personal Data:</strong> Name, email address, phone number, and other contact information you provide voluntarily.</li>
                    <li><strong className="text-foreground">Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, and pages visited.</li>
                    <li><strong className="text-foreground">Communication Data:</strong> Records of correspondence when you contact us.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
                  <p className="mt-4 text-muted-foreground">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li>To provide and maintain our services</li>
                    <li>To notify you about changes to our services</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information to improve our services</li>
                    <li>To monitor the usage of our services</li>
                    <li>To detect, prevent, and address technical issues</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">4. Disclosure of Your Information</h2>
                  <p className="mt-4 text-muted-foreground">
                    We may share information we have collected about you in certain situations:
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li><strong className="text-foreground">By Law or to Protect Rights:</strong> If we believe the release of information is necessary to respond to legal process or protect the rights, property, or safety of our users.</li>
                    <li><strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                    <li><strong className="text-foreground">Third-Party Service Providers:</strong> To help us operate our business and provide services to you.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">5. Security of Your Information</h2>
                  <p className="mt-4 text-muted-foreground">
                    We use administrative, technical, and physical security measures to help protect your personal information. 
                    While we have taken reasonable steps to secure the personal information you provide to us, 
                    please be aware that no security measures are perfect, and no method of data transmission 
                    can be guaranteed against any interception or misuse.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">6. Cookies and Tracking Technologies</h2>
                  <p className="mt-4 text-muted-foreground">
                    We may use cookies, web beacons, tracking pixels, and other tracking technologies 
                    to help customize our website and improve your experience. You can choose to have 
                    your computer warn you each time a cookie is being sent, or you can choose to 
                    turn off all cookies through your browser settings.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">7. Your Rights</h2>
                  <p className="mt-4 text-muted-foreground">
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li>The right to access your personal data</li>
                    <li>The right to rectify inaccurate personal data</li>
                    <li>The right to erasure of your personal data</li>
                    <li>The right to restrict processing of your personal data</li>
                    <li>The right to data portability</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground">8. Contact Us</h2>
                  <p className="mt-4 text-muted-foreground">
                    If you have questions or comments about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 rounded-lg bg-muted/50 p-4 text-muted-foreground">
                    <p><strong className="text-foreground">AppBoost Labs</strong></p>
                    <p>Brickell, Miami, Florida, USA</p>
                    <p>Email: contact@appboostlabs.com</p>
                    <p>Phone: +1 (305) 555-0123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { AtSign, Loader2, X, Paperclip, Sparkles, Mail, FileText, Calendar } from 'lucide-react'

const API_BASE = 'https://app-boost-labs-backend.vercel.app'

export default function EmailSenderModal() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [emailTo, setEmailTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)

  // Template states
  const [selectedTemplate, setSelectedTemplate] = useState('none') // 'none', 'welcome', 'extension'
  const [clientName, setClientName] = useState('')
  const [extensionDate, setExtensionDate] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [open])

  // Generate welcome message from template
  const generateWelcomeMessage = (name) => {
    return `Hi ${name},

We're really excited to have you join us!

Welcome to AppBoost Labs. We're looking forward to building great things together and seeing the unique impact you'll bring to the team.

As you get started, we'll make sure you have everything you need to feel comfortable and set up for success. Our team is here to support you every step of the way.

Please find your job offer letter attached with this email. Kindly review it, sign it, and send it back by replying to this email at your earliest convenience.

If you have any questions at any time, don't hesitate to reach out.

Welcome aboard, we're glad you're here!

Best regards,
AppBoost Labs`
  }

  // Generate extension approval message
  const generateExtensionMessage = (name, date) => {
    const formattedDate = date || '[Date]'

    return `Dear ${name}:

We are hereby informing you that your request for an extension regarding the AppBoost Labs node data optimization has been approved.

To ensure sufficient time to complete the project and maintain overall progress, the deadline has been officially extended to:

New Deadline: ${formattedDate}

Please ensure that all necessary steps and deliverables are completed by the above date. We will not approve any further extension requests except in exceptional circumstances.

Once you successfully complete this data optimization process, you will be able to proceed with withdrawing the relevant funds from your account.

Thank you for your cooperation and commitment to completing this process promptly and professionally. Please feel free to contact us if you have any questions or require any assistance during this period.

Thank you for your attention.

Best regards,
AppBoost Labs`
  }

  // Update message when using templates
  useEffect(() => {
    if (selectedTemplate === 'welcome' && clientName.trim()) {
      setMessage(generateWelcomeMessage(clientName.trim()))
      setSubject(`Welcome to AppBoost Labs, ${clientName.trim()}!`)
    } else if (selectedTemplate === 'extension' && clientName.trim()) {
      setMessage(generateExtensionMessage(clientName.trim(), extensionDate))
      setSubject(`Extension Approval for Node Data Optimization Deadline`)
    }
  }, [clientName, selectedTemplate, extensionDate])

  // Professional Footer HTML with Social Links
  const getFooter = () => {
    return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px; font-family: 'Segoe UI', Arial, sans-serif;">
      <!-- Top Border Gradient -->
      <tr>
        <td style="height:4px; background: linear-gradient(90deg, #0066cc 0%, #0099ff 50%, #0066cc 100%); border-radius:2px;"></td>
      </tr>
      
      <tr>
        <td style="padding-top:30px;">
          <!-- Main Footer Content -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <!-- Left Column: Logo & Company Info -->
              <td width="50%" style="vertical-align:top; padding-right:20px;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <!-- LOGO TEXT -->
              <p style="font-size:24px; font-weight:700; margin:0 0 15px 0; >
                <span style="color:#ffffff !important;">AppBoost Labs</span>
              </p>
                      
                      <!-- Tagline -->
                      <p style="font-size:14px; color:#666; margin:0 0 15px 0; line-height:1.5;">
                        Empowering businesses with innovative app growth solutions and data optimization strategies.
                      </p>
                      
                      <!-- Social Links -->
                      <table cellpadding="0" cellspacing="0" style="margin-top:10px;">
                        <tr>
                          <!-- Facebook -->
                          <td style="padding-right:8px;">
                            <a href="https://www.facebook.com/share/1aJRp4ja4C/?mibextid=wwXIfr" style="text-decoration:none;">
                              <div style="width:36px; height:36px; background:#1877F2; border-radius:8px; text-align:center; line-height:36px;">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="18" height="18" style="vertical-align:middle; filter:brightness(0) invert(1);" />
                              </div>
                            </a>
                          </td>
                          <!-- Instagram -->
                          <td style="padding-right:8px;">
                            <a href="https://www.instagram.com/appboostlabs" style="text-decoration:none;">
                              <div style="width:36px; height:36px; background:linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); border-radius:8px; text-align:center; line-height:36px;">
                                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="18" height="18" style="vertical-align:middle; filter:brightness(0) invert(1);" />
                              </div>
                            </a>
                          </td>
                          <!-- X/Twitter -->
                          <td style="padding-right:8px;">
                            <a href="https://x.com/appboostlabs" style="text-decoration:none;">
                              <div style="width:36px; height:36px; background:#000000; border-radius:8px; text-align:center; line-height:36px;">
                                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" alt="X" width="18" height="18" style="vertical-align:middle; filter:brightness(0) invert(1);" />
                              </div>
                            </a>
                          </td>
                          <!-- TikTok -->
                          <td>
                            <a href="https://www.tiktok.com/@appboostlabs_" style="text-decoration:none;">
                              <div style="width:36px; height:36px; background:#000000; border-radius:8px; text-align:center; line-height:36px;">
                                <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" width="18" height="18" style="vertical-align:middle; filter:brightness(0) invert(1);" />
                              </div>
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
              
              <!-- Right Column: Contact Details -->
              <td width="50%" style="vertical-align:top; padding-left:20px; border-left:1px solid #e5e7eb;">
                <table cellpadding="0" cellspacing="0" width="100%">
                  <!-- Address -->
                  <tr>
                    <td style="padding-bottom:15px;">
                      <div style="font-size:11px; color:#0066cc; text-transform:uppercase; letter-spacing:1.5px; font-weight:600; margin-bottom:6px;">Office Address</div>
                      <div style="font-size:14px; color:#333; line-height:1.5;">
                        1450 S Miami Ave<br/>
                        Miami, FL 33130, USA
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Phone -->
                  <tr>
                    <td style="padding-bottom:15px;">
                      <div style="font-size:11px; color:#0066cc; text-transform:uppercase; letter-spacing:1.5px; font-weight:600; margin-bottom:6px;">Phone</div>
                      <a href="tel:+13322566866" style="font-size:14px; color:#333; text-decoration:none;">+1 (332) 256-6866</a>
                    </td>
                  </tr>
                  
                  <!-- Email -->
                  <tr>
                    <td style="padding-bottom:15px;">
                      <div style="font-size:11px; color:#0066cc; text-transform:uppercase; letter-spacing:1.5px; font-weight:600; margin-bottom:6px;">Email</div>
                      <a href="mailto:contact@appboostlabs.org" style="font-size:14px; color:#0066cc; text-decoration:none;">contact@appboostlabs.org</a>
                    </td>
                  </tr>
                  
                  <!-- Website -->
                  <tr>
                    <td>
                      <div style="font-size:11px; color:#0066cc; text-transform:uppercase; letter-spacing:1.5px; font-weight:600; margin-bottom:6px;">Website</div>
                      <a href="https://www.appboostlabs.org" style="font-size:14px; color:#0066cc; text-decoration:none;">www.appboostlabs.org</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          
          <!-- Divider -->
          <div style="height:1px; background:linear-gradient(90deg, transparent, #e5e7eb, transparent); margin:25px 0;"></div>
          
          <!-- Bottom Links -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="text-align:center; padding-bottom:15px;">
                <a href="https://www.appboostlabs.org/" style="font-size:12px; color:#0066cc; text-decoration:none; margin:0 12px;">Home</a>
                <span style="color:#ccc;">|</span>
                <a href="https://www.appboostlabs.org/about" style="font-size:12px; color:#0066cc; text-decoration:none; margin:0 12px;">About Us</a>
                <span style="color:#ccc;">|</span>
                <a href="https://www.appboostlabs.org/services" style="font-size:12px; color:#0066cc; text-decoration:none; margin:0 12px;">Services</a>
                <span style="color:#ccc;">|</span>
                <a href="https://www.appboostlabs.org/contact" style="font-size:12px; color:#0066cc; text-decoration:none; margin:0 12px;">Contact</a>
                <span style="color:#ccc;">|</span>
                <a href="https://www.appboostlabs.org/privacy" style="font-size:12px; color:#0066cc; text-decoration:none; margin:0 12px;">Privacy Policy</a>
              </td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <div style="font-size:12px; color:#888; margin-bottom:8px;">
                  &copy; ${new Date().getFullYear()} AppBoost Labs. All rights reserved.
                </div>
                <div style="font-size:10px; color:#aaa; max-width:450px; margin:0 auto; line-height:1.4;">
                  This email and any attachments are confidential and intended solely for the recipient. If you received this in error, please delete it immediately.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
  }

  // Build Email HTML
  const buildEmailHTML = () => {
    const formattedMessage = message.replace(/\n/g, '<br/>')

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light">
      <meta name="supported-color-schemes" content="light">
      <style>
        :root { color-scheme: light; }
        @media (prefers-color-scheme: dark) {
          .email-wrapper, .email-wrapper * { color-scheme: light !important; }
        }
      </style>
    </head>
    <body style="margin:0; padding:0; background-color:#f8fafc; color-scheme:light;">
      <table width="100%" cellpadding="0" cellspacing="0" class="email-wrapper" style="background-color:#f8fafc; padding:30px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.05); overflow:hidden;">
              
              <!-- Header Bar -->
              <tr>
                <td style="background: linear-gradient(135deg, #0066cc 0%, #004499 100%); padding:25px 30px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="vertical-align:middle;">
                        <img 
                          src="https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776639881/logo_ciur78.png"
                          alt="AppBoost Labs"
                          width="150"
                          style="display:block; border:0;"
                        />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding:35px 30px; font-family:'Segoe UI', Arial, sans-serif; font-size:15px; line-height:1.8; color:#333;">
                  ${formattedMessage}
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding:0 30px 30px 30px;">
                  ${getFooter()}
                </td>
              </tr>
              
            </table>
            
            <!-- Reference ID (outside main card) -->
            <div style="font-size:10px; color:#bbb; margin-top:15px; text-align:center;">
              Ref: ABL-${Date.now()}
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
  }

  const handleSendEmail = async () => {
    if (!emailTo || !subject || !message) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('to', emailTo)
      formData.append('subject', subject)
      formData.append('html', buildEmailHTML())

      if (file) {
        formData.append('file', file)
      }

      const res = await fetch(`${API_BASE}/api/send-email`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to send email')
      }

      alert('Email sent successfully!')

      // reset
      setEmailTo('')
      setSubject('')
      setMessage('')
      setFile(null)
      setClientName('')
      setExtensionDate('')
      setSelectedTemplate('none')
      setOpen(false)

    } catch (err) {
      console.error(err)
      alert(err.message || 'Error sending email')
    } finally {
      setLoading(false)
    }
  }

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template)
    if (template === 'none') {
      setMessage('')
      setSubject('')
      setClientName('')
      setExtensionDate('')
    }
  }

  const modal = open ? (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">

      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="min-h-full flex items-start justify-center p-4 py-10">
        <Card className="w-full max-w-2xl rounded-2xl shadow-2xl border bg-background relative">

          {/* Header gradient */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-t-2xl" />

          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 p-1.5 hover:bg-muted rounded-lg transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <CardContent className="space-y-5 pt-6 pb-6">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Compose Email</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">Send professional emails to clients</p>
              </div>
            </div>

            {/* Template Selection */}
            <div className="space-y-3 p-4 rounded-xl bg-muted/60 backdrop-blur-sm border border-border">
              <Label className="text-sm font-medium text-foreground">Email Template</Label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                {/* Custom */}
                <div
                  onClick={() => handleTemplateChange('none')}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedTemplate === 'none'
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/40'
                    : 'border-border bg-background hover:border-blue-300'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox checked={selectedTemplate === 'none'} />
                    <div>
                      <p className="text-sm font-medium text-foreground">Custom Email</p>
                      <p className="text-xs text-muted-foreground">Write your own</p>
                    </div>
                  </div>
                </div>

                {/* Welcome */}
                <div
                  onClick={() => handleTemplateChange('welcome')}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedTemplate === 'welcome'
                    ? 'border-green-500 bg-green-100 dark:bg-green-900/40'
                    : 'border-border bg-background hover:border-green-300'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox checked={selectedTemplate === 'welcome'} />
                    <div>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-green-500" />
                        Welcome
                      </p>
                      <p className="text-xs text-muted-foreground">New employee</p>
                    </div>
                  </div>
                </div>

                {/* Extension */}
                <div
                  onClick={() => handleTemplateChange('extension')}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedTemplate === 'extension'
                    ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/40'
                    : 'border-border bg-background hover:border-amber-300'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox checked={selectedTemplate === 'extension'} />
                    <div>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <FileText className="h-3 w-3 text-amber-500" />
                        Extension
                      </p>
                      <p className="text-xs text-muted-foreground">Deadline approval</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Template Fields */}
            {selectedTemplate !== 'none' && (
              <div className="space-y-3 p-4 rounded-xl bg-muted/50 border border-border">

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Client / Employee Name
                  </Label>
                  <Input
                    placeholder="Enter name (e.g., John)"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="bg-background text-foreground border-border focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {selectedTemplate === 'extension' && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      New Deadline Date
                    </Label>
                    <Input
                      type="text"
                      value={extensionDate}
                      onChange={(e) => setExtensionDate(e.target.value)}
                      className="bg-background text-foreground border-border focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  {selectedTemplate === 'welcome'
                    ? 'The welcome message will be auto-generated with this name'
                    : 'The extension approval message will be auto-generated with these details'}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium">Recipient Email</Label>
              <Input
                placeholder="recipient@example.com"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                type="email"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Subject</Label>
              <Input
                placeholder="Email subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                readOnly={selectedTemplate !== 'none'}
                className={selectedTemplate !== 'none' ? 'bg-muted' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Message</Label>
              <Textarea
                placeholder={selectedTemplate !== 'none' ? "Message will be auto-generated..." : "Write your message..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] resize-none"
                readOnly={selectedTemplate !== 'none'}
              />
              {selectedTemplate !== 'none' && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Template mode: Message is auto-generated. Switch to Custom Email to edit manually.
                </p>
              )}
            </div>

            {/* Attachment */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Attachment (Optional)
              </Label>

              <div className="relative">
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 dark:file:bg-blue-950 dark:file:text-blue-400"
                />
              </div>

              {file && (
                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 p-2 rounded-lg">
                  <Paperclip className="h-3 w-3" />
                  {file.name}
                  <button
                    onClick={() => setFile(null)}
                    className="ml-auto text-red-500 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            <Button
              onClick={handleSendEmail}
              disabled={loading || !emailTo || !subject || !message}
              className="w-full gap-2 h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  Send Email
                </>
              )}
            </Button>

          </CardContent>
        </Card>
      </div>
    </div>
  ) : null

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
        <AtSign className="h-4 w-4" />
        Send Email
      </Button>

      {mounted ? createPortal(modal, document.body) : null}
    </>
  )
}

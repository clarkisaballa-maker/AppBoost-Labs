'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { AtSign, Loader2, X, Paperclip, Sparkles, Mail } from 'lucide-react'

const API_BASE = 'https://app-boost-labs-backend.vercel.app'

export default function EmailSenderModal() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [emailTo, setEmailTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)

  // Welcome template state
  const [useWelcomeTemplate, setUseWelcomeTemplate] = useState(false)
  const [clientName, setClientName] = useState('')

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

If you have any questions at any time, don't hesitate to reach out.

Welcome aboard, we're glad you're here!

Best regards,
John
AppBoost Labs`
  }

  // Update message when using template and client name changes
  useEffect(() => {
    if (useWelcomeTemplate && clientName.trim()) {
      const name = clientName.trim()

      setMessage(generateWelcomeMessage(name))

      setSubject(`Welcome to AppBoost Labs, ${name}!`)
    }
  }, [clientName, useWelcomeTemplate])

  // Professional Footer HTML
  const getFooter = () => {
    return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px; border-top:3px solid #0066cc; padding-top:25px; font-family: 'Segoe UI', Arial, sans-serif;">
      <tr>
        <td>
          <!-- Logo and Company Name -->
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:15px; vertical-align:middle;">
                <div style="width:50px; height:50px; background: linear-gradient(135deg, #0066cc 0%, #004499 100%); border-radius:10px; display:inline-block; text-align:center; line-height:50px;">
                  <span style="color:#fff; font-size:24px; font-weight:bold;">A</span>
                </div>
              </td>
              <td style="vertical-align:middle;">
                <div style="font-size:20px; font-weight:700; color:#0066cc; letter-spacing:-0.5px;">AppBoost Labs</div>
                <div style="font-size:12px; color:#666; margin-top:2px;">Empowering App Growth</div>
              </td>
            </tr>
          </table>
          
          <!-- Contact Info -->
          <table cellpadding="0" cellspacing="0" style="margin-top:20px;">
            <tr>
              <td style="padding-right:25px;">
                <div style="font-size:11px; color:#999; text-transform:uppercase; letter-spacing:1px; margin-bottom:5px;">Address</div>
                <div style="font-size:13px; color:#333;">1450 S Miami Ave</div>
                <div style="font-size:13px; color:#333;">Miami, FL 33130, USA</div>
              </td>
              <td style="padding-right:25px;">
                <div style="font-size:11px; color:#999; text-transform:uppercase; letter-spacing:1px; margin-bottom:5px;">Contact</div>
                <div style="font-size:13px; color:#333;">+1 (332) 256-6866</div>
                <div style="font-size:13px; color:#0066cc;">contact@appboostlabs.org</div>
              </td>
              <td>
                <div style="font-size:11px; color:#999; text-transform:uppercase; letter-spacing:1px; margin-bottom:5px;">Website</div>
                <a href="https://www.appboostlabs.org" style="font-size:13px; color:#0066cc; text-decoration:none;">www.appboostlabs.org</a>
              </td>
            </tr>
          </table>
          
          <!-- Divider -->
          <div style="height:1px; background:#e5e7eb; margin:20px 0;"></div>
          
          <!-- Links and Copyright -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <a href="https://www.appboostlabs.org/" style="font-size:12px; color:#0066cc; text-decoration:none; margin-right:20px;">Home</a>
                <a href="https://www.appboostlabs.org/about" style="font-size:12px; color:#0066cc; text-decoration:none; margin-right:20px;">About Us</a>
                <a href="https://www.appboostlabs.org/services" style="font-size:12px; color:#0066cc; text-decoration:none; margin-right:20px;">Services</a>
                <a href="https://www.appboostlabs.org/contact" style="font-size:12px; color:#0066cc; text-decoration:none; margin-right:20px;">Contact</a>
                <a href="https://www.appboostlabs.org/privacy" style="font-size:12px; color:#0066cc; text-decoration:none;">Privacy Policy</a>
              </td>
            </tr>
            <tr>
              <td style="padding-top:15px;">
                <div style="font-size:11px; color:#999;">
                  &copy; ${new Date().getFullYear()} AppBoost Labs. All rights reserved.
                </div>
                <div style="font-size:10px; color:#bbb; margin-top:5px;">
                  This email and any attachments are confidential and intended solely for the recipient.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
  }

  const handlePaste = (e) => {
    const items = e.clipboardData?.items

    if (!items) return

    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      if (item.kind === "file") {
        const pastedFile = item.getAsFile()
        if (pastedFile) {
          setFile(pastedFile)
        }
      }
    }
  }

  // Build Email HTML
  const buildEmailHTML = () => {
    const formattedMessage = message.replace(/\n/g, "<br/>")

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; background-color:#f8fafc;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; padding:30px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.05); overflow:hidden;">
              
              <!-- Header Bar -->
              <tr>
  <td style="background: linear-gradient(135deg, #0066cc 0%, #004499 100%); padding:20px 30px;">
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="vertical-align:middle;">
          <img 
            src="https://res.cloudinary.com/dm2zkwqqb/image/upload/q_auto/f_auto/v1776639881/logo_ciur78.png"
            alt="AppBoost Labs"
            width="140"
            style="display:block; border:0;"
          />
        </td>
      </tr>
    </table>
  </td>
</tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding:35px 30px; font-family:'Segoe UI', Arial, sans-serif; font-size:15px; line-height:1.7; color:#333;">
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
              Ref: ${Date.now()}
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
      setUseWelcomeTemplate(false)
      setOpen(false)

    } catch (err) {
      console.error(err)
      alert(err.message || 'Error sending email')
    } finally {
      setLoading(false)
    }
  }

  const handleTemplateToggle = (checked) => {
    setUseWelcomeTemplate(checked)
    if (!checked) {
      setMessage('')
      setSubject('')
      setClientName('')
    }
  }

  const modal = open ? (
    <div className="fixed inset-0 z-[9999]">

      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="absolute inset-0 overflow-y-auto flex justify-center p-4">
        <Card className="w-full max-w-lg rounded-2xl shadow-2xl border bg-background relative max-h-[90vh] flex flex-col">

          {/* Header gradient */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700" />

          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 p-1.5 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <CardContent className="space-y-5 pt-6 pb-6 overflow-y-auto">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Compose Email</h2>
                <p className="text-xs text-muted-foreground">Send professional emails to clients</p>
              </div>
            </div>

            {/* Welcome Template Toggle */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/50">
              <Checkbox
                id="welcome-template"
                checked={useWelcomeTemplate}
                onCheckedChange={handleTemplateToggle}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor="welcome-template" className="flex items-center gap-2 cursor-pointer text-sm">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>Use Welcome Email Template</span>
              </Label>
            </div>

            {/* Client Name Input (only when template is active) */}
            {useWelcomeTemplate && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Client Name</Label>
                <Input
                  placeholder="Enter client's name (e.g., John)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="border-blue-200 focus:border-blue-400 dark:border-blue-800"
                />
                <p className="text-xs text-muted-foreground">
                  The welcome message will be auto-generated with this name
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
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Message</Label>
              <Textarea
                placeholder={useWelcomeTemplate ? "Message will be auto-generated..." : "Write your message..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onPaste={handlePaste}
                className="min-h-[160px] resize-none"
                readOnly={useWelcomeTemplate}
              />
              {useWelcomeTemplate && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Template mode: Message is auto-generated based on client name
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

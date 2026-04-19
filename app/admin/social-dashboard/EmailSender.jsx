'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { AtSign, Loader2, X } from 'lucide-react'

const API_BASE = 'https://app-boost-labs-backend.vercel.app'

export default function EmailSenderModal() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [emailTo, setEmailTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
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

  const handleSendEmail = async () => {
    if (!emailTo || !subject || !message) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailTo,
          subject,
          html: `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111;">
      
      <p>${message}</p>

      <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />

      <div style="font-size:14px; color:#555;">
        <strong style="font-size:16px; color:#000;">AppBoost Labs</strong><br/>
        1450 S Miami Ave, Miami, FL 33130, USA<br/>
        📧 contact@appboostlabs.org
      </div>

      <div style="margin:15px 0;">
        <a href="https://www.appboostlabs.org/" style="margin-right:12px;">Home</a>
        <a href="https://www.appboostlabs.org/about" style="margin-right:12px;">About</a>
        <a href="https://www.appboostlabs.org/contact" style="margin-right:12px;">Contact</a>
        <a href="https://www.appboostlabs.org/apply" style="margin-right:12px;">Apply</a>
        <a href="https://www.appboostlabs.org/privacy" style="margin-right:12px;">Privacy</a>
        <a href="https://www.appboostlabs.org/terms">Terms</a>
      </div>

      <div style="margin-top:20px; font-size:12px; color:#999;">
        © ${new Date().getFullYear()} AppBoost Labs. All rights reserved.
      </div>

    </div>
  `
        }),
      })

      const raw = await res.text()

      let data
      try {
        data = JSON.parse(raw)
      } catch {
        throw new Error(`Server returned non-JSON response: ${raw.slice(0, 200)}`)
      }

      if (!res.ok) {
        throw new Error(data.message || 'Failed to send email')
      }

      alert('Email sent successfully!')
      setEmailTo('')
      setSubject('')
      setMessage('')
      setOpen(false)
    } catch (err) {
      console.error('Email send error:', err)
      alert(err.message || 'Failed to send email')
    } finally {
      setLoading(false)
    }
  }

  const modal = open ? (
    <div className="fixed inset-0 z-[9999]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-border bg-background relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-muted transition-colors"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>

          <CardContent className="space-y-4 pt-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AtSign className="h-5 w-5 text-blue-400" />
              Send Email
            </h2>

            <Input
              placeholder="Recipient Email"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
            />

            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <Textarea
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[140px]"
            />

            <Button
              onClick={handleSendEmail}
              disabled={loading}
              className="w-full gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Email'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : null

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2" type="button">
        <AtSign className="h-4 w-4" />
        Send Email
      </Button>

      {mounted ? createPortal(modal, document.body) : null}
    </>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { AtSign, Loader2, X, Paperclip } from 'lucide-react'

const API_BASE = 'https://app-boost-labs-backend.vercel.app'

export default function EmailSenderModal() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [emailTo, setEmailTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)

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

  // ✅ Professional HTML Email Template
  const buildEmailHTML = () => {
    return `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111;">
        
        <p style="font-size:15px;">${message}</p>

        <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />

        <div style="font-size:14px; color:#555;">
          <strong style="font-size:16px; color:#000;">AppBoost Labs</strong><br/>
          1450 S Miami Ave, Miami, FL 33130, USA<br/>
          📧 contact@appboostlabs.org
        </div>

        <div style="margin:15px 0;">
          <a href="https://www.appboostlabs.org/" style="margin-right:12px; color:#2563eb;">Home</a>
          <a href="https://www.appboostlabs.org/about" style="margin-right:12px; color:#2563eb;">About</a>
          <a href="https://www.appboostlabs.org/contact" style="margin-right:12px; color:#2563eb;">Contact</a>
          <a href="https://www.appboostlabs.org/apply" style="margin-right:12px; color:#2563eb;">Apply</a>
          <a href="https://www.appboostlabs.org/privacy" style="margin-right:12px; color:#2563eb;">Privacy</a>
          <a href="https://www.appboostlabs.org/terms" style="color:#2563eb;">Terms</a>
        </div>

        <div style="margin-top:20px; font-size:12px; color:#999;">
          © ${new Date().getFullYear()} AppBoost Labs. All rights reserved.
        </div>

      </div>
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

      const text = await res.text()

      let data
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error('Invalid server response')
      }

      if (!res.ok) {
        throw new Error(data.message || 'Failed to send email')
      }

      alert('Email sent successfully!')

      // reset form
      setEmailTo('')
      setSubject('')
      setMessage('')
      setFile(null)
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
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-border bg-background relative">
          
          {/* close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-muted"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>

          <CardContent className="space-y-4 pt-6">

            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AtSign className="h-5 w-5 text-blue-400" />
              Send Email
            </h2>

            {/* email */}
            <Input
              placeholder="Recipient Email"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
            />

            {/* subject */}
            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            {/* message */}
            <Textarea
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[140px]"
            />

            {/* attachment */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Attachment
              </label>

              <Input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />

              {file && (
                <p className="text-xs text-gray-500">
                  Selected: {file.name}
                </p>
              )}
            </div>

            {/* send button */}
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
      <Button onClick={() => setOpen(true)} className="gap-2">
        <AtSign className="h-4 w-4" />
        Send Email
      </Button>

      {mounted ? createPortal(modal, document.body) : null}
    </>
  )
}
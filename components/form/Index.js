import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Mail,
    Phone,
    Clock,
    CheckCircle2,
    MessageSquare,
    Briefcase
} from 'lucide-react'

const Index = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [phoneError, setPhoneError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        otherOccupation: '',
        phone: '',
        cityState: '',
        paymentMethod: '',
        email: '',
        workCode: ''
    })

    const formatPhoneNumber = (value) => {
        const phoneNumber = value.replace(/\D/g, '')
        const phoneNumberLength = phoneNumber.length

        if (phoneNumberLength < 4) return phoneNumber
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }

    const validateUSAPhone = (phone) => {
        const phoneNumber = phone.replace(/\D/g, '')
        if (phoneNumber.length !== 10) return false
        const firstDigit = phoneNumber[0]
        if (firstDigit === '0' || firstDigit === '1') return false
        return true
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'phone') {
            const formattedPhone = formatPhoneNumber(value)
            setFormData(prev => ({ ...prev, phone: formattedPhone }))

            const rawPhone = value.replace(/\D/g, '')
            if (rawPhone.length === 10) {
                if (!validateUSAPhone(value)) {
                    setPhoneError('Please enter a valid USA phone number')
                } else {
                    setPhoneError('')
                }
            } else if (rawPhone.length > 0) {
                setPhoneError('')
            }
            return
        }

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Phone validation
        if (!validateUSAPhone(formData.phone)) {
            setPhoneError('Please enter a valid 10-digit USA phone number')
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("https://app-boost-labs-backend.vercel.app/api/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    age: Number(formData.age) // ensure number
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong")
            }

            // ✅ Success
            setFormData({
                name: '',
                age: '',
                otherOccupation: '',
                phone: '',
                cityState: '',
                paymentMethod: '',
                email: '',
                workCode: ''   // ✅ ADD THIS
            })
            setPhoneError('')

        } catch (error) {
            console.error("Submission error:", error)
            alert(error.message || "Failed to submit application")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <CardContent>
            {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 animate-scale-in">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">Application Submitted!</h3>
                    <p className="mt-2 text-muted-foreground">
                        Thank you for applying. We&apos;ll review your application and get back to you soon.
                    </p>
                    <Button
                        className="mt-6 hover-lift"
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                    >
                        Submit Another Application
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="workCode" className="flex items-center gap-2">
                            Please enter your work code

                            <span className="relative group cursor-pointer text-primary font-bold">
                                ?

                                {/* Tooltip */}
                                <div className="absolute left-0 top-6 w-64 p-3 text-xs bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    If you are not currently working under any instructor,
                                    you may not have a work code.
                                    <br /><br />
                                    This means you need to apply for the job first.
                                    <br /><br />
                                    👉 <a href="/apply" className="underline text-blue-300">
                                        Click here to apply
                                    </a>
                                </div>
                            </span>
                        </Label>
                        <Input
                            id="workCode"
                            name="workCode"
                            placeholder="Work code"
                            value={formData.workCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            name="age"
                            type="number"
                            placeholder="Enter your age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="otherOccupation">Other Occupation</Label>
                        <Input
                            id="otherOccupation"
                            name="otherOccupation"
                            placeholder="Your current occupation (if any)"
                            value={formData.otherOccupation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (USA)</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            maxLength={14}
                            className={phoneError ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {phoneError && (
                            <p className="text-sm text-red-500">{phoneError}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cityState">Current City/State</Label>
                        <Input
                            id="cityState"
                            name="cityState"
                            placeholder="e.g., Miami, FL"
                            value={formData.cityState}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Do you use Cash App or PayPal?</Label>
                        <Input
                            id="paymentMethod"
                            name="paymentMethod"
                            placeholder="Cash App / PayPal / Both"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        <strong>Note:</strong> Rest assured, all information will be kept strictly confidential and used only for payment purposes. Your privacy and data security are our top priority.
                    </p>
                    <Button type="submit" className="w-full hover-lift" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </form>
            )}
        </CardContent>
    )
}

export default Index

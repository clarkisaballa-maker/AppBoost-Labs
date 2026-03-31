'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Users,
  LogOut,
  Eye,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CreditCard,
  Calendar,
  ExternalLink,
  Search,
  RefreshCw
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Form submissions data
  const [submissions, setSubmissions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFetching, setIsFetching] = useState(false)

  const fetchSubmissions = async (pageNumber = 1) => {
    setIsFetching(true)
    try {
      const res = await fetch(`https://app-boost-labs-backend.vercel.app/api/applications?page=${pageNumber}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Failed to fetch submissions')

      setSubmissions(data.applications)
      setPage(data.page)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error('Error fetching submissions:', err)
      alert(err.message || 'Failed to fetch submissions')
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchSubmissions(page)
  }, [page])

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    const authTime = sessionStorage.getItem('adminAuthTime')

    if (auth === 'true' && authTime) {
      const elapsed = Date.now() - parseInt(authTime)
      if (elapsed < 2 * 60 * 60 * 1000) {
        setIsAuthenticated(true)
      } else {
        sessionStorage.removeItem('adminAuth')
        sessionStorage.removeItem('adminAuthTime')
        router.push('/admin/login')
      }
    } else {
      router.push('/admin/login')
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    sessionStorage.removeItem('adminAuthTime')
    router.push('/admin/login')
  }

  const filteredSubmissions = submissions.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.phone.includes(searchTerm) ||
    sub.cityState.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg gradient-text">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">AppBoost Labs - Form Submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                View Site
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
       
        {/* Submissions List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Form Submissions</CardTitle>
                <CardDescription>Users who filled out the application form</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No submissions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => (
                  <Card key={submission.id} className="bg-muted/30 hover:bg-muted/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Users className="h-3 w-3" />
                            Name & Age
                          </div>
                          <p className="font-semibold">{submission.name}</p>
                          <p className="text-sm text-muted-foreground">Age: {submission.age}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Mail className="h-3 w-3" />
                            Email
                          </div>
                          <p className="font-medium text-sm break-all">{submission.email}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Phone className="h-3 w-3" />
                            Phone
                          </div>
                          <p className="font-medium">{submission.phone}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <MapPin className="h-3 w-3" />
                            Location
                          </div>
                          <p className="font-medium">{submission.cityState}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Briefcase className="h-3 w-3" />
                            Other Occupation
                          </div>
                          <p className="font-medium">{submission.otherOccupation || 'N/A'}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <CreditCard className="h-3 w-3" />
                            Payment Method
                          </div>
                          <p className="font-medium">{submission.paymentMethod}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Calendar className="h-3 w-3" />
                            WorkCode
                          </div>
                          <p className="font-medium text-sm">{submission.workCode}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Calendar className="h-3 w-3" />
                            Date/Time
                          </div>
                          <p className="font-medium text-sm">{submission.createdAt}</p>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="px-2 py-1 bg-muted/20 rounded">{page} / {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages || isFetching}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

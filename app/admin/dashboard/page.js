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
  RefreshCw,
  FileText,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react'
import moment from 'moment-timezone'

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
  const [notesMap, setNotesMap] = useState({})
  const [savingNotes, setSavingNotes] = useState({})

  // Called when textarea changes - use _id consistently
  const handleNotesChange = (id, value) => {
    setNotesMap((prev) => ({ ...prev, [id]: value }))
  }

  const updateNotes = async (id) => {
  setSavingNotes(prev => ({ ...prev, [id]: true }));
  try {
    // Use the updated note if available, otherwise keep the current note
    const currentSubmission = submissions.find(sub => sub._id === id);
    const updatedNotes = notesMap[id] !== undefined ? notesMap[id] : currentSubmission?.notes ?? "";

    const res = await fetch("https://app-boost-labs-backend.vercel.app/api/applications/updateNotes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes: updatedNotes }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update notes");

    // Update local submissions state
    setSubmissions((prev) =>
      prev.map((sub) => (sub._id === id ? { ...sub, notes: updatedNotes } : sub))
    );
  } catch (err) {
    console.error("Error updating notes:", err.message);
    alert(err.message || "Error updating notes");
  } finally {
    setSavingNotes(prev => ({ ...prev, [id]: false }));
  }
};

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
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/10">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-xl">
                <span className="gradient-text">Admin Dashboard</span>
              </h1>
              <p className="text-sm text-muted-foreground">AppBoost Labs Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="gap-2 hover-lift">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">View Site</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="gap-2 hover-lift">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Submissions List */}
        <Card className="glass border-border/50 overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Form Submissions
                </CardTitle>
                <CardDescription className="mt-1">View and manage all application submissions</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-background/50 border-border/50 focus:border-primary/50"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => fetchSubmissions(page)}
                  disabled={isFetching}
                  className="hover-lift"
                >
                  <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                  <Users className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">No submissions found</p>
                <p className="text-sm text-muted-foreground/70 mt-1">New submissions will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map((submission, index) => (
                  <Card 
                    key={submission._id} 
                    className="bg-gradient-to-br from-muted/30 to-muted/10 border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardContent className="pt-6">
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Name & Age */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <Users className="h-3.5 w-3.5" />
                            Name & Age
                          </div>
                          <p className="font-semibold text-lg">{submission.name}</p>
                          <p className="text-sm text-muted-foreground">Age: {submission.age}</p>
                        </div>
                        
                        {/* Email */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <Mail className="h-3.5 w-3.5" />
                            Email
                          </div>
                          <p className="font-medium text-sm break-all text-primary/90">{submission.email}</p>
                        </div>
                        
                        {/* Phone */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <Phone className="h-3.5 w-3.5" />
                            Phone
                          </div>
                          <p className="font-medium">{submission.phone}</p>
                        </div>
                        
                        {/* Location */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <MapPin className="h-3.5 w-3.5" />
                            Location
                          </div>
                          <p className="font-medium">{submission.cityState}</p>
                        </div>
                        
                        {/* Occupation */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <Briefcase className="h-3.5 w-3.5" />
                            Occupation
                          </div>
                          <p className="font-medium">{submission.otherOccupation || 'N/A'}</p>
                        </div>
                        
                        {/* Payment Method */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <CreditCard className="h-3.5 w-3.5" />
                            Payment
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {submission.paymentMethod}
                          </span>
                        </div>
                        
                        {/* WorkCode */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <FileText className="h-3.5 w-3.5" />
                            WorkCode
                          </div>
                          <p className="font-mono text-sm bg-muted/50 px-2 py-1 rounded inline-block">{submission.workCode}</p>
                        </div>
                        
                        {/* Date/Time */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <Calendar className="h-3.5 w-3.5" />
                            Submitted
                          </div>
                          <p className="font-medium text-sm">
                            {moment(submission.updatedAt)
                              .tz("America/New_York")
                              .format("MMM D, YYYY")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {moment(submission.updatedAt)
                              .tz("America/New_York")
                              .format("h:mm A [ET]")}
                          </p>
                        </div>

                      </div>
                      
                      {/* Notes field - Full Width */}
                      <div className="mt-6 pt-6 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                          <FileText className="h-3.5 w-3.5" />
                          Admin Notes
                        </div>
                        <textarea
                          value={notesMap[submission._id] ?? submission.notes ?? ""}
                          onChange={(e) => handleNotesChange(submission._id, e.target.value)}
                          className="w-full p-4 rounded-xl border border-border/50 bg-background/80 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50 min-h-[120px]"
                          rows={4}
                          placeholder="Add notes about this submission..."
                        />
                        <div className="flex justify-end mt-3">
                          <Button
                            onClick={() => updateNotes(submission._id)}
                            disabled={savingNotes[submission._id]}
                            className="hover-lift gap-2"
                          >
                            {savingNotes[submission._id] ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              'Save Notes'
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Pagination */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage(page - 1)}
            className="gap-2 hover-lift"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1 px-4 py-2 rounded-lg bg-muted/30 border border-border/50">
            <span className="text-sm text-muted-foreground">Page</span>
            <span className="font-bold text-primary mx-1">{page}</span>
            <span className="text-sm text-muted-foreground">of</span>
            <span className="font-bold mx-1">{totalPages}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages || isFetching}
            onClick={() => setPage(page + 1)}
            className="gap-2 hover-lift"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

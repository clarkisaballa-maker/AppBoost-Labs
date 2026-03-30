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
  const [submissions] = useState([
    { 
      id: 1, 
      name: 'John Smith', 
      age: '28',
      otherOccupation: 'Freelance Designer',
      phone: '(555) 123-4567', 
      cityState: 'Miami, FL',
      paymentMethod: 'Cash App',
      email: 'john.smith@email.com', 
      submittedAt: '2024-03-28 10:30 AM',
      source: 'Homepage'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      age: '32',
      otherOccupation: 'Teacher',
      phone: '(555) 234-5678', 
      cityState: 'Orlando, FL',
      paymentMethod: 'PayPal',
      email: 'sarah.j@email.com', 
      submittedAt: '2024-03-28 11:45 AM',
      source: 'Contact Page'
    },
    { 
      id: 3, 
      name: 'Mike Williams', 
      age: '25',
      otherOccupation: 'Student',
      phone: '(555) 345-6789', 
      cityState: 'Tampa, FL',
      paymentMethod: 'Both',
      email: 'mike.w@email.com', 
      submittedAt: '2024-03-27 02:15 PM',
      source: 'Homepage'
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      age: '29',
      otherOccupation: 'Marketing Manager',
      phone: '(555) 456-7890', 
      cityState: 'Jacksonville, FL',
      paymentMethod: 'Cash App',
      email: 'emily.d@email.com', 
      submittedAt: '2024-03-27 04:20 PM',
      source: 'Contact Page'
    },
    { 
      id: 5, 
      name: 'Robert Brown', 
      age: '35',
      otherOccupation: 'None',
      phone: '(555) 567-8901', 
      cityState: 'Fort Lauderdale, FL',
      paymentMethod: 'PayPal',
      email: 'robert.b@email.com', 
      submittedAt: '2024-03-26 09:00 AM',
      source: 'Homepage'
    },
  ])

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
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Submissions</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{submissions.length}</div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">From Homepage</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{submissions.filter(s => s.source === 'Homepage').length}</div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">From Contact Page</CardTitle>
              <Users className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{submissions.filter(s => s.source === 'Contact Page').length}</div>
            </CardContent>
          </Card>
        </div>

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
                            Submitted
                          </div>
                          <p className="font-medium text-sm">{submission.submittedAt}</p>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Source</div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            submission.source === 'Homepage' 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-accent/20 text-accent'
                          }`}>
                            {submission.source}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

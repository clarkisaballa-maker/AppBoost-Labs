'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Users,
  LogOut,
  Eye,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Search,
  RefreshCw,
  FileText,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Trash2,
  AlertTriangle,
  X,
  Loader2,
  AtSign,
  MessageSquare,
  Globe,
  Filter,
  Save
} from 'lucide-react'
import moment from 'moment-timezone'
import EmailSenderModal from './EmailSender'

const API_BASE = 'https://app-boost-labs-backend.vercel.app'

export default function SocialDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Form submissions data
  const [submissions, setSubmissions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [notesMap, setNotesMap] = useState({})
  const [savingNotes, setSavingNotes] = useState({})

  // Source filter
  const [sourceFilter, setSourceFilter] = useState('')

  // Date filter state
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isDateFiltering, setIsDateFiltering] = useState(false)
  const [filteredCount, setFilteredCount] = useState(0)
  const [activeFilterLabel, setActiveFilterLabel] = useState('')

  // Phone search state
  const [phoneSearchTerm, setPhoneSearchTerm] = useState('')
  const [isPhoneSearching, setIsPhoneSearching] = useState(false)
  const [phoneSearchResult, setPhoneSearchResult] = useState(null)
  const [phoneSearchError, setPhoneSearchError] = useState('')

  // Helper functions for date formatting - Using USA Eastern Time
  const getUSAEasternDate = () => {
    const now = new Date()
    const usaDateStr = now.toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    const [month, day, year] = usaDateStr.split('/')
    return new Date(year, month - 1, day)
  }

  const formatDateToAPI = (date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDateToUSA = (dateStr) => {
    if (!dateStr) return ''
    const [year, month, day] = dateStr.split('-')
    return `${month}/${day}/${year}`
  }

  const getQuickDateRange = (type) => {
    const today = getUSAEasternDate()
    let start, end, label

    switch (type) {
      case 'today':
        start = end = formatDateToAPI(today)
        label = 'Today (ET)'
        break
      case 'yesterday':
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        start = end = formatDateToAPI(yesterday)
        label = 'Yesterday (ET)'
        break
      case 'thisWeek':
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay())
        start = formatDateToAPI(startOfWeek)
        end = formatDateToAPI(today)
        label = 'This Week (ET)'
        break
      case 'lastWeek':
        const lastWeekEnd = new Date(today)
        lastWeekEnd.setDate(today.getDate() - today.getDay() - 1)
        const lastWeekStart = new Date(lastWeekEnd)
        lastWeekStart.setDate(lastWeekEnd.getDate() - 6)
        start = formatDateToAPI(lastWeekStart)
        end = formatDateToAPI(lastWeekEnd)
        label = 'Last Week (ET)'
        break
      case 'thisMonth':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        start = formatDateToAPI(startOfMonth)
        end = formatDateToAPI(today)
        label = 'This Month (ET)'
        break
      case 'last7Days':
        const last7 = new Date(today)
        last7.setDate(today.getDate() - 6)
        start = formatDateToAPI(last7)
        end = formatDateToAPI(today)
        label = 'Last 7 Days (ET)'
        break
      case 'last30Days':
        const last30 = new Date(today)
        last30.setDate(today.getDate() - 29)
        start = formatDateToAPI(last30)
        end = formatDateToAPI(today)
        label = 'Last 30 Days (ET)'
        break
      default:
        return null
    }
    return { start, end, label }
  }

  const applyQuickFilter = (type) => {
    const range = getQuickDateRange(type)
    if (range) {
      setStartDate(range.start)
      setEndDate(range.end)
      setActiveFilterLabel(range.label)
      fetchSubmissionsByDateRange(range.start, range.end, range.label)
    }
  }

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, name: '' })
  const [isDeleting, setIsDeleting] = useState(false)

  // Error state for API issues
  const [apiError, setApiError] = useState(null)

  // Called when textarea changes
  const handleNotesChange = (id, value) => {
    setNotesMap((prev) => ({ ...prev, [id]: value }))
  }

  const updateNotes = async (id) => {
    setSavingNotes(prev => ({ ...prev, [id]: true }))
    try {
      const currentSubmission = submissions.find(sub => sub._id === id)
      const updatedNotes = notesMap[id] !== undefined ? notesMap[id] : currentSubmission?.notes ?? ""

      const res = await fetch(`${API_BASE}/api/applications/updateNotes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: updatedNotes }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Failed to update notes")

      setSubmissions((prev) =>
        prev.map((sub) => (sub._id === id ? { ...sub, notes: updatedNotes } : sub))
      )
    } catch (err) {
      console.error("Error updating notes:", err.message)
      alert(err.message || "Error updating notes")
    } finally {
      setSavingNotes(prev => ({ ...prev, [id]: false }))
    }
  }

  const fetchSubmissions = async (pageNumber = 1, isInitial = false) => {
    if (isInitial) {
      setIsInitialLoading(true)
    }
    setIsFetching(true)
    setApiError(null)
    try {
      let url = `${API_BASE}/api/applications/social?page=${pageNumber}`
      if (sourceFilter) {
        url += `&source=${sourceFilter}`
      }
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Failed to fetch submissions')
      }

      const data = await res.json()
      setSubmissions(data.applications || [])
      setPage(data.page || 1)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      console.error('Error fetching submissions:', err)
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        setApiError('Unable to connect to server. This may be due to network restrictions in the preview environment. The dashboard will work correctly when deployed.')
      } else {
        setApiError(err.message || 'Unable to connect to server. Please check your connection.')
      }
      setSubmissions([])
    } finally {
      setIsFetching(false)
      setIsInitialLoading(false)
    }
  }

  const fetchSubmissionsByDate = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates')
      return
    }
    setActiveFilterLabel(`${formatDateToUSA(startDate)} - ${formatDateToUSA(endDate)}`)
    await fetchSubmissionsByDateRange(startDate, endDate, `${formatDateToUSA(startDate)} - ${formatDateToUSA(endDate)}`)
  }

  const fetchSubmissionsByDateRange = async (start, end, label = '') => {
    setIsDateFiltering(true)
    setIsFetching(true)
    setApiError(null)
    setActiveFilterLabel(label)
    try {
      let url = `${API_BASE}/api/applications/social/by-date?startDate=${start}&endDate=${end}`
      if (sourceFilter) {
        url += `&source=${sourceFilter}`
      }
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Failed to fetch submissions by date')
      }

      const data = await res.json()
      const apps = data.applications || []
      setSubmissions(apps)
      setFilteredCount(apps.length)
      setPage(1)
      setTotalPages(1)
    } catch (err) {
      console.error('Error fetching submissions by date:', err)
      setApiError(err.message || 'Unable to connect to server. Please check your connection.')
      setSubmissions([])
      setFilteredCount(0)
    } finally {
      setIsFetching(false)
    }
  }

  const clearDateFilter = () => {
    setStartDate('')
    setEndDate('')
    setIsDateFiltering(false)
    setFilteredCount(0)
    setActiveFilterLabel('')
    fetchSubmissions(1, true)
  }

  const clearAllFilters = () => {
    setStartDate('')
    setEndDate('')
    setSourceFilter('')
    setIsDateFiltering(false)
    setFilteredCount(0)
    setActiveFilterLabel('')
    fetchSubmissions(1, true)
  }

  // Phone Search
  const searchByPhone = async () => {
    if (!phoneSearchTerm.trim()) {
      setPhoneSearchError('Please enter a phone number')
      return
    }
    
    setIsPhoneSearching(true)
    setPhoneSearchError('')
    setPhoneSearchResult(null)
    
    try {
      const res = await fetch(`${API_BASE}/api/applications/search-by-phone?phone=${encodeURIComponent(phoneSearchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'No application found with this phone number')
      }

      // Show the result in the normal table
      setPhoneSearchResult(data.data)
      setSubmissions([data.data])
      setTotalPages(1)
    } catch (err) {
      console.error('Error searching by phone:', err)
      setPhoneSearchError(err.message || 'Error searching by phone number')
    } finally {
      setIsPhoneSearching(false)
    }
  }

  const clearPhoneSearch = () => {
    setPhoneSearchTerm('')
    setPhoneSearchResult(null)
    setPhoneSearchError('')
    // Reload normal submissions
    fetchSubmissions(1, true)
  }

  // Delete handlers
  const handleDeleteClick = (id, name) => {
    setDeleteConfirm({ open: true, id, name })
  }

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return

    setIsDeleting(true)
    try {
      const res = await fetch(`${API_BASE}/api/applications/${deleteConfirm.id}`, { method: 'DELETE' })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Failed to delete')

      setSubmissions(prev => prev.filter(sub => sub._id !== deleteConfirm.id))
      setDeleteConfirm({ open: false, id: null, name: '' })
    } catch (err) {
      console.error('Error deleting:', err)
      alert(err.message || 'Error deleting')
    } finally {
      setIsDeleting(false)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirm({ open: false, id: null, name: '' })
  }

  // Get location from IP address
  const getLocationFromIP = (ipAddress) => {
    if (!ipAddress) return 'Unknown'
    // In a real implementation, you would use a geolocation API
    // For now, we'll just display the IP
    return ipAddress
  }

  // Get source label
  const getSourceLabel = (source) => {
    switch (source) {
      case 'fb':
        return { label: 'Facebook', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
      case 'tk':
        return { label: 'TikTok', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' }
      default:
        return { label: source || 'Unknown', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
    }
  }

  useEffect(() => {
    if (isDateFiltering) {
      fetchSubmissionsByDateRange(startDate, endDate, activeFilterLabel)
    } else {
      fetchSubmissions(page, page === 1)
    }
  }, [page, sourceFilter])

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    const authTime = sessionStorage.getItem('adminAuthTime')
    const dashboardType = sessionStorage.getItem('adminDashboardType')

    if (auth === 'true' && authTime && dashboardType === 'social') {
      const elapsed = Date.now() - parseInt(authTime)
      if (elapsed < 2 * 60 * 60 * 1000) {
        setIsAuthenticated(true)
      } else {
        sessionStorage.removeItem('adminAuth')
        sessionStorage.removeItem('adminAuthTime')
        sessionStorage.removeItem('adminDashboardType')
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
    sessionStorage.removeItem('adminDashboardType')
    router.push('/admin/login')
  }

  const filteredSubmissions = submissions.filter(sub =>
    sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.phone?.includes(searchTerm) ||
    sub.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.salesPersonTg?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.ipAddress?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate duplicate IPs
  const getDuplicateIPs = () => {
    const ipCounts = {}
    filteredSubmissions.forEach(sub => {
      if (sub.ipAddress) {
        ipCounts[sub.ipAddress] = (ipCounts[sub.ipAddress] || 0) + 1
      }
    })
    // Only return IPs with more than 1 occurrence
    return Object.entries(ipCounts)
      .filter(([ip, count]) => count > 1)
      .sort((a, b) => b[1] - a[1]) // Sort by count descending
  }

  const duplicateIPs = getDuplicateIPs()

  // Calculate leads per sales person
  const getLeadsPerSalesPerson = () => {
    const salesPersonCounts = {}
    filteredSubmissions.forEach(sub => {
      const tg = sub.salesPersonTg || 'Unassigned'
      salesPersonCounts[tg] = (salesPersonCounts[tg] || 0) + 1
    })
    return Object.entries(salesPersonCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by count descending
  }

  const leadsPerSalesPerson = getLeadsPerSalesPerson()

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
      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={cancelDelete}
          />
          <div className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={cancelDelete}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>

              <h3 className="text-xl font-bold mb-2">Delete Application</h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete <span className="font-semibold text-foreground">{deleteConfirm.name}</span>? This action cannot be undone.
              </p>

              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={cancelDelete}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 gap-2"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-blue-500/20 flex items-center justify-center border border-pink-500/20 shadow-lg shadow-pink-500/10">
              <Globe className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <h1 className="font-bold text-xl">
                <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">Social Dashboard</span>
              </h1>
              <p className="text-sm text-muted-foreground">AppBoost Labs - Social Media Applications</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <EmailSenderModal />
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

      <div className="p-6 max-w-7xl mx-auto space-y-6 relative z-10">
        <Card className="glass border-border/50 overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/20">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-5 w-5 text-pink-400" />
                    Social Applications
                    {isDateFiltering && (
                      <span className="text-xs font-normal bg-pink-500/10 text-pink-400 px-2 py-1 rounded-full">
                        Filtered by Date
                      </span>
                    )}
                    {sourceFilter && (
                      <span className={`text-xs font-normal px-2 py-1 rounded-full border ${getSourceLabel(sourceFilter).color}`}>
                        {getSourceLabel(sourceFilter).label}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">View and manage social media campaign applications (TikTok, Facebook)</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-background/50 border-border/50 focus:border-pink-500/50"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => isDateFiltering ? fetchSubmissionsByDate() : fetchSubmissions(page)}
                    disabled={isFetching}
                    className="hover-lift"
                  >
                    <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Source Filter */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/30">
                <span className="text-sm text-muted-foreground mr-2 flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  Source:
                </span>
                <Button
                  variant={sourceFilter === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setSourceFilter(''); setPage(1) }}
                  disabled={isFetching}
                  className="text-xs"
                >
                  All
                </Button>
                <Button
                  variant={sourceFilter === 'fb' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setSourceFilter('fb'); setPage(1) }}
                  disabled={isFetching}
                  className="text-xs"
                >
                  Facebook
                </Button>
                <Button
                  variant={sourceFilter === 'tk' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setSourceFilter('tk'); setPage(1) }}
                  disabled={isFetching}
                  className="text-xs"
                >
                  TikTok
                </Button>
              </div>

              {/* Quick Date Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/30">
                <span className="text-sm text-muted-foreground mr-2">Quick Filters:</span>
                <Button
                  variant={activeFilterLabel === 'Today (ET)' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => applyQuickFilter('today')}
                  disabled={isFetching}
                  className="text-xs"
                >
                  Today
                </Button>
                <Button
                  variant={activeFilterLabel === 'Yesterday (ET)' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => applyQuickFilter('yesterday')}
                  disabled={isFetching}
                  className="text-xs"
                >
                  Yesterday
                </Button>
                <Button
                  variant={activeFilterLabel === 'This Week (ET)' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => applyQuickFilter('thisWeek')}
                  disabled={isFetching}
                  className="text-xs"
                >
                  This Week
                </Button>
                <Button
                  variant={activeFilterLabel === 'Last Week (ET)' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => applyQuickFilter('lastWeek')}
                  disabled={isFetching}
                  className="text-xs"
                >
                  Last Week
                </Button>
                <Button
                  variant={activeFilterLabel === 'Last 7 Days (ET)' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => applyQuickFilter('last7Days')}
                  disabled={isFetching}
                  className="text-xs"
                >
                  Last 7 Days
                </Button>
                <Button
                  variant={activeFilterLabel === 'This Month (ET)' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => applyQuickFilter('thisMonth')}
                  disabled={isFetching}
                  className="text-xs"
                >
                  This Month
                </Button>
                <Button
                  variant={activeFilterLabel === 'Last 30 Days (ET)' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => applyQuickFilter('last30Days')}
                  disabled={isFetching}
                  className="text-xs"
                >
                  Last 30 Days
                </Button>
              </div>

              {/* Custom Date Filter Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 border-t border-border/30">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Custom Range:</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="startDate" className="text-sm text-muted-foreground">From:</Label>
                    <div className="relative">
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-40 bg-background/50 border-border/50 focus:border-pink-500/50"
                      />
                      {startDate && (
                        <span className="absolute -top-5 left-0 text-xs text-pink-400">
                          {formatDateToUSA(startDate)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="endDate" className="text-sm text-muted-foreground">To:</Label>
                    <div className="relative">
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-40 bg-background/50 border-border/50 focus:border-pink-500/50"
                      />
                      {endDate && (
                        <span className="absolute -top-5 left-0 text-xs text-pink-400">
                          {formatDateToUSA(endDate)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={fetchSubmissionsByDate}
                      disabled={isFetching || !startDate || !endDate}
                      size="sm"
                      className="gap-2"
                    >
                      {isFetching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      Apply
                    </Button>
                    {(isDateFiltering || sourceFilter) && (
                      <Button
                        onClick={clearAllFilters}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        disabled={isFetching}
                      >
                        <X className="h-4 w-4" />
                        Clear All
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Filter Results Info */}
              {isDateFiltering && (
                <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2 bg-pink-500/10 text-pink-400 px-3 py-1.5 rounded-full text-sm">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{activeFilterLabel}</span>
                    <span className="bg-pink-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                      {filteredCount} {filteredCount === 1 ? 'entry' : 'entries'} found
                    </span>
                  </div>
                </div>
              )}

              {/* Search Results Count */}
              {searchTerm && (
                <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full text-sm">
                    <Search className="h-4 w-4" />
                    <span className="font-medium">Search: &quot;{searchTerm}&quot;</span>
                    <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                      {filteredSubmissions.length} {filteredSubmissions.length === 1 ? 'result' : 'results'} found
                    </span>
                  </div>
                </div>
              )}

              {/* Duplicate IPs Section */}
              {(isDateFiltering || searchTerm) && duplicateIPs.length > 0 && (
                <div className="pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-medium text-amber-400">Duplicate IP Addresses Detected</span>
                    <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full text-xs font-bold border border-amber-500/30">
                      {duplicateIPs.length} duplicate {duplicateIPs.length === 1 ? 'IP' : 'IPs'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {duplicateIPs.map(([ip, count]) => (
                      <div 
                        key={ip} 
                        className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg text-sm cursor-pointer hover:bg-amber-500/20 transition-colors"
                        onClick={() => setSearchTerm(ip)}
                        title="Click to search for this IP"
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="font-mono text-xs">{ip}</span>
                        <span className="bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                          {count}x
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Leads Per Sales Person Section */}
              {(isDateFiltering || searchTerm) && leadsPerSalesPerson.length > 0 && (
                <div className="pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Leads Per Sales Person</span>
                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-bold border border-green-500/30">
                      {leadsPerSalesPerson.length} {leadsPerSalesPerson.length === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {leadsPerSalesPerson.map(([tgUsername, count]) => (
                      <div 
                        key={tgUsername} 
                        className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-300 px-3 py-1.5 rounded-lg text-sm cursor-pointer hover:bg-green-500/20 transition-colors"
                        onClick={() => setSearchTerm(tgUsername === 'Unassigned' ? '' : tgUsername)}
                        title="Click to search for this sales person"
                      >
                        <AtSign className="h-3.5 w-3.5" />
                        <span className="font-medium text-xs">{tgUsername}</span>
                        <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                          {count} {count === 1 ? 'lead' : 'leads'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phone Search Section */}
              <div className="pt-2 border-t border-border/30">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-muted-foreground">Search by Phone:</span>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter phone number..."
                      value={phoneSearchTerm}
                      onChange={(e) => setPhoneSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchByPhone()}
                      className="pl-10 w-52 bg-background/50 border-border/50 focus:border-pink-500/50"
                    />
                  </div>
                  <Button
                    onClick={searchByPhone}
                    disabled={isPhoneSearching || !phoneSearchTerm.trim()}
                    size="sm"
                    className="gap-2"
                  >
                    {isPhoneSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    Search
                  </Button>
                  {(phoneSearchResult || phoneSearchError) && (
                    <Button
                      onClick={clearPhoneSearch}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Phone Search Error */}
                {phoneSearchError && (
                  <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {phoneSearchError}
                  </div>
                )}

                {/* Phone Search Success Info */}
                {phoneSearchResult && (
                  <div className="mt-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Found 1 application matching phone number. Showing result below.</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {isInitialLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative mb-6">
                  <div className="w-20 h-20 border-4 border-pink-500/20 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="text-lg font-medium text-muted-foreground">Loading Records</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Please wait while we fetch the submissions...</p>
              </div>
            ) : apiError ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>
                <p className="text-lg font-medium text-foreground">Connection Error</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">{apiError}</p>
                <Button
                  onClick={() => fetchSubmissions(page, true)}
                  className="mt-6 gap-2"
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Retry Connection
                </Button>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                  <Users className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">No submissions found</p>
                <p className="text-sm text-muted-foreground/70 mt-1">New submissions will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map((submission, index) => {
                  const sourceInfo = getSourceLabel(submission.source)
                  return (
                    <Card
                      key={submission._id}
                      className="bg-gradient-to-br from-muted/30 to-muted/10 border-border/50 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/5 transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${sourceInfo.color}`}>
                            {sourceInfo.label}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-2"
                            onClick={() => handleDeleteClick(submission._id, submission.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              <Users className="h-3.5 w-3.5" />
                              Name & Age
                            </div>
                            <p className="font-semibold text-lg">{submission.name}</p>
                            <p className="text-sm text-muted-foreground">Age: {submission.age}</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              <Phone className="h-3.5 w-3.5" />
                              Phone
                            </div>
                            <p className="font-medium">{submission.phone}</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              <Globe className="h-3.5 w-3.5" />
                              IP Address / Location
                            </div>
                            <p className="font-medium text-sm">{submission.ipAddress || 'Not captured'}</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              <AtSign className="h-3.5 w-3.5" />
                              Sales Person TG
                            </div>
                            <p className="font-medium text-sm text-pink-400">{submission.salesPersonTg || 'Not assigned'}</p>
                          </div>
                        </div>

                        {/* Message */}
                        {submission.message && (
                          <div className="mt-4 pt-4 border-t border-border/30">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                              <MessageSquare className="h-3.5 w-3.5" />
                              Message
                            </div>
                            <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">{submission.message}</p>
                          </div>
                        )}

                        {/* Notes Section */}
                        <div className="mt-4 pt-4 border-t border-border/30">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                            <FileText className="h-3.5 w-3.5" />
                            Notes
                          </div>
                          <div className="flex gap-2">
                            <Textarea
                              value={notesMap[submission._id] !== undefined ? notesMap[submission._id] : submission.notes || ''}
                              onChange={(e) => handleNotesChange(submission._id, e.target.value)}
                              placeholder="Add notes about this application..."
                              className="min-h-[80px] bg-background/50 border-border/50 focus:border-pink-500/50"
                            />
                            <Button
                              size="sm"
                              onClick={() => updateNotes(submission._id)}
                              disabled={savingNotes[submission._id]}
                              className="self-end"
                            >
                              {savingNotes[submission._id] ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                'Save'
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Timestamp */}
                        <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {submission.createdAt
                              ? moment(submission.createdAt).tz('America/New_York').format('MMM DD, YYYY [at] hh:mm A [ET]')
                              : 'Date not available'}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Pagination */}
            {!isInitialLoading && !apiError && filteredSubmissions.length > 0 && !isDateFiltering && (
              <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-border/30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || isFetching}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Page</span>
                  <span className="font-semibold bg-muted px-3 py-1 rounded-lg">{page}</span>
                  <span className="text-muted-foreground">of</span>
                  <span className="font-semibold">{totalPages}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || isFetching}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

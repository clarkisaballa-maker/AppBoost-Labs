'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  LayoutDashboard,
  Trash2,
  AlertTriangle,
  X,
  Loader2,
  UserPlus,
  AtSign,
  Edit3,
  Check
} from 'lucide-react'
import moment from 'moment-timezone'

const API_BASE = 'https://app-boost-labs-backend.vercel.app'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('submissions')
  const [searchTerm, setSearchTerm] = useState('')

  // Form submissions data
  const [submissions, setSubmissions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [notesMap, setNotesMap] = useState({})
  const [savingNotes, setSavingNotes] = useState({})

  // Date filter state
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isDateFiltering, setIsDateFiltering] = useState(false)
  const [filteredCount, setFilteredCount] = useState(0)
  const [activeFilterLabel, setActiveFilterLabel] = useState('')

  // Helper functions for date formatting - Using USA Eastern Time
  const getUSAEasternDate = () => {
    // Get current date in USA Eastern Time
    const now = new Date()
    const usaDateStr = now.toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    // Parse MM/DD/YYYY format
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
    // Use USA Eastern Time for all date calculations
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

  // Sales persons data
  const [salesPersons, setSalesPersons] = useState([])
  const [isFetchingSales, setIsFetchingSales] = useState(false)
  const [isInitialLoadingSales, setIsInitialLoadingSales] = useState(true)
  const [salesSearchTerm, setSalesSearchTerm] = useState('')
  const [showAddSalesPerson, setShowAddSalesPerson] = useState(false)
  const [newSalesPerson, setNewSalesPerson] = useState({ name: '', tgUsername: '', workCode: '' })
  const [isAddingSalesPerson, setIsAddingSalesPerson] = useState(false)
  const [editingSalesPerson, setEditingSalesPerson] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', tgUsername: '', workCode: '' })
  const [isUpdatingSalesPerson, setIsUpdatingSalesPerson] = useState(false)

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, name: '', type: '' })
  const [isDeleting, setIsDeleting] = useState(false)

  // Called when textarea changes - use _id consistently
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

  // Error state for API issues
  const [apiError, setApiError] = useState(null)
  const [salesApiError, setSalesApiError] = useState(null)

  const fetchSubmissions = async (pageNumber = 1, isInitial = false) => {
    if (isInitial) {
      setIsInitialLoading(true)
    }
    setIsFetching(true)
    setApiError(null)
    try {
      const res = await fetch(`${API_BASE}/api/applications/non-social?page=${pageNumber}`, {
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
      const res = await fetch(`${API_BASE}/api/applications/non-social/by-date?startDate=${start}&endDate=${end}`, {
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

  // Sales Persons CRUD
  const fetchSalesPersons = async (isInitial = false) => {
    if (isInitial) {
      setIsInitialLoadingSales(true)
    }
    setIsFetchingSales(true)
    setSalesApiError(null)
    try {
      const res = await fetch(`${API_BASE}/api/salespersons`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Failed to fetch sales persons')
      }

      const data = await res.json()
      const salesData = data.data || data.salesPersons || data
      setSalesPersons(Array.isArray(salesData) ? salesData : [])
    } catch (err) {
      console.error('Error fetching sales persons:', err)
      setSalesApiError(err.message || 'Unable to connect to server. Please check your connection.')
      setSalesPersons([])
    } finally {
      setIsFetchingSales(false)
      setIsInitialLoadingSales(false)
    }
  }

  const addSalesPerson = async (e) => {
    e.preventDefault()
    if (!newSalesPerson.name.trim() || !newSalesPerson.tgUsername.trim()) return

    setIsAddingSalesPerson(true)
    try {
      const res = await fetch(`${API_BASE}/api/salespersons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSalesPerson)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Failed to add sales person')

      setSalesPersons(prev => [data.salesPerson || data.data || data, ...prev])
      setNewSalesPerson({ name: '', tgUsername: '', workCode: '' })
      setShowAddSalesPerson(false)
    } catch (err) {
      console.error('Error adding sales person:', err)
      alert(err.message || 'Error adding sales person')
    } finally {
      setIsAddingSalesPerson(false)
    }
  }

  const startEditSalesPerson = (person) => {
    setEditingSalesPerson(person._id)
    setEditForm({ name: person.name, tgUsername: person.tgUsername, workCode: person.workCode || '' })
  }

  const cancelEditSalesPerson = () => {
    setEditingSalesPerson(null)
    setEditForm({ name: '', tgUsername: '', workCode: '' })
  }

  const updateSalesPerson = async (id) => {
    if (!editForm.name.trim() || !editForm.tgUsername.trim()) return

    setIsUpdatingSalesPerson(true)
    try {
      const res = await fetch(`${API_BASE}/api/salespersons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Failed to update sales person')

      setSalesPersons(prev => prev.map(p => p._id === id ? { ...p, ...editForm } : p))
      setEditingSalesPerson(null)
      setEditForm({ name: '', tgUsername: '', workCode: '' })
    } catch (err) {
      console.error('Error updating sales person:', err)
      alert(err.message || 'Error updating sales person')
    } finally {
      setIsUpdatingSalesPerson(false)
    }
  }

  // Delete handlers
  const handleDeleteClick = (id, name, type) => {
    setDeleteConfirm({ open: true, id, name, type })
  }

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return

    setIsDeleting(true)
    try {
      const endpoint = deleteConfirm.type === 'salesperson'
        ? `${API_BASE}/api/salespersons/${deleteConfirm.id}`
        : `${API_BASE}/api/applications/${deleteConfirm.id}`

      const res = await fetch(endpoint, { method: 'DELETE' })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Failed to delete')

      if (deleteConfirm.type === 'salesperson') {
        setSalesPersons(prev => prev.filter(p => p._id !== deleteConfirm.id))
      } else {
        setSubmissions(prev => prev.filter(sub => sub._id !== deleteConfirm.id))
      }
      setDeleteConfirm({ open: false, id: null, name: '', type: '' })
    } catch (err) {
      console.error('Error deleting:', err)
      alert(err.message || 'Error deleting')
    } finally {
      setIsDeleting(false)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirm({ open: false, id: null, name: '', type: '' })
  }

  useEffect(() => {
    fetchSubmissions(page, page === 1)
  }, [page])

  useEffect(() => {
    if (activeTab === 'salespersons' && (!Array.isArray(salesPersons) || salesPersons.length === 0)) {
      fetchSalesPersons(true)
    }
  }, [activeTab])

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
    sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.phone?.includes(searchTerm) ||
    sub.cityState?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredSalesPersons = (Array.isArray(salesPersons) ? salesPersons : []).filter(person =>
    person.name?.toLowerCase().includes(salesSearchTerm.toLowerCase()) ||
    person.tgUsername?.toLowerCase().includes(salesSearchTerm.toLowerCase())
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

              <h3 className="text-xl font-bold mb-2">
                Delete {deleteConfirm.type === 'salesperson' ? 'Sales Person' : 'Application'}
              </h3>
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

      {/* Add Sales Person Modal */}
      {showAddSalesPerson && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddSalesPerson(false)}
          />
          <div className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAddSalesPerson(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Add Sales Person</h3>
                  <p className="text-sm text-muted-foreground">Enter the details below</p>
                </div>
              </div>

              <form onSubmit={addSalesPerson} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter name"
                    value={newSalesPerson.name}
                    onChange={(e) => setNewSalesPerson(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tgUsername">Telegram Username</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="tgUsername"
                      placeholder="username"
                      value={newSalesPerson.tgUsername}
                      onChange={(e) => setNewSalesPerson(prev => ({ ...prev, tgUsername: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workCode">Work Code</Label>
                  <Input
                    id="workCode"
                    placeholder="Enter work code (optional)"
                    value={newSalesPerson.workCode}
                    onChange={(e) => setNewSalesPerson(prev => ({ ...prev, workCode: e.target.value }))}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddSalesPerson(false)}
                    disabled={isAddingSalesPerson}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 gap-2"
                    disabled={isAddingSalesPerson}
                  >
                    {isAddingSalesPerson ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        Add
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
                <span className="gradient-text">Non-Social Dashboard</span>
              </h1>
              <p className="text-sm text-muted-foreground">AppBoost Labs - Website Applications</p>
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

      <div className="p-6 max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-muted/30 rounded-xl border border-border/50 w-fit">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeTab === 'submissions'
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
          >
            <Users className="h-4 w-4" />
            Form Submissions
          </button>
          <button
            onClick={() => setActiveTab('salespersons')}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeTab === 'salespersons'
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
          >
            <Briefcase className="h-4 w-4" />
            Sales Persons
          </button>
        </div>

        {/* Form Submissions Tab */}
        {activeTab === 'submissions' && (
          <>
            <Card className="glass border-border/50 overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-muted/20">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Form Submissions
                        {isDateFiltering && (
                          <span className="text-xs font-normal bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Filtered by Date
                          </span>
                        )}
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
                        onClick={() => isDateFiltering ? fetchSubmissionsByDate() : fetchSubmissions(page)}
                        disabled={isFetching}
                        className="hover-lift"
                      >
                        <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                  </div>

                  {/* Quick Date Filter Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/30">
                    <span className="text-sm text-muted-foreground mr-2">Quick Filters:</span>
                    <Button
                      variant={activeFilterLabel === 'Today' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => applyQuickFilter('today')}
                      disabled={isFetching}
                      className="text-xs"
                    >
                      Today
                    </Button>
                    <Button
                      variant={activeFilterLabel === 'Yesterday' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => applyQuickFilter('yesterday')}
                      disabled={isFetching}
                      className="text-xs"
                    >
                      Yesterday
                    </Button>
                    <Button
                      variant={activeFilterLabel === 'This Week' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => applyQuickFilter('thisWeek')}
                      disabled={isFetching}
                      className="text-xs"
                    >
                      This Week
                    </Button>
                    <Button
                      variant={activeFilterLabel === 'Last Week' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => applyQuickFilter('lastWeek')}
                      disabled={isFetching}
                      className="text-xs"
                    >
                      Last Week
                    </Button>
                    <Button
                      variant={activeFilterLabel === 'Last 7 Days' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => applyQuickFilter('last7Days')}
                      disabled={isFetching}
                      className="text-xs"
                    >
                      Last 7 Days
                    </Button>
                    <Button
                      variant={activeFilterLabel === 'This Month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => applyQuickFilter('thisMonth')}
                      disabled={isFetching}
                      className="text-xs"
                    >
                      This Month
                    </Button>
                    <Button
                      variant={activeFilterLabel === 'Last 30 Days' ? 'default' : 'outline'}
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
                            className="w-40 bg-background/50 border-border/50 focus:border-primary/50"
                          />
                          {startDate && (
                            <span className="absolute -top-5 left-0 text-xs text-primary">
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
                            className="w-40 bg-background/50 border-border/50 focus:border-primary/50"
                          />
                          {endDate && (
                            <span className="absolute -top-5 left-0 text-xs text-primary">
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
                        {isDateFiltering && (
                          <Button
                            onClick={clearDateFilter}
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
                      <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{activeFilterLabel}</span>
                        <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-bold">
                          {filteredCount} {filteredCount === 1 ? 'entry' : 'entries'} found
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {isInitialLoading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
                      <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
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
                    {filteredSubmissions.map((submission, index) => (
                      <Card
                        key={submission._id}
                        className="bg-gradient-to-br from-muted/30 to-muted/10 border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CardContent className="pt-6">
                          <div className="flex justify-end mb-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-2"
                              onClick={() => handleDeleteClick(submission._id, submission.name, 'application')}
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
                                <Mail className="h-3.5 w-3.5" />
                                Email
                              </div>
                              <p className="font-medium text-sm break-all text-primary/90">{submission.email}</p>
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
                                <MapPin className="h-3.5 w-3.5" />
                                Location
                              </div>
                              <p className="font-medium">{submission.cityState}</p>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                <Briefcase className="h-3.5 w-3.5" />
                                Occupation
                              </div>
                              <p className="font-medium">{submission.otherOccupation || 'N/A'}</p>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                <CreditCard className="h-3.5 w-3.5" />
                                Payment
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                {submission.paymentMethod}
                              </span>
                            </div>

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

                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                <Briefcase className="h-3.5 w-3.5" />
                                Work Code
                              </div>
                              <p className="font-medium">
                                {submission.workCode || 'N/A'}
                              </p>
                            </div>

                          </div>

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

            {!isInitialLoading && (
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
            )}
          </>
        )}

        {/* Sales Persons Tab */}
        {activeTab === 'salespersons' && (
          <Card className="glass border-border/50 overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Sales Persons
                  </CardTitle>
                  <CardDescription className="mt-1">Manage your sales team members</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search sales persons..."
                      value={salesSearchTerm}
                      onChange={(e) => setSalesSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-background/50 border-border/50 focus:border-primary/50"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fetchSalesPersons()}
                    disabled={isFetchingSales}
                    className="hover-lift"
                  >
                    <RefreshCw className={`h-4 w-4 ${isFetchingSales ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button
                    onClick={() => setShowAddSalesPerson(true)}
                    className="gap-2 hover-lift"
                  >
                    <UserPlus className="h-4 w-4" />
                    Add New
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {isInitialLoadingSales ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
                    <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">Loading Sales Persons</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">Please wait...</p>
                </div>
              ) : salesApiError ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="h-10 w-10 text-red-500" />
                  </div>
                  <p className="text-lg font-medium text-foreground">Connection Error</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">{salesApiError}</p>
                  <Button
                    onClick={() => fetchSalesPersons(true)}
                    className="mt-6 gap-2"
                    disabled={isFetchingSales}
                  >
                    {isFetchingSales ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    Retry Connection
                  </Button>
                </div>
              ) : filteredSalesPersons.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                    <Briefcase className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">No sales persons found</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">Click &quot;Add New&quot; to add your first sales person</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredSalesPersons.map((person) => (
                    <Card
                      key={person._id}
                      className="bg-gradient-to-br from-muted/30 to-muted/10 border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      <CardContent className="pt-6">
                        {editingSalesPerson === person._id ? (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Name</Label>
                              <Input
                                value={editForm.name}
                                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Telegram Username</Label>
                              <div className="relative">
                                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  value={editForm.tgUsername}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, tgUsername: e.target.value }))}
                                  placeholder="username"
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Work Code</Label>
                              <Input
                                value={editForm.workCode}
                                onChange={(e) => setEditForm(prev => ({ ...prev, workCode: e.target.value }))}
                                placeholder="Enter work code"
                              />
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={cancelEditSalesPerson}
                                disabled={isUpdatingSalesPerson}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 gap-1"
                                onClick={() => updateSalesPerson(person._id)}
                                disabled={isUpdatingSalesPerson}
                              >
                                {isUpdatingSalesPerson ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4" />
                                )}
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                                  <span className="font-bold text-primary">
                                    {person.name?.charAt(0)?.toUpperCase() || '?'}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">{person.name}</h3>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <AtSign className="h-3.5 w-3.5" />
                                    {person.tgUsername}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {person.workCode && (
                              <div className="mb-4 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
                                <p className="text-xs text-muted-foreground mb-1">Work Code</p>
                                <p className="text-sm font-medium text-primary">{person.workCode}</p>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 gap-1"
                                onClick={() => startEditSalesPerson(person)}
                              >
                                <Edit3 className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-1"
                                onClick={() => handleDeleteClick(person._id, person.name, 'salesperson')}
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

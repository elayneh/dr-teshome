"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Search, Calendar, Clock, User, Phone } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Badge } from "@/src/components/ui/badge"

export function AppointmentsManager() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      firstName: "Alem",
      lastName: "Bekele",
      email: "alem.bekele@email.com",
      phoneNumber: "(251) 911-123-456",
      date: "2024-01-20",
      reason:
        "Knee pain and mobility issues - initial consultation for chronic pain that has been affecting daily activities",
      status: "Pending",
      referralSource: "Doctor Referral",
    },
    {
      id: 2,
      firstName: "Dawit",
      lastName: "Haile",
      email: "dawit.haile@email.com",
      phoneNumber: "(251) 911-234-567",
      date: "2024-01-20",
      reason:
        "Follow-up after shoulder arthroscopy procedure to check healing progress and discuss physical therapy options",
      status: "Confirmed",
      referralSource: "Direct/Walk-in",
    },
    {
      id: 3,
      firstName: "Hanan",
      lastName: "Ahmed",
      email: "hanan.ahmed@email.com",
      phoneNumber: "(251) 911-345-678",
      date: "2024-01-21",
      reason: "Assessment of sports-related ankle injury",
      status: "Confirmed",
      referralSource: "Online Search",
    },
    {
      id: 4,
      firstName: "Meron",
      lastName: "Tadesse",
      email: "meron.tadesse@email.com",
      phoneNumber: "(251) 911-456-789",
      date: "2024-01-21",
      reason:
        "Pre-operative consultation for hip replacement surgery including discussion of surgical options and recovery timeline",
      status: "Completed",
      referralSource: "Social Media",
    },
  ])

  const [selectedReason, setSelectedReason] = useState<string>("")
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false)

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment,
      ),
    )
  }

  const handleReasonClick = (reason: string) => {
    setSelectedReason(reason)
    setIsReasonModalOpen(true)
  }

  const truncateReason = (reason: string) => {
    if (reason.length <= 32) {
      return reason
    }
    return reason.substring(0, 32) + "..."
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "default"
      case "Pending":
        return "secondary"
      case "Urgent":
        return "destructive"
      case "Completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="bg-white text-black space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Appointment Management</h2>
          <p className="text-muted-foreground">Manage patient appointments and scheduling for your practice.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Confirmations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Require confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Total appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Needs immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search appointments..." className="pl-8" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="tomorrow">Tomorrow</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="direct">Direct/Walk-in</SelectItem>
            <SelectItem value="doctor">Doctor Referral</SelectItem>
            <SelectItem value="online">Online Search</SelectItem>
            <SelectItem value="social">Social Media</SelectItem>
            <SelectItem value="word-of-mouth">Word of Mouth</SelectItem>
            <SelectItem value="insurance">Insurance Provider</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <CardDescription>A list of all patient appointments and their current status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Referral Source</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="font-medium">
                      {appointment.firstName} {appointment.lastName}
                    </div>
                  </TableCell>
                  <TableCell>{appointment.email}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{truncateReason(appointment.reason)}</span>
                      {appointment.reason.length > 32 && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-xs text-primary"
                          onClick={() => handleReasonClick(appointment.reason)}
                        >
                          See more
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{appointment.phoneNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{appointment.referralSource}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={appointment.status}
                      onValueChange={(value: string) => handleStatusChange(appointment.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={appointment.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isReasonModalOpen} onOpenChange={setIsReasonModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Appointment Reason</DialogTitle>
            <DialogDescription>Full details of the appointment reason</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm leading-relaxed">{selectedReason}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

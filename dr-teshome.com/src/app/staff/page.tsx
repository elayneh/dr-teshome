"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabaseClient"
import { AdminSidebar } from "@/src/components/staff/admin-sidebar/page"
import { SidebarProvider, SidebarInset } from "@/src/components/staff/ui/sidebar/page"
import { DashboardHeader } from "@/src/components/staff/dashboard-header/page"
import { DashboardOverview } from "@/src/components/staff/dashboard-overview/page"
import { ResourcesManager } from "@/src/components/staff/resources-manager/page"
import { BlogsManager } from "@/src/components/staff/blogs-manager/page"
import { AppointmentsManager } from "@/src/components/staff/appointments-manager/page"
import StaffManager from "@/src/components/staff/staff-manager/page"

export default function StaffPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [userRole, setUserRole] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError || !sessionData.session?.user) {
          router.push("/login")
          return
        }

        const userId = sessionData.session.user.id

        // Get user profile
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("full_name, role")
          .eq("id", userId)
          .single()

        if (profileError || !userProfile) {
          router.push("/login")
          return
        }

        // Check if user is staff
        if (!["doctor", "nurse", "admin"].includes(userProfile.role)) {
          router.push("/")
          return
        }

        setUserRole(userProfile.role)
        setUserName(userProfile.full_name || "Staff")
        setIsLoading(false)
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "resources":
        return <ResourcesManager />
      case "blogs":
        return <BlogsManager />
      case "appointments":
        return <AppointmentsManager />
      case "staff":
        return <StaffManager />
      default:
        return <DashboardOverview />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading staff dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <SidebarProvider>
        <AdminSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          userRole={userRole}
          userName={userName}
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={setSidebarExpanded}
        />
        <SidebarInset>
          <DashboardHeader userRole={userRole} userName={userName} />
          <main className="flex-1 space-y-4 p-8 pt-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

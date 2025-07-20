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

export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [userRole, setUserRole] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        setError("")

        // Check if user is logged in
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError || !sessionData.session?.user) {
          console.log("No valid session found")
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
          console.log("User profile not found or error:", profileError)
          router.push("/login")
          return
        }

        // Check if user is admin
        if (userProfile.role !== "admin") {
          console.log("User is not admin, role:", userProfile.role)
          setError("Access denied. Admin privileges required.")
          setTimeout(() => {
            router.push("/")
          }, 2000)
          return
        }

        setUserRole(userProfile.role)
        setUserName(userProfile.full_name || "Admin")
        setIsLoading(false)
      } catch (error) {
        console.error("Auth check error:", error)
        setError("Authentication error. Please try again.")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
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
      case "staffs":
        return <StaffsManager />
      // case "referrals":
      //   return <ReferralAnalytics />
      default:
        return <DashboardOverview />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Access Denied</div>
          <p className="text-gray-600">{error}</p>
          <p className="text-gray-500 mt-2">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full z-50">
        <SidebarProvider>
          <AdminSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            userRole={userRole}
            userName={userName}
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
        </SidebarProvider>
      </div>
      {/* Main Content */}
      <div className={`flex-1 min-w-0 transition-all duration-200 ${sidebarExpanded ? "ml-[180px]" : "ml-10"}`}>
        <SidebarInset>
          <DashboardHeader userRole={userRole} userName={userName} />
          <main className="flex-1 space-y-4 p-8 pt-6">{renderContent()}</main>
        </SidebarInset>
      </div>
    </div>
  )
}

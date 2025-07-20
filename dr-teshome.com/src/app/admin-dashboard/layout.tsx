import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from 'sonner'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Admin Dashboard - Dr. Teshome",
  description: "Admin dashboard for Dr. Teshome's practice management",
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side protection
  const cookieStore = await cookies()
  const roleCookie = cookieStore.get("role")
  
  // Check if user is admin
  if (!roleCookie?.value || roleCookie.value !== "admin") {
    redirect('/login')
  }

  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  )
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from 'react-hot-toast';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dr-teshome orthopedic surgeon",
  description: "Dr. Teshome Tena is one of the recommended orthopedic surgeons in Ethiopia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get("role");
  let isStaff = false;
  
  if (roleCookie?.value) {
    isStaff = ["doctor", "nurse", "admin", "superadmin"].includes(roleCookie.value);
  }


  // If it's a staff session, hide header/footer
  if (isStaff) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Toaster position="bottom-right" />
        </body>
      </html>
    );
  }

  // Regular layout with header and footer
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

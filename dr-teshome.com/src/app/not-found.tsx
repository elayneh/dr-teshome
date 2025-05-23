"use client"

import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8v3a1 1 0 0 0 1 1h3m0-4v8m10-8v3a1 1 0 0 0 1 1h3m0-4v8m-11-6v4a2 2 0 1 0 4 0v-4a2 2 0 1 0-4 0"/></svg>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        YOU MAKE VISIT TO A PAGE THAT DOES NOT EXIST
      </p>
      <p>You Should Go Back

      <Link
        href="/"
        className="px-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
Home
      </Link>
          </p>
    </div>
  )
}
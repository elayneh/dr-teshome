"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function TestConnection() {
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")

  const testConnection = async () => {
    setStatus("Testing connection...")
    setError("")

    try {
      // Test basic connection
      const { data, error } = await supabase.from("users").select("count").limit(1)
      
      if (error) {
        setError(`Database error: ${error.message}`)
        setStatus("Failed")
      } else {
        setStatus("Connection successful!")
        setError("")
      }
    } catch (err: any) {
      setError(`Network error: ${err.message}`)
      setStatus("Failed")
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="mb-4">
        <p><strong>URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Present" : "Missing"}</p>
        <p><strong>Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Present" : "Missing"}</p>
      </div>

      <button 
        onClick={testConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test Connection
      </button>

      {status && (
        <div className="mt-4">
          <p><strong>Status:</strong> {status}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  )
} 
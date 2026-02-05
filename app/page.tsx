"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Scale } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (email && password) {
      router.push("/dashboard")
    } else {
      setError("Please enter both email and password")
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Scale className="h-10 w-10 text-[#2c3e50]" />
            <h1 className="text-3xl font-bold text-[#2c3e50]">CaseWise</h1>
          </div>
          <p className="text-[#7f8c8d]">Case Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#2c3e50] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#e1e4e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c3e50] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#e1e4e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2c3e50] text-white py-3 rounded-lg font-medium hover:bg-[#34495e] transition-colors"
          >
            Login
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
        )}
      </div>
    </div>
  )
}

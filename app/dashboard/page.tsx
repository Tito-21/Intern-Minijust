"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Scale, 
  LogOut, 
  FolderPlus, 
  Folder, 
  BookOpen, 
  Search, 
  Plus,
  ChevronDown
} from "lucide-react"

interface Case {
  id: number
  firstName: string
  lastName: string
  caseNumber: string
}

const initialCases: Case[] = [
  { id: 1, firstName: "Cedric", lastName: "Manzi", caseNumber: "CW-2026-001" },
  { id: 2, firstName: "Jane", lastName: "Muhoza", caseNumber: "CW-2026-002" },
  { id: 3, firstName: "Patrick", lastName: "Uwase", caseNumber: "CW-2026-003" },
  { id: 4, firstName: "Marie", lastName: "Ineza", caseNumber: "CW-2026-004" },
  { id: 5, firstName: "John", lastName: "Mugisha", caseNumber: "CW-2026-005" },
  { id: 6, firstName: "Alice", lastName: "Kayitesi", caseNumber: "CW-2026-006" },
  { id: 7, firstName: "Robert", lastName: "Niyonzima", caseNumber: "CW-2026-007" },
  { id: 8, firstName: "Grace", lastName: "Mukantwari", caseNumber: "CW-2026-008" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [cases, setCases] = useState<Case[]>(initialCases)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("caseRegistration")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({})

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      router.push("/")
    }
  }

  const handleNewCase = () => {
    const firstName = prompt("Enter first name:")
    if (!firstName) return
    
    const lastName = prompt("Enter last name:")
    if (!lastName) return

    const lastCase = cases[cases.length - 1]
    const lastNumber = parseInt(lastCase.caseNumber.split("-")[2])
    const newNumber = (lastNumber + 1).toString().padStart(3, "0")
    const caseNumber = `CW-2026-${newNumber}`

    setCases([
      ...cases,
      {
        id: cases.length + 1,
        firstName,
        lastName,
        caseNumber,
      },
    ])

    alert(`New case registered: ${caseNumber}`)
  }

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch = 
      caseItem.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesFilters = true
    if (selectedFilters.caseNumber) {
      matchesFilters = matchesFilters && caseItem.caseNumber === selectedFilters.caseNumber
    }
    if (selectedFilters.firstName) {
      matchesFilters = matchesFilters && caseItem.firstName === selectedFilters.firstName
    }
    if (selectedFilters.lastName) {
      matchesFilters = matchesFilters && caseItem.lastName === selectedFilters.lastName
    }

    return matchesSearch && matchesFilters
  })

  const uniqueValues = {
    caseNumbers: [...new Set(cases.map((c) => c.caseNumber))].sort(),
    firstNames: [...new Set(cases.map((c) => c.firstName))].sort(),
    lastNames: [...new Set(cases.map((c) => c.lastName))].sort(),
  }

  const FilterDropdown = ({ 
    id, 
    label, 
    options, 
    filterKey 
  }: { 
    id: string
    label: string
    options: string[]
    filterKey: string 
  }) => (
    <div className="relative">
      <button
        onClick={() => setActiveFilter(activeFilter === id ? null : id)}
        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-all ${
          selectedFilters[filterKey]
            ? "bg-[#3b82f6] text-white border-[#3b82f6]"
            : "bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc]"
        }`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${activeFilter === id ? "rotate-180" : ""}`} />
      </button>
      
      {activeFilter === id && (
        <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-white border border-[#e2e8f0] rounded-lg shadow-lg z-50 max-h-[200px] overflow-y-auto">
          <div
            onClick={() => {
              const newFilters = { ...selectedFilters }
              delete newFilters[filterKey]
              setSelectedFilters(newFilters)
              setActiveFilter(null)
            }}
            className="px-4 py-2 text-sm cursor-pointer hover:bg-[#f8fafc] text-[#334155]"
          >
            All
          </div>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelectedFilters({ ...selectedFilters, [filterKey]: option })
                setActiveFilter(null)
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#f8fafc] ${
                selectedFilters[filterKey] === option ? "bg-[#eff6ff] text-[#3b82f6]" : "text-[#334155]"
              }`}
            >
              {option}
            </div>
          ))}
          <div
            onClick={() => {
              const newFilters = { ...selectedFilters }
              delete newFilters[filterKey]
              setSelectedFilters(newFilters)
              setActiveFilter(null)
            }}
            className="px-4 py-2 text-sm cursor-pointer hover:bg-[#f8fafc] text-[#64748b] border-t border-[#e2e8f0]"
          >
            Clear Filter
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Navbar */}
      <nav className="h-16 bg-[#1e293b] text-white flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Scale className="h-6 w-6" />
          <span className="text-xl font-semibold">CaseWise</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-[#e2e8f0]">
          <nav className="py-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveTab("caseRegistration") }}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                activeTab === "caseRegistration"
                  ? "bg-[#eff6ff] text-[#3b82f6] border-r-[3px] border-[#3b82f6] font-medium"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1e293b]"
              }`}
            >
              <FolderPlus className="h-5 w-5" />
              Case Registration
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveTab("myCases") }}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                activeTab === "myCases"
                  ? "bg-[#eff6ff] text-[#3b82f6] border-r-[3px] border-[#3b82f6] font-medium"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1e293b]"
              }`}
            >
              <Folder className="h-5 w-5" />
              My Cases
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveTab("laws") }}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                activeTab === "laws"
                  ? "bg-[#eff6ff] text-[#3b82f6] border-r-[3px] border-[#3b82f6] font-medium"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1e293b]"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              Laws
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#0f172a]">Case Management</h1>
            <p className="text-[#64748b] text-sm mt-1">Manage and track all registered cases</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94a3b8]" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#94a3b8]">Filters:</span>
              <FilterDropdown
                id="caseNumber"
                label="Case Number"
                options={uniqueValues.caseNumbers}
                filterKey="caseNumber"
              />
              <FilterDropdown
                id="firstName"
                label="First Name"
                options={uniqueValues.firstNames}
                filterKey="firstName"
              />
              <FilterDropdown
                id="lastName"
                label="Last Name"
                options={uniqueValues.lastNames}
                filterKey="lastName"
              />
            </div>
          </div>

          {/* Cases Table */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f8fafc]">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wide border-b border-[#e2e8f0]">
                    First Name
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wide border-b border-[#e2e8f0]">
                    Last Name
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wide border-b border-[#e2e8f0]">
                    Case Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="px-6 py-4 text-[#334155] border-b border-[#f1f5f9]">
                      {caseItem.firstName}
                    </td>
                    <td className="px-6 py-4 text-[#334155] border-b border-[#f1f5f9]">
                      {caseItem.lastName}
                    </td>
                    <td className="px-6 py-4 border-b border-[#f1f5f9]">
                      <span className="inline-block px-3 py-1 bg-[#eff6ff] text-[#3b82f6] text-sm font-medium rounded">
                        {caseItem.caseNumber}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Register New Case Button */}
          <button
            onClick={handleNewCase}
            className="fixed bottom-8 right-8 flex items-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-lg font-medium shadow-lg hover:bg-[#2563eb] hover:-translate-y-0.5 transition-all"
          >
            <Plus className="h-5 w-5" />
            Register New Case
          </button>
        </main>
      </div>
    </div>
  )
}

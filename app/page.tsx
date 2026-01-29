"use client"

import { useState } from "react"
import { Search, Filter, Plus, ChevronDown } from "lucide-react"

const cases = [
  { id: 1, firstName: "Cedric", lastName: "Manzi", caseNumber: "CW-2026-001" },
  { id: 2, firstName: "Jane", lastName: "Muhoza", caseNumber: "CW-2026-002" },
  { id: 3, firstName: "Robert", lastName: "Kalisa", caseNumber: "CW-2026-003" },
  { id: 4, firstName: "Emille", lastName: "Gakuba", caseNumber: "CW-2026-004" },
  { id: 5, firstName: "Michael", lastName: "Rugamba", caseNumber: "CW-2026-005" },
  { id: 6, firstName: "Sarah", lastName: "Mbabzi", caseNumber: "CW-2026-006" },
]

const filterOptions = {
  caseNumber: ["CW-2026-001", "CW-2026-002", "CW-2026-003", "CW-2026-004", "C-20246-005"],
  suspect: ["Cedric Manzi", "Robert Kalisa", "Michael Rugamba"],
  victim: ["Jane Muhoza", "Emille Gakuba", "Sarah Mbabazi"],
  names: ["John", "Jane", "Robert", "Emille", "Michael", "Sarah", "David", "Mugisha", "Cyusa", "Hirwa"],
}

export default function CaseWiseDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({})

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter)
  }

  const selectFilterOption = (filter: string, option: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: prev[filter] === option ? "" : option,
    }))
    setActiveFilter(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <span>⚖️</span> CaseWise
        </h1>
        <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md text-sm transition-colors">
          Logout
        </button>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-white min-h-[calc(100vh-64px)] border-r border-slate-200 p-4">
          <nav className="space-y-1">
            <a
              href="#"
              className="block px-4 py-3 rounded-lg bg-slate-800 text-white font-medium"
            >
              Case Registration
            </a>
            <a
              href="#"
              className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              My Cases
            </a>
            <a
              href="#"
              className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Laws
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Case Management</h2>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search cases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                  />
                </div>

                {/* Filter Dropdowns */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <Filter className="w-4 h-4" />
                    <span>Filters:</span>
                  </div>

                  {(["caseNumber", "suspect", "victim", "names"] as const).map((filter) => (
                    <div key={filter} className="relative">
                      <button
                        onClick={() => toggleFilter(filter)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-all ${
                          selectedFilters[filter]
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="capitalize">
                          {filter === "caseNumber" ? "Case Number" : filter}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeFilter === filter ? "rotate-180" : ""}`} />
                      </button>

                      {/* Dropdown */}
                      {activeFilter === filter && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-hidden">
                          <div className="max-h-40 overflow-y-auto">
                            {filterOptions[filter].map((option) => (
                              <button
                                key={option}
                                onClick={() => selectFilterOption(filter, option)}
                                className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors ${
                                  selectedFilters[filter] === option
                                    ? "bg-slate-100 text-slate-800 font-medium"
                                    : "text-slate-600"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Filters Display */}
              {Object.values(selectedFilters).some(Boolean) && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500">Active:</span>
                  {Object.entries(selectedFilters).map(
                    ([key, value]) =>
                      value && (
                        <span
                          key={key}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md"
                        >
                          {value}
                          <button
                            onClick={() => selectFilterOption(key, value)}
                            className="hover:text-slate-900"
                          >
                            ×
                          </button>
                        </span>
                      )
                  )}
                </div>
              )}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      First Name
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Last Name
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Case Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((caseItem, index) => (
                    <tr
                      key={caseItem.id}
                      className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-slate-600">{caseItem.firstName}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{caseItem.lastName}</td>
                      <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                        {caseItem.caseNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Register Button */}
            <div className="flex justify-end mt-6">
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-all hover:shadow-md">
                <Plus className="w-5 h-5" />
                Register New Case
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Scale, LogOut, FolderPlus, Folder, BookOpen, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CaseItem {
  id: number
  firstName: string
  lastName: string
  caseNumber: string
}

const initialCases: CaseItem[] = [
  { id: 1, firstName: "Cedric", lastName: "Manzi", caseNumber: "CW-2026-001" },
  { id: 2, firstName: "Jane", lastName: "Muhoza", caseNumber: "CW-2026-002" },
  { id: 3, firstName: "Patrick", lastName: "Uwase", caseNumber: "CW-2026-003" },
  { id: 4, firstName: "Marie", lastName: "Ineza", caseNumber: "CW-2026-004" },
  { id: 5, firstName: "John", lastName: "Mugisha", caseNumber: "CW-2026-005" },
  { id: 6, firstName: "Alice", lastName: "Kayitesi", caseNumber: "CW-2026-006" },
  { id: 7, firstName: "Robert", lastName: "Niyonzima", caseNumber: "CW-2026-007" },
  { id: 8, firstName: "Grace", lastName: "Mukantwari", caseNumber: "CW-2026-008" },
]

const sidebarItems = [
  { id: "caseRegistration", label: "Case Registration", icon: FolderPlus },
  { id: "myCases", label: "My Cases", icon: Folder },
  { id: "laws", label: "Laws", icon: BookOpen },
]

export default function DashboardPage() {
  const [cases, setCases] = useState<CaseItem[]>(initialCases)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSection, setActiveSection] = useState("caseRegistration")
  const [newFirstName, setNewFirstName] = useState("")
  const [newLastName, setNewLastName] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()

  const filteredCases = cases.filter((caseItem) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      caseItem.firstName.toLowerCase().includes(searchLower) ||
      caseItem.lastName.toLowerCase().includes(searchLower) ||
      caseItem.caseNumber.toLowerCase().includes(searchLower)
    )
  })

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      router.push("/")
    }
  }

  const handleAddCase = () => {
    if (newFirstName && newLastName) {
      const lastCase = cases[cases.length - 1]
      const lastNumber = parseInt(lastCase.caseNumber.split("-")[2])
      const newCaseNumber = `CW-2026-${(lastNumber + 1).toString().padStart(3, "0")}`

      setCases([
        ...cases,
        {
          id: cases.length + 1,
          firstName: newFirstName,
          lastName: newLastName,
          caseNumber: newCaseNumber,
        },
      ])

      setNewFirstName("")
      setNewLastName("")
      setDialogOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Navbar */}
      <header className="bg-primary text-primary-foreground h-[70px] px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <Scale className="h-7 w-7" />
          <span className="text-xl font-semibold">CaseWise</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </header>

      <div className="flex min-h-[calc(100vh-70px)]">
        {/* Sidebar */}
        <aside className="w-[250px] bg-background border-r p-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">Case Management</h1>

          {/* Search */}
          <div className="bg-background rounded-lg shadow-sm p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Cases Table */}
          <div className="bg-background rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Case Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell>{caseItem.firstName}</TableCell>
                    <TableCell>{caseItem.lastName}</TableCell>
                    <TableCell>{caseItem.caseNumber}</TableCell>
                  </TableRow>
                ))}
                {filteredCases.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      No cases found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* New Case Button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="fixed bottom-6 right-6 rounded-full shadow-lg"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Register New Case
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Case</DialogTitle>
                <DialogDescription>
                  Enter the details for the new case registration.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCase}>Register Case</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}

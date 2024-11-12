"use client"

import { useState, type ReactNode } from "react"
import { Navbar } from "../../components/Dashboard/Navbar"
import { Sidebar } from "../../components/Dashboard/Sidebar"
import { cn } from "@/lib/utils"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <main
        className={cn(
          "pt-14 transition-all duration-300",
          isSidebarOpen ? "md:pl-64" : ""
        )}
      >
        <div className="container mx-auto p-4 bg-[#111313]">{children}</div>
      </main>
    </div>
  )
}
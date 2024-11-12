"use client"

import { useState } from 'react'
import BlogPage from "@/components/Dashboard/Blog/BlogPage"

export default function DashboardBlogPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen text-white">
        <main className="flex overflow-x-hidden overflow-y-auto">
          <BlogPage />
        </main>
    </div>
  )
}
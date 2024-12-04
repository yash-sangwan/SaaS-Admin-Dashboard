"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "../../components/Dashboard/Navbar";
import { Sidebar } from "../../components/Dashboard/Sidebar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Get the current route
  const pathname = usePathname();

  // Define routes where Navbar and Sidebar should be hidden
  const excludedRoutes = ["/dashboard/web/blog/new-story"];

  // Check if current route is excluded
  const shouldShowLayout = !excludedRoutes.includes(pathname);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Conditionally render Navbar */}
      {shouldShowLayout && (
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      )}
      {/* Conditionally render Sidebar */}
      {shouldShowLayout && <Sidebar isOpen={isSidebarOpen} />}
      <main
        className={cn(
          "transition-all duration-300",
          shouldShowLayout ? "pt-14" : "",
          shouldShowLayout && isSidebarOpen ? "md:pl-64" : ""
        )}
      >
        <div
          className={cn(
            "container mx-auto p-4 bg-[#111313]",
            !shouldShowLayout ? "p-0" : ""
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

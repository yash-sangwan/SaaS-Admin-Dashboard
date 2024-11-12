"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  HelpCircle,
  Share2,
  Settings,
  Crown,
  Bell,
  BookOpenText,
  FileText,
  DatabaseZap,
  Activity,
  HeartHandshake,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const [quote, setQuote] = useState<string>("");

  // Fetch motivational quote on component mount
  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch("https://zenquotes.io/api/quotes/");
        const data = await response.json();
        setQuote(data[0]?.q || "Keep pushing forward!");
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote("Stay positive, work hard, make it happen!");
      }
    }

    fetchQuote();
  }, []);

  const menuItems = [
    {
      title: "Website",
      items: [
        {
          label: "Overview",
          icon: LayoutDashboard,
          href: "/dashboard/web/overview",
        },
        {
          label: "Blog",
          icon: FileText,
          href: "/dashboard/web/blog",
        },
        {
          label: "Docs",
          icon: BookOpenText,
          href: "/dashboard/web/docs",
        },
      ],
    },
    {
      title: "MENU",
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/dashboard",
        },
        {
          label: "Database",
          icon: DatabaseZap,
          href: "/dashboard/Database",
        },
        {
          label: "API Health",
          icon: Activity,
          href: "/dashboard/analytics",
        },
        {
          label: "Bills and Payment",
          icon: Receipt,
          href: "/dashboard/bills",
        },
        {
          label: "Notifications",
          icon: Bell,
          href: "/dashboard/notification",
        },
      ],
    },
    {
      title: "SUPPORT",
      items: [
        {
          label: "Helps",
          icon: HelpCircle,
          href: "/dashboard/help",
        },
        {
          label: "Integration",
          icon: Share2,
          href: "/dashboard/integration",
        },
        {
          label: "Settings",
          icon: Settings,
          href: "/dashboard/settings",
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-30 flex h-[calc(100vh-3.5rem)] w-64 flex-col border-r border-white/10 bg-black transition-transform duration-300",
        !isOpen && "-translate-x-full"
      )}
    >
      <div className="flex flex-1 flex-col gap-2 p-4">
        {menuItems.map((section) => (
          <div key={section.title} className="space-y-2">
            <h2 className="px-2 text-xs font-semibold tracking-wider text-gray-400/70">
              {section.title}
            </h2>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-2 py-2 text-gray-400 transition-colors hover:text-white",
                  pathname === item.href && "bg-teal-400/10 text-teal-400"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Motivational Quote Banner */}
      <div className="m-4 rounded-xl bg-gray-900 p-4">
        {/* <h3 className="text-sm font-semibold text-white">Motivational Quote</h3> */}
        <p className="mb-3 text-[13px] text-gray-400">{quote}</p>
        <Button className="w-full bg-gradient-to-r from-orange-200 to-orange-300 text-black hover:from-orange-300 hover:to-orange-400">
          <HeartHandshake className=" h-4 w-4" />
          Stay Inspired
        </Button>
      </div>
    </aside>
  );
}

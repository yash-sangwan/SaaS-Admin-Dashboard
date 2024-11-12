"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Command, Menu } from "lucide-react";
import { SearchDialog } from "@/components/Dashboard/SearchDialog";
import { NotificationCenter } from "@/components/Dashboard/NotificationCenter/NotificationCenter";
import { assets } from "@/Assets/assets";
import Image, { StaticImageData } from "next/image";

interface LogoSectionProps {
  imageSrc: string | StaticImageData;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  url: string;
}

  

export function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'New Investment Opportunity',
      description: 'A new high-yield investment option is now available.',
      time: '2 hours ago',
      url: '/dashboard/notifications/'
    },
    {
      id: '2',
      title: 'Bill Payment Reminder',
      description: 'Your electricity bill is due in 3 days.',
      time: '1 day ago',
      url: '/dashboard/notifications/'
    },
  ]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const toggleNotificationCenter = () => {
    setIsNotificationCenterOpen(!isNotificationCenterOpen);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/10 bg-black/95">
        <div className="flex h-14 items-center px-4">

        <div className="hidden md:flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-orange-200">
        <Image
          src={assets.authbg}
          alt="Organization Logo"
          className="object-cover rounded-full"
          width={32}
          height={32}
        />
      </div>
      <div>
        <h1 className="text-sm font-semibold text-white">NAME</h1>
        <p className="text-xs text-gray-400">Admin Dashboard</p>
      </div>
    </div>


          {/* Sidebar Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg mr-2 text-gray-400 hover:bg-white hover:text-black md:ml-11 md:mr-0"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          {/* Vertical Separator - Hidden on small screens */}
          <div className="hidden md:block mx-4 h-8 w-px bg-white/10" />

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-white/10">
              <AvatarImage src="/placeholder.svg" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">Hello, Welcome back!</p>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search and Notifications */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="group hidden md:flex relative h-9 w-9 rounded-lg bg-gray-800/50 p-0 text-gray-400 hover:bg-white hover:text-black hover:border-black/20 sm:w-64 sm:justify-start sm:px-3 sm:py-2 !border-none"
              onClick={() => setOpen(true)}
            >
              <Command className="h-4 w-4 sm:mr-2 group-hover:text-black !bg-transparent !border-none" />
              <span className="hidden sm:inline-flex group-hover:text-black">
                Search or type command
              </span>
              <span className="absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-400 sm:flex group-hover:bg-white group-hover:text-black group-hover:border-black/20">
                K
              </span>
            </Button>

            {/* Notifications */}
            <div
              className="group flex items-center gap-2 border border-gray-800 p-1 m-1 hover:bg-white hover:text-black rounded-md bg-[#10151C] cursor-pointer"
              onClick={toggleNotificationCenter}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-400 group-hover:text-black !bg-transparent !border-none"
              >
                <Bell className="h-5 w-5" />
              </Button>
              {notifications.length > 0 && (
                <div className="flex h-7 items-center rounded-full bg-[#86efac] px-3 text-xs font-medium text-black">
                  {notifications.length} New
                </div>
              )}
            </div>
          </div>
        </div>

        <SearchDialog open={open} onOpenChange={setOpen} />
      </div>
      <NotificationCenter 
        isOpen={isNotificationCenterOpen} 
        onClose={() => setIsNotificationCenterOpen(false)}
        notifications={notifications}
        onClearAll={clearAllNotifications}
        onNotificationClick={handleNotificationClick}
      />
    </>
  );
}
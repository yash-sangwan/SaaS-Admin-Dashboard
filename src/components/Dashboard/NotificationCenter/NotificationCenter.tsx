"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, MessageSquareDot, Trash2, X } from "lucide-react";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  url: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onClearAll: () => void;
  onNotificationClick: (id: string) => void;
}

export function NotificationCenter({
  isOpen,
  onClose,
  notifications,
  onClearAll,
  onNotificationClick,
}: NotificationCenterProps) {
  return (
    <aside
      className={`fixed right-0 top-14 z-50 flex h-[calc(100vh-3.5rem)] w-80 flex-col border-l border-white/10 bg-black transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex justify-center items-center gap-2">
          <MessageSquareDot className="text-orange-300" />
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearAll}
            className="text-red-500 hover:text-red-600" // Hover class on Button
          >
            <Trash2 className="h-5 w-5" />
          </Button>
          <Button
            className="text-gray-400 hover:text-black"
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5 " />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        {notifications.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <Link
              href={notification.url}
              key={notification.id}
              className="block border-b border-white/10 p-4 hover:bg-white/10"
              onClick={() => onNotificationClick(notification.id)}
            >
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-teal-400 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {notification.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {notification.description}
                  </p>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </ScrollArea>
    </aside>
  );
}

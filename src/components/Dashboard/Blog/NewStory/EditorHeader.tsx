'use client'

import React, { useState, useEffect } from 'react'
import { Bell, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface EditorHeaderProps {
  isSaved: boolean
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ isSaved }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-black'
    } flex items-center justify-between h-16 px-6 border-b border-neutral-800`}>
      <div className="px-4 w-full flex items-center">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-2xl font-serif">SHWET</h1>
          <div className="text-sm text-neutral-400">
            Draft in John doe
            {isSaved && <span className="ml-2 text-neutral-500">Saved</span>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4">
                  Publish
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Publish your story</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-neutral-400 hover:text-black"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent
              align="end"
              className="bg-neutral-800 text-neutral-200"
            >
              <DropdownMenuItem>Share Draft</DropdownMenuItem>
              <DropdownMenuItem>Add to Publication</DropdownMenuItem>
              <DropdownMenuItem>Change Featured Image</DropdownMenuItem>
              <DropdownMenuItem>More Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-400 hover:text-black"
                >
                  <Bell className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Avatar className="h-8 w-8 text-black">
            <AvatarImage src="/placeholder.svg" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default EditorHeader


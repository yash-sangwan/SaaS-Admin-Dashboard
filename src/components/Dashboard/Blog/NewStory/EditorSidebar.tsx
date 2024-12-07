'use client'

import React, { useRef } from 'react'
import SidebarItem from './SidebarItem'
import { sidebarConfig } from './config/sidebarConfig'
import { SidebarItem as SidebarItemType } from './types/sidebarItems'

interface EditorSidebarProps {
  onAddItem: (item: SidebarItemType, file?: File) => void
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ onAddItem }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleItemClick = (item: SidebarItemType) => {
    if (item.id === 'regular-image') {
      fileInputRef.current?.click()
    } else {
      onAddItem(item)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageItem = sidebarConfig
        .flatMap(section => section.items)
        .find(item => item.id === 'regular-image')
      if (imageItem) {
        onAddItem(imageItem, file)
      }
    }
  }

  return (
    <div className="fixed left-0 top-16 w-72 h-[calc(100vh-4rem)] space-y-8 bg-black border-r border-gray-400/20 p-6 overflow-y-auto">
      {sidebarConfig.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            {section.title}
          </h3>
          <div className="space-y-2">
            {section.items.map((item) => (
              <SidebarItem key={item.id} item={item} onAddItem={() => handleItemClick(item)} />
            ))}
          </div>
        </div>
      ))}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default EditorSidebar


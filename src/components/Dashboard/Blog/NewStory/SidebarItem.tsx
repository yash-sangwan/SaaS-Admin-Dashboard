import React from 'react'
import { Button } from '@/components/ui/button'
import { SidebarItem as SidebarItemType } from './types/sidebarItems'

interface SidebarItemProps {
  item: SidebarItemType
  onAddItem: (item: SidebarItemType) => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, onAddItem }) => {

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
      onClick={() => onAddItem(item)}
    >
      <item.icon className="mr-2 h-5 w-5" />
      {item.name}
    </Button>
  )
}

export default SidebarItem


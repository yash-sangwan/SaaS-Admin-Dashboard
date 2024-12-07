import { type LucideIcon } from 'lucide-react'

export interface SidebarItem {
  id: string
  name: string
  icon: LucideIcon
  type: 'media' | 'embed' | 'structure'
}


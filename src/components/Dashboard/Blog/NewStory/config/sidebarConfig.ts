import { ImageIcon, Code2, Divide, Video, Link } from 'lucide-react'
import { SidebarItem } from '../types/sidebarItems'

interface SidebarConfig {
  title: string
  items: SidebarItem[]
}

export const sidebarConfig: SidebarConfig[] = [
  {
    title: 'Media',
    items: [
      {
        id: 'regular-image',
        name: 'Image',
        icon: ImageIcon,
        type: 'media'
      },
      {
        id: 'splash-image',
        name: 'Splash Image',
        icon: ImageIcon,
        type: 'media'
      },
      {
        id: 'video',
        name: 'Video',
        icon: Video,
        type: 'embed'
      }
    ]
  },
  {
    title: 'Embed',
    items: [
      {
        id: 'link',
        name: 'Link',
        icon: Link,
        type: 'embed'
      }
    ]
  },
  {
    title: 'Structure',
    items: [
      {
        id: 'code-block',
        name: 'Code Block',
        icon: Code2,
        type: 'structure'
      },
      {
        id: 'divider',
        name: 'Divider',
        icon: Divide,
        type: 'structure'
      }
    ]
  }
]


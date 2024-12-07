'use client'

import React from 'react'
import { Image } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageBlockProps {
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ onDragStart, onDragEnd }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="w-full justify-start text-gray-300 hover:text-black hover:bg-white cursor-grab active:cursor-grabbing"
      data-type="image-block"
    >
      <Image className="mr-2 h-5 w-5" />
      Add Image
    </Button>
  )
}

export default ImageBlock


import React from 'react'
import { AlignLeft, AlignCenter, AlignRight, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type Position = 'left' | 'center' | 'right'

interface AlignmentBarProps {
  position: Position
  onPositionChange: (newPosition: Position) => void
  onDelete: () => void
}

const AlignmentBar: React.FC<AlignmentBarProps> = ({
  position,
  onPositionChange,
  onDelete,
}) => {
  const getButtonClass = (buttonPosition: Position) => {
    return `h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
      position === buttonPosition ? 'bg-green-500' : ''
    }`
  }

  return (
    <div 
      className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/80 p-2 rounded-lg transition-opacity"
    >
      <Button
        variant="ghost"
        size="icon"
        className={getButtonClass('left')}
        onClick={() => onPositionChange('left')}
        aria-label="Align left"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={getButtonClass('center')}
        onClick={() => onPositionChange('center')}
        aria-label="Align center"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={getButtonClass('right')}
        onClick={() => onPositionChange('right')}
        aria-label="Align right"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-white hover:text-white hover:bg-gray-800"
        onClick={onDelete}
        aria-label="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default AlignmentBar


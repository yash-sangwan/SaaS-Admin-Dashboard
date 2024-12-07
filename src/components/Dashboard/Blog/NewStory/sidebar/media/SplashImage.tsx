import React, { useState, useCallback, CSSProperties } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { SplashImageElement } from '../../CustomTypes'
import UnsplashSearch from './UnsplashSearch'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { AlignLeft, AlignCenter, AlignRight, Trash2, Minimize2, Maximize2 } from 'lucide-react'

interface SplashImageProps {
  attributes: any
  children: React.ReactNode
  element: SplashImageElement
}

const SplashImage: React.FC<SplashImageProps> = ({ attributes, children, element }) => {
  const editor = useSlate()
  const path = ReactEditor.findPath(editor, element)
  const [open, setOpen] = useState(!element.url)
  const [isFullSize, setIsFullSize] = useState(true)

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    marginBottom: '1em',
    ...(element.position === 'left' && { float: 'left', marginRight: '1em' }),
    ...(element.position === 'right' && { float: 'right', marginLeft: '1em' }),
    ...(element.position === 'center' && { 
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    }),
    width: isFullSize ? '100%' : '66.67%', // 2/3 width when not full size
    ...(element.position === 'center' && !isFullSize && { margin: '0 auto' }),
  }

  const imageStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '0.5rem',
  }

  const handleImageSelect = useCallback((url: string) => {
    Transforms.setNodes(
      editor,
      { url },
      { at: path }
    )
    setOpen(false)
  }, [editor, path])

  const handlePosition = useCallback((newPosition: 'left' | 'center' | 'right') => {
    Transforms.setNodes(
      editor,
      { position: newPosition },
      { at: path }
    )
  }, [editor, path])

  const handleDelete = useCallback(() => {
    Transforms.removeNodes(editor, { at: path })
  }, [editor, path])

  const handleSizeToggle = useCallback(() => {
    setIsFullSize(prev => !prev)
  }, [])

  return (
    <div {...attributes}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[850px] p-6 gap-0 bg-black border-[#282828]">
          <UnsplashSearch onImageSelect={handleImageSelect} />
        </DialogContent>
      </Dialog>
      {element.url && (
        <div contentEditable={false} style={wrapperStyle}>
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <img
              src={element.url}
              alt="Splash"
              style={imageStyle}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/80 p-2 rounded-lg transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
                  element.position === 'left' ? 'bg-green-500' : ''
                }`}
                onClick={() => handlePosition('left')}
                aria-label="Align left"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
                  element.position === 'center' ? 'bg-green-500' : ''
                }`}
                onClick={() => handlePosition('center')}
                aria-label="Align center"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
                  element.position === 'right' ? 'bg-green-500' : ''
                }`}
                onClick={() => handlePosition('right')}
                aria-label="Align right"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
                  !isFullSize ? 'bg-green-500' : ''
                }`}
                onClick={handleSizeToggle}
                aria-label="Minimize image"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
                  isFullSize ? 'bg-green-500' : ''
                }`}
                onClick={handleSizeToggle}
                aria-label="Maximize image"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:text-white hover:bg-gray-800"
                onClick={handleDelete}
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default SplashImage


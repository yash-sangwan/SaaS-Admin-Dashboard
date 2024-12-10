import React, { useState, useCallback, useEffect, CSSProperties } from 'react'
import { RenderElementProps, useSelected, useFocused, ReactEditor, useSlate } from 'slate-react'
import { Transforms } from 'slate'
import { ImageElement as ImageElementType } from '../../CustomTypes'
import { Button } from '@/components/ui/button'
import { AlignLeft, AlignCenter, AlignRight, Trash2, Minimize2, Maximize2, Type } from 'lucide-react'
import AltTextDialog from './AltTextDialog'

type ImageElementProps = RenderElementProps & {
  element: ImageElementType
}

const ImageElement: React.FC<ImageElementProps> = ({ attributes, children, element }) => {
  const editor = useSlate()
  const path = ReactEditor.findPath(editor, element)
  const [showOptions, setShowOptions] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isFullSize, setIsFullSize] = useState(true)
  const [canResize, setCanResize] = useState(false)
  const [showAltTextDialog, setShowAltTextDialog] = useState(false)
  const selected = useSelected()
  const focused = useFocused()

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setCanResize(img.width > 800 || img.height > 600); // Adjust these thresholds as needed
    };
    img.src = element.url
  }, [element.url])

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    marginBottom: '1em',
    ...(element.position === 'left' && { float: 'left', marginRight: '1em' }),
    ...(element.position === 'right' && { float: 'right', marginLeft: '1em' }),
    ...(element.position === 'center' && { 
      display: 'flex',
      justifyContent: 'center',
      width: '100%', // Ensure full width for center alignment
    }),
    ...(canResize && !isFullSize && element.position !== 'center' && { width: '66.67%' }),
    ...(canResize && !isFullSize && element.position === 'center' && { width: '66.67%', margin: '0 auto' }),
  }

  const imageContainerStyle: CSSProperties = {
    position: 'relative',
    maxWidth: '100%',
    width: 'fit-content', // Allow container to shrink to image size
  }

  const imageStyle: CSSProperties = {
    maxWidth: '100%',
    height: 'auto',
    display: 'block', // Remove any extra space below the image
    borderRadius: '0.5rem',
  }

  const handleDelete = useCallback(() => {
    const imageUrl = element.url
    // Remove from localStorage
    const images = JSON.parse(localStorage.getItem('editor-images') || '[]')
    const updatedImages = images.filter((img: string) => img !== imageUrl)
    localStorage.setItem('editor-images', JSON.stringify(updatedImages))
    
    // Remove the node from editor
    Transforms.removeNodes(editor, { at: path })
  }, [editor, element.url, path])

  const handlePosition = useCallback((newPosition: 'left' | 'center' | 'right') => {
    Transforms.setNodes(
      editor,
      { position: newPosition },
      { at: path }
    )
  }, [editor, path])

  const handleSizeToggle = useCallback(() => {
    if (canResize) {
      setIsFullSize(prev => !prev)
    }
  }, [canResize])

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowOptions(true)
  }

  const handleAltTextSave = (altText: string) => {
    Transforms.setNodes(
      editor,
      { altText },
      { at: path }
    )
    // Save alt text to localStorage
    const altTexts = JSON.parse(localStorage.getItem('editor-alt-texts') || '{}')
    altTexts[element.url] = altText
    localStorage.setItem('editor-alt-texts', JSON.stringify(altTexts))
  }

  return (
    <div {...attributes}>
      <div contentEditable={false} style={wrapperStyle}>
        <div style={imageContainerStyle}>
          <img
            src={element.url}
            alt={element.altText || "Inserted content"}
            style={imageStyle}
            width={dimensions.width}
            height={dimensions.height}
            onClick={handleImageClick}
          />
          {(showOptions || (selected && focused)) && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/80 p-2 rounded-lg transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-[#282828] ${
                  element.position === 'left' ? 'bg-[#1DB954]' : ''
                }`}
                onClick={() => handlePosition('left')}
                aria-label="Align left"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-[#282828] ${
                  element.position === 'center' ? 'bg-[#1DB954]' : ''
                }`}
                onClick={() => handlePosition('center')}
                aria-label="Align center"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-[#282828] ${
                  element.position === 'right' ? 'bg-[#1DB954]' : ''
                }`}
                onClick={() => handlePosition('right')}
                aria-label="Align right"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              {canResize && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 text-white hover:text-white hover:bg-[#282828] ${
                      !isFullSize ? 'bg-[#1DB954]' : ''
                    }`}
                    onClick={handleSizeToggle}
                    aria-label="Minimize image"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 text-white hover:text-white hover:bg-[#282828] ${
                      isFullSize ? 'bg-[#1DB954]' : ''
                    }`}
                    onClick={handleSizeToggle}
                    aria-label="Maximize image"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:text-white hover:bg-[#282828]"
                onClick={() => setShowAltTextDialog(true)}
                aria-label="Add alt text"
              >
                <Type className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:text-white hover:bg-[#282828]"
                onClick={handleDelete}
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      {children}
      <AltTextDialog
        isOpen={showAltTextDialog}
        onClose={() => setShowAltTextDialog(false)}
        onSave={handleAltTextSave}
        initialAltText={element.altText}
      />
    </div>
  )
}

export default ImageElement


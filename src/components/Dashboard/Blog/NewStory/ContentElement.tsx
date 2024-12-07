

import React, { useState, useCallback } from 'react'
import { RenderElementProps, useSelected, useFocused } from 'slate-react'
import { Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { CustomElement, CustomEditor } from './CustomTypes'
import { Trash2, ArrowUpDownIcon as ArrowsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContentElementProps extends RenderElementProps {
  showPlaceholder?: boolean;
  element: CustomElement;
}

const ContentElement: React.FC<ContentElementProps> = ({ 
  attributes, 
  children, 
  element,
  showPlaceholder = true,
}) => {
  const isEmpty = element.children[0].text === '' && element.type === 'paragraph'
  const editor = useSlate() as CustomEditor
  const selected = useSelected()
  const focused = useFocused()

  const handleResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = element.type === 'image' && element.width ? parseInt(element.width) : 80

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX
      const newWidth = Math.max(20, Math.min(100, startWidth + diff / 5))
      if (element.type === 'image') {
        Transforms.setNodes<CustomElement>(
          editor,
          { width: `${newWidth}%` },
          { at: attributes.ref.current?.path }
        )
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [editor, element, attributes.ref])

  const handleDeleteImage = () => {
    Transforms.removeNodes(editor, { at: attributes.ref.current?.path })
  }

  if (element.type === 'image') {
    return (
      <div
        {...attributes}
        contentEditable={false}
        style={{ width: element.width || '80%', margin: '1em auto' }}
      >
        <div contentEditable={false} style={{ position: 'relative', userSelect: 'none' }}>
          <img
            src={element.url}
            alt="Inserted content"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
          {selected && focused && (
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleDeleteImage}
                aria-label="Delete image"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onMouseDown={handleResize}
                aria-label="Resize image"
              >
                <ArrowsUpDownIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        {children}
      </div>
    )
  }

  return (
    <div>
      <div 
        className={`relative`}
      >
        <div {...attributes} className="text-xl leading-relaxed">
          {children}
        </div>
        {isEmpty && showPlaceholder && element.type === 'paragraph' && (
          <span className={`absolute top-0 left-0 pointer-events-none text-xl font-sans italic text-gray-500`}>
            Tell your story...
          </span>
        )}
      </div>
    </div>
  )
}

export default ContentElement


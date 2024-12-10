"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Editor, Range, Element as SlateElement, Transforms, Text, NodeEntry, Node } from 'slate'
import { useSlate } from 'slate-react'
import { Bold, Italic, Link, Quote } from 'lucide-react'
import { CustomEditor, CustomText, CustomElement } from '../CustomTypes'

interface FloatingToolbarProps {
  editor: CustomEditor
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ editor }) => {
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [showToolbar, setShowToolbar] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 })
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isBlockquote, setIsBlockquote] = useState(false)
  const [isH2, setIsH2] = useState(false)
  const [isH4, setIsH4] = useState(false)

  useEffect(() => {
    const updateToolbarPosition = () => {
      const { selection } = editor
      if (!selection || !Range.isExpanded(selection)) {
        setShowToolbar(false)
        return
      }

      const domSelection = window.getSelection()
      if (!domSelection || domSelection.rangeCount === 0) {
        setShowToolbar(false)
        return
      }

      const range = domSelection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      if (toolbarRef.current) {
        const toolbarRect = toolbarRef.current.getBoundingClientRect()
        setToolbarPosition({
          top: rect.top - toolbarRect.height - 8 + window.scrollY,
          left: rect.left + rect.width / 2 - toolbarRect.width / 2,
        })
      }

      const [titleNode] = Editor.nodes(editor, {
        match: (n: Node) => SlateElement.isElement(n) && n.type === 'title',
      })
      if (titleNode) {
        setShowToolbar(false)
        return
      }

      setShowToolbar(true)

      // Check if the selected text is bold, italic, quote, h2, or h4
      const [match] = Editor.nodes(editor, {
        match: (n: Node) => SlateElement.isElement(n) || Text.isText(n),
      })
      
      if (match) {
        const [node] = match
        setIsBold(Text.isText(node) && node.bold === true)
        setIsItalic(Text.isText(node) && node.italic === true)
        setIsBlockquote(SlateElement.isElement(node) && node.type === 'blockquote')
        setIsH2(SlateElement.isElement(node) && node.type === 'h2')
        setIsH4(SlateElement.isElement(node) && node.type === 'h4')
      }
    }

    const handleSelectionChange = () => {
      updateToolbarPosition()
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [editor])

  const toggleFormat = (format: 'bold' | 'italic' | 'blockquote') => {
    const isActive = format === 'bold' ? isBold : format === 'italic' ? isItalic : isBlockquote
    if (format === 'blockquote') {
      Transforms.setNodes<CustomElement>(
        editor,
        { type: isActive ? 'paragraph' : 'blockquote' },
        { match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n) }
      )
      setIsBlockquote(!isActive)
    } else {
      Transforms.setNodes<CustomText>(
        editor,
        { [format]: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      )
      if (format === 'bold') {
        setIsBold(!isActive)
      } else if (format === 'italic') {
        setIsItalic(!isActive)
      }
    }
  }

  const toggleBlock = (format: 'h2' | 'h4') => {
    const isActive = format === 'h2' ? isH2 : isH4
    
    if (isActive) {
      Transforms.setNodes<CustomElement>(
        editor,
        { type: 'paragraph' },
        { match: n => SlateElement.isElement(n) && (n.type === 'h2' || n.type === 'h4') }
      )
    } else {
      const { selection } = editor
      if (selection && Range.isCollapsed(selection)) {
        const [block] = Editor.nodes(editor, {
          match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n),
        })
        if (block) {
          Transforms.setNodes<CustomElement>(
            editor,
            { type: format },
            { at: Editor.path(editor, block[1]) }
          )
        }
      } else {
        Transforms.setNodes<CustomElement>(
          editor,
          { type: format },
          { match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n) }
        )
      }
    }
    
    if (format === 'h2') {
      setIsH2(!isActive)
      setIsH4(false)
    } else {
      setIsH4(!isActive)
      setIsH2(false)
    }
  }

  const handleLinkClick = () => {
    const url = window.prompt('Enter the URL of the link:')
    if (url) {
      // Format the URL to ensure it has a protocol
      const formattedUrl = url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `https://${url}`

      const { selection } = editor
      if (selection && Range.isCollapsed(selection)) {
        // If no text is selected, insert the URL as the link text
        Transforms.insertNodes(
          editor,
          { text: url, link: formattedUrl } as CustomText,
          { at: selection }
        )
      } else {
        // If text is selected, wrap it with a link
        Transforms.setNodes(
          editor,
          { link: formattedUrl } as Partial<CustomText>,
          { match: n => Text.isText(n), split: true }
        )
      }
    }
  }

  if (!showToolbar) return null

  return (
    <div
      ref={toolbarRef}
      style={{
        position: 'absolute',
        top: `${toolbarPosition.top}px`,
        left: `${toolbarPosition.left}px`,
        zIndex: 1000,
      }}
      className="flex items-center gap-0.5 rounded-md bg-gray-50 px-1.5 py-1.5 shadow-xl"
    >
      <button
        className={`rounded p-1 text-gray-700 hover:bg-gray-200 ${isBold ? 'bg-gray-200' : ''}`}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleFormat('bold')
        }}
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        className={`rounded p-1 text-gray-700 hover:bg-gray-200 ${isItalic ? 'bg-gray-200' : ''}`}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleFormat('italic')
        }}
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        className={`rounded p-1 text-gray-700 hover:bg-gray-200 ${isBlockquote ? 'bg-gray-200' : ''}`}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleFormat('blockquote')
        }}
      >
        <Quote className="h-4 w-4" />
      </button>
      <button
        className="rounded p-1 text-gray-700 hover:bg-gray-200"
        onMouseDown={(e) => {
          e.preventDefault()
          handleLinkClick()
        }}
      >
        <Link className="h-4 w-4" />
      </button>
      <div className="h-6 w-px bg-gray-300 mx-1" />
      <div className="flex items-center gap-0.5">
        <button
          className={`rounded px-1.5 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200 ${isH2 ? 'bg-gray-200' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleBlock('h2')
          }}
        >
          T
        </button>
        <button
          className={`rounded px-1.5 py-1 text-xs font-bold text-gray-700 hover:bg-gray-200 ${isH4 ? 'bg-gray-200' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleBlock('h4')
          }}
        >
          T
        </button>
      </div>
    </div>
  )
}

export default FloatingToolbar


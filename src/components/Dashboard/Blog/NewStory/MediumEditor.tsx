'use client'

import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { createEditor, Descendant, Editor, Transforms, Element as SlateElement, Range, Path } from 'slate'
import { Slate, Editable, withReact, RenderElementProps, useSlate, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'
import EditorHeader from './EditorHeader'
import EditorSidebar from './EditorSidebar'
import TitleElement from './TitleElement'
import ContentElement from './ContentElement'
import ImageElement from './ImageElement'
import SplashImage from './sidebar/media/SplashImage'
import { CustomEditor, CustomElement, ImageElement as ImageElementType, SplashImageElement } from './CustomTypes'
import { SidebarItem } from './types/sidebarItems'

const STORAGE_KEY = 'medium-editor-content'

const initialValue: CustomElement[] = [
  {
    type: 'title',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const withImages = (editor: CustomEditor) => {
  const { isVoid } = editor

  editor.isVoid = (element) => {
    return (element.type === 'image' || element.type === 'splash-image') ? true : isVoid(element)
  }

  return editor
}

const MediumEditor: React.FC = () => {
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))) as CustomEditor,
    []
  )
  const [isSaved, setIsSaved] = useState(true)
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const [editorContent, setEditorContent] = useState<Descendant[]>(initialValue)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setEditorContent(JSON.parse(saved))
    }
  }, [])

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'title':
        return <TitleElement {...props} />
      case 'image':
        return <ImageElement {...props as RenderElementProps & { element: ImageElementType }} />
      case 'splash-image':
        return <SplashImage {...props as RenderElementProps & { element: SplashImageElement }} />
      default:
        return <ContentElement {...props} showPlaceholder={showPlaceholder} />
    }
  }, [showPlaceholder])

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const [node] = Editor.nodes(editor, {
        match: n => SlateElement.isElement(n) && n.type === 'title',
      })
      
      if (node) {
        event.preventDefault()
        Transforms.insertNodes(editor, {
          type: 'paragraph',
          children: [{ text: '' }],
        } as CustomElement)
      }

      const [imageNode] = Editor.nodes(editor, {
        match: n => SlateElement.isElement(n) && (n.type === 'image' || n.type === 'splash-image'),
      })

      if (imageNode) {
        event.preventDefault()
        const path = ReactEditor.findPath(editor, imageNode[0])
        Transforms.insertNodes(
          editor,
          { type: 'paragraph', children: [{ text: '' }] } as CustomElement,
          { at: Path.next(path) }
        )
        Transforms.select(editor, Path.next(path))
      }

      setShowPlaceholder(false)
    }
  }, [editor])

  const handleEditorChange = (value: Descendant[]) => {
    setEditorContent(value)
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type
    )
    if (isAstChange) {
      setIsSaved(false)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    }
  }

  const handleAddItem = useCallback((item: SidebarItem, file?: File) => {
    let newNode: CustomElement

    switch (item.type) {
      case 'media':
        if (file && item.id === 'regular-image') {
          const reader = new FileReader()
          reader.onload = (e) => {
            const url = e.target?.result as string
            
            // Store image in localStorage
            const images = JSON.parse(localStorage.getItem('editor-images') || '[]')
            images.push(url)
            localStorage.setItem('editor-images', JSON.stringify(images))
            
            newNode = { 
              type: 'image', 
              url, 
              position: 'center',
              children: [{ text: '' }] 
            } as ImageElementType
            Transforms.insertNodes(editor, newNode)
          }
          reader.readAsDataURL(file)
        } else if (item.id === 'splash-image') {
          newNode = {
            type: 'splash-image',
            position: 'center',
            children: [{ text: '' }]
          } as SplashImageElement
          
          // Get the current selection
          const { selection } = editor
          
          if (selection) {
            // If there's a selection, insert at the current selection
            Transforms.insertNodes(editor, newNode, { at: selection })
          } else {
            // If there's no selection, insert at the end of the document
            Transforms.insertNodes(editor, newNode, { at: [editor.children.length] })
          }
          
          // Move the selection to the next node
          Transforms.move(editor)
        }
        break
      case 'embed':
        newNode = { type: 'embed', url: '', children: [{ text: '' }] }
        Transforms.insertNodes(editor, newNode)
        break
      case 'structure':
        newNode = { type: item.id as CustomElement['type'], children: [{ text: '' }] } as CustomElement
        Transforms.insertNodes(editor, newNode)
        break
      default:
        newNode = { type: 'paragraph', children: [{ text: '' }] }
        Transforms.insertNodes(editor, newNode)
    }
  }, [editor])

  return (
    <div className="min-h-screen bg-black text-white">
      <EditorHeader isSaved={isSaved} />
      <div className="flex">
        <EditorSidebar onAddItem={handleAddItem} />
        <main className="flex-1 ml-72 px-6 py-12 mt-16">
          <Slate
            editor={editor}
            initialValue={editorContent}
            onChange={handleEditorChange}
          >
            <Editable
              renderElement={renderElement}
              className="outline-none max-w-3xl mx-auto"
              onKeyDown={handleKeyDown}
            />
          </Slate>
        </main>
      </div>
    </div>
  )
}

export default MediumEditor


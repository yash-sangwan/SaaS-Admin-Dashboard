import React, { useCallback, useState } from 'react'
import { Editable, RenderElementProps } from 'slate-react'
import { CustomEditor, BlockProps, CustomElement } from './CustomTypes'
import { Editor, Transforms, Element as SlateElement, Path } from 'slate'
import TitleElement from './TitleElement'
import DefaultElement from './DefaultElement'
import { Button } from "@/components/ui/button"
import { Image, Video, FileImage, LayoutTemplate, Code } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

interface EditorContentProps {
  editor: CustomEditor
}

const ImageElement: React.FC<BlockProps> = ({ attributes, children, element }) => (
  <div {...attributes}>
    {element.type === 'image' && 'url' in element && element.url && (
      <img src={element.url} alt="Inserted image" />
    )}
    {children}
  </div>
)

const VideoElement: React.FC<BlockProps> = ({ attributes, children, element }) => (
  <div {...attributes}>
    {element.type === 'video' && 'url' in element && element.url && (
      <video src={element.url} controls />
    )}
    {children}
  </div>
)

const SplashImageElement: React.FC<BlockProps> = ({ attributes, children, element }) => (
  <div 
    {...attributes} 
    className="w-full h-64 bg-cover bg-center" 
    style={element.type === 'splash-image' && 'url' in element && element.url ? { backgroundImage: `url(${element.url})` } : {}}
  >
    {children}
  </div>
)

const SectionElement: React.FC<BlockProps> = ({ attributes, children }) => (
  <section {...attributes} className="my-8">
    {children}
  </section>
)

const EmbedElement: React.FC<BlockProps> = ({ attributes, children, element }) => (
  <div {...attributes}>
    {element.type === 'embed' && 'url' in element && element.url && (
      <iframe src={element.url} frameBorder="0" allowFullScreen />
    )}
    {children}
  </div>
)

const EditorContent: React.FC<EditorContentProps> = ({ editor }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const renderElement = useCallback(
    (props: RenderElementProps) => {
      switch (props.element.type) {
        case 'title':
          return <TitleElement {...(props as BlockProps)} />
        case 'image':
          return <ImageElement {...(props as BlockProps)} />
        case 'video':
          return <VideoElement {...(props as BlockProps)} />
        case 'splash-image':
          return <SplashImageElement {...(props as BlockProps)} />
        case 'section':
          return <SectionElement {...(props as BlockProps)} />
        case 'embed':
          return <EmbedElement {...(props as BlockProps)} />
        case 'paragraph':
        default:
          return <DefaultElement {...(props as BlockProps)} onOpenSheet={() => setIsSheetOpen(true)} />
      }
    },
    []
  )

  const handleAddContent = (type: CustomElement['type']) => {
    let newElement: CustomElement;
    switch (type) {
      case 'image':
      case 'video':
      case 'splash-image':
      case 'embed':
        newElement = { type, url: '', children: [{ text: '' }] };
        break;
      case 'section':
        newElement = { type, children: [{ text: '' }] };
        break;
      default:
        newElement = { type: 'paragraph', children: [{ text: '' }] };
    }
    Transforms.insertNodes(editor, newElement)
    setIsSheetOpen(false)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const { selection } = editor
      if (selection && SlateElement.isElement(editor.children[selection.anchor.path[0]])) {
        const [currentNode, currentPath] = Editor.node(editor, selection)
        if (SlateElement.isElement(currentNode) && currentNode.type === 'title') {
          event.preventDefault()
          const newPath = Path.next(currentPath)
          Transforms.insertNodes(
            editor,
            { type: 'paragraph', children: [{ text: '' }] } as CustomElement,
            { at: newPath }
          )
          Transforms.select(editor, Editor.start(editor, newPath))
        }
      }
    }
  }

  return (
    <div className="relative">
      <Editable
        renderElement={renderElement}
        onKeyDown={onKeyDown}
        className="outline-none"
      />
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent 
          className="w-[400px] sm:w-[540px] mx-auto rounded-xl"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        >
          <SheetHeader>
            <SheetTitle>Add Content</SheetTitle>
            <SheetDescription>Choose the type of content you want to add to your story.</SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            <Button onClick={() => handleAddContent('image')} variant="outline" className="flex flex-col items-center justify-center h-24">
              <Image className="h-8 w-8 mb-2" />
              <span>Image</span>
            </Button>
            <Button onClick={() => handleAddContent('video')} variant="outline" className="flex flex-col items-center justify-center h-24">
              <Video className="h-8 w-8 mb-2" />
              <span>Video</span>
            </Button>
            <Button onClick={() => handleAddContent('splash-image')} variant="outline" className="flex flex-col items-center justify-center h-24">
              <FileImage className="h-8 w-8 mb-2" />
              <span>Splash Image</span>
            </Button>
            <Button onClick={() => handleAddContent('section')} variant="outline" className="flex flex-col items-center justify-center h-24">
              <LayoutTemplate className="h-8 w-8 mb-2" />
              <span>New Section</span>
            </Button>
            <Button onClick={() => handleAddContent('embed')} variant="outline" className="flex flex-col items-center justify-center h-24">
              <Code className="h-8 w-8 mb-2" />
              <span>Embed</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default EditorContent
import { useState, useRef, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Block {
  id: string
  content: string
  type: 'title' | 'content'
}

interface EditorBlockProps {
  block: Block
  onChange: (content: string) => void
  onEnter: () => void
}

export default function EditorBlock({ block, onChange, onEnter }: EditorBlockProps) {
  const [isActive, setIsActive] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = block.content || `<br>`
    }
  }, [block.content])

  const handleInput = () => {
    const content = contentRef.current?.innerHTML || ''
    onChange(content === '<br>' ? '' : content)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onEnter()
    }
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div
        ref={contentRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={`outline-none whitespace-pre-wrap break-words ${
          block.type === 'title' 
            ? 'text-4xl font-serif py-2' 
            : 'text-xl py-1'
        } ${!block.content ? 'before:content-[attr(data-placeholder)] before:text-neutral-500 before:pointer-events-none' : 'text-white'}`}
        data-placeholder={block.type === 'title' ? 'Title' : 'Tell your story...'}
      />
      {isActive && !block.content && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-[-40px] top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Plus className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}


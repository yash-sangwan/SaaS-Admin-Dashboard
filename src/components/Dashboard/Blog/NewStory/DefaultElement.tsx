import React from 'react'
import { useSlate, ReactEditor, useSelected, useFocused } from 'slate-react'
import { Path } from 'slate'
import { BlockProps } from './CustomTypes'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

interface DefaultElementProps extends BlockProps {
  onOpenSheet: () => void
}

const DefaultElement: React.FC<DefaultElementProps> = ({
  attributes,
  children,
  element,
  onOpenSheet
}) => {
  const editor = useSlate()
  const path = ReactEditor.findPath(editor, element)
  const isEmpty = element.children[0].text === ''
  const isFirstParagraph = Path.equals(path, [1])
  const selected = useSelected()
  const focused = useFocused()

  const isTooltipVisible = isEmpty && selected && focused

  return (
    <div {...attributes} className="relative">
      {isTooltipVisible && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-[-40px] top-1/2 -translate-y-1/2 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-200"
          onClick={(e) => {
            e.preventDefault()
            onOpenSheet()
          }}
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add content</span>
        </Button>
      )}
      <p className="text-xl py-1">
        {children}
      </p>
      {isEmpty && isFirstParagraph && (
        <span className="absolute top-0 left-0 text-neutral-500 pointer-events-none text-xl py-1">
          Tell your story...
        </span>
      )}
    </div>
  )
}

export default DefaultElement
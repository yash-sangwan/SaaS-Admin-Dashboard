import React, { useState } from 'react'
import { RenderElementProps, useSelected, useFocused, ReactEditor, useSlate } from 'slate-react'
import { Transforms } from 'slate'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

const DividerElement: React.FC<RenderElementProps> = (props) => {
  const { attributes, children, element } = props
  const editor = useSlate()
  const path = ReactEditor.findPath(editor, element)
  const [showDelete, setShowDelete] = useState(false)
  const selected = useSelected()
  const focused = useFocused()

  const handleDelete = () => {
    Transforms.removeNodes(editor, { at: path })
  }

  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        className="relative my-8"
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => !focused && setShowDelete(false)}
      >
        <hr className="border-t border-gray-300 dark:border-gray-700" />
        {(showDelete || (selected && focused)) && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-white dark:text-gray-400 dark:hover:text-white hover:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      {children}
    </div>
  )
}

export default DividerElement


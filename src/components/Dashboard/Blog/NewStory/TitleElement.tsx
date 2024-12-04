import React from 'react'
import { useSlate } from 'slate-react'
import { BlockProps } from './CustomTypes'

const TitleElement: React.FC<BlockProps> = ({
  attributes,
  children,
  element,
}) => {
  const editor = useSlate()
  const isEmpty = element.children[0].text === ''
  const isFirstNode = editor.children[0] === element

  return (
    <div className="relative">
      <h1 {...attributes} className="text-4xl font-serif py-2">
        {children}
      </h1>
      {isEmpty && isFirstNode && (
        <span className="absolute top-0 left-0 text-neutral-500 pointer-events-none text-4xl font-serif py-2">
          Title
        </span>
      )}
    </div>
  )
}

export default TitleElement

import React from 'react'
import { RenderElementProps } from 'slate-react'

const TitleElement: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  return (
    <div className="mb-4">
      <div className="relative">
        <h1
          {...attributes}
          className="text-5xl font-serif outline-none"
        >
          {children}
        </h1>
        {element.children[0].text === '' && (
          <span className="absolute top-0 left-0 text-gray-500 pointer-events-none text-5xl font-serif">
            Title
          </span>
        )}
      </div>
      <div className="h-[1px] bg-gray-700 opacity-50 mt-4" />
    </div>
  )
}

export default TitleElement


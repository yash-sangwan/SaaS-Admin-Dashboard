'use client'

import React, { useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import TitleElement from './TitleElement'
import ContentElement from './ContentElement'
import { CustomEditor, CustomElement } from './CustomTypes'

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

const EditorContent: React.FC = () => {
  const [editor] = useState(() => withHistory(withReact(createEditor() as CustomEditor)))

  const renderElement = (props: any) => {
    switch (props.element.type) {
      case 'title':
        return <TitleElement {...props} />
      default:
        return <ContentElement {...props} />
    }
  }

  return (
    <Slate editor={editor} initialValue={initialValue as Descendant[]}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Editable
          renderElement={renderElement}
          placeholder="Start writing..."
          className="outline-none"
        />
      </div>
    </Slate>
  )
}

export default EditorContent


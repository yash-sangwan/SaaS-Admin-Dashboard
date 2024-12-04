'use client'

import React, { useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import EditorHeader from './EditorHeader'
import EditorContent from './EditorContent'
import { CustomEditor, initialValue } from './CustomTypes'

const MediumEditor: React.FC = () => {
  const editor = useMemo(
    () => withHistory(withReact(createEditor())) as CustomEditor,
    []
  )
  const [isSaved, setIsSaved] = useState(true)

  return (
    <div className="min-h-screen bg-black text-white">
      <EditorHeader isSaved={isSaved} />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Slate
          editor={editor}
          initialValue={initialValue as Descendant[]}
          onChange={(value) => {
            const isAstChange = editor.operations.some(
              (op) => 'set_selection' !== op.type
            )
            if (isAstChange) {
              setIsSaved(false)
            }
          }}
        >
          <EditorContent editor={editor} />
        </Slate>
      </main>
    </div>
  )
}

export default MediumEditor

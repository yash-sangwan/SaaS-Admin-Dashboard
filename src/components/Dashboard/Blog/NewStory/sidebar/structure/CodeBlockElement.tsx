'use client'

import React, { useState } from 'react'
import { RenderElementProps, useSelected, useFocused, ReactEditor, useSlate } from 'slate-react'
import { Transforms } from 'slate'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CustomElement {
  children: { text: string }[]
}

interface CodeBlockElementProps extends RenderElementProps {
  element: CustomElement & {
    type: 'code-block'
    language: string
  }
}

export const SUPPORTED_LANGUAGES = [
  { value: 'plaintext', label: 'None' },
  { value: 'cpp', label: 'C++' },
  { value: 'bash', label: 'Bash' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'css', label: 'CSS' },
  { value: 'dart', label: 'Dart' },
  { value: 'diff', label: 'Diff' },
  { value: 'go', label: 'Go' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'ini', label: 'TOML, INI' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'json', label: 'JSON' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'python', label: 'Python' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'rust', label: 'Rust' },
  { value: 'scala', label: 'Scala' },
  { value: 'sql', label: 'SQL' },
  { value: 'swift', label: 'Swift' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'xml', label: 'XML' },
  { value: 'yaml', label: 'YAML' },
]

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="h-[150px] bg-[#121212] rounded-b-lg animate-pulse"></div>
})

const CodeBlockElement: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  const editor = useSlate()
  const path = ReactEditor.findPath(editor, element)
  const selected = useSelected()
  const focused = useFocused()
  const codeBlockElement = element as CodeBlockElementProps['element']
  const [code, setCode] = useState(codeBlockElement.children[0].text)
  const [showHeader, setShowHeader] = useState(false)

  const handleLanguageChange = (newLanguage: string) => {
    Transforms.setNodes(
      editor,
      { language: newLanguage },
      { at: path }
    )
  }

  const handleCodeChange = (value: string | undefined) => {
    const newValue = value || ''
    setCode(newValue)
    Transforms.setNodes(
      editor,
      { children: [{ text: newValue }] },
      { at: path }
    )
  }

  const handleDelete = () => {
    Transforms.removeNodes(editor, { at: path })
  }

  const handleHeaderClick = () => {
    setShowHeader(true)
  }

  return (
    <div {...attributes}>
      <div 
        contentEditable={false} 
        className="relative my-4 rounded-lg border border-[#282828] bg-[#121212]"
        onMouseEnter={() => setShowHeader(true)}
        onMouseLeave={() => !focused && setShowHeader(false)}
      >
        <div 
          className="flex items-center justify-between border-b border-[#282828] px-4 py-2"
          onClick={handleHeaderClick}
        >
          <Select value={codeBlockElement.language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px] bg-transparent border-0 hover:bg-[#282828] focus:ring-0 text-[#A7A7A7]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] bg-[#121212] border-[#282828]">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem 
                  key={lang.value} 
                  value={lang.value} 
                  className="text-[#A7A7A7] hover:bg-[#282828] focus:bg-[#282828] hover:text-white focus:text-white"
                >
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(showHeader || focused) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-8 w-8 text-white hover:text-white bg-red-900/50 hover:bg-red-900"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="p-0 [&_.monaco-editor]:bg-[#121212] [&_.monaco-editor_.margin]:bg-[#121212]">
          <MonacoEditor
            height="150px"
            language={codeBlockElement.language}
            value={code}
            onChange={handleCodeChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              lineNumbers: 'off',
              glyphMargin: false,
              folding: false,
              lineDecorationsWidth: 0,
              lineNumbersMinChars: 0,
              renderLineHighlight: 'none',
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden'
              },
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              overviewRulerBorder: false,
              padding: {
                top: 16,
                bottom: 16
              },
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}
          />
        </div>
      </div>
      {children}
    </div>
  )
}

export default CodeBlockElement


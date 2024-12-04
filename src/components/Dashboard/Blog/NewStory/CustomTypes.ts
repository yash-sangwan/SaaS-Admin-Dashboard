import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomElement =
  | { type: 'title'; children: CustomText[] }
  | { type: 'paragraph'; children: CustomText[] }
  | { type: 'image'; url?: string; children: CustomText[] }
  | { type: 'video'; url?: string; children: CustomText[] }
  | { type: 'splash-image'; url?: string; children: CustomText[] }
  | { type: 'section'; children: CustomText[] }
  | { type: 'embed'; url?: string; children: CustomText[] }

export type CustomText = { text: string }

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

export type BlockProps = {
  attributes: React.HTMLAttributes<HTMLElement>
  children: React.ReactNode
  element: CustomElement
}

export const initialValue: CustomElement[] = [
  {
    type: 'title',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]
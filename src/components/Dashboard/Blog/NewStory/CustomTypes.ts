import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'
import { Position } from './components/AlignmentBar'

export type CustomText = { text: string }

export type TitleElement = { type: 'title'; children: CustomText[] }
export type ParagraphElement = { type: 'paragraph'; children: CustomText[] }
export type ImageElement = { 
  type: 'image'
  url: string
  position: Position
  children: CustomText[]
}
export type SplashImageElement = {
  type: 'splash-image'
  url?: string
  position: Position
  children: CustomText[]
}
export type VideoElement = { type: 'video'; url: string; children: CustomText[] }
export type EmbedElement = { type: 'embed'; url: string; children: CustomText[] }
export type CodeBlockElement = { type: 'code-block'; language: string; children: CustomText[] }
export type DividerElement = { type: 'divider'; children: CustomText[] }

export type CustomElement = 
  | TitleElement
  | ParagraphElement
  | ImageElement
  | SplashImageElement
  | VideoElement
  | EmbedElement
  | CodeBlockElement
  | DividerElement

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}


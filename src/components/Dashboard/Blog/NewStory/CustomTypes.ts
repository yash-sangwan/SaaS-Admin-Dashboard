import { BaseEditor, BaseRange, Range, Element } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'
import { Position } from './components/AlignmentBar'

export type CustomText = { 
  text: string;
  bold?: boolean;
  italic?: boolean;
  quote?: boolean;
  link?: string;
}

export type TitleElement = { type: 'title'; children: CustomText[] }
export type ParagraphElement = { type: 'paragraph'; children: CustomText[] }
export type H2Element = { type: 'h2'; children: CustomText[] }
export type H4Element = { type: 'h4'; children: CustomText[] }
export type ImageElement = { 
  type: 'image'
  url: string
  position: Position
  width?: string
  altText?: string
  children: CustomText[]
}
export type SplashImageElement = {
  type: 'splash-image'
  url?: string
  position: Position
  altText?: string
  children: CustomText[]
}
export type VideoElement = {
  type: 'video'
  url: string
  thumbnail: string
  position: 'left' | 'center' | 'right'
  children: CustomText[]
}
export type EmbedElement = { 
  type: 'embed'
  url: string
  position: 'left' | 'center' | 'right'
  children: CustomText[] 
}
export type CodeBlockElement = {
  type: 'code-block'
  language: string
  children: CustomText[]
}
export type DividerElement = { type: 'divider'; children: CustomText[] }
export type BlockquoteElement = { type: 'blockquote'; children: CustomText[] }

export type CustomElement = 
  | TitleElement
  | ParagraphElement
  | H2Element
  | H4Element
  | ImageElement
  | SplashImageElement
  | VideoElement
  | EmbedElement
  | CodeBlockElement
  | DividerElement
  | BlockquoteElement

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type RenderLeafProps = {
  children: React.ReactNode;
  leaf: CustomText;
  text: CustomText;
  attributes: {
    'data-slate-leaf': true;
  };
}

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}


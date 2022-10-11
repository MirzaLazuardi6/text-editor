import { BaseEditor, Editor, Element, Text, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'
interface CustomBaseEditor extends BaseEditor {
    text?: string;
    bold?: boolean | null;
}
export type CustomEditor = CustomBaseEditor & BaseEditor & ReactEditor & HistoryEditor
export type ParagraphElement = {
  type: string
  children: CustomText[]
  bold?: boolean | null
}
export type HeadingElement = {
  type: string
  level: number
  children: CustomText[]
  bold?: boolean | null
}
export type FormattedText = { text: string; bold?: true }
export type CustomElement = ParagraphElement | HeadingElement
export type CustomText = FormattedText

declare module 'slate' {
    interface CustomTypes {
      Editor: CustomEditor
      Element: CustomElement
      Text: CustomText
    }
}

export const CustomEditor = {
    isBoldMarkActive(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true,
      })
  
      return !!match
    },
  
    isCodeBlockActive(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: n => Element.isElement(n) && n.type === 'code',
      })
  
      return !!match
    },
  
    toggleBoldMark(editor: Editor) {
      const isActive = CustomEditor.isBoldMarkActive(editor)
      Transforms.setNodes(
        editor,
        { bold: isActive ? undefined : true },
        { match: n => Text.isText(n), split: true }
      )
    },
  
    toggleCodeBlock(editor: Editor) {
      const isActive = CustomEditor.isCodeBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? undefined : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },
  }
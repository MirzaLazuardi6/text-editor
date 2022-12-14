// @ts-nocheck
import { Editor, Element, Text, Transforms } from 'slate'

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
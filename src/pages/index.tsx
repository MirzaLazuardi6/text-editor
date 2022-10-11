import type { NextPage } from 'next'
import React, { useCallback, useMemo } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react'
import { TextElement } from '../components/CodeElement'
import { Leaf } from '../components/Leaf'
import { CustomElement } from '../utils/helper/text-editor/ElementSelector'
import { cx, css } from '@emotion/css'
import isHotkey from 'is-hotkey'
import { HOTKEYS } from '../utils/const/CommonConst'
import { toggleMark } from '../utils/helper/text-editor/ToggleMark'
import { Toolbar } from '../components/CommonComponents'
import { BlockButton } from '../components/BlockButton'
import { MarkButton } from '../components/MarkButton'
import Head from 'next/head'
import { MarkButtonConfig } from '../utils/config/MarkButtonConfig'
import { BlockButtonConfig } from '../utils/config/BlockButtonConfig'


const initialValue: CustomElement[] = [
    {
        type: 'paragraph',
        children: [
            { text: 'Hi my name is ' }, 
            { text: 'Mirza Lazuardi ', bold: true }, 
            { text: 'you can call me ' }, 
            { text: 'Mirza', underline: true },
        ],
    },
    {
        type: 'paragraph',
        children: [
            { text: 'I am a ' },
            { text: 'Software Engineer ', code: true },
            { text: 'specialized in ' },
            { text: 'Front End Development', bold: true, underline: true },
        ],
    },
    {
        type: 'paragraph',
        children: [
            { text: 'My favorite quote is ' }
        ],
    },
    {
        type: 'block-quote',
        children: [
            { text: '"The most merciful thing in the world, I think, is the inability of the human mind to correlate all its contents. We live on a placid island of ignorance in the midst of black seas of infinity, and it was not meant that we should voyage far. The sciences, each straining in its own direction, have hitherto harmed us little; but some day the piecing together of dissociated knowledge will open up such terrifying vistas of reality, and of our frightful position therein, that we shall either go mad from the revelation or flee from the light into the peace and safety of a new dark age."' },
            { text: '  -H.P Lovecraft' }
        ],
    }
];

const TextEditor: NextPage = () => {
    const renderElement = useCallback((props: RenderElementProps) => <TextElement {...props} />, [])
    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    return (
        <>
            <Head>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />

            </Head>
            <Slate 
                editor={editor} 
                value={initialValue}
            >
                <Toolbar>
                    { MarkButtonConfig && MarkButtonConfig.map(button => 
                        <MarkButton key={button.format} format={button.format} icon={button.icon} /> 
                    ) }
                    { BlockButtonConfig && BlockButtonConfig.map(button => 
                        <BlockButton key={button.format} format={button.format} icon={button.icon} /> 
                    ) }
                </Toolbar>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    className={cx(
                        css`
                        padding: 10px;
                        `
                    )}
                    autoFocus
                    onKeyDown={event => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault()
                            const mark = HOTKEYS[hotkey]
                            toggleMark(editor, mark)
                        }
                    }
                    }}
                />
            </Slate>
        </>
    )
}

export default TextEditor
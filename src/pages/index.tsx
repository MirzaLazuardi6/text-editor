// @ts-nocheck
import type { NextPage } from 'next'
import React, { useCallback, useMemo } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react'
import { TextElement } from '../components/CodeElement'
import { Leaf } from '../components/Leaf'
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
import { initialTemplate } from '../utils/config/template'

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
                value={initialTemplate}
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
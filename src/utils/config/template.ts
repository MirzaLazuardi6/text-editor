// @ts-nocheck
import { Descendant } from "slate";

export const initialTemplate: Descendant[] = [
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


import { EditorProps } from 'react-draft-wysiwyg'

import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const ReactDraftWysiwyg = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
  ssr: false
})

export default ReactDraftWysiwyg

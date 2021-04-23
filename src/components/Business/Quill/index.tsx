import React, { FC, useEffect, useState, useRef } from 'react'
import { inject, observer, IReactComponent } from 'mobx-react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// import styles from './index.module.less'
interface IStore {
  quillEditor: {
    getSelection: () => any
    insertEmbed: (index: number, image: string, url: string) => any
  }
  setValue: (quillEditor1: string, editor: any) => any
}
interface IFc {
  userStore?: IReactComponent & IStore
}
const Quill: FC<IFc> = ({ userStore }: IFc) => {
  const [value, setValue] = useState('')
  // const [quillEditor, setQuillEditor] = useState<any>()
  const quillRef = useRef<any>()

  console.log(userStore)
  console.log(setValue)
  const toolbarContainer = [
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ font: [] }],
    [{ header: 1 }, { header: 2 }], // custom button values
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{ align: [] }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    ['blockquote', 'code-block'],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['image'],

    ['clean']
  ]
  // ['emoji', 'image', 'video', 'link'],
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    // 'bullet',
    // 'indent',
    // 'link',
    'image'
  ]

  useEffect(() => {
    console.log(1)
  }, [])

  // const uploadImg = () => {
  //   console.log('123')
  // }
  const imageHandler = () => {
    const { getEditor } = quillRef.current
    // this.quillEditor = getEditor()
    // setQuillEditor(getEditor())
    userStore?.setValue('quillEditor', getEditor())
    const input: any = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      const { quillEditor } = userStore as IStore
      const file = input.files[0]
      const formData = new FormData()
      formData.append('quill-image', file)
      console.log('3333333', quillEditor)
      // const res = await uploadFile(formData)
      const range = quillEditor.getSelection()

      // const link = res.data[0].url
      // this part the image is inserted
      // by 'image' option below, you just have to put src(link) of img here.
      quillEditor.insertEmbed(
        range.index + 1,
        'image',
        'https://image-static.segmentfault.com/383/303/3833030929-5ffd15fc110ab'
      )
    }
  }
  const handleChange = (val: any) => {
    console.log(val)
  }

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={{
          toolbar: {
            container: toolbarContainer,
            handlers: {
              image: imageHandler
            }
          }
        }}
        formats={formats}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default inject('userStore')(observer(Quill))

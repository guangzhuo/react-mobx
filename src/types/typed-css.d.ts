declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// 图片
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

//  全局
interface Window {
  readonly opr: any
  readonly opera: any
  readonly HTMLElement: any
  readonly chrome: any
  safari: any
  readonly InstallTrigger: any
  // readonly document: { documentMode: any }
}

interface Document {
  readonly documentMode: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const safari = window.safari
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InstallTrigger = window.InstallTrigger

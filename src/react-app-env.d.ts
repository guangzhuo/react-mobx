// / <reference types="react-scripts" />

declare namespace NodeJS {
  interface Process {
    env: {
      [key: string]: string | undefined
      NODE_ENV: string
      PUBLIC_URL: string
    }
  }
}

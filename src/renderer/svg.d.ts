declare module '*.svg' {
  import React from 'react'

  const url: string

  export const ReactComponent: React.VFC<React.SVGProps<SVGSVGElement>>

  export default url
}

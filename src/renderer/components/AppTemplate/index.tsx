import React from 'react'

import { RootContainer } from '../RootContainer'
import TitleBar from '../TitleBar'

export const AppTemplate: React.FC = ({ children }) => {
  return (
    <RootContainer>
      <TitleBar>
        <a href='#/'>News Speaker</a>
      </TitleBar>
      {children}
    </RootContainer>
  )
}

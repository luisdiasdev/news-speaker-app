import React from 'react'

import { MainView } from './MainView'
import { RootContainer } from './RootContainer'
import { TitleBar } from './TitleBar'

export const AppTemplate: React.FC = () => {
  return (
    <RootContainer>
      <TitleBar>
        <a href='#/'>News Speaker</a>
      </TitleBar>
      <MainView />
    </RootContainer>
  )
}

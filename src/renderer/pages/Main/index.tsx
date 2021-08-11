import React from 'react'
import TitleBar from '../../components/TitleBar'

import { MainContent } from './styles'

const Main: React.FC = () => {
  return (
    <>
      <TitleBar>
        <a href='#'>News Speaker</a>
      </TitleBar>
      <MainContent>
        <p>Main Content is here</p>
      </MainContent>
    </>
  )
}

export default Main

import React from 'react'
import { ThemeProvider } from 'styled-components'

import Main from './pages/Main'
import { defaultTheme } from './theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Main />
    </ThemeProvider>
  )
}

export default App

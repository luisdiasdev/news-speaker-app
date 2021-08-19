import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { configureStore, Scope } from '../shared/store'
import Main from './pages/Main'
import { defaultTheme } from './theme'

const store = configureStore('news-speaker-app', Scope.RENDERER)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <ChakraProvider resetCSS>
          <Main />
        </ChakraProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App

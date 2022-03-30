import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { AppTemplate } from './components/AppTemplate'
import { configureStore } from './store/configureStore'
import { defaultTheme } from './theme'

const store = configureStore('news-speaker-app')

store.subscribe(() => {
  const state = store.getState()
  console.log('[renderer] new state => ', state)
})

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <ChakraProvider resetCSS>
          <AppTemplate />
        </ChakraProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App

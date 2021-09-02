import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { configureStoreRenderer } from '../shared/store/configureStore/renderer'
import Main from './pages/Main'
import { defaultTheme } from './theme'

console.log('api => ', __store, window.__store)
const store = configureStoreRenderer('news-speaker-app', [
  __store.rendererStoreEnhancer()
])

console.log('store => ', store)
store.subscribe(() => {
  const state = store.getState()
  console.log('[renderer] new state => ', state)
})

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

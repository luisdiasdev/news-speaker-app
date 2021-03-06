import { ChakraProvider } from '@chakra-ui/react'
import ContentPanel from '@components/ContentPanel'
import RSSFeedList from '@components/RSSFeedList'
import ContentContextProvider from '@contexts/ContentContext'
import { configureStoreRenderer } from '@shared/store/configureStore/renderer'
import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { AppTemplate } from './components/AppTemplate'
import { defaultTheme } from './theme'

const store = configureStoreRenderer('news-speaker-app', [
  __store
    ? __store.rendererStoreEnhancer()
    : window.__store
    ? window.__store.rendererStoreEnhancer()
    : null
])

store.subscribe(() => {
  const state = store.getState()
  console.log('[renderer] new state => ', state)
})

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <ChakraProvider resetCSS>
          <AppTemplate>
            <ContentContextProvider>
              <ContentPanel leftPanel={<RSSFeedList />} />
            </ContentContextProvider>
          </AppTemplate>
        </ChakraProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App

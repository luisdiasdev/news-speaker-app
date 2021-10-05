import React, { createContext, useContext, useState } from 'react'

export type RightSideContentTypes =
  | 'Home'
  | 'AddFeed'
  | 'EditFeed'
  | 'Player'
  | 'ShowFeed'

export type ContentContextType = {
  rightSideContent: RightSideContentTypes
  args: Record<string, unknown>
  isHome: boolean
  home: () => void
  setAddFeed: () => void
  setEditFeed: (args: Record<string, unknown>) => void
  setShowFeed: (args: Record<string, unknown>) => void
  setPlayer: (args: Record<string, unknown>) => void
}

const defaultFallbackFn = () => console.warn('no content provider')

export const ContentContext = createContext<ContentContextType>({
  rightSideContent: 'Home',
  args: {},
  isHome: true,
  home: () => defaultFallbackFn,
  setAddFeed: () => defaultFallbackFn,
  setEditFeed: () => defaultFallbackFn,
  setShowFeed: () => defaultFallbackFn,
  setPlayer: () => defaultFallbackFn
})

export const useContent = () => useContext(ContentContext)

const ContentContextProvider: React.FC = ({ children }) => {
  const [rightSideContent, setRightSideContent] =
    useState<RightSideContentTypes>('Home')
  const [args, setArgs] = useState<Record<string, unknown>>({})

  return (
    <ContentContext.Provider
      value={{
        isHome: rightSideContent === 'Home',
        rightSideContent,
        args,
        home: () => setRightSideContent('Home'),
        setAddFeed: () => setRightSideContent('AddFeed'),
        setEditFeed: args => {
          setArgs(args)
          setRightSideContent('EditFeed')
        },
        setShowFeed: args => {
          setArgs(args)
          setRightSideContent('ShowFeed')
        },
        setPlayer: args => {
          setArgs(args)
          setRightSideContent('Player')
        }
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export default ContentContextProvider

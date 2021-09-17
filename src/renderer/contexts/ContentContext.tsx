import React, { createContext, useContext, useState } from 'react'

export type RightSideContentTypes = 'AddFeed' | 'EditFeed' | 'Player'

export type ContentContextType = {
  rightSideContent: RightSideContentTypes
  args: Record<string, unknown>
  setAddFeed: () => void
  setEditFeed: (args: Record<string, unknown>) => void
  setPlayer: () => void
}

const defaultFallbackFn = () => console.warn('no content provider')
export const ContentContext = createContext<ContentContextType>({
  rightSideContent: 'AddFeed',
  args: {},
  setAddFeed: () => defaultFallbackFn,
  setEditFeed: () => defaultFallbackFn,
  setPlayer: () => defaultFallbackFn
})

export const useContent = () => useContext(ContentContext)

const ContentContextProvider: React.FC = ({ children }) => {
  const [rightSideContent, setRightSideContent] =
    useState<RightSideContentTypes>('AddFeed')
  const [args, setArgs] = useState<Record<string, unknown>>({})

  return (
    <ContentContext.Provider
      value={{
        rightSideContent,
        args,
        setAddFeed: () => setRightSideContent('AddFeed'),
        setEditFeed: args => {
          setArgs(args)
          setRightSideContent('EditFeed')
        },
        setPlayer: () => setRightSideContent('Player')
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export default ContentContextProvider

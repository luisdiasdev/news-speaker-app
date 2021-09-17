import React, { createContext, useContext, useState } from 'react'

export type RightSideContentTypes = 'AddFeed' | 'EditFeed'

export type ContentContextType = {
  rightSideContent: RightSideContentTypes
  args: Record<string, unknown>
  setAddFeed: () => void
  setEditFeed: (args: Record<string, unknown>) => void
}

export const ContentContext = createContext<ContentContextType>({
  rightSideContent: 'AddFeed',
  args: {},
  setAddFeed: () => console.warn('no content provider'),
  setEditFeed: () => console.warn('no content provider')
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
        }
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export default ContentContextProvider

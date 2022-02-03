import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

export type ViewTypes = 'Home' | 'AddFeed' | 'EditFeed' | 'Player' | 'ShowFeed'

export type ViewContextType = {
  currentView: ViewTypes
  args: Record<string, unknown>
  isHome: boolean
  home: () => void
  goTo: (view: ViewTypes, args: Record<string, unknown>) => void
  setAddFeed: () => void
  setEditFeed: (args: Record<string, unknown>) => void
  setShowFeed: (args: Record<string, unknown>) => void
  setPlayer: (args: Record<string, unknown>) => void
}

const defaultFallbackFn = () => console.warn('no content provider')

export const ViewContext = createContext<ViewContextType>({
  currentView: 'Home',
  args: {},
  isHome: true,
  home: () => defaultFallbackFn,
  goTo: () => defaultFallbackFn,
  setAddFeed: () => defaultFallbackFn,
  setEditFeed: () => defaultFallbackFn,
  setShowFeed: () => defaultFallbackFn,
  setPlayer: () => defaultFallbackFn
})

export const useView = () => {
  const context = useContext(ViewContext)
  if (context === undefined) {
    throw new Error('useView must be used within a ViewContextProvider')
  }
  return context
}

export const ViewContextProvider: React.FC = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewTypes>('Home')
  const [args, setArgs] = useState<Record<string, unknown>>({})
  const goTo = useCallback(
    (view: ViewTypes, args: Record<string, unknown>) => {
      setArgs(args)
      setCurrentView(view)
    },
    [setArgs, setCurrentView]
  )
  const value = useMemo<ViewContextType>(
    () => ({
      isHome: currentView === 'Home',
      currentView,
      args,
      goTo,
      home: () => setCurrentView('Home'),
      setAddFeed: () => setCurrentView('AddFeed'),
      setEditFeed: args => goTo('EditFeed', args),
      setShowFeed: args => goTo('ShowFeed', args),
      setPlayer: args => goTo('Player', args)
    }),
    [currentView, setCurrentView, args, goTo]
  )
  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
}

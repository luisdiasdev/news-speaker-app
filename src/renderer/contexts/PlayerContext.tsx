import { getFeedById } from '@shared/store/reducer/feed'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useSelector } from 'react-redux'

const defaultFallbackFn = () => console.warn('no player context provided')

export type PlayerContextType = {
  play: () => void
  stop: () => void
  pause: () => void
}

const PlayerContext = createContext<PlayerContextType>({
  play: defaultFallbackFn,
  stop: defaultFallbackFn,
  pause: defaultFallbackFn
})

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerContextProvider')
  }
  return context
}

type PlayerContextProviderType = {
  id: string
}

export const PlayerContextProvider: React.FC<PlayerContextProviderType> = ({
  children,
  id
}) => {
  const feed = useSelector(getFeedById(id))
  const headlines = feed && feed.headlines

  console.log('player context provider')
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState<
    SpeechSynthesisVoice | undefined
  >()
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const voiceChangedHandler = () => {
      console.log('voice changed handler')
      const availableVoices = speechSynthesis.getVoices()
      if (!availableVoices.length) {
        console.log('no available voices')
        return
      }
      setVoices(availableVoices)
      setSelectedVoice(availableVoices.find(v => v.lang === 'pt-BR'))
    }

    speechSynthesis?.addEventListener('voiceschanged', voiceChangedHandler)

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', voiceChangedHandler)
    }
  }, [setVoices, setSelectedVoice])

  const play = useCallback(() => {
    console.log('play ... ', isPaused, selectedVoice)
    if (isPaused) {
      speechSynthesis.resume()
      setIsPaused(false)
      return
    }

    const speakMessage = (message: string) => {
      const utterThis = new SpeechSynthesisUtterance(message)
      utterThis.voice = selectedVoice
      utterThis.volume = 1
      utterThis.rate = 1
      utterThis.addEventListener('error', err => console.log('error => ', err))
      speechSynthesis.speak(utterThis)
    }
    const currentTrack = headlines.items && headlines.items[0]
    const lines = [currentTrack.title, currentTrack.contentSnippet]
    lines.forEach(speakMessage)

    console.log('status', speechSynthesis.speaking)
  }, [selectedVoice, headlines, isPaused, setIsPaused])

  const pause = useCallback(() => {
    setIsPaused(true)
    speechSynthesis.pause()
  }, [setIsPaused])

  const stop = useCallback(() => {
    speechSynthesis.cancel()
  }, [])

  const state = useMemo(
    () => ({
      play,
      pause,
      stop
    }),
    [play, pause, stop]
  )

  return (
    <PlayerContext.Provider value={state}>{children}</PlayerContext.Provider>
  )
}

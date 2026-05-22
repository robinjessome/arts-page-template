// context/AudioContext.tsx
'use client'
import React, { useEffect, createContext, useContext, useState, useRef } from 'react'

type AudioContextType = {
  isPlaying: boolean
  togglePlay: () => void
  setIsPlaying: (play: boolean) => void
  currentTrack: string | null
  setCurrentTrack: (track: string) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<string | null>(
    'http://www.sousound.com/music/healing/healing_01.mp3'
  )
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log('Playback prevented by browser autoplay restrictions:', error)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentTrack])

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  return (
    <AudioContext.Provider
      value={{ isPlaying, setIsPlaying, togglePlay, currentTrack, setCurrentTrack }}
    >
      {children}
      {currentTrack && <audio ref={audioRef} src={currentTrack} loop />}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) throw new Error('useAudio must be used within AudioProvider')
  return context
}

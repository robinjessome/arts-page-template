// components/audio-wrapper.tsx
'use client'

import { AudioProvider } from '@/context/AudioContext'
// import AudioPlayer from '@/components/audioPlayer'

export default function AudioWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      {children}
      {/* <AudioPlayer /> */}
    </AudioProvider>
  )
}

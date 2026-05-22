'use client;'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { useAudio } from '@/context/AudioContext'

export interface TemplateProps {
  data?: string
}

export default function AudioPlayer({ data }: TemplateProps) {
  const { isPlaying, setIsPlaying, togglePlay, setCurrentTrack } = useAudio()
  //   if (!data) return null

  return (
    <Drawer direction="right">
      <DrawerTrigger>OPEN</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Audio Player</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="p-6 text-center">
            <p className="mb-4 text-lg font-bold">Now Playing</p>
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button
              onClick={() => {
                setCurrentTrack('https://www.sousound.com/music/healing/healing_01.mp3')
              }}
            >
              Track 1
            </button>
            <button
              onClick={() => {
                setCurrentTrack('https://www.sousound.com/music/healing/healing_02.mp3')
              }}
            >
              Track 2
            </button>
            <button onClick={() => setIsPlaying(false)}>STOP</button>
          </div>
          {/* <DrawerClose>CLOSE</DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

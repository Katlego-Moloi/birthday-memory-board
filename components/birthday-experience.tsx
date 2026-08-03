"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Heart, Volume2, VolumeX } from "lucide-react"
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card"

type Photo = {
  src: string
  caption: string
  reference?: string
  className: string
}

const photos: Photo[] = [
  {
    src: "/photos/polaroid1.jpg",
    caption: "My graduate",
    className: "absolute top-[6%] left-[8%] rotate-[-8deg]",
  },
  {
    src: "/photos/polaroid2.jpg",
    caption: "So this is love",
    className: "absolute top-[10%] left-[38%] rotate-[6deg]",
  },
  {
    src: "/photos/polaroid3.jpg",
    caption: "Whoso findeth a wife findeth a good thing, and obtaineth favour of the LORD.",
    reference: "Proverbs 18:22",
    className: "absolute top-[5%] right-[6%] rotate-[9deg]",
  },
  {
    src: "/photos/polaroid4.jpg",
    caption: "Sweet moments",
    className: "absolute top-[26%] left-[4%] rotate-[5deg]",
  },
  {
    src: "/photos/polaroid5.jpg",
    caption: "I am my beloved's, and my beloved is mine.",
    reference: "Song of Solomon 6:3",
    className: "absolute top-[28%] left-[34%] rotate-[-6deg]",
  },
  {
    src: "/photos/polaroid6.jpg",
    caption: "Adventures with you",
    className: "absolute top-[30%] right-[5%] rotate-[7deg]",
  },
  {
    src: "/photos/polaroid7.jpg",
    caption: "Charity suffereth long, and is kind.",
    reference: "1 Corinthians 13:4",
    className: "absolute top-[48%] left-[9%] rotate-[-9deg]",
  },
  {
    src: "/photos/polaroid8.jpg",
    caption: "Where it began",
    className: "absolute top-[50%] left-[40%] rotate-[8deg]",
  },
  {
    src: "/photos/polaroid9.jpg",
    caption: "My favorite person",
    className: "absolute top-[52%] right-[7%] rotate-[-5deg]",
  },
  {
    src: "/photos/polaroid10.jpg",
    caption: "Many waters cannot quench love, neither can the floods drown it.",
    reference: "Song of Solomon 8:7",
    className: "absolute top-[70%] left-[6%] rotate-[6deg]",
  },
  {
    src: "/photos/polaroid11.jpg",
    caption: "Thou art all fair, my love; there is no spot in thee.",
    reference: "Song of Solomon 4:7",
    className: "absolute top-[72%] left-[36%] rotate-[-7deg]",
  },
  {
    src: "/photos/polaroid12.jpeg",
    caption: "Just us",
    className: "absolute top-[74%] right-[8%] rotate-[9deg]",
  },
  {
    src: "/photos/polaroid13.jpg",
    caption: "Happy Birthday, my love",
    className: "absolute top-[40%] left-[22%] rotate-[-3deg]",
  },
]

export function BirthdayExperience() {
  const [entered, setEntered] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleEnter = () => {
    setEntered(true)
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.6
      audio.play().catch(() => {
        // Autoplay may be blocked; the toggle button lets them start it manually.
      })
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
      setMuted(false)
      return
    }
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background music. Drop your song at public/audio/birthday-song.mp3 */}
      <audio ref={audioRef} src="/audio/birthday-song.mp3" loop preload="auto" />

      {/* Draggable polaroid gallery */}
      <DraggableCardContainer className="relative min-h-screen w-full">
        <div className="pointer-events-none absolute inset-x-0 top-8 z-0 flex flex-col items-center px-6 text-center">
          <p className="text-balance font-script text-4xl text-primary sm:text-6xl">
            Happy Birthday Baby Wa ka
          </p>
          <p className="mt-2 max-w-xs text-pretty text-sm text-muted-foreground sm:text-base">
            Drag the photos around and relive our favorite moments together.
          </p>
        </div>

        {photos.map((photo, i) => (
          <DraggableCardBody
            key={`${photo.src}-${i}`}
            className={`${photo.className} !min-h-0 w-40 rounded-sm bg-card p-2.5 pb-3 shadow-xl sm:w-48`}
          >
            <img
              src={photo.src || "/placeholder.svg"}
              alt={photo.caption}
              className="pointer-events-none relative z-10 h-44 w-full rounded-sm object-cover sm:h-52"
            />
            <div className="relative z-10 mt-2 text-center">
              {photo.reference ? (
                <>
                  <p className="text-pretty text-xs italic leading-snug text-card-foreground">
                    {`"${photo.caption}"`}
                  </p>
                  <p className="mt-1 font-script text-base text-primary">
                    {photo.reference}
                  </p>
                </>
              ) : (
                <p className="font-script text-lg text-card-foreground">
                  {photo.caption}
                </p>
              )}
            </div>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>

      {/* Sound toggle */}
      {entered && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}

      {/* Intro load animation */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary px-6 text-center text-primary-foreground"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
            >
              <Heart className="mx-auto h-10 w-10 fill-primary-foreground" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 text-balance font-script text-5xl leading-none sm:text-8xl"
            >
              Happy Birthday Baby Wa ka
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-4 max-w-xs text-pretty text-base opacity-90 sm:text-lg"
            >
              I made you a little something. Tap below and turn the sound on.
            </motion.p>

            <motion.button
              type="button"
              onClick={handleEnter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 rounded-full bg-primary-foreground px-8 py-3 text-base font-bold text-primary shadow-lg"
            >
              Open your surprise
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import type { Student } from "@/lib/data"
import { CheckCircle, PartyPopper, Trophy, LogOut, Volume2, VolumeX } from "lucide-react"
import ConfettiComponent from "react-confetti"
import { useEffect, useState, useRef } from "react"

interface SelectedResultProps {
  student: Student
}

export default function SelectedResult({ student }: SelectedResultProps) {
  const router = useRouter()
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Set window size for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Initialize audio
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/song.mp3')
      audioRef.current.volume = 0.5
      audioRef.current.loop = true
      
      // Play audio with a slight delay to ensure UI is loaded first
      const playPromise = setTimeout(() => {
        audioRef.current?.play().catch(err => {
          console.log('Could not play audio automatically:', err)
        })
      }, 1000)
      
      return () => {
        clearTimeout(playPromise)
        audioRef.current?.pause()
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0
      } else {
        audioRef.current.volume = 0.5
      }
    }
  }, [isMuted])

  const handleLogout = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    sessionStorage.removeItem("student")
    router.push("/")
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const floatingIcons = [
    { icon: <Trophy className="h-8 w-8 text-yellow-400" />, delay: 0 },
    { icon: <PartyPopper className="h-8 w-8 text-pink-500" />, delay: 0.2 },
    { icon: <CheckCircle className="h-8 w-8 text-green-500" />, delay: 0.4 },
  ]

  return (
    <>
      <ConfettiComponent
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={100}
        colors={["#3b82f6", "#60a5fa", "#93c5fd", "#ffffff"]}
      />

      {/* Sound toggle button */}
      <motion.div
        className="fixed top-4 right-4 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={toggleMute}
          variant="ghost"
          size="icon"
          className="bg-blue-950/30 text-blue-400 hover:text-blue-300 hover:bg-blue-900/40"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </motion.div>

      {/* Back/Logout Button */}
      <motion.div
        className="fixed top-4 left-4 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border-2 border-blue-500 bg-black glow overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />

          <CardHeader className="pb-2">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <CardTitle className="text-3xl font-bold text-center text-blue-500 glow-text">CONGRATULATIONS!</CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex justify-center space-x-4 my-6">
              {floatingIcons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: item.delay,
                    duration: 0.5,
                  }}
                  className="float"
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center space-y-4"
            >
              <h2 className="text-xl font-medium text-blue-300">
                Greetings, <span className="font-bold text-white">{student.name}</span>!
              </h2>

              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
                <p className="text-lg text-blue-100">
                  We are pleased to inform you that you have been
                  <span className="font-bold text-white"> SELECTED</span>!
                </p>
              </div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-blue-300 text-lg">We are happy to share the PR journey with you</p>

                <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-800">
                  <p className="text-blue-200">
                    <span className="font-semibold">Role:</span> {student.role}
                  </p>
                  <p className="text-blue-200 mt-1">
                    <span className="font-semibold">Mentor:</span> {student.mentor}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex justify-center"
              >
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}


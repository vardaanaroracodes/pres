"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import type { Student } from "@/lib/data"
import SelectedResult from "@/Components/selected-result"
import NotSelectedResult from "@/Components/not-selected-results"

export default function ResultPage() {
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if we have student data in sessionStorage
    const storedStudent = sessionStorage.getItem("student")

    if (!storedStudent) {
      // Redirect to login if no data found
      router.push("/")
      return
    }

    // Parse the student data
    setStudent(JSON.parse(storedStudent))

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500) // Increased loading time to show animations

    return () => clearTimeout(timer)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black grid-bg flex flex-col items-center justify-center p-4 custom-cursor">
        <motion.div
          className="text-blue-500 text-3xl font-bold mb-8 glow-text"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          Processing Results
        </motion.div>

        {/* Animated circles */}
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "linear" }}
          />

          <motion.div
            className="absolute inset-2 rounded-full border-4 border-blue-300 border-b-transparent"
            animate={{ rotate: -360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
          />

          <motion.div
            className="absolute inset-4 rounded-full border-4 border-blue-600 border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5, ease: "linear" }}
          />

          <motion.div
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
          </motion.div>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Animated data particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-6 bg-blue-500/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 100],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5 + Math.random() * 2,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (!student) {
    return null // This should not happen due to the redirect, but TypeScript needs it
  }

  return (
    <main className="min-h-screen bg-black grid-bg flex items-center justify-center p-4 custom-cursor animated-bg">
      {student.selected ? <SelectedResult student={student} /> : <NotSelectedResult student={student} />}
    </main>
  )
}

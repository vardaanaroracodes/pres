"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import { getStudent } from "@/lib/data"

export default function LoginForm() {
  const [rollNo, setRollNo] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!rollNo) {
      setError("Please enter your roll number")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Modified to only use roll number for authentication
      const student = getStudent(rollNo)

      if (student) {
        // Store student data in sessionStorage
        try {
          sessionStorage.setItem("student", JSON.stringify(student))
          router.push("/result")
        } catch (err) {
          console.error("Error storing student data:", err)
          setError("An error occurred. Please try again.")
        }
      } else {
        setError("Invalid roll number. Please try again.")
        setIsLoading(false)
      }
    }, 1500)
  }

  // Handle input change to automatically capitalize text
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRollNo(e.target.value.toUpperCase())
  }

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  }

  const portalText = "PR Results"
  
  // Don't render animations until client-side hydration is complete
  if (!isMounted) {
    return (
      <Card className="w-[350px] sm:w-[400px] bg-black border border-blue-500">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <div className="text-blue-500 text-2xl font-bold">PR Results</div>
          </div>
          <CardDescription className="text-center text-blue-300">
            Enter your roll number to check your results
          </CardDescription>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 w-full flex justify-center"
    >
      <Card className="w-[350px] sm:w-[400px] bg-black border border-blue-500 shadow-lg" style={{ boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <div className="overflow-hidden">
              <motion.div className="flex items-center justify-center">
                {portalText.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-blue-500 text-2xl font-bold inline-block"
                    whileHover={{
                      y: -5,
                      color: "#60a5fa",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
          <CardDescription className="text-center text-blue-300">
            Enter your roll number to check your results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rollNo" className="text-blue-300">
                  Roll Number
                </Label>
                <Input
                  id="rollNo"
                  placeholder="Enter your roll number"
                  value={rollNo}
                  onChange={handleInputChange}
                  className="border-blue-700 bg-blue-950/30 text-blue-100 placeholder:text-blue-500/50 uppercase"
                />
              </div>
              {error && (
                <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {error}
                </motion.p>
              )}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    className="flex items-center justify-center w-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    Checking...
                  </motion.div>
                ) : (
                  "Check Result"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-blue-400 text-center w-full">Made With Love by Vardaan</p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}


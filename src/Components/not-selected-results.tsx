"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import type { Student } from "@/lib/data"
import { AlertCircle, X, LogOut } from "lucide-react"

interface NotSelectedResultProps {
  student: Student
}

export default function NotSelectedResult({ student }: NotSelectedResultProps) {
  const [showPopup, setShowPopup] = useState(true)
  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.removeItem("student")
    router.push("/")
  }

  return (
    <>
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border border-blue-800 bg-black">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-blue-400">Results</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-medium text-blue-300">
                Hello, <span className="font-bold text-white">{student.name}</span>
              </h2>

              <div className="mt-4 bg-blue-900/20 rounded-lg p-4 border border-blue-800">
                <p className="text-blue-200">Thank you for Interning, You are not selected.</p>
                <p className="text-blue-200 mt-2">
                  <span className="font-semibold">Applied Role:</span> {student.role}
                </p>
              </div>

            
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-black border-2 border-red-500 rounded-lg p-6 max-w-md w-full shadow-lg relative"
              style={{
                boxShadow: "0 0 15px 2px rgba(239, 68, 68, 0.5)",
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-gray-400 hover:text-white"
                onClick={() => setShowPopup(false)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-red-500/20 p-3 rounded-full">
                  <AlertCircle className="h-10 w-10 text-red-500" />
                </div>

                <h3 className="text-2xl font-bold text-white">Not Selected</h3>

                <p className="text-gray-300">
                  We regret to inform you that you have not been selected for the {student.role} position.
                </p>

                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800 w-full">
                  <p className="text-sm text-blue-200">
                    We had a great time with you during the internship process and appreciate your efforts. We encourage you to keep the spirits high.
                  </p>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2" onClick={() => setShowPopup(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


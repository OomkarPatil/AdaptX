"use client"

import { useEffect } from "react"
import { CheckCircle } from "lucide-react"

interface TextBlockProps {
  content: string
  isCompleted: boolean
  onComplete: () => void
}

export function TextBlock({ content, isCompleted, onComplete }: TextBlockProps) {
  useEffect(() => {
    // Mark as completed after user has spent some time reading
    const timer = setTimeout(() => {
      if (!isCompleted) {
        onComplete()
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [isCompleted, onComplete])

  return (
    <div className="text-block">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Text Content</h2>
        {isCompleted && (
          <span className="text-green-500 flex items-center">
            <CheckCircle className="h-5 w-5 mr-1" />
            Completed
          </span>
        )}
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

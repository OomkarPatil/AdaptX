"use client"

import { useEffect } from "react"
import { CheckCircle } from "lucide-react"

interface ImageWithCaptionProps {
  src: string
  caption: string
  isCompleted: boolean
  onComplete: () => void
}

export function ImageWithCaption({ src, caption, isCompleted, onComplete }: ImageWithCaptionProps) {
  useEffect(() => {
    // Mark as completed after user has viewed the image
    const timer = setTimeout(() => {
      if (!isCompleted) {
        onComplete()
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isCompleted, onComplete])

  return (
    <div className="image-with-caption">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Image Content</h2>
        {isCompleted && (
          <span className="text-green-500 flex items-center">
            <CheckCircle className="h-5 w-5 mr-1" />
            Completed
          </span>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-full h-[300px] mb-4 overflow-hidden rounded-lg">
          <img src={src || "/placeholder.svg"} alt={caption} className="w-full h-full object-contain" />
        </div>
        <p className="text-center text-gray-700 italic">{caption}</p>
      </div>
    </div>
  )
}

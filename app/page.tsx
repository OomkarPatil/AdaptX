"use client"

import { useEffect, useState } from "react"
import { LearningComponent } from "@/components/learning-component"
import { Navigation } from "@/components/navigation"
import { ProgressTracker } from "@/components/progress-tracker"
import type { LearningContent } from "@/types/content"
import contentData from "@/data/content.json"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [content, setContent] = useState<LearningContent | null>(null)
  const [completed, setCompleted] = useState<boolean[]>([])

  useEffect(() => {
    // Load content
    setContent(contentData)

    // Initialize or load progress from localStorage
    const savedProgress = localStorage.getItem("learningProgress")
    if (savedProgress) {
      setCompleted(JSON.parse(savedProgress))
    } else {
      setCompleted(Array(contentData.components.length).fill(false))
    }
  }, [])

  const handleNext = () => {
    if (content && currentIndex < content.components.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const markAsCompleted = (index: number) => {
    const newCompleted = [...completed]
    newCompleted[index] = true
    setCompleted(newCompleted)
    localStorage.setItem("learningProgress", JSON.stringify(newCompleted))
  }

  if (!content) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const currentComponent = content.components[currentIndex]
  const isCompleted = completed[currentIndex]

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{content.title}</h1>
          <p className="text-gray-600 mt-2">{content.description}</p>
        </header>

        <ProgressTracker total={content.components.length} completed={completed.filter(Boolean).length} />

        <div className="bg-white rounded-lg shadow-md p-6 my-6">
          <LearningComponent
            component={currentComponent}
            isCompleted={isCompleted}
            onComplete={() => markAsCompleted(currentIndex)}
          />
        </div>

        <Navigation
          currentIndex={currentIndex}
          total={content.components.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </main>
  )
}

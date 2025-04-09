"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationProps {
  currentIndex: number
  total: number
  onNext: () => void
  onPrevious: () => void
}

export function Navigation({ currentIndex, total, onNext, onPrevious }: NavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8">
      <Button variant="outline" onClick={onPrevious} disabled={currentIndex === 0} className="flex items-center gap-2">
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="text-sm text-gray-500">
        {currentIndex + 1} of {total}
      </div>

      <Button onClick={onNext} disabled={currentIndex === total - 1} className="flex items-center gap-2">
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

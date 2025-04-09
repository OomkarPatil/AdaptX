"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MultipleChoiceProps {
  question: string
  options: string[]
  correctAnswer: number
  feedback: {
    correct: string
    incorrect: string
  }
  isCompleted: boolean
  onComplete: () => void
}

export function MultipleChoice({
  question,
  options,
  correctAnswer,
  feedback,
  isCompleted,
  onComplete,
}: MultipleChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (selectedOption === null) return

    const correct = selectedOption === correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct && !isCompleted) {
      onComplete()
    }
  }

  const handleTryAgain = () => {
    setShowFeedback(false)
    setSelectedOption(null)
  }

  return (
    <div className="multiple-choice">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Multiple Choice Question</h2>
        {isCompleted && (
          <span className="text-green-500 flex items-center">
            <CheckCircle className="h-5 w-5 mr-1" />
            Completed
          </span>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{question}</h3>

        <RadioGroup
          value={selectedOption?.toString()}
          onValueChange={(value) => setSelectedOption(Number.parseInt(value))}
          className="space-y-3"
          disabled={showFeedback}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 p-3 rounded-md border ${
                showFeedback && index === correctAnswer
                  ? "border-green-500 bg-green-50"
                  : showFeedback && index === selectedOption
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                {option}
              </Label>
              {showFeedback && index === correctAnswer && <CheckCircle className="h-5 w-5 text-green-500" />}
            </div>
          ))}
        </RadioGroup>
      </div>

      {showFeedback && (
        <Alert
          className={
            isCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
          }
        >
          <div className="flex items-center gap-2">
            {isCorrect ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <AlertDescription>{isCorrect ? feedback.correct : feedback.incorrect}</AlertDescription>
          </div>
        </Alert>
      )}

      <div className="mt-6 flex gap-4">
        {!showFeedback ? (
          <Button onClick={handleSubmit} disabled={selectedOption === null}>
            Submit Answer
          </Button>
        ) : !isCorrect ? (
          <Button onClick={handleTryAgain} variant="outline">
            Try Again
          </Button>
        ) : null}
      </div>
    </div>
  )
}

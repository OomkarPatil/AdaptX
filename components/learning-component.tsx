"use client"
import { TextBlock } from "@/components/text-block"
import { MultipleChoice } from "@/components/multiple-choice"
import { ImageWithCaption } from "@/components/image-with-caption"
import { ComponentType, type Component } from "@/types/content"

interface LearningComponentProps {
  component: Component
  isCompleted: boolean
  onComplete: () => void
}

export function LearningComponent({ component, isCompleted, onComplete }: LearningComponentProps) {
  switch (component.type) {
    case ComponentType.TEXT:
      return <TextBlock content={component.content} onComplete={onComplete} isCompleted={isCompleted} />
    case ComponentType.MCQ:
      return (
        <MultipleChoice
          question={component.question}
          options={component.options}
          correctAnswer={component.correctAnswer}
          feedback={component.feedback}
          onComplete={onComplete}
          isCompleted={isCompleted}
        />
      )
    case ComponentType.IMAGE:
      return (
        <ImageWithCaption
          src={component.src || "/placeholder.svg"}
          caption={component.caption}
          onComplete={onComplete}
          isCompleted={isCompleted}
        />
      )
    default:
      return <div>Unknown component type</div>
  }
}

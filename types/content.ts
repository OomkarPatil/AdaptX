export enum ComponentType {
  TEXT = "text",
  MCQ = "mcq",
  IMAGE = "image",
}

export interface TextComponent {
  type: ComponentType.TEXT
  content: string
}

export interface McqComponent {
  type: ComponentType.MCQ
  question: string
  options: string[]
  correctAnswer: number
  feedback: {
    correct: string
    incorrect: string
  }
}

export interface ImageComponent {
  type: ComponentType.IMAGE
  src: string
  caption: string
}

export type Component = TextComponent | McqComponent | ImageComponent

export interface LearningContent {
  title: string
  description: string
  components: Component[]
}

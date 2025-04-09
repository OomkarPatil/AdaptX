import { Progress } from "@/components/ui/progress"

interface ProgressTrackerProps {
  total: number
  completed: number
}

export function ProgressTracker({ total, completed }: ProgressTrackerProps) {
  const percentage = Math.round((completed / total) * 100)

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Course Progress</span>
        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

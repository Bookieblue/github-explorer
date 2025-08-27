import { Alert, AlertDescription } from '@/components/ui/alert'

interface ErrorAlertProps {
  error: string
}

export function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null

  return (
    <div className="max-w-2xl mx-auto mb-6">
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  )
}
import { Github } from 'lucide-react'
import { AuthButton } from '@/components/auth/auth-button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Github className="h-8 w-8 text-slate-900 dark:text-white" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            GitHub Explorer
          </h1>
        </div>
        <AuthButton />
      </div>
    </header>
  )
}
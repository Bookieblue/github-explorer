'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Header } from '@/components/github/Header'
import { SearchSection } from '@/components/github/Search'
import { EmptyState } from '@/components/github/EmptyState'
import { LoadingState } from '@/components/github/LoadingState'
import { ErrorAlert } from '@/components/github/ErrorState'
import { UserProfile } from '@/components/github/UserProfile'
import { RepositoriesList } from '@/components/github/RepoList'
import { githubService } from '@/lib/github'
import { GitHubUser, GitHubRepo } from '@/types/github'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, Github } from 'lucide-react'
import { AuthButton } from '@/components/auth/auth-button'

export default function Home() {
  const { data: session, status } = useSession()
  const [username, setUsername] = useState('')
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Debug: Add console logs to check session state
  console.log('Session status:', status)
  console.log('Session data:', session)

  const fetchGitHubData = async () => {
    // Check if user is authenticated before allowing search
    if (!session) {
      setError('Please sign in to search for GitHub users')
      return
    }

    if (!username.trim()) return

    setLoading(true)
    setError('')
    setUser(null)
    setRepos([])

    try {
      // Fetch user data
      const userData = await githubService.getUser(username)
      setUser(userData)

      // Fetch repositories
      const reposData = await githubService.getUserRepos(username, {
        sort: 'updated',
        per_page: 5
      })
      setRepos(reposData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchGitHubData()
    }
  }

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <LoadingState />
        </main>
      </div>
    )
  }

  // Show authentication required state
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
                  <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">Sign in Required</CardTitle>
                <CardDescription>
                  Please sign in with your GitHub or Google account to search for GitHub users and repositories.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <AuthButton />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // Main authenticated app content
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
       
        <SearchSection
          username={username}
          loading={loading}
          onUsernameChange={setUsername}
          onSearch={fetchGitHubData}
          onKeyPress={handleKeyPress}
        />

        <ErrorAlert error={error} />

        {loading && <LoadingState />}

        {!user && !loading && !error && (
          <EmptyState />
        )}

        {user && !loading && (
          <div className="max-w-4xl mx-auto space-y-6">
            <UserProfile user={user} />
            <RepositoriesList repos={repos} />
          </div>
        )}
      </main>
    </div>
  )
}
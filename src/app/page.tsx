'use client'

import { useState } from 'react'
import { Header } from '@/components/github/Header'
import { SearchSection } from '@/components/github/Search'
import { EmptyState } from '@/components/github/EmptyState'
import { LoadingState } from '@/components/github/LoadingState'
import { ErrorAlert } from '@/components/github/ErrorState'
import { UserProfile } from '@/components/github/UserProfile'
import { RepositoriesList } from '@/components/github/RepoList'
import { githubService } from '@/lib/github'
import { GitHubUser, GitHubRepo } from '@/types/github'

export default function Home() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchGitHubData = async () => {
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


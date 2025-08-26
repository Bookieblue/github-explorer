'use client'

import { useState } from 'react'
import { Search, Github, Users, BookOpen, Star, GitFork, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AuthButton } from '@/components/auth/auth-button'
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-4 py-4 md:flex items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Github className="h-8 w-8 text-slate-900 dark:text-white" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              GitHub Explorer
            </h1>
          </div>
          <AuthButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Enter GitHub username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={fetchGitHubData} 
                disabled={loading || !username.trim()}
                className="px-6"
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full max-w-md" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </div>
        )}

        {/* User Profile */}
        {user && !loading && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage src={user.avatar_url} alt={user.name || user.login} />
                    <AvatarFallback className="text-2xl">
                      {user.name?.[0] || user.login[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div>
                      <CardTitle className="text-2xl text-slate-900 dark:text-white">
                        {user.name || user.login}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        @{user.login}
                      </CardDescription>
                    </div>
                    
                    {user.bio && (
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {user.bio}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                      {user.company && (
                        <span>🏢 {user.company}</span>
                      )}
                      {user.location && (
                        <span>📍 {user.location}</span>
                      )}
                      {user.blog && (
                        <span>🌐 {user.blog}</span>
                      )}
                    </div>
                    
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href={user.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>View on GitHub</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {user.public_repos}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Public Repos
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {user.followers}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Followers
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {user.following}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Following
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Repositories */}
            {repos.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Latest Repositories
                </h2>
                <p className="text-muted-foreground">
                  Showing 5 most recent public repositories
                </p>
                
                <div className="grid gap-4">
                  {repos.map((repo) => (
                    <Card key={repo.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                <a 
                                  href={repo.html_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1"
                                >
                                  <span>{repo.name}</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </h3>
                              {repo.language && (
                                <span className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                                  {repo.language}
                                </span>
                              )}
                            </div>
                            
                            {repo.description && (
                              <p className="text-slate-600 dark:text-slate-300 text-sm">
                                {repo.description}
                              </p>
                            )}
                            
                            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3" />
                                <span>{repo.stargazers_count}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <GitFork className="h-3 w-3" />
                                <span>{repo.forks_count}</span>
                              </div>
                              <span>Updated {formatDate(repo.updated_at)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
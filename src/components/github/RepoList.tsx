import { ExternalLink, Star, GitFork } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { GitHubRepo } from '@/types/github'

interface RepositoriesListProps {
  repos: GitHubRepo[]
}

export function RepositoriesList({ repos }: RepositoriesListProps) {
  if (repos.length === 0) return null

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Latest Repositories
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Showing {repos.length} most recent public repositories
        </p>
      </div>
      
      <div className="grid gap-4">
        {repos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}

interface RepositoryCardProps {
  repo: GitHubRepo
}

function RepositoryCard({ repo }: RepositoryCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 group"
                >
                  <span>{repo.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </h3>
              {repo.language && (
                <LanguageBadge language={repo.language} />
              )}
            </div>
            
            {repo.description && (
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {repo.description}
              </p>
            )}
            
            <RepositoryStats repo={repo} formatDate={formatDate} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface LanguageBadgeProps {
  language: string
}

function LanguageBadge({ language }: LanguageBadgeProps) {
  return (
    <span className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
      {language}
    </span>
  )
}

interface RepositoryStatsProps {
  repo: GitHubRepo
  formatDate: (date: string) => string
}

function RepositoryStats({ repo, formatDate }: RepositoryStatsProps) {
  return (
    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
      <div className="flex items-center space-x-1">
        <Star className="h-3 w-3" />
        <span>{repo.stargazers_count.toLocaleString()}</span>
      </div>
      <div className="flex items-center space-x-1">
        <GitFork className="h-3 w-3" />
        <span>{repo.forks_count.toLocaleString()}</span>
      </div>
      <span>Updated {formatDate(repo.updated_at)}</span>
    </div>
  )
}
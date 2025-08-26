import { GitHubUser, GitHubRepo,} from '@/types/github'

const GITHUB_API_BASE = 'https://api.github.com'

class GitHubApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'GitHubApiError'
  }
}

export class GitHubService {
  private async fetchFromGitHub<T>(endpoint: string): Promise<T> {
    const url = `${GITHUB_API_BASE}${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Mini-GitHub-Explorer',
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new GitHubApiError('User not found', 404)
        }
        if (response.status === 403) {
          throw new GitHubApiError('API rate limit exceeded', 403)
        }
        throw new GitHubApiError(`GitHub API error: ${response.statusText}`, response.status)
      }

      return response.json()
    } catch (error) {
      if (error instanceof GitHubApiError) {
        throw error
      }
      throw new GitHubApiError('Network error occurred')
    }
  }

  async getUser(username: string): Promise<GitHubUser> {
    if (!username || username.trim() === '') {
      throw new GitHubApiError('Username is required')
    }

    return this.fetchFromGitHub<GitHubUser>(`/users/${encodeURIComponent(username.trim())}`)
  }

  async getUserRepos(username: string, options: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name'
    direction?: 'asc' | 'desc'
    per_page?: number
    page?: number
  } = {}): Promise<GitHubRepo[]> {
    if (!username || username.trim() === '') {
      throw new GitHubApiError('Username is required')
    }

    const params = new URLSearchParams()
    params.set('sort', options.sort || 'updated')
    params.set('direction', options.direction || 'desc')
    params.set('per_page', String(options.per_page || 5))
    params.set('page', String(options.page || 1))

    return this.fetchFromGitHub<GitHubRepo[]>(
      `/users/${encodeURIComponent(username.trim())}/repos?${params.toString()}`
    )
  }

  async searchUsers(query: string, options: {
    per_page?: number
    page?: number
  } = {}): Promise<{ items: GitHubUser[], total_count: number }> {
    if (!query || query.trim() === '') {
      throw new GitHubApiError('Search query is required')
    }

    const params = new URLSearchParams()
    params.set('q', query.trim())
    params.set('per_page', String(options.per_page || 10))
    params.set('page', String(options.page || 1))

    return this.fetchFromGitHub<{ items: GitHubUser[], total_count: number }>(
      `/search/users?${params.toString()}`
    )
  }
}

export const githubService = new GitHubService()
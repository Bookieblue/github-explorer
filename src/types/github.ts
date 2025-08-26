export interface GitHubUser {
  login: string
  avatar_url: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  html_url: string
  company?: string
  location?: string
  blog?: string
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
  created_at: string
  size: number
  default_branch: string
  topics: string[]
  visibility: 'public' | 'private'
  archived: boolean
  disabled: boolean
}

export interface GitHubApiError {
  message: string
  documentation_url?: string
  status?: number
}
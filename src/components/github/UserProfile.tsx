import { ExternalLink, BookOpen, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { GitHubUser } from '@/types/github'

interface UserProfileProps {
  user: GitHubUser
}

export function UserProfile({ user }: UserProfileProps) {
  return (
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
            
            <UserMetadata user={user} />
            
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
        <UserStats user={user} />
      </CardContent>
    </Card>
  )
}

interface UserMetadataProps {
  user: GitHubUser
}

function UserMetadata({ user }: UserMetadataProps) {
  const metadata = [
    { condition: user.company, icon: '🏢', value: user.company },
    { condition: user.location, icon: '📍', value: user.location },
    { condition: user.blog, icon: '🌐', value: user.blog },
  ].filter(item => item.condition)

  if (metadata.length === 0) return null

  return (
    <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
      {metadata.map((item, index) => (
        <span key={index}>
          {item.icon} {item.value}
        </span>
      ))}
    </div>
  )
}

interface UserStatsProps {
  user: GitHubUser
}

function UserStats({ user }: UserStatsProps) {
  const stats = [
    {
      icon: <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-600" />,
      value: user.public_repos,
      label: 'Public Repos',
    },
    {
      icon: <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />,
      value: user.followers,
      label: 'Followers',
    },
    {
      icon: <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />,
      value: user.following,
      label: 'Following',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          {stat.icon}
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {stat.value.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
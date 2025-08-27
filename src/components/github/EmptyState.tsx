import { Github, Search, BookOpen, Users } from 'lucide-react'





export function EmptyState() {
  return (
    <div className="max-w-2xl mx-auto text-center py-5">
      <div className="mb-8">
        <div className="relative mx-auto w-32 h-32 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full"></div>
          <div className="absolute inset-2 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
            <Github className="h-12 w-12 text-slate-400 dark:text-slate-500" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900  mb-4">
          Discover GitHub Profiles
        </h2>
        
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          Enter a GitHub username above to explore their profile, repositories, and contributions. 
          Discover amazing developers and their open source projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <FeatureCard
          icon={<Search className="h-6 w-6 text-blue-600 " />}
          bgColor="bg-blue-100 "
          title="Search Users"
          description="Find any GitHub user by their username"
        />

        <FeatureCard
          icon={<BookOpen className="h-6 w-6 text-green-600" />}
          bgColor="bg-green-100 dark:bg-green-900/30"
          title="View Repositories"
          description="Explore their latest public projects"
        />

        <FeatureCard
          icon={<Users className="h-6 w-6 text-purple-600" />}
          bgColor="bg-purple-100 dark:bg-purple-900/30"
          title="Connect"
          description="View their followers and community"
        />
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  bgColor: string
  title: string
  description: string
}

function FeatureCard({ icon, bgColor, title, description }: FeatureCardProps) {
  return (
    <div className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
      <div className={`w-12 h-12 ${bgColor} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  )
}
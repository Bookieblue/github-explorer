import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchSectionProps {
  username: string
  loading: boolean
  onUsernameChange: (username: string) => void
  onSearch: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
}

export function SearchSection({
  username,
  loading,
  onUsernameChange,
  onSearch,
  onKeyPress,
}: SearchSectionProps) {
  return (
    <div className="mb-8">
      <div className="max-w-md mx-auto">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              onKeyPress={onKeyPress}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={onSearch} 
            disabled={loading || !username.trim()}
            className="px-6"
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>
    </div>
  )
}
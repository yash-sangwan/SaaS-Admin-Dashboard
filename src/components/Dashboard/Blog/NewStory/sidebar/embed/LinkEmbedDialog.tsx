import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface LinkEmbedDialogProps {
  onLinkEmbed: (url: string) => void
}

const LinkEmbedDialog: React.FC<LinkEmbedDialogProps> = ({ onLinkEmbed }) => {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onLinkEmbed(url.trim())
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a link to embed (e.g., YouTube, image URL, etc.)"
            className="w-full pl-10 pr-4 h-12 bg-[#121212] border-[#282828] text-[#A7A7A7] placeholder-[#727272] focus:border-[#404040]"
          />
        </form>
      </div>
      <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white">
        Embed Link
      </Button>
    </div>
  )
}

export default LinkEmbedDialog


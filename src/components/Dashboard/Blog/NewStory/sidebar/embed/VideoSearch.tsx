import React, { useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Play } from 'lucide-react'

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

interface VideoSearchProps {
  onVideoSelect: (url: string, thumbnail: string) => void
}

const VideoSearch: React.FC<VideoSearchProps> = ({ onVideoSelect }) => {
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      const id = getYouTubeVideoId(url)
      setVideoId(id)
    }
  }

  const handleConfirm = useCallback(() => {
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`
      onVideoSelect(embedUrl, thumbnailUrl)
    }
  }, [videoId, onVideoSelect])

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube video link and press Enter"
            className="w-full pl-10 pr-4 h-12 bg-[#121212] border-[#282828] text-[#A7A7A7] placeholder-[#727272] focus:border-[#404040]"
          />
        </form>
      </div>

      {/* Video Preview Section */}
      {videoId && (
        <div className="space-y-4">
          <div className="aspect-video relative rounded-lg overflow-hidden bg-[#181818]">
            <img
              src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Play className="h-16 w-16 text-white opacity-80" />
            </div>
          </div>
          <Button onClick={handleConfirm} className="w-full bg-green-600 hover:bg-green-700 text-white">
            Confirm Video Selection
          </Button>
        </div>
      )}
    </div>
  )
}

export default VideoSearch


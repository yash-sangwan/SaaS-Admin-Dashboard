import React, { useState } from 'react'
import { createApi } from 'unsplash-js'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Sparkles, TrendingUp, ChevronRight } from 'lucide-react'

interface UnsplashSearchProps {
  onImageSelect: (url: string) => void
}

const TRENDING_TOPICS = ['Nature', 'Business', 'Technology', 'Travel', 'Food', 'Architecture']

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
})

const UnsplashSearch: React.FC<UnsplashSearchProps> = ({ onImageSelect }) => {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState<Array<{ id: string; urls: { regular: string } }>>([])
  const [isSearching, setIsSearching] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const handleSearch = async (searchQuery: string, pageNum: number) => {
    setIsSearching(true)
    try {
      const result = await unsplash.search.getPhotos({
        query: searchQuery,
        page: pageNum,
        perPage: 9,
      })
      if (result.type === 'success') {
        setImages(result.response.results)
        setTotalResults(result.response.total)
        setPage(pageNum)
      } else {
        console.error('Error fetching images:', result.errors)
      }
    } catch (error) {
      console.error('Error searching Unsplash:', error)
    }
    setIsSearching(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      handleSearch(query, 1)
    }
  }

  const handleTopicClick = (topic: string) => {
    setQuery(topic)
    handleSearch(topic, 1)
  }

  const handleNextPage = () => {
    handleSearch(query, page + 1)
  }

  const fetchFeaturedImages = async () => {
    try {
      const result = await unsplash.photos.list({ page: 1, perPage: 9 })
      if (result.type === 'success') {
        setImages(result.response.results)
        setTotalResults(result.response.total)
      } else {
        console.error('Error fetching featured images:', result.errors)
      }
    } catch (error) {
      console.error('Error fetching featured images:', error)
    }
  }

  React.useEffect(() => {
    fetchFeaturedImages()
  }, [])

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keywords to search Unsplash, and press Enter"
            className="w-full pl-10 pr-4 h-12 bg-[#121212] border-[#282828] text-[#A7A7A7] placeholder-[#727272] focus:border-[#404040]"
          />
        </form>

        {/* Trending Topics */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-[#A7A7A7]">
            <TrendingUp className="h-4 w-4" />
            <span>Trending topics</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TRENDING_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className="px-4 py-2 rounded-full bg-[#181818] hover:bg-[#282828] border border-[#282828] text-[#A7A7A7] hover:text-white transition-colors text-sm"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="space-y-4">
        {!isSearching && images.length === 0 && (
          <div className="flex items-center gap-2 text-sm text-[#A7A7A7]">
            <Sparkles className="h-4 w-4" />
            <span>Featured images</span>
          </div>
        )}
        {images.length > 0 && (
          <div className="text-sm text-[#A7A7A7]">
            Showing {(page - 1) * 9 + 1}-{Math.min(page * 9, totalResults)} of {totalResults} results
          </div>
        )}
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => onImageSelect(image.urls.regular)}
              className="relative group aspect-[16/9] overflow-hidden rounded-lg bg-[#181818]"
            >
              <img
                src={image.urls.regular}
                alt={`Unsplash image ${image.id}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
        {images.length > 0 && page * 9 < totalResults && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleNextPage} className="bg-[#282828] hover:bg-[#3A3A3A] text-white">
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UnsplashSearch


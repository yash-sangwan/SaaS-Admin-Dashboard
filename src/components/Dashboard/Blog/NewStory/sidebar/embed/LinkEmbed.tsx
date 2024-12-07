import React, { useState, useCallback, CSSProperties } from 'react'
import { RenderElementProps, useSelected, useFocused, ReactEditor, useSlate } from 'slate-react'
import { Transforms } from 'slate'
import { EmbedElement } from '../../CustomTypes'
import { Button } from '@/components/ui/button'
import { AlignLeft, AlignCenter, AlignRight, Trash2, Minimize2, Maximize2, Play } from 'lucide-react'

type LinkEmbedProps = RenderElementProps & {
  element: EmbedElement
}

const LinkEmbed: React.FC<LinkEmbedProps> = ({ attributes, children, element }) => {
  const editor = useSlate()
  const path = ReactEditor.findPath(editor, element)
  const [showOptions, setShowOptions] = useState(false)
  const [isFullSize, setIsFullSize] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const selected = useSelected()
  const focused = useFocused()

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    marginBottom: '1em',
    ...(element.position === 'left' && { float: 'left', marginRight: '1em', marginLeft: '0' }),
    ...(element.position === 'right' && { float: 'right', marginLeft: '1em', marginRight: '0' }),
    ...(element.position === 'center' && { 
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginLeft: '0',
      marginRight: '0',
    }),
    width: isFullSize ? '100%' : '66.67%',
    ...(element.position === 'center' && !isFullSize && { 
      marginLeft: 'auto', 
      marginRight: 'auto',
    }),
  }

  const embedContainerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%', // 16:9 aspect ratio
  }

  const embedStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '0.5rem',
  }

  const handleDelete = useCallback(() => {
    Transforms.removeNodes(editor, { at: path })
  }, [editor, path])

  const handlePosition = useCallback((newPosition: 'left' | 'center' | 'right') => {
    Transforms.setNodes(
      editor,
      { position: newPosition },
      { at: path }
    )
  }, [editor, path])

  const handleSizeToggle = useCallback(() => {
    setIsFullSize(prev => !prev)
  }, [])

  const handleEmbedClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowOptions(true)
    if (isYouTubeVideo(element.url)) {
      setIsPlaying(true)
    }
  }

  const isYouTubeVideo = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const renderEmbed = () => {
    if (isYouTubeVideo(element.url)) {
      const videoId = getYouTubeVideoId(element.url)
      const embedUrl = `https://www.youtube.com/embed/${videoId}`
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`

      return isPlaying ? (
        <iframe
          src={`${embedUrl}?autoplay=1`}
          style={embedStyle}
          allowFullScreen
          allow="autoplay; encrypted-media"
        />
      ) : (
        <>
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            style={embedStyle}
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onClick={() => setIsPlaying(true)}
          >
            <Play className="h-6 w-6" />
          </Button>
        </>
      )
    } else if (element.url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return <img src={element.url} alt="Embedded content" style={embedStyle} />
    } else {
      return <iframe src={element.url} style={embedStyle} />
    }
  }

  return (
    <div {...attributes}>
      <div contentEditable={false} style={wrapperStyle}>
        <div style={embedContainerStyle} onClick={handleEmbedClick}>
          {renderEmbed()}
          {(showOptions || (selected && focused)) && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/80 p-2 rounded-lg transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
                  element.position === 'left' ? 'bg-green-500' : ''
                }`}
                onClick={() => handlePosition('left')}
                aria-label="Align left"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
                  element.position === 'center' ? 'bg-green-500' : ''
                }`}
                onClick={() => handlePosition('center')}
                aria-label="Align center"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
                  element.position === 'right' ? 'bg-green-500' : ''
                }`}
                onClick={() => handlePosition('right')}
                aria-label="Align right"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
                  !isFullSize ? 'bg-green-500' : ''
                }`}
                onClick={handleSizeToggle}
                aria-label="Minimize embed"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 text-white hover:text-white hover:bg-gray-800 ${
                  isFullSize ? 'bg-green-500' : ''
                }`}
                onClick={handleSizeToggle}
                aria-label="Maximize embed"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:text-white hover:bg-gray-800"
                onClick={handleDelete}
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default LinkEmbed


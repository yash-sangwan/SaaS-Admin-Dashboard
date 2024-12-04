import React from 'react'
import { Plus, Image, Video, FileImage, LayoutTemplate, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface EditorTooltipProps {
  onAddImage: () => void
  onAddVideo: () => void
  onAddSplashImage: () => void
  onAddNewSection: () => void
  onAddEmbed: () => void
}

const EditorTooltip: React.FC<EditorTooltipProps> = ({
  onAddImage,
  onAddVideo,
  onAddSplashImage,
  onAddNewSection,
  onAddEmbed,
}) => {
  return (
    <div
      onMouseDown={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-50"
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="w-[400px] sm:w-[540px] mx-auto rounded-t-xl">
          <SheetHeader>
            <SheetTitle>Add Content</SheetTitle>
            <SheetDescription>Choose the type of content you want to add to your story.</SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            <Button onClick={onAddImage} variant="outline" className="flex flex-col items-center justify-center h-24">
              <Image className="h-8 w-8 mb-2" />
              <span>Image</span>
            </Button>
            <Button onClick={onAddVideo} variant="outline" className="flex flex-col items-center justify-center h-24">
              <Video className="h-8 w-8 mb-2" />
              <span>Video</span>
            </Button>
            <Button onClick={onAddSplashImage} variant="outline" className="flex flex-col items-center justify-center h-24">
              <FileImage className="h-8 w-8 mb-2" />
              <span>Splash Image</span>
            </Button>
            <Button onClick={onAddNewSection} variant="outline" className="flex flex-col items-center justify-center h-24">
              <LayoutTemplate className="h-8 w-8 mb-2" />
              <span>New Section</span>
            </Button>
            <Button onClick={onAddEmbed} variant="outline" className="flex flex-col items-center justify-center h-24">
              <Code className="h-8 w-8 mb-2" />
              <span>Embed</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default EditorTooltip
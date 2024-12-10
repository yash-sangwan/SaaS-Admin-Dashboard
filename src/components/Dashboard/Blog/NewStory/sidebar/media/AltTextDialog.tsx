import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AltTextDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (altText: string) => void
  initialAltText?: string
}

const AltTextDialog: React.FC<AltTextDialogProps> = ({ isOpen, onClose, onSave, initialAltText = '' }) => {
  const [altText, setAltText] = useState(initialAltText)

  const handleSave = () => {
    onSave(altText)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#121212] text-white border-[#282828]">
        <DialogHeader>
          <DialogTitle>Add Alt Text</DialogTitle>
          <DialogDescription>
            Enter alternative text for the image to improve accessibility and SEO.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="altText"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Describe the image..."
            className="bg-[#282828] text-white border-[#404040] focus:border-[#1DB954]"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-[#1DB954] text-white hover:bg-[#1ed760]">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AltTextDialog


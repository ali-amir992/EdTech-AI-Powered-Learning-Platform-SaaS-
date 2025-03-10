"use client"

import type React from "react"

import { useRef, useState } from "react"
import { FileVideo, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface VideoUploadProps {
  videoUrl: string | null
  onUpload: (file: File) => void
  isUploading: boolean
  uploadProgress: number
}

export function VideoUpload({ videoUrl, onUpload, isUploading, uploadProgress }: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith("video/")) {
        setError(null)
        onUpload(file)
      } else {
        setError("Please upload a video file.")
      }
    }
  }

  return (
    <div className="space-y-2">
      {videoUrl ? (
        <div className="space-y-2">
          <video src={videoUrl} controls className="w-full rounded-md" height={180} />
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Replace Video
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors hover:border-muted-foreground/50"
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <div className="w-full space-y-2 text-center">
              <p className="text-sm text-muted-foreground">Uploading video...</p>
              <Progress value={uploadProgress} className="h-2 w-full" />
              <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
            </div>
          ) : (
            <>
              <FileVideo className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">Upload Lesson Video</p>
              <p className="mt-1 text-xs text-muted-foreground">Drag and drop or click to browse</p>
            </>
          )}
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileChange} />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}


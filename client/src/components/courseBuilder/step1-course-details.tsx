import type React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { DollarSign, ImageIcon } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { CourseFormData } from "@/types"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Course title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  price: z.coerce.number().min(0, {
    message: "Price must be a positive number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  language: z.string().min(1, {
    message: "Please select a language.",
  }),
  status: z.enum(["Draft", "Published"]),
  root: z.string().optional(),
})

interface Step1CourseDetailsProps {
  initialData: CourseFormData
  onSubmit: (data: CourseFormData) => void
}

export function Step1CourseDetails({ initialData, onSubmit }: Step1CourseDetailsProps) {
  const [thumbnail, setThumbnail] = useState<File | null>(initialData.thumbnail)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData.thumbnail ? URL.createObjectURL(initialData.thumbnail) : null,
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
      price: initialData.price || 0,
      category: initialData.category || "",
      language: initialData.language || "English",
      status: initialData.status || "Draft",
    },
  })

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        setThumbnail(file)
        const preview = URL.createObjectURL(file)
        setThumbnailPreview(preview)
      } else {
        form.setError("root", {
          type: "manual",
          message: "Please upload an image file.",
        })
      }
    }
  }

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!thumbnail) {
      form.setError("root", {
        type: "manual",
        message: "Please upload a thumbnail image.",
      })
      return
    }

    onSubmit({
      ...values,
      thumbnail,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Advanced Machine Learning" {...field} />
                  </FormControl>
                  <FormDescription>A clear, specific title that describes your course.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what students will learn in this course..."
                      className="min-h-32 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A detailed description of your course content and learning outcomes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="number" min="0" step="0.01" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Arabic">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-development">Mobile Development</SelectItem>
                      <SelectItem value="machine-learning">Machine Learning</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Draft courses are only visible to you. Published courses are visible to students.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="root"
              render={() => (
                <FormItem>
                  <FormLabel>Course Thumbnail</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className={`relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                          thumbnailPreview
                            ? "border-muted bg-muted/30"
                            : "border-muted-foreground/25 hover:border-muted-foreground/50"
                        }`}
                        onClick={() => document.getElementById("thumbnail")?.click()}
                      >
                        {thumbnailPreview ? (
                          <img
                            src={thumbnailPreview || "/placeholder.svg"}
                            alt="Thumbnail preview"
                            
                            className="rounded-lg object-contain  "
                          />
                        ) : (
                          <>
                            <ImageIcon className="mb-2 h-10 w-10 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Click to upload thumbnail image</p>
                            <p className="mt-1 text-xs text-muted-foreground">Recommended size: 1280x720px (16:9)</p>
                          </>
                        )}
                        <input
                          id="thumbnail"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleThumbnailChange}
                        />
                      </div>
                      {thumbnailPreview && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setThumbnail(null)
                            setThumbnailPreview(null)
                          }}
                        >
                          Remove Image
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>Upload a high-quality image that represents your course.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {form.formState.errors.root && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Next: Add Course Content
          </Button>
        </div>
      </form>
    </Form>
  )
}


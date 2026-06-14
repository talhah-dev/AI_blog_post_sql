"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  SparklesIcon,
  UploadIcon,
  LinkIcon,
  ImageIcon,
  SendIcon,
  FileEditIcon,
} from "lucide-react"

export default function CreatePostPage() {
  const [title, setTitle] = React.useState("")
  const [paragraph, setParagraph] = React.useState("")
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [imageLink, setImageLink] = React.useState("")
  const [isGeneratingTitle, setIsGeneratingTitle] = React.useState(false)
  const [isGeneratingParagraph, setIsGeneratingParagraph] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleImageLinkApply() {
    if (imageLink.trim()) setImagePreview(imageLink.trim())
  }

  async function handleGenerateTitle() {
    setIsGeneratingTitle(true)
    await new Promise((r) => setTimeout(r, 1200))
    setTitle("10 Ways AI Is Transforming the Future of Content Creation")
    setIsGeneratingTitle(false)
  }

  async function handleGenerateParagraph() {
    setIsGeneratingParagraph(true)
    await new Promise((r) => setTimeout(r, 1500))
    setParagraph(
      "Artificial intelligence is rapidly changing the way we create, distribute, and consume content. From automated writing assistants to smart SEO optimization tools, AI-powered platforms are enabling creators to produce high-quality blog posts in a fraction of the time. As these technologies continue to evolve, content teams that embrace AI will find themselves with a significant competitive advantage in an increasingly crowded digital landscape."
    )
    setIsGeneratingParagraph(false)
  }

  return (
    <div className="mx-auto w-full px-4 py-10 lg:px-6">
      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2 text-muted-foreground text-sm">
          <FileEditIcon className="size-4" />
          <span>Admin</span>
          <span>/</span>
          <span>New Post</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Create Blog Post</h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Write manually or let AI generate content for you.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cover Image</CardTitle>
            <CardDescription>Upload a file or paste an image URL.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload">
              <TabsList className="mb-4">
                <TabsTrigger value="upload" className="gap-1.5">
                  <UploadIcon className="size-3.5" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="link" className="gap-1.5">
                  <LinkIcon className="size-3.5" />
                  Paste Link
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {imagePreview ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <img
                      src={imagePreview}
                      alt="Cover preview"
                      className="h-full w-full object-cover"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-3 bottom-3"
                      onClick={() => {
                        setImagePreview(null)
                        if (fileInputRef.current) fileInputRef.current.value = ""
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/40"
                  >
                    <ImageIcon className="size-8 opacity-40" />
                    <div className="text-center text-sm">
                      <span className="font-medium text-foreground">Click to upload</span>{" "}
                      an image
                      <p className="mt-0.5 text-xs">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  </button>
                )}
              </TabsContent>

              <TabsContent value="link">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={imageLink}
                      onChange={(e) => setImageLink(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleImageLinkApply}>
                      Apply
                    </Button>
                  </div>
                  {imagePreview && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                      <img
                        src={imagePreview}
                        alt="Cover preview"
                        className="h-full w-full object-cover"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute right-3 bottom-3"
                        onClick={() => {
                          setImagePreview(null)
                          setImageLink("")
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Post Title</CardTitle>
            <CardDescription>Write a heading or generate one with AI.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input
              placeholder="Enter your blog post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base"
            />
            <Button
              variant="outline"
              size="sm"
              className="w-fit gap-1.5"
              onClick={handleGenerateTitle}
              disabled={isGeneratingTitle}
            >
              <SparklesIcon className="size-3.5" />
              {isGeneratingTitle ? "Generating..." : "Generate Title with AI"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Post Content</CardTitle>
            <CardDescription>Write your blog content or generate it with AI.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Textarea
              placeholder="Start writing your blog post here..."
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              className="min-h-48 resize-y text-sm leading-relaxed"
            />
            <Button
              variant="outline"
              size="sm"
              className="w-fit gap-1.5"
              onClick={handleGenerateParagraph}
              disabled={isGeneratingParagraph}
            >
              <SparklesIcon className="size-3.5" />
              {isGeneratingParagraph ? "Generating..." : "Generate Content with AI"}
            </Button>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm">
            Save as Draft
          </Button>
          <Button size="sm" className="gap-1.5">
            <SendIcon className="size-3.5" />
            Publish Post
          </Button>
        </div>
      </div>
    </div>
  )
}

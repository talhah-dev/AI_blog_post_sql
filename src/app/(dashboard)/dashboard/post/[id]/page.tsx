"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeftIcon, CalendarIcon, ClockIcon, Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

type Post = {
  id: number
  title: string
  content: string
  image: string
  createdAt: string
  updatedAt: string | null
  profileId: number
}

export default function BlogViewPage() {
  const params = useParams<{ id: string }>()
  const [post, setPost] = React.useState<Post | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/post/${params.id}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch post")
        }

        setPost(data.post)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2Icon className="size-4 animate-spin" />
          <span className="text-sm">Loading post...</span>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 py-10 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Post not found</h1>
        <p className="text-sm text-muted-foreground">
          We could not load this post. It may have been deleted or the ID is invalid.
        </p>
        <Button asChild>
          <Link href="/dashboard">Back to Posts</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 py-10">
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
            <Link href="/dashboard">
              <ArrowLeftIcon className="size-4" />
              Back to Posts
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Badge variant="outline" className="w-fit">
              Published
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="size-3.5" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <ClockIcon className="size-3.5" />
                <span>Single post view</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="overflow-hidden rounded-xl border">
            <img
              src={post.image}
              alt={post.title}
              className="aspect-video w-full object-cover"
            />
          </div>

          <div className="whitespace-pre-wrap text-base leading-7 text-muted-foreground">
            {post.content}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeftIcon className="size-4" />
                Back to Posts
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/dashboard/post/${post.id}/edit`}>Edit Post</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

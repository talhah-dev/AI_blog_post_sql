"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function BlogViewPage() {
    return (
        <div className="min-h-screen w-full bg-background">
            <div className="mx-auto px-4 py-10 ">

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
                        <Badge variant="outline" className="w-fit">Published</Badge>
                        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                            How to Build a Full-Stack Blog with Next.js and Drizzle ORM
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <CalendarIcon className="size-3.5" />
                                <span>Jun 14, 2026</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ClockIcon className="size-3.5" />
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="overflow-hidden rounded-xl border">
                        <img
                            src=""
                            alt="Blog cover image"
                            width={800}
                            height={450}
                            className="w-full object-cover aspect-video"
                        />
                    </div>

                    <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground">
                        <p className="text-base leading-7 text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p className="mt-4 text-base leading-7 text-muted-foreground">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className="mt-4 text-base leading-7 text-muted-foreground">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
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
                            <Link href="/dashboard/create-post">
                                Edit Post
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
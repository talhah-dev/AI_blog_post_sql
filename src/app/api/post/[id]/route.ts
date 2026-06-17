import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { Post } from "@/models/post";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Profile } from "@/models/profile";

async function getCurrentProfile() {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
        return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) }
    }

    if (!session.user.email) {
        return { error: NextResponse.json({ message: "User email is missing from the session" }, { status: 400 }) }
    }

    const profile = await db.select().from(Profile).where(eq(Profile.email, session.user.email)).limit(1)

    if (!profile[0]) {
        return { error: NextResponse.json({ message: "Profile not found" }, { status: 404 }) }
    }

    return { profile: profile[0] }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {
        const current = await getCurrentProfile()
        if ("error" in current) return current.error

        const { id } = await params
        const postId = Number(id)

        if (Number.isNaN(postId)) {
            return NextResponse.json({ message: "Invalid post id" }, { status: 400 })
        }

        const post = await db.select().from(Post).where(eq(Post.id, postId)).limit(1)

        if (!post[0]) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 })
        }

        if (post[0].profileId !== current.profile.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
        }

        await db.delete(Post).where(eq(Post.id, postId))

        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 })


    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete post"
        return NextResponse.json({ message }, { status: 500 })
    }

}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {
        const current = await getCurrentProfile()
        if ("error" in current) return current.error

        const { id } = await params
        const postId = Number(id)

        if (Number.isNaN(postId)) {
            return NextResponse.json({ message: "Invalid post id" }, { status: 400 })
        }

        const post = await db.select().from(Post).where(eq(Post.id, postId)).limit(1)

        if (!post[0]) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 })
        }

        if (post[0].profileId !== current.profile.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
        }

        return NextResponse.json({ post: post[0] }, { status: 200 })

    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch post"
        return NextResponse.json({ message }, { status: 500 })
    }

}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const current = await getCurrentProfile()
        if ("error" in current) return current.error

        const { id } = await params
        const postId = Number(id)

        if (Number.isNaN(postId)) {
            return NextResponse.json({ message: "Invalid post id" }, { status: 400 })
        }

        const post = await db.select().from(Post).where(eq(Post.id, postId)).limit(1)

        if (!post[0]) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 })
        }

        if (post[0].profileId !== current.profile.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
        }

        const body = await req.json()
        const updates: Record<string, string> = {}

        if (typeof body.title === "string" && body.title.trim()) {
            updates.title = body.title.trim()
        }

        if (typeof body.content === "string" && body.content.trim()) {
            updates.content = body.content.trim()
        }

        if (typeof body.image === "string" && body.image.trim()) {
            updates.image = body.image.trim()
        }

        if (Object.keys(updates).length === 0) {
            return NextResponse.json({ message: "No valid fields provided" }, { status: 400 })
        }

        const [updatedPost] = await db
            .update(Post)
            .set(updates)
            .where(eq(Post.id, postId))
            .returning()

        return NextResponse.json({ message: "Post updated successfully", post: updatedPost }, { status: 200 })
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update post"
        return NextResponse.json({ message }, { status: 500 })
    }
}

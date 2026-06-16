import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { Post } from "@/models/post";
import { Profile } from "@/models/profile";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const { title, content, image } = await req.json();

        if (!title || !content || !image) {
            return NextResponse.json({
                message: "Missing required fields"
            }, {
                status: 400

            })
        }

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (!session.user.email) {
            return NextResponse.json({ message: "User email is missing from the session" }, { status: 400 });
        }

        const profile = await db.select().from(Profile).where(eq(Profile.email, session.user.email)).limit(1);


        if (!profile[0]) {
            return NextResponse.json({ message: "Profile not found for this account" }, { status: 404 });
        }

        const [post] = await db.insert(Post).values({
            title,
            content,
            image,
            profileId: profile[0].id
        }).returning();

        return NextResponse.json({ message: "Post created successfully", post }, { status: 201 })


    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create post";

        return NextResponse.json({ message }, { status: 500 });
    }

}

export async function GET(req: NextRequest) {
    try {

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (!session.user.email) {
            return NextResponse.json({ message: "User email is missing from the session" }, { status: 400 });
        }

        const profile = await db.select().from(Profile).where(eq(Profile.email, session.user.email)).limit(1);

        if (!profile[0]) {
            return NextResponse.json({ message: "Profile not found" }, { status: 404 });
        }

        const posts = await db.select().from(Post).where(eq(Post.profileId, profile[0].id));


        return NextResponse.json({
            message: "Posts fetched successfully",
            posts,
            totalPost: posts.length,
            publishPosts: posts.filter((p) => p.isPublished === "published").length,
            draftPosts: posts.filter((p) => p.isPublished === "draft").length,
        }, { status: 200 });


    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch posts";
        return NextResponse.json({ message }, { status: 500 });

    }
}
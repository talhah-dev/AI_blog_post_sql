import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { Profile } from "@/models/profile";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {

        const { name, bio, isPublic, image } = await req.json()

        const updates: Record<string, any> = {}

        if (name) updates.name = name
        if (bio) updates.bio = bio
        if (image) updates.image = image
        if (isPublic !== undefined) updates.isPublic = isPublic

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await db.update(Profile).set(updates).where(eq(Profile.email, session.user.email))


        return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });

    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update data"

        return NextResponse.json({ message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {

    try {

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (!session.user.email) {
            return NextResponse.json({ message: "User email is missing from the session" }, { status: 400 });
        }

        const profile = await db.select().from(Profile).where(eq(Profile.email, session.user.email)).limit(1);

        if (!profile[0]) {
            return NextResponse.json({ message: "Profile not found" }, { status: 404 });
        }

        return NextResponse.json(profile[0]);

    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load data"

        return NextResponse.json({ message }, { status: 500 });
    }

}
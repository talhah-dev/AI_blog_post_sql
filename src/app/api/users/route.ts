import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { Profile } from "@/models/profile";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {

        const users = await db.select().from(Profile)

        if (!users) {
            return NextResponse.json({ message: "Users not found" }, { status: 404 });
        }

        return NextResponse.json(users);

    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load data"

        return NextResponse.json({ message }, { status: 500 });
    }

}
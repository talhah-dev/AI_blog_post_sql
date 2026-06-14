import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { Profile } from "@/models/profile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const body = await req.json();

        const data = await auth.api.signUpEmail({
            body: {
                name: body.name,
                email: body.email,
                password: body.password,
            },
        });

        const profile = await db.insert(Profile).values({
            name: body.name,
            email: body.email,
        });


        return NextResponse.json({ message: "User created successfully", data, profile }, { status: 201 });

    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create user"

        return NextResponse.json(
            { message },
            { status: 500 }
        );
    }
}
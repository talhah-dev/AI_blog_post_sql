import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const file = formData.get("image") as File

    if (!file) {
        return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    const blob = await put(file.name, file, {
        access: "public"
    })

    return NextResponse.json({ url: blob.url })
}
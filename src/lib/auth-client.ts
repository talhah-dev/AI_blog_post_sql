import { createAuthClient } from "better-auth/react"

// Use the current origin's /api/auth route in every environment.
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL!
})
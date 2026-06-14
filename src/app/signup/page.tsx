"use client"

import { SignupForm } from "@/components/signup-form"
import { GalleryVerticalEndIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await authClient.getSession()
      if (session) {
        router.replace("/dashboard")
      } else {
        setLoading(false)
      }
    }
    checkSession()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEndIcon className="size-4" />
          </div>
          AI BLOG APP.
        </a>
        <SignupForm />
      </div>
    </div>
  )
}

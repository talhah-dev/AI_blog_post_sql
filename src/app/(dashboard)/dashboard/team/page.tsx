"use client"

import * as React from "react"
import {
  UsersIcon,
  PlusIcon,
  SearchIcon,
  EllipsisVerticalIcon,
  MailIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type User = {
  id: number
  name: string
  email: string
  image: string | null
  role: string
  isPublic: boolean
  bio: string | null
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function getRoleBadgeVariant(role: string): "default" | "secondary" | "outline" {
  if (role === "admin") return "default"
  return "outline"
}

function getRoleIcon(role: string) {
  if (role === "admin") return <ShieldCheckIcon className="size-3" />
  return <UserIcon className="size-3" />
}

export default function TeamPage() {
  const [search, setSearch] = React.useState("")
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(true)

  const fetchAllUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      setUsers(data|| [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchAllUsers()
  }, [])

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-auto w-full px-4 py-10 lg:px-6">
      <div className="mb-8 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2 text-muted-foreground text-sm">
              <UsersIcon className="size-4" />
              <span>Admin</span>
              <span>/</span>
              <span>Team</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Team Members</h1>
            <p className="mt-1 text-muted-foreground text-sm">
              {loading ? "Loading..." : `${users.length} members across your blog platform`}
            </p>
          </div>
          <Button size="sm" className="shrink-0 gap-1.5">
            <PlusIcon className="size-3.5" />
            Invite Member
          </Button>
        </div>

        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or role..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-muted-foreground/20 animate-pulse shrink-0" />
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-28 rounded bg-muted-foreground/20 animate-pulse" />
                      <div className="h-3 w-36 rounded bg-muted-foreground/20 animate-pulse" />
                    </div>
                  </div>
                  <div className="size-7 rounded bg-muted-foreground/20 animate-pulse" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="h-5 w-16 rounded-full bg-muted-foreground/20 animate-pulse" />
                  <div className="h-3 w-20 rounded bg-muted-foreground/20 animate-pulse" />
                </div>
                <div className="mt-4 h-16 rounded-lg bg-muted-foreground/20 animate-pulse" />
                <div className="mt-3 h-8 w-full rounded bg-muted-foreground/20 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <UsersIcon className="size-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No members match your search.</p>
          <Button variant="outline" size="sm" onClick={() => setSearch("")}>
            Clear search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((user) => (
            <Card key={user.id} className="transition-shadow hover:shadow-sm">
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarImage src={user.image ?? undefined} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 shrink-0 text-muted-foreground"
                      >
                        <EllipsisVerticalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <Badge
                    variant={getRoleBadgeVariant(user.role)}
                    className="gap-1 px-2 py-0.5 text-xs capitalize"
                  >
                    {getRoleIcon(user.role)}
                    {user.role}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {user.isPublic ? "Public Profile" : "Private Profile"}
                  </span>
                </div>

                {user.bio && (
                  <p className="mt-3 text-xs text-muted-foreground line-clamp-2">{user.bio}</p>
                )}

                <Button variant="outline" size="sm" className="mt-3 h-8 w-full gap-1.5 text-xs">
                  <MailIcon className="size-3" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
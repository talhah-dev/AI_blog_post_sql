"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  UsersIcon,
  SearchIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  MailIcon,
  ShieldCheckIcon,
  PenLineIcon,
  EyeIcon,
} from "lucide-react"

const team = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    role: "Admin",
    department: "Management",
    avatar: "",
    joined: "Jan 2023",
    postsPublished: 142,
  },
  {
    id: 2,
    name: "James Thornton",
    email: "james.thornton@example.com",
    role: "Editor",
    department: "Content",
    avatar: "",
    joined: "Mar 2023",
    postsPublished: 87,
  },
  {
    id: 3,
    name: "Aisha Rahman",
    email: "aisha.rahman@example.com",
    role: "Writer",
    department: "Content",
    avatar: "",
    joined: "Jun 2023",
    postsPublished: 54,
  },
  {
    id: 4,
    name: "Carlos Mendez",
    email: "carlos.mendez@example.com",
    role: "Writer",
    department: "Content",
    avatar: "",
    joined: "Aug 2023",
    postsPublished: 39,
  },
  {
    id: 5,
    name: "Priya Nair",
    email: "priya.nair@example.com",
    role: "Editor",
    department: "Content",
    avatar: "",
    joined: "Sep 2023",
    postsPublished: 61,
  },
  {
    id: 6,
    name: "Daniel Park",
    email: "daniel.park@example.com",
    role: "SEO Specialist",
    department: "Marketing",
    avatar: "",
    joined: "Nov 2023",
    postsPublished: 28,
  },
  {
    id: 7,
    name: "Lena Fischer",
    email: "lena.fischer@example.com",
    role: "Writer",
    department: "Content",
    avatar: "",
    joined: "Jan 2024",
    postsPublished: 19,
  },
  {
    id: 8,
    name: "Omar Hassan",
    email: "omar.hassan@example.com",
    role: "SEO Specialist",
    department: "Marketing",
    avatar: "",
    joined: "Feb 2024",
    postsPublished: 11,
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function getRoleBadgeVariant(role: string): "default" | "secondary" | "outline" {
  if (role === "Admin") return "default"
  if (role === "Editor") return "secondary"
  return "outline"
}

function getRoleIcon(role: string) {
  if (role === "Admin") return <ShieldCheckIcon className="size-3" />
  if (role === "Editor") return <PenLineIcon className="size-3" />
  if (role === "SEO Specialist") return <EyeIcon className="size-3" />
  return <PenLineIcon className="size-3" />
}

export default function TeamPage() {
  const [search, setSearch] = React.useState("")

  const filtered = team.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()) ||
      member.department.toLowerCase().includes(search.toLowerCase())
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
              {team.length} members across your blog platform
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
            placeholder="Search by name, role, or department..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Admin", "Editor", "Writer", "SEO Specialist"].map((filter) => (
            <Button
              key={filter}
              variant={filter === "All" ? "secondary" : "outline"}
              size="sm"
              className="h-7 rounded-full px-3 text-xs"
              onClick={() => setSearch(filter === "All" ? "" : filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <UsersIcon className="size-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No members match your search.</p>
          <Button variant="outline" size="sm" onClick={() => setSearch("")}>
            Clear search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((member) => (
            <Card key={member.id} className="transition-shadow hover:shadow-sm">
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{member.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{member.email}</p>
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
                    variant={getRoleBadgeVariant(member.role)}
                    className="gap-1 px-2 py-0.5 text-xs"
                  >
                    {getRoleIcon(member.role)}
                    {member.role}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{member.department}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-muted/50 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Posts Published</p>
                    <p className="text-sm font-semibold tabular-nums">{member.postsPublished}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="text-sm font-semibold">{member.joined}</p>
                  </div>
                </div>

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

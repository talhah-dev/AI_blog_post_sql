"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CircleCheckIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  FileTextIcon,
  Loader2Icon,
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { DataTableSkeleton } from "./skeleton/DataTableSkeleton"

export const schema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  isPublished: z.string(),
  content: z.string(),
  createdAt: z.string(),
})

type Post = z.infer<typeof schema>



export function DataTable() {
  const [postData, setPostData] = React.useState<Post[]>([])
  const [loading, setLoading] = React.useState(true)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = await res.json()
      setPostData(result.posts || [])
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const deletePostHandler = async (id: number) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.ok) {
        toast.success("Post deleted successfully")
        fetchPosts()
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.image}
            alt={row.original.title}
            className="size-8 rounded-md object-cover"
          />
          <span className="font-medium line-clamp-1 text-wrap">{row.original.title}</span>
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "content",
      header: "Content",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground line-clamp-2 text-wrap max-w-xs">
          {row.original.content}
        </span>
      ),
    },
    {
      accessorKey: "isPublished",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.isPublished === "published" ? (
            <CircleCheckIcon className="fill-green-500 dark:fill-green-400" />
          ) : (
            <FileTextIcon className="size-3.5" />
          )}
          {row.original.isPublished === "published" ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Published At",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon"
            >
              <EllipsisVerticalIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/post/${row.original.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/post/${row.original.id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deletePostHandler(row.original.id)} variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  React.useEffect(() => {
    fetchPosts()
  }, [])

  const table = useReactTable({
    data: postData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (loading) {
    return <div className=""><DataTableSkeleton /></div>
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <h2 className="text-base font-semibold">Recent Posts</h2>
        <Button variant="outline" size="sm">
          <PlusIcon />
          <Link href={"/dashboard/create-post"} className="hidden lg:inline">Add New Post</Link>
        </Button>
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2Icon className="size-4 animate-spin" />
                      <span className="text-sm">Loading posts...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

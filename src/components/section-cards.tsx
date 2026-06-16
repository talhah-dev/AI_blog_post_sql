"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { SectionCardsSkeleton } from "./skeleton/SectionCardsSkeleton"

export function SectionCards() {

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<{
    totalPost?: number;
    publishPosts?: number;
    draftPosts?: number;
  }
  >({});

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className=""><SectionCardsSkeleton /></div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Posts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.totalPost}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            More content created this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total posts generated across the platform
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Published Posts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.publishPosts}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Publishing activity is growing <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Successfully published and visible to readers
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Draft Posts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.draftPosts}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDownIcon />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Fewer drafts awaiting completion <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Posts currently saved as drafts
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function SectionCardsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="@container/card">
                    <CardHeader>
                        <CardDescription>
                            <div className="h-4 w-24 rounded bg-muted-foreground/20 animate-pulse" />
                        </CardDescription>
                        <CardTitle>
                            <div className="h-8 w-16 rounded bg-muted-foreground/20 animate-pulse" />
                        </CardTitle>
                        <CardAction>
                            <div className="h-6 w-10 rounded-full bg-muted-foreground/20 animate-pulse" />
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5">
                        <div className="h-4 w-48 rounded bg-muted-foreground/20 animate-pulse" />
                        <div className="h-4 w-36 rounded bg-muted-foreground/20 animate-pulse" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
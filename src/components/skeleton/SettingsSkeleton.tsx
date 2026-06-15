import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function SettingsSkeleton() {
    return (
        <div className="min-h-screen w-full bg-background">
            <div className="mx-auto px-4 py-10 lg:px-6">
                {/* Header */}
                <div className="mb-8">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-8 w-24 mb-2" />
                    <Skeleton className="h-4 w-72" />
                </div>

                {/* Tabs */}
                <div className="flex flex-col gap-6">
                    <Skeleton className="h-10 w-full" />

                    {/* Profile Card */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-5 w-40 mb-1" />
                            <Skeleton className="h-4 w-64" />
                        </CardHeader>
                        <CardContent className="flex flex-col gap-6">
                            {/* Avatar */}
                            <div className="flex items-center gap-5">
                                <Skeleton className="size-20 rounded-full" />
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-8 w-28" />
                                    <Skeleton className="h-3 w-40" />
                                </div>
                            </div>

                            <Separator />

                            {/* Name + Email */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-9 w-full" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-9 w-full" />
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-4 w-8" />
                                <Skeleton className="h-24 w-full" />
                            </div>

                            {/* Role */}
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-4 w-10" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-9 w-full" />
                                    <Skeleton className="h-9 w-16" />
                                </div>
                            </div>

                            {/* Public Profile toggle */}
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-48" />
                                </div>
                                <Skeleton className="h-6 w-10 rounded-full" />
                            </div>

                            {/* Button */}
                            <div className="flex justify-end">
                                <Skeleton className="h-9 w-24" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
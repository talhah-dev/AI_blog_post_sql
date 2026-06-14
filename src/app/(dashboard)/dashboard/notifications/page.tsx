"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    BellIcon,
    MailIcon,
    CheckCheckIcon,
    CircleIcon,
    SparklesIcon,
    UsersIcon,
    FileTextIcon,
    ShieldAlertIcon,
    TrendingUpIcon,
    Trash2Icon,
    TrendingDownIcon,
} from "lucide-react"

const stats = [
    {
        label: "Total Received",
        value: 284,
        description: "All messages received",
        icon: TrendingUpIcon,
        trendIcon: TrendingUpIcon,
    },
    {
        label: "Total Read",
        value: 219,
        description: "Messages reviewed and opened",
        icon: TrendingUpIcon,
        trendIcon: TrendingUpIcon,
    },
    {
        label: "Unread Messages",
        value: 65,
        description: "Messages awaiting review",
        icon: TrendingDownIcon,
        trendIcon: TrendingDownIcon,
    },
]

const notifications = [
    {
        id: 1,
        type: "ai",
        icon: SparklesIcon,
        iconColor: "text-purple-500",
        iconBg: "bg-purple-500/10",
        title: "AI post generated successfully",
        description: "\"10 Ways AI Is Transforming Content Marketing\" is ready for review.",
        time: "2 min ago",
        read: false,
    },
    {
        id: 2,
        type: "team",
        icon: UsersIcon,
        iconColor: "text-blue-500",
        iconBg: "bg-blue-500/10",
        title: "New team member joined",
        description: "Lena Fischer accepted your invite and joined as a Writer.",
        time: "1 hr ago",
        read: false,
    },
    {
        id: 3,
        type: "post",
        icon: FileTextIcon,
        iconColor: "text-green-500",
        iconBg: "bg-green-500/10",
        title: "Post published",
        description: "\"Beginner's Guide to Personal Finance\" is now live.",
        time: "3 hr ago",
        read: false,
    },
    {
        id: 4,
        type: "security",
        icon: ShieldAlertIcon,
        iconColor: "text-red-500",
        iconBg: "bg-red-500/10",
        title: "New login detected",
        description: "A new sign-in was detected from Karachi, PK. If this was you, no action needed.",
        time: "Yesterday",
        read: true,
    },
    {
        id: 5,
        type: "ai",
        icon: SparklesIcon,
        iconColor: "text-purple-500",
        iconBg: "bg-purple-500/10",
        title: "AI content draft saved",
        description: "\"The Future of Remote Work\" was auto-saved as a draft.",
        time: "Yesterday",
        read: true,
    },
    {
        id: 6,
        type: "team",
        icon: UsersIcon,
        iconColor: "text-blue-500",
        iconBg: "bg-blue-500/10",
        title: "Role updated",
        description: "Carlos Mendez's role was changed from Writer to Editor.",
        time: "2 days ago",
        read: true,
    },
    {
        id: 7,
        type: "post",
        icon: FileTextIcon,
        iconColor: "text-green-500",
        iconBg: "bg-green-500/10",
        title: "Post reached 10k views",
        description: "\"10 Ways AI Is Changing Content Marketing\" just hit 10,000 page views.",
        time: "3 days ago",
        read: true,
    },
    {
        id: 8,
        type: "security",
        icon: ShieldAlertIcon,
        iconColor: "text-red-500",
        iconBg: "bg-red-500/10",
        title: "Password changed",
        description: "Your account password was successfully updated.",
        time: "5 days ago",
        read: true,
    },
]

const notificationSettings = [
    {
        label: "Email Notifications",
        description: "Receive alerts and updates via email",
        defaultChecked: true,
    },
    {
        label: "Publish Alerts",
        description: "Get notified when a post goes live",
        defaultChecked: true,
    },
    {
        label: "Team Activity",
        description: "Updates about team member actions and changes",
        defaultChecked: false,
    },
    {
        label: "Security Alerts",
        description: "Logins, password changes, and suspicious activity",
        defaultChecked: true,
    },
]

function NotificationItem({
    notification,
    onRead,
    onDelete,
}: {
    notification: (typeof notifications)[0]
    onRead: (id: number) => void
    onDelete: (id: number) => void
}) {
    return (
        <div
            className={`flex items-start w-full gap-4 rounded-lg p-4 transition-colors ${!notification.read ? "bg-primary/5 border border-primary/10" : "border border-transparent hover:bg-muted/40"
                }`}
        >
            <div
                className={`size-9 rounded-full flex items-center justify-center shrink-0 ${notification.iconBg}`}
            >
                <notification.icon className={`size-4 ${notification.iconColor}`} />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium">{notification.title}</p>
                            {!notification.read && (
                                <span className="size-1.5 rounded-full bg-primary shrink-0 mt-0.5" />
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {notification.description}
                        </p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{notification.time}</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                    {!notification.read && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => onRead(notification.id)}
                        >
                            Mark as read
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
                        onClick={() => onDelete(notification.id)}
                    >
                        <Trash2Icon className="size-3 mr-1" />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default function NotificationsPage() {
    const [items, setItems] = React.useState(notifications)
    const [settings, setSettings] = React.useState(() =>
        notificationSettings.map((s) => ({ ...s, checked: s.defaultChecked }))
    )

    const unreadCount = items.filter((n) => !n.read).length

    function markAsRead(id: number) {
        setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    }

    function markAllRead() {
        setItems((prev) => prev.map((n) => ({ ...n, read: true })))
    }

    function deleteNotification(id: number) {
        setItems((prev) => prev.filter((n) => n.id !== id))
    }

    function toggleSetting(index: number) {
        setSettings((prev) =>
            prev.map((s, i) => (i === index ? { ...s, checked: !s.checked } : s))
        )
    }

    const unread = items.filter((n) => !n.read)
    const read = items.filter((n) => n.read)

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full px-4 py-10 lg:px-6">
                <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                            <BellIcon className="size-4" />
                            <span>Admin</span>
                            <span>/</span>
                            <span>Notifications</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
                            {unreadCount > 0 && (
                                <Badge className="rounded-full px-2 h-5 text-xs">{unreadCount}</Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">
                            Stay on top of activity across your blog platform.
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <Button variant="outline" size="sm" className="gap-1.5" onClick={markAllRead}>
                            <CheckCheckIcon className="size-3.5" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 grid-cols-1 mb-8">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="@container/card">
                            <CardHeader>

                                <CardDescription>{stat.label}</CardDescription>

                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {stat.value}
                                </CardTitle>
                            </CardHeader>

                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    {stat.description}
                                    <stat.trendIcon className="size-4" />
                                </div>

                                <div className="text-muted-foreground">
                                    Updated from recent activity
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="all">
                            <div className="flex items-center justify-between mb-4">
                                <TabsList>
                                    <TabsTrigger value="all">
                                        All
                                        <Badge variant="secondary" className="ml-1.5 px-1.5 h-4 text-xs rounded-full">
                                            {items.length}
                                        </Badge>
                                    </TabsTrigger>
                                    <TabsTrigger value="unread">
                                        Unread
                                        {unreadCount > 0 && (
                                            <Badge className="ml-1.5 px-1.5 h-4 text-xs rounded-full">
                                                {unreadCount}
                                            </Badge>
                                        )}
                                    </TabsTrigger>
                                    <TabsTrigger value="read">Read</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="all" className="flex flex-col gap-2 mt-0">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                                        <BellIcon className="size-10 text-muted-foreground/30" />
                                        <p className="text-sm text-muted-foreground">No notifications yet.</p>
                                    </div>
                                ) : (
                                    items.map((n) => (
                                        <NotificationItem
                                            key={n.id}
                                            notification={n}
                                            onRead={markAsRead}
                                            onDelete={deleteNotification}
                                        />
                                    ))
                                )}
                            </TabsContent>

                            <TabsContent value="unread" className="flex flex-col gap-2 mt-0">
                                {unread.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                                        <CheckCheckIcon className="size-10 text-muted-foreground/30" />
                                        <p className="text-sm text-muted-foreground">All caught up! No unread notifications.</p>
                                    </div>
                                ) : (
                                    unread.map((n) => (
                                        <NotificationItem
                                            key={n.id}
                                            notification={n}
                                            onRead={markAsRead}
                                            onDelete={deleteNotification}
                                        />
                                    ))
                                )}
                            </TabsContent>

                            <TabsContent value="read" className="flex flex-col gap-2 mt-0">
                                {read.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                                        <BellIcon className="size-10 text-muted-foreground/30" />
                                        <p className="text-sm text-muted-foreground">No read notifications.</p>
                                    </div>
                                ) : (
                                    read.map((n) => (
                                        <NotificationItem
                                            key={n.id}
                                            notification={n}
                                            onRead={markAsRead}
                                            onDelete={deleteNotification}
                                        />
                                    ))
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Notification Settings</CardTitle>
                                <CardDescription>Control what you get notified about.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-1 p-0">
                                {settings.map((setting, index) => (
                                    <React.Fragment key={setting.label}>
                                        <div className="flex items-center justify-between px-6 py-3">
                                            <div className="min-w-0 pr-3">
                                                <p className="text-sm font-medium">{setting.label}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                                    {setting.description}
                                                </p>
                                            </div>
                                            <Switch
                                                checked={setting.checked}
                                                onCheckedChange={() => toggleSetting(index)}
                                                className="shrink-0"
                                            />
                                        </div>
                                        {index < settings.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                                <div className="px-6 py-4">
                                    <Button size="sm" className="w-full">
                                        Save Settings
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
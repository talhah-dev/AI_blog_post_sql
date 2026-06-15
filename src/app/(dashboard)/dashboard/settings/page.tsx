"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    SettingsIcon,
    UserIcon,
    BellIcon,
    ShieldIcon,
    SparklesIcon,
    GlobeIcon,
    KeyIcon,
    UploadIcon,
    EyeIcon,
    EyeOffIcon,
    TrashIcon,
    RefreshCwIcon,
} from "lucide-react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { SettingsSkeleton } from "@/components/skeleton/SettingsSkeleton"

export default function SettingsPage() {
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
    const [showNewPassword, setShowNewPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [twoFactor, setTwoFactor] = React.useState(false)
    const [isPublic, setIsPublic] = React.useState<boolean>()
    const [data, setData] = React.useState<{ name?: string; email?: string; bio?: string; role?: string; isPublic?: boolean } | null>(null)
    const [name, setName] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [original, setOriginal] = React.useState({ name: "", bio: "", isPublic: true })
    const [saveLoading, setSaveLoading] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [bio, setBio] = React.useState("")


    const GetProfileData = async () => {
        setLoading(true)

        try {

            const response = await fetch("/api/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            setData(data)


        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        GetProfileData()
    }, [])

    React.useEffect(() => {
        if (data) {
            setName(data.name ?? "")
            setEmail(data.email ?? "")
            setBio(data.bio ?? "")
            setIsPublic(data.isPublic ?? true)
            setOriginal({
                name: data.name ?? "",
                bio: data.bio ?? "",
                isPublic: data.isPublic ?? true
            })
        }
    }, [data])


    if (loading) {
        return <SettingsSkeleton />
    }

    const updateProfilehandler = async () => {

        const hasChanges = name !== original.name ||
            bio !== original.bio ||
            isPublic !== original.isPublic

        if (!hasChanges) {
            toast.error("Please update at least one field")
            return
        }

        try {
            setSaveLoading(true)
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    bio,
                    isPublic,
                }),
            })
            const data = await response.json()
            console.log(data)
            if (data) {
                toast.success(data.message)
            } else {
                toast.error("Something went wrong")
            }

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setSaveLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-background">
            <div className="mx-auto  px-4 py-10 lg:px-6">
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <SettingsIcon className="size-4" />
                        <span>Admin</span>
                        <span>/</span>
                        <span>Settings</span>
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage your account, preferences, and platform configuration.
                    </p>
                </div>

                <Tabs defaultValue="profile" className="flex flex-col gap-6">
                    <TabsList className="flex w-full flex-wrap h-auto gap-1 bg-muted p-1">
                        <TabsTrigger value="profile" className="gap-1.5 text-xs">
                            <UserIcon className="size-3.5" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="security" className="gap-1.5 text-xs">
                            <ShieldIcon className="size-3.5" />
                            Security
                        </TabsTrigger>
                        <TabsTrigger value="api" className="gap-1.5 text-xs">
                            <KeyIcon className="size-3.5" />
                            API Keys
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="flex flex-col gap-5">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Profile Information</CardTitle>
                                <CardDescription>Update your personal details and public profile.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-6">
                                <div className="flex items-center gap-5">
                                    <Avatar className="size-20">
                                        <AvatarImage src="" />
                                        <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                                            AD
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <Button variant="outline" size="sm" className="gap-1.5 w-fit">
                                            <UploadIcon className="size-3.5" />
                                            Upload Photo
                                        </Button>
                                        <p className="text-xs text-muted-foreground">JPG, PNG or WEBP. Max 2MB.</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" value={email} readOnly />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Write a short bio about yourself..."
                                        className="resize-none min-h-24"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="username">Role</Label>
                                    <div className="flex gap-2">
                                        <Input id="username" readOnly className="font-mono" />
                                        <Badge variant="secondary" className="shrink-0 px-3 self-center">
                                            {data?.role}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <p className="text-sm font-medium">Public Profile</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Allow others to view your profile page
                                        </p>
                                    </div>
                                    <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                                </div>

                                <div className="flex justify -end">
                                    <Button onClick={updateProfilehandler} disabled={saveLoading} >{saveLoading ? <Spinner /> : "Save Profile"}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="flex flex-col gap-5">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Change Password</CardTitle>
                                <CardDescription>Update your password to keep your account secure.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                {[
                                    {
                                        id: "current-password",
                                        label: "Current Password",
                                        show: showCurrentPassword,
                                        toggle: () => setShowCurrentPassword((p) => !p),
                                    },
                                    {
                                        id: "new-password",
                                        label: "New Password",
                                        show: showNewPassword,
                                        toggle: () => setShowNewPassword((p) => !p),
                                    },
                                    {
                                        id: "confirm-password",
                                        label: "Confirm New Password",
                                        show: showConfirmPassword,
                                        toggle: () => setShowConfirmPassword((p) => !p),
                                    },
                                ].map((field) => (
                                    <div key={field.id} className="flex flex-col gap-2">
                                        <Label htmlFor={field.id}>{field.label}</Label>
                                        <div className="relative">
                                            <Input
                                                id={field.id}
                                                type={field.show ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={field.toggle}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {field.show ? (
                                                    <EyeOffIcon className="size-4" />
                                                ) : (
                                                    <EyeIcon className="size-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-end">
                                    <Button size="sm">Update Password</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
                                <CardDescription>Add an extra layer of security to your account.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <p className="text-sm font-medium">Enable 2FA</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Secure your login with an authenticator app
                                        </p>
                                    </div>
                                    <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-destructive/40">
                            <CardHeader>
                                <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
                                <CardDescription>These actions are permanent and cannot be undone.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3">
                                <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                                    <div>
                                        <p className="text-sm font-medium">Delete Account</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Permanently delete your account and all data
                                        </p>
                                    </div>
                                    <Button variant="destructive" size="sm" className="gap-1.5 shrink-0">
                                        <TrashIcon className="size-3.5" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="api" className="flex flex-col gap-5">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">API Keys</CardTitle>
                                <CardDescription>
                                    Manage keys used to connect AI and third-party services.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                {[
                                    {
                                        label: "Anthropic API Key",
                                        placeholder: "sk-ant-••••••••••••••••••••",
                                        badge: "Connected",
                                        badgeVariant: "default" as const,
                                    },
                                    {
                                        label: "OpenAI API Key",
                                        placeholder: "sk-••••••••••••••••••••",
                                        badge: "Not Connected",
                                        badgeVariant: "outline" as const,
                                    },
                                    {
                                        label: "Google Analytics ID",
                                        placeholder: "G-XXXXXXXXXX",
                                        badge: "Connected",
                                        badgeVariant: "default" as const,
                                    },
                                ].map((key) => (
                                    <div key={key.label} className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label>{key.label}</Label>
                                            <Badge variant={key.badgeVariant} className="text-xs px-2">
                                                {key.badge}
                                            </Badge>
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                type="password"
                                                placeholder={key.placeholder}
                                                className="font-mono text-sm"
                                            />
                                            <Button variant="outline" size="icon" className="shrink-0">
                                                <RefreshCwIcon className="size-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-end mt-2">
                                    <Button size="sm">Save API Keys</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
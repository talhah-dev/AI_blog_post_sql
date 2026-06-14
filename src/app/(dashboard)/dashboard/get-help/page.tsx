"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    LifeBuoyIcon,
    SearchIcon,
    BookOpenIcon,
    MessageSquareIcon,
    MailIcon,
    SparklesIcon,
    FileTextIcon,
    UsersIcon,
    ShieldIcon,
    BarChart2Icon,
    ArrowRightIcon,
    CheckCircleIcon,
    ClockIcon,
    ZapIcon,
} from "lucide-react"

const faqs = [
    {
        question: "How do I generate a blog post using AI?",
        answer:
            "Go to Create Post from the sidebar. Enter a title or let AI generate one for you by clicking 'Generate Title with AI'. Then click 'Generate Content with AI' to produce a full blog post. You can edit the result before publishing.",
    },
    {
        question: "Can I schedule posts to publish later?",
        answer:
            "Yes. When creating or editing a post, instead of clicking 'Publish Post', click the dropdown arrow next to it and choose 'Schedule'. Pick your desired date and time and confirm.",
    },
    {
        question: "How do I invite a new team member?",
        answer:
            "Navigate to the Team page from the sidebar and click 'Invite Member' in the top right. Enter their email address and assign them a role (Writer, Editor, SEO Specialist). They will receive an email invitation.",
    },
    {
        question: "What AI models are available for content generation?",
        answer:
            "We support Claude Haiku (fast and lightweight), Claude Sonnet (balanced performance), and Claude Opus (most capable). You can change the default model under Settings → AI Settings → Default Model.",
    },
    {
        question: "How is my SEO score calculated?",
        answer:
            "The SEO score is calculated automatically after each post is generated or published. It checks keyword density, title length, meta description, readability, and internal linking. A score above 80 is considered good.",
    },
    {
        question: "Can I export my reports?",
        answer:
            "Yes. On the Reports page, click the 'Export' button in the top right. You can download the data as a CSV or PDF file.",
    },
    {
        question: "How do I change my account password?",
        answer:
            "Go to Settings → Security → Change Password. Enter your current password and then your new password twice to confirm. Click 'Update Password' to save.",
    },
    {
        question: "What happens to a post when I click 'Save as Draft'?",
        answer:
            "The post is saved privately and not visible to the public. You can find all drafts under the Posts section filtered by 'Draft' status. You can continue editing and publish whenever you are ready.",
    },
]

const categories = [
    { label: "Getting Started", icon: ZapIcon, count: 12, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Content & AI", icon: SparklesIcon, count: 18, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Managing Posts", icon: FileTextIcon, count: 9, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Team & Roles", icon: UsersIcon, count: 7, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Security", icon: ShieldIcon, count: 5, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Reports & Analytics", icon: BarChart2Icon, count: 6, color: "text-indigo-500", bg: "bg-indigo-500/10" },
]

const supportStats = [
    { label: "Avg. Response Time", value: "< 2 hrs", icon: ClockIcon },
    { label: "Issues Resolved", value: "98.4%", icon: CheckCircleIcon },
    { label: "Articles Available", value: "57", icon: BookOpenIcon },
]

export default function GetHelpPage() {
    const [search, setSearch] = React.useState("")
    const [submitted, setSubmitted] = React.useState(false)

    const filteredFaqs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(search.toLowerCase()) ||
            faq.answer.toLowerCase().includes(search.toLowerCase())
    )

    function handleSubmit() {
        setSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full px-4 py-10 lg:px-6">
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <LifeBuoyIcon className="size-4" />
                        <span>Admin</span>
                        <span>/</span>
                        <span>Get Help</span>
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Help & Support</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Find answers, browse guides, or reach out to our support team.
                    </p>
                </div>

                <div className="relative mb-10">
                    <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border p-8 flex flex-col items-center text-center gap-5">
                        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <LifeBuoyIcon className="size-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">How can we help you?</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Search our knowledge base or browse by category below.
                            </p>
                        </div>
                        <div className="relative w-full max-w-lg">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search articles, guides, FAQs..."
                                className="pl-9 h-11 bg-background"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-6 flex-wrap justify-center">
                            {supportStats.map((stat) => (
                                <div key={stat.label} className="flex items-center gap-2">
                                    <stat.icon className="size-4 text-primary" />
                                    <span className="text-sm font-medium">{stat.value}</span>
                                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.label}
                            type="button"
                            className="flex items-center gap-3 rounded-lg border p-4 text-left hover:bg-muted/40 transition-colors group"
                        >
                            <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${cat.bg}`}>
                                <cat.icon className={`size-4 ${cat.color}`} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{cat.label}</p>
                                <p className="text-xs text-muted-foreground">{cat.count} articles</p>
                            </div>
                            <ArrowRightIcon className="size-3.5 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>

                <div className="mb-10">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                Quick answers to the most common questions.
                            </p>
                        </div>
                        {search && (
                            <Badge variant="secondary" className="text-xs">
                                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
                            </Badge>
                        )}
                    </div>

                    {filteredFaqs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center gap-3 rounded-lg border border-dashed">
                            <SearchIcon className="size-8 text-muted-foreground/30" />
                            <p className="text-sm text-muted-foreground">
                                No results for <span className="font-medium text-foreground">"{search}"</span>
                            </p>
                            <Button variant="outline" size="sm" onClick={() => setSearch("")}>
                                Clear search
                            </Button>
                        </div>
                    ) : (
                        <Accordion type="single" collapsible className="flex flex-col gap-2">
                            {filteredFaqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`faq-${index}`}
                                    className="border rounded-lg px-4 data-[state=open]:bg-muted/30"
                                >
                                    <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 ">
                
                    <Card>
                        <CardHeader>
                            <div className="size-9 rounded-lg bg-green-500/10 flex items-center justify-center mb-1">
                                <MailIcon className="size-4 text-green-500" />
                            </div>
                            <CardTitle className="text-base">Submit a Ticket</CardTitle>
                            <CardDescription>
                                Describe your issue and we'll get back to you within 2 hours.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center gap-3 py-4 text-center">
                                    <CheckCircleIcon className="size-8 text-green-500" />
                                    <p className="text-sm font-medium">Ticket submitted!</p>
                                    <p className="text-xs text-muted-foreground">
                                        We'll reach out to your email within 2 hours.
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSubmitted(false)}
                                    >
                                        Submit another
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="ticket-subject">Subject</Label>
                                        <Input id="ticket-subject" placeholder="Brief description of your issue" />
                                    </div>
                                    <div className="flex w-full flex-col gap-2">
                                        <Label htmlFor="ticket-category">Category</Label>
                                        <Select>
                                            <SelectTrigger className="w-full" id="ticket-category">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="ai">Content & AI</SelectItem>
                                                    <SelectItem value="posts">Managing Posts</SelectItem>
                                                    <SelectItem value="team">Team & Roles</SelectItem>
                                                    <SelectItem value="billing">Billing</SelectItem>
                                                    <SelectItem value="security">Security</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="ticket-message">Message</Label>
                                        <Textarea
                                            id="ticket-message"
                                            placeholder="Describe your issue in detail..."
                                            className="resize-none min-h-24"
                                        />
                                    </div>
                                    <Button className="w-full gap-1.5" onClick={handleSubmit}>
                                        <MailIcon className="size-3.5" />
                                        Submit Ticket
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
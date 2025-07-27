"use client"

import { useState } from "react"
import { Plus, Share2, Twitter, FileText, Video, Headphones, Bookmark, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

type ContentType = "tweet" | "article" | "video" | "audio" | "bookmark"

interface ContentItem {
  id: string
  type: ContentType
  title: string
  content: string
  tags: string[]
  dateAdded: string
  url?: string
  author?: string
}

const contentTypeIcons = {
  tweet: Twitter,
  article: FileText,
  video: Video,
  audio: Headphones,
  bookmark: Bookmark,
}

const contentTypeLabels = {
  tweet: "Tweet",
  article: "Article",
  video: "Video",
  audio: "Audio",
  bookmark: "Bookmark",
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    type: "article",
    title: "The Future of AI in Web Development",
    content:
      "Artificial Intelligence is revolutionizing how we build web applications. From automated code generation to intelligent debugging, AI tools are becoming indispensable for modern developers...",
    tags: ["AI", "Web Development", "Technology", "Future"],
    dateAdded: "2024-01-15",
    author: "Tech Weekly",
    url: "https://example.com/ai-web-dev",
  },
  {
    id: "2",
    type: "tweet",
    title: "React 19 Features",
    content:
      "🚀 React 19 is here! New features include: • Server Components • Concurrent Features • Automatic Batching • New Hooks The future of React looks amazing! #React19 #WebDev",
    tags: ["React", "JavaScript", "Frontend"],
    dateAdded: "2024-01-14",
    author: "@reactjs",
  },
  {
    id: "3",
    type: "video",
    title: "Advanced TypeScript Patterns",
    content:
      "Learn advanced TypeScript patterns that will make your code more type-safe and maintainable. This video covers conditional types, mapped types, and template literal types...",
    tags: ["TypeScript", "Programming", "Tutorial"],
    dateAdded: "2024-01-13",
    author: "Code Academy",
    url: "https://youtube.com/watch?v=example",
  },
  {
    id: "4",
    type: "audio",
    title: "The Psychology of User Experience",
    content:
      "A deep dive into how users interact with digital interfaces and the psychological principles that drive good UX design. Topics include cognitive load, decision fatigue, and user motivation...",
    tags: ["UX", "Psychology", "Design", "Podcast"],
    dateAdded: "2024-01-12",
    author: "UX Podcast",
  },
  {
    id: "5",
    type: "bookmark",
    title: "CSS Grid Generator Tool",
    content:
      "An interactive tool for generating CSS Grid layouts. Perfect for quickly prototyping grid-based designs with visual controls for gap, columns, rows, and alignment...",
    tags: ["CSS", "Tools", "Grid", "Design"],
    dateAdded: "2024-01-11",
    url: "https://cssgrid-generator.netlify.app",
  },
  {
    id: "6",
    type: "article",
    title: "Building Scalable React Applications",
    content:
      "Best practices for structuring large React applications. Learn about component architecture, state management patterns, and performance optimization techniques...",
    tags: ["React", "Architecture", "Scalability", "Best Practices"],
    dateAdded: "2024-01-10",
    author: "React Patterns",
    url: "https://example.com/scalable-react",
  },
]

function AppSidebar() {
  const [selectedType, setSelectedType] = useState<ContentType | "all">("all")

  const contentTypes: Array<{ type: ContentType | "all"; label: string; icon: any }> = [
    { type: "all", label: "All Content", icon: Bookmark },
    { type: "tweet", label: "Tweets", icon: Twitter },
    { type: "article", label: "Articles", icon: FileText },
    { type: "video", label: "Videos", icon: Video },
    { type: "audio", label: "Audio", icon: Headphones },
    { type: "bookmark", label: "Bookmarks", icon: Bookmark },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content Types</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentTypes.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.type}>
                    <SidebarMenuButton isActive={selectedType === item.type} onClick={() => setSelectedType(item.type)}>
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function ContentCard({
  item,
  onDelete,
  onShare,
}: {
  item: ContentItem
  onDelete: (id: string) => void
  onShare: (item: ContentItem) => void
}) {
  const Icon = contentTypeIcons[item.type]

  return (
    <Card className="h-fit hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm leading-tight">{item.title}</h3>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onShare(item)}>
              <Share2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{item.content}</p>

        {item.author && <p className="text-xs text-muted-foreground mb-2">by {item.author}</p>}

        {item.url && (
          <Button variant="outline" size="sm" className="mb-3 h-7 text-xs bg-transparent" asChild>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              View Source
            </a>
          </Button>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Separator className="mb-2" />

        <p className="text-xs text-muted-foreground">Added on {new Date(item.dateAdded).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

export default function SecondBrainApp() {
  const [content, setContent] = useState<ContentItem[]>(mockContent)
  const [selectedType, setSelectedType] = useState<ContentType | "all">("all")

  const filteredContent = selectedType === "all" ? content : content.filter((item) => item.type === selectedType)

  const handleDelete = (id: string) => {
    setContent((prev) => prev.filter((item) => item.id !== id))
  }

  const handleShare = (item: ContentItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.content,
        url: item.url || window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${item.title}\n\n${item.content}\n\n${item.url || ""}`)
      alert("Content copied to clipboard!")
    }
  }

  const handleShareBrain = () => {
    const brainContent = content
      .map((item) => `${contentTypeLabels[item.type]}: ${item.title}\n${item.content}\nTags: ${item.tags.join(", ")}\n`)
      .join("\n---\n\n")

    if (navigator.share) {
      navigator.share({
        title: "My Second Brain",
        text: brainContent,
      })
    } else {
      navigator.clipboard.writeText(brainContent)
      alert("Brain content copied to clipboard!")
    }
  }

  const handleAddContent = () => {
    // In a real app, this would open a modal or navigate to an add content page
    alert("Add content functionality would be implemented here!")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold">Second Brain</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleShareBrain}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Brain
                </Button>
                <Button onClick={handleAddContent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {selectedType === "all" ? "All Content" : contentTypeLabels[selectedType as ContentType]}
              </h2>
              <p className="text-muted-foreground">
                {filteredContent.length} {filteredContent.length === 1 ? "item" : "items"} saved
              </p>
            </div>

            {filteredContent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No content found</h3>
                <p className="text-muted-foreground mb-4">Start building your second brain by adding some content!</p>
                <Button onClick={handleAddContent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Item
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredContent.map((item) => (
                  <ContentCard key={item.id} item={item} onDelete={handleDelete} onShare={handleShare} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

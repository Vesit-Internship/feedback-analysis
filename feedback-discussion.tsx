"use client"

import { useState } from "react"
import {
  MessageSquare,
  Plus,
  Heart,
  Reply,
  MoreHorizontal,
  Star,
  Search,
  Send,
  ThumbsUp,
  Flag,
  Pin,
  Shield,
  Calendar,
  Activity,
  Baby,
  Brain,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for existing feedback
const feedbackData = [
  {
    id: 1,
    user: {
      name: "Sarah M.",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      verified: true,
    },
    title: "Love the ovulation predictions!",
    content:
      "The fertility tracking has been incredibly accurate for me. I've been using it for 6 months and it correctly predicted my ovulation window every time. The insights are really helpful too!",
    category: "Fertility Monitoring",
    rating: 5,
    date: "2024-01-15",
    likes: 24,
    replies: 3,
    tags: ["accurate", "helpful", "fertility"],
    isPinned: false,
    replies_data: [
      {
        id: 101,
        user: {
          name: "Dr. Emma Wilson",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "moderator",
          title: "Women's Health Specialist",
        },
        content:
          "Thank you for the positive feedback, Sarah! We're thrilled to hear that our fertility tracking is working well for you. Our algorithm uses advanced machine learning to provide the most accurate predictions possible.",
        date: "2024-01-15",
        likes: 12,
      },
      {
        id: 102,
        user: {
          name: "Jessica L.",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "user",
        },
        content:
          "I completely agree! The predictions have been spot on for me too. It's given me so much more confidence in understanding my cycle.",
        date: "2024-01-16",
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Anonymous User",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
    },
    title: "App keeps crashing during symptom logging",
    content:
      "Every time I try to log my symptoms, especially when adding multiple symptoms at once, the app crashes and I lose all my data. This is really frustrating as I'm trying to track patterns for my doctor.",
    category: "Symptom Tracking",
    rating: 2,
    date: "2024-01-14",
    likes: 15,
    replies: 2,
    tags: ["bug", "crashing", "data-loss"],
    isPinned: true,
    replies_data: [
      {
        id: 201,
        user: {
          name: "Tech Support",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "admin",
          title: "Support Team",
        },
        content:
          "We're sorry to hear about this issue! Our development team is actively working on a fix for the symptom logging crash. As a temporary workaround, try logging one symptom at a time. We'll update you once the fix is released.",
        date: "2024-01-14",
        likes: 6,
      },
    ],
  },
  {
    id: 3,
    user: {
      name: "Maria R.",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "user",
      verified: true,
    },
    title: "Personalized health insights are amazing",
    content:
      "The AI-powered health insights have been a game changer for me. The personalized tips based on my cycle and symptoms have helped me understand my body so much better. Keep up the great work!",
    category: "Health Insights",
    rating: 5,
    date: "2024-01-13",
    likes: 31,
    replies: 4,
    tags: ["AI", "personalized", "insights"],
    isPinned: false,
    replies_data: [
      {
        id: 301,
        user: {
          name: "Product Team",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "admin",
          title: "Product Manager",
        },
        content:
          "Thank you Maria! We're constantly improving our AI algorithms to provide even more personalized and accurate insights. Your feedback helps us understand what's working well.",
        date: "2024-01-13",
        likes: 18,
      },
    ],
  },
]

export default function FeedbackDiscussion() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSort, setSelectedSort] = useState("recent")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [expandedFeedback, setExpandedFeedback] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [newFeedback, setNewFeedback] = useState({
    title: "",
    content: "",
    category: "",
    rating: 5,
    anonymous: false,
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Symptom Tracking":
        return <Activity className="h-4 w-4" />
      case "Fertility Monitoring":
        return <Baby className="h-4 w-4" />
      case "Health Insights":
        return <Brain className="h-4 w-4" />
      case "Period Tracking":
        return <Calendar className="h-4 w-4" />
      case "Mood Tracking":
        return <Heart className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 border-red-200"
      case "moderator":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleSubmitFeedback = () => {
    // Handle feedback submission
    console.log("Submitting feedback:", newFeedback)
    setShowSubmissionForm(false)
    setNewFeedback({
      title: "",
      content: "",
      category: "",
      rating: 5,
      anonymous: false,
    })
  }

  const handleReply = (feedbackId: number) => {
    // Handle reply submission
    console.log("Replying to feedback:", feedbackId, replyText)
    setReplyText("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Feedback</h1>
            <p className="text-gray-600 mt-1">Share your thoughts and connect with other users</p>
          </div>
          <Dialog open={showSubmissionForm} onOpenChange={setShowSubmissionForm}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-pink-600 hover:bg-pink-700">
                <Plus className="h-4 w-4" />
                Share Feedback
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Share Your Feedback</DialogTitle>
                <DialogDescription>Help us improve by sharing your experience with the app</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief summary of your feedback..."
                    value={newFeedback.title}
                    onChange={(e) => setNewFeedback({ ...newFeedback, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newFeedback.category}
                    onValueChange={(value) => setNewFeedback({ ...newFeedback, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="symptom">Symptom Tracking</SelectItem>
                      <SelectItem value="fertility">Fertility Monitoring</SelectItem>
                      <SelectItem value="insights">Health Insights</SelectItem>
                      <SelectItem value="period">Period Tracking</SelectItem>
                      <SelectItem value="mood">Mood Tracking</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Rating</Label>
                  <RadioGroup
                    value={newFeedback.rating.toString()}
                    onValueChange={(value) => setNewFeedback({ ...newFeedback, rating: Number.parseInt(value) })}
                    className="flex gap-4"
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1">
                          {rating}
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Your Feedback</Label>
                  <Textarea
                    id="content"
                    placeholder="Share your detailed thoughts, suggestions, or issues..."
                    className="min-h-[120px]"
                    value={newFeedback.content}
                    onChange={(e) => setNewFeedback({ ...newFeedback, content: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={newFeedback.anonymous}
                    onCheckedChange={(checked) => setNewFeedback({ ...newFeedback, anonymous: checked as boolean })}
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Post anonymously
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowSubmissionForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitFeedback} className="bg-pink-600 hover:bg-pink-700">
                  Submit Feedback
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="symptom">Symptom Tracking</SelectItem>
                    <SelectItem value="fertility">Fertility Monitoring</SelectItem>
                    <SelectItem value="insights">Health Insights</SelectItem>
                    <SelectItem value="period">Period Tracking</SelectItem>
                    <SelectItem value="mood">Mood Tracking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="replies">Most Replies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search feedback..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Feed */}
        <div className="space-y-4">
          {feedbackData.map((feedback) => (
            <Card key={feedback.id} className={`${feedback.isPinned ? "border-pink-200 bg-pink-50/50" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={feedback.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{feedback.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{feedback.user.name}</h3>
                        {feedback.user.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {feedback.user.role !== "user" && (
                          <Badge className={`text-xs ${getRoleColor(feedback.user.role)}`}>
                            {feedback.user.title || feedback.user.role}
                          </Badge>
                        )}
                        {feedback.isPinned && <Pin className="h-4 w-4 text-pink-600" />}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{feedback.date}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(feedback.category)}
                          <span>{feedback.category}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pin className="mr-2 h-4 w-4" />
                        Pin Post
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-lg mb-2">{feedback.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{feedback.content}</p>
                </div>

                {feedback.tags && (
                  <div className="flex flex-wrap gap-2">
                    {feedback.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      {feedback.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      onClick={() => setExpandedFeedback(expandedFeedback === feedback.id ? null : feedback.id)}
                    >
                      <Reply className="h-4 w-4" />
                      {feedback.replies} replies
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Reply
                  </Button>
                </div>

                {/* Replies Section */}
                {expandedFeedback === feedback.id && (
                  <div className="space-y-4 pt-4 border-t">
                    {feedback.replies_data?.map((reply) => (
                      <div key={reply.id} className="flex gap-3 pl-4 border-l-2 border-gray-100">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{reply.user.name}</span>
                            {reply.user.role !== "user" && (
                              <Badge className={`text-xs ${getRoleColor(reply.user.role)}`}>
                                {reply.user.title || reply.user.role}
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">{reply.date}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
                          <Button variant="ghost" size="sm" className="gap-1 text-xs h-6">
                            <ThumbsUp className="h-3 w-3" />
                            {reply.likes}
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* Reply Input */}
                    <div className="flex gap-3 pl-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <Textarea
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="min-h-[80px]"
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleReply(feedback.id)}
                            className="bg-pink-600 hover:bg-pink-700"
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Zap className="h-4 w-4" />
            Load More Feedback
          </Button>
        </div>
      </div>
    </div>
  )
}

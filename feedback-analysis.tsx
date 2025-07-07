"use client"

import { useState } from "react"
import {
  Calendar,
  Download,
  Filter,
  MessageSquare,
  TrendingUp,
  Heart,
  Activity,
  Baby,
  Brain,
  Search,
  MoreHorizontal,
  Reply,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Textarea } from "@/components/ui/textarea"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts"

// TypeScript Types
type Sentiment = "positive" | "neutral" | "negative"

type SentimentItem = {
  name: string
  value: number
  color: string
}

type TrendItem = {
  month: string
  positive: number
  neutral: number
  negative: number
}

type ModuleItem = {
  module: string
  feedback: number
  satisfaction: number
}

type KeywordItem = {
  keyword: string
  count: number
  sentiment: Sentiment
}

type FeedbackItem = {
  id: number
  user: string
  module: string
  sentiment: Sentiment
  rating: number
  feedback: string
  keywords: string[]
  date: string
  status: "resolved" | "in-progress" | "open"
  demographics: {
    age: string
    location: string
  }
}

// Data
const sentimentData: SentimentItem[] = [
  { name: "Positive", value: 65, color: "#10b981" },
  { name: "Neutral", value: 25, color: "#6b7280" },
  { name: "Negative", value: 10, color: "#ef4444" },
]

const trendData: TrendItem[] = [
  { month: "Jan", positive: 60, neutral: 30, negative: 10 },
  { month: "Feb", positive: 62, neutral: 28, negative: 10 },
  { month: "Mar", positive: 58, neutral: 32, negative: 10 },
  { month: "Apr", positive: 65, neutral: 25, negative: 10 },
  { month: "May", positive: 68, neutral: 22, negative: 10 },
  { month: "Jun", positive: 65, neutral: 25, negative: 10 },
]

const moduleData: ModuleItem[] = [
  { module: "Symptom Tracking", feedback: 245, satisfaction: 4.2 },
  { module: "Fertility Monitoring", feedback: 189, satisfaction: 4.5 },
  { module: "Health Insights", feedback: 156, satisfaction: 4.1 },
  { module: "Period Tracking", feedback: 298, satisfaction: 4.3 },
  { module: "Mood Tracking", feedback: 134, satisfaction: 3.9 },
]

const keywordData: KeywordItem[] = [
  { keyword: "easy to use", count: 89, sentiment: "positive" },
  { keyword: "accurate predictions", count: 76, sentiment: "positive" },
  { keyword: "helpful insights", count: 65, sentiment: "positive" },
  { keyword: "sync issues", count: 23, sentiment: "negative" },
  { keyword: "confusing interface", count: 18, sentiment: "negative" },
]

const feedbackList: FeedbackItem[] = [
  {
    id: 1,
    user: "Anonymous User",
    module: "Fertility Monitoring",
    sentiment: "positive",
    rating: 5,
    feedback: "Love the ovulation predictions! They've been incredibly accurate for me.",
    keywords: ["accurate predictions", "ovulation"],
    date: "2024-01-15",
    status: "resolved",
    demographics: { age: "25-34", location: "US" },
  },
  {
    id: 2,
    user: "Anonymous User",
    module: "Symptom Tracking",
    sentiment: "negative",
    rating: 2,
    feedback: "The app keeps crashing when I try to log my symptoms. Very frustrating.",
    keywords: ["crashing", "symptoms", "bugs"],
    date: "2024-01-14",
    status: "in-progress",
    demographics: { age: "35-44", location: "UK" },
  },
  {
    id: 3,
    user: "Anonymous User",
    module: "Health Insights",
    sentiment: "positive",
    rating: 4,
    feedback: "The personalized health tips are really helpful and well-researched.",
    keywords: ["helpful insights", "personalized"],
    date: "2024-01-13",
    status: "resolved",
    demographics: { age: "25-34", location: "CA" },
  },
]

export default function FeedbackAnalysis() {
  const [selectedModule, setSelectedModule] = useState<string>("all")
  const [selectedSentiment, setSelectedSentiment] = useState<string>("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("6months")
  const [responseText, setResponseText] = useState<string>("")

  const getSentimentColor = (sentiment: Sentiment): string => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50"
      case "negative":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusColor = (status: FeedbackItem["status"]): string => {
    switch (status) {
      case "resolved":
        return "text-green-600 bg-green-50"
      case "in-progress":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  // Rest of the component remains unchanged...
  return <div>{/* UI code here */}</div>
}

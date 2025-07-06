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

// Mock data
const sentimentData = [
  { name: "Positive", value: 65, color: "#10b981" },
  { name: "Neutral", value: 25, color: "#6b7280" },
  { name: "Negative", value: 10, color: "#ef4444" },
]

const trendData = [
  { month: "Jan", positive: 60, neutral: 30, negative: 10 },
  { month: "Feb", positive: 62, neutral: 28, negative: 10 },
  { month: "Mar", positive: 58, neutral: 32, negative: 10 },
  { month: "Apr", positive: 65, neutral: 25, negative: 10 },
  { month: "May", positive: 68, neutral: 22, negative: 10 },
  { month: "Jun", positive: 65, neutral: 25, negative: 10 },
]

const moduleData = [
  { module: "Symptom Tracking", feedback: 245, satisfaction: 4.2 },
  { module: "Fertility Monitoring", feedback: 189, satisfaction: 4.5 },
  { module: "Health Insights", feedback: 156, satisfaction: 4.1 },
  { module: "Period Tracking", feedback: 298, satisfaction: 4.3 },
  { module: "Mood Tracking", feedback: 134, satisfaction: 3.9 },
]

const keywordData = [
  { keyword: "easy to use", count: 89, sentiment: "positive" },
  { keyword: "accurate predictions", count: 76, sentiment: "positive" },
  { keyword: "helpful insights", count: 65, sentiment: "positive" },
  { keyword: "sync issues", count: 23, sentiment: "negative" },
  { keyword: "confusing interface", count: 18, sentiment: "negative" },
]

const feedbackList = [
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
  const [selectedModule, setSelectedModule] = useState("all")
  const [selectedSentiment, setSelectedSentiment] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [responseText, setResponseText] = useState("")

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50"
      case "negative":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "text-green-600 bg-green-50"
      case "in-progress":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Feedback Analysis</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights from user feedback</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Module</Label>
                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    <SelectItem value="symptom">Symptom Tracking</SelectItem>
                    <SelectItem value="fertility">Fertility Monitoring</SelectItem>
                    <SelectItem value="insights">Health Insights</SelectItem>
                    <SelectItem value="period">Period Tracking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sentiment</Label>
                <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sentiments</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Timeframe</Label>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search feedback..." className="pl-9" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2</div>
              <p className="text-xs text-muted-foreground">+0.3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <Reply className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolution Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3d</div>
              <p className="text-xs text-muted-foreground">-0.5d from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="detailed">Detailed View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sentiment Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Distribution</CardTitle>
                  <CardDescription>Overall sentiment breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      positive: { label: "Positive", color: "#10b981" },
                      neutral: { label: "Neutral", color: "#6b7280" },
                      negative: { label: "Negative", color: "#ef4444" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Trend Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Trends</CardTitle>
                  <CardDescription>6-month sentiment evolution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      positive: { label: "Positive", color: "#10b981" },
                      neutral: { label: "Neutral", color: "#6b7280" },
                      negative: { label: "Negative", color: "#ef4444" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="neutral" stroke="#6b7280" strokeWidth={2} />
                        <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Module Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Module Performance</CardTitle>
                <CardDescription>Feedback volume and satisfaction by feature</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moduleData.map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-pink-100">
                          {module.module === "Symptom Tracking" && <Activity className="h-4 w-4 text-pink-600" />}
                          {module.module === "Fertility Monitoring" && <Baby className="h-4 w-4 text-pink-600" />}
                          {module.module === "Health Insights" && <Brain className="h-4 w-4 text-pink-600" />}
                          {module.module === "Period Tracking" && <Calendar className="h-4 w-4 text-pink-600" />}
                          {module.module === "Mood Tracking" && <Heart className="h-4 w-4 text-pink-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{module.module}</h4>
                          <p className="text-sm text-gray-600">{module.feedback} feedback items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{module.satisfaction}/5.0</div>
                        <Progress value={module.satisfaction * 20} className="w-20 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {sentimentData.map((sentiment, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sentiment.color }} />
                      {sentiment.name} Feedback
                    </CardTitle>
                    <CardDescription>{sentiment.value}% of total feedback</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">{Math.round((sentiment.value / 100) * 1234)}</div>
                    <Progress value={sentiment.value} className="mb-4" />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>This month:</span>
                        <span className="font-medium">+{Math.round(sentiment.value * 0.1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg response time:</span>
                        <span className="font-medium">{sentiment.name === "Negative" ? "1.2d" : "2.5d"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Feedback Analysis</CardTitle>
                <CardDescription>Detailed breakdown by application module</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    feedback: { label: "Feedback Count", color: "#ec4899" },
                    satisfaction: { label: "Satisfaction", color: "#8b5cf6" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moduleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="module" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="feedback" fill="#ec4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Keywords</CardTitle>
                <CardDescription>Most frequently mentioned terms in feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keywordData.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant={keyword.sentiment === "positive" ? "default" : "destructive"}>
                          {keyword.keyword}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {keyword.sentiment === "positive" ? "Positive" : "Negative"} sentiment
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{keyword.count}</div>
                        <div className="text-sm text-gray-600">mentions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Feedback</CardTitle>
                <CardDescription>Individual feedback items with response options</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Sentiment</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedbackList.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.user}</TableCell>
                        <TableCell>{item.module}</TableCell>
                        <TableCell>
                          <Badge className={getSentimentColor(item.sentiment)}>{item.sentiment}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {item.rating}/5
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 ${i < item.rating ? "text-yellow-400" : "text-gray-300"}`}
                                >
                                  ★
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{item.feedback}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status === "resolved" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {item.status === "in-progress" && <Clock className="w-3 h-3 mr-1" />}
                            {item.status === "open" && <AlertCircle className="w-3 h-3 mr-1" />}
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Reply className="mr-2 h-4 w-4" />
                                    Respond
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Respond to Feedback</DialogTitle>
                                    <DialogDescription>Send a response to this user's feedback</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                      <p className="text-sm font-medium">Original Feedback:</p>
                                      <p className="text-sm text-gray-600 mt-1">{item.feedback}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="response">Your Response</Label>
                                      <Textarea
                                        id="response"
                                        placeholder="Thank you for your feedback..."
                                        value={responseText}
                                        onChange={(e) => setResponseText(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Send Response</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Resolved
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

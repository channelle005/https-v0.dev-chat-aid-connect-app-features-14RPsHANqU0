"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MapPin,
  Clock,
  Users,
  Package,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Plus,
  MessageCircle,
} from "lucide-react"

export default function DashboardPage() {
  const [userType] = useState<"donor" | "recipient">("donor") // This would come from auth context

  const recentActivity = [
    {
      id: 1,
      type: "donation",
      description: "Donated groceries to Johnson family",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "match",
      description: "New match found: Winter clothes needed",
      time: "5 hours ago",
      status: "pending",
    },
    {
      id: 3,
      type: "message",
      description: "Thank you message from Maria S.",
      time: "1 day ago",
      status: "new",
    },
  ]

  const activeRequests = [
    {
      id: 1,
      title: "Family of 5 needs groceries",
      location: "Downtown Area",
      urgency: "urgent",
      timePosted: "3 hours ago",
      description: "Single mother with 4 children needs help with weekly groceries.",
      category: "Food",
    },
    {
      id: 2,
      title: "Winter clothing for children",
      location: "Northside",
      urgency: "moderate",
      timePosted: "1 day ago",
      description: "Need warm clothes for 2 children ages 6 and 9.",
      category: "Clothing",
    },
    {
      id: 3,
      title: "Temporary shelter assistance",
      location: "Central District",
      urgency: "critical",
      timePosted: "2 days ago",
      description: "Recently lost housing, need temporary shelter or rent assistance.",
      category: "Shelter",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">AidConnect</h1>
            </Link>
            <Badge variant="secondary" className="ml-4">
              {userType === "donor" ? "Donor" : "Recipient"}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
          <p className="text-gray-600">
            {userType === "donor"
              ? "Thank you for making a difference in your community."
              : "We're here to help connect you with the support you need."}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userType === "donor" ? "Total Donations" : "Requests Made"}
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userType === "donor" ? "Families Helped" : "Help Received"}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">3 pending responses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="active" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="active">
                    {userType === "donor" ? "Available Requests" : "My Requests"}
                  </TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="matches">Matches</TabsTrigger>
                </TabsList>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {userType === "donor" ? "New Donation" : "New Request"}
                </Button>
              </div>

              <TabsContent value="active" className="space-y-4">
                {activeRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{request.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {request.location} • {request.timePosted}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              request.urgency === "critical"
                                ? "destructive"
                                : request.urgency === "urgent"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {request.urgency}
                          </Badge>
                          <Badge variant="outline">{request.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{request.description}</p>
                      <div className="flex items-center space-x-3">
                        <Button size="sm">{userType === "donor" ? "Offer Help" : "Edit Request"}</Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        {userType === "donor" && (
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your donation and connection history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                          <div className="flex-1">
                            <p className="font-medium">{activity.description}</p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {activity.time}
                            </p>
                          </div>
                          <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="matches" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Smart Matches</CardTitle>
                    <CardDescription>
                      {userType === "donor"
                        ? "Requests that match your donation preferences"
                        : "Donors who can help with your needs"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-500 py-8">No new matches at the moment. Check back later!</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  {userType === "donor" ? "Make a Donation" : "Request Help"}
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Local Needs
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">$2,847</div>
                    <p className="text-sm text-gray-600">Total value of your contributions</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">18</div>
                    <p className="text-sm text-gray-600">Families directly helped</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">94%</div>
                    <p className="text-sm text-gray-600">Community satisfaction rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <p className="text-sm font-medium">Thank you so much!</p>
                    <p className="text-xs text-gray-600">From Maria S. • 2 hours ago</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50">
                    <p className="text-sm font-medium">Delivery confirmed</p>
                    <p className="text-xs text-gray-600">From John D. • 1 day ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  View All Messages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

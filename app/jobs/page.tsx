import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ArrowLeft, MapPin, Clock, DollarSign, Search, Filter } from "lucide-react"

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      title: "Food Delivery Helper",
      company: "Local Food Bank",
      location: "Downtown Area",
      type: "Part-time",
      pay: "$15/hour",
      description: "Help deliver food packages to families in need. Flexible hours, own transportation required.",
      postedTime: "2 hours ago",
      urgent: true,
    },
    {
      id: 2,
      title: "Warehouse Assistant",
      company: "Community Aid Center",
      location: "Northside",
      type: "Full-time",
      pay: "$18/hour",
      description: "Sort and organize donated items. Physical work, great for those who want to help directly.",
      postedTime: "5 hours ago",
      urgent: false,
    },
    {
      id: 3,
      title: "Event Setup Crew",
      company: "Charity Events Co",
      location: "Various Locations",
      type: "Gig",
      pay: "$20/hour",
      description: "Help set up and tear down charity events. Weekend work available.",
      postedTime: "1 day ago",
      urgent: false,
    },
    {
      id: 4,
      title: "Administrative Support",
      company: "AidConnect",
      location: "Remote",
      type: "Part-time",
      pay: "$16/hour",
      description: "Help process applications and coordinate between donors and recipients.",
      postedTime: "2 days ago",
      urgent: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">AidConnect</h1>
            </Link>
            <Badge variant="secondary" className="ml-4">
              Jobs
            </Badge>
          </div>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Meaningful Work</h2>
          <p className="text-gray-600">
            Discover job opportunities that make a difference in your community while earning income.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search jobs..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="downtown">Downtown Area</SelectItem>
                  <SelectItem value="northside">Northside</SelectItem>
                  <SelectItem value="southside">Southside</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="gig">Gig Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-gray-700 mt-1">{job.company}</CardDescription>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.postedTime}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.pay}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {job.urgent && <Badge variant="destructive">Urgent</Badge>}
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex items-center space-x-3">
                  <Button>Apply Now</Button>
                  <Button variant="outline">Save Job</Button>
                  <Button variant="ghost">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>

        {/* Help Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Need Help Finding Work?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Our job placement team can help you find opportunities that match your skills and schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Job Placement Services
              </Button>
              <Button variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Career Counseling
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

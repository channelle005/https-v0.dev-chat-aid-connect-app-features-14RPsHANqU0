import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, MapPin, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">AidConnect</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
              How It Works
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Connect Hearts, <span className="text-blue-600">Change Lives</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AidConnect bridges the gap between generous donors and families in need. Whether it's food, shelter, or
            clothing - help is just a connection away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <Link href="/register?type=donor">I Want to Help</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent" asChild>
              <Link href="/register?type=recipient">I Need Help</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2,847</div>
              <div className="text-gray-600">Families Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1,293</div>
              <div className="text-gray-600">Active Donors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">$127K</div>
              <div className="text-gray-600">Aid Distributed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">45</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How AidConnect Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>1. Register</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sign up as a donor or someone in need. Verify your identity for trust and safety.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>2. Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Post your needs or browse local requests. Our smart matching connects you with nearby help.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>3. Help</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Coordinate delivery or pickup. Track your impact and build lasting community connections.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Needs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Recent Needs in Your Area</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Family of 4 needs groceries</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Downtown Area • 2 hours ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Single mother with 3 children needs help with weekly groceries. Any assistance would be greatly
                  appreciated.
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Urgent</span>
                  <Button size="sm">Offer Help</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Winter clothes for children</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Northside • 5 hours ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Looking for warm winter clothes for 2 children (ages 6 and 9). Coats, boots, and warm clothing needed.
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Moderate</span>
                  <Button size="sm">Offer Help</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Temporary shelter assistance</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Central District • 1 day ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Recently lost housing due to job loss. Looking for temporary shelter or assistance with first month's
                  rent.
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Critical</span>
                  <Button size="sm">Offer Help</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Needs
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">AidConnect</span>
              </div>
              <p className="text-gray-400">Connecting communities through compassion and direct aid.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Donors</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/how-to-donate">How to Donate</Link>
                </li>
                <li>
                  <Link href="/donor-dashboard">Donor Dashboard</Link>
                </li>
                <li>
                  <Link href="/impact-tracking">Track Your Impact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Recipients</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/request-help">Request Help</Link>
                </li>
                <li>
                  <Link href="/recipient-dashboard">Your Dashboard</Link>
                </li>
                <li>
                  <Link href="/resources">Additional Resources</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/safety">Safety Guidelines</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AidConnect. All rights reserved. Built with ❤️ for communities in need.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

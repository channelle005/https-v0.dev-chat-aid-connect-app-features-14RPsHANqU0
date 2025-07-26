"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, ArrowLeft, MapPin, Clock, AlertCircle } from "lucide-react"

export default function RequestHelpPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    urgency: "",
    description: "",
    specificItems: "",
    location: "",
    contactMethod: "",
    timeframe: "",
    householdSize: "",
    hasChildren: false,
    childrenAges: "",
    additionalInfo: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Request submitted successfully! You will be contacted by donors soon.")
  }

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
          </div>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Help from Your Community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your needs with compassionate donors in your area. Be specific about what would help you most.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              Tell Us How We Can Help
            </CardTitle>
            <CardDescription>
              The more details you provide, the better we can match you with the right donors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="title">Request Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Family of 4 needs groceries for the week"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500">Write a clear, descriptive title for your request</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">Food & Groceries</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="shelter">Shelter & Housing</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="medical">Medical & Healthcare</SelectItem>
                        <SelectItem value="childcare">Childcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Urgency Level *</Label>
                    <RadioGroup
                      value={formData.urgency}
                      onValueChange={(value) => handleInputChange("urgency", value)}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="critical" id="critical" />
                        <Label htmlFor="critical" className="text-red-600 font-medium">
                          Critical - Immediate need (within 24 hours)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="urgent" />
                        <Label htmlFor="urgent" className="text-orange-600 font-medium">
                          Urgent - Need within a few days
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="moderate" />
                        <Label htmlFor="moderate" className="text-yellow-600 font-medium">
                          Moderate - Need within a week
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="description">Describe Your Situation *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please explain your current situation and why you need help. Be honest and specific about your circumstances."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specificItems">Specific Items or Amount Needed</Label>
                  <Textarea
                    id="specificItems"
                    placeholder="e.g., Weekly groceries for family of 4, Winter coats for children ages 6 and 9, $300 for rent assistance"
                    value={formData.specificItems}
                    onChange={(e) => handleInputChange("specificItems", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">General Location *</Label>
                    <Select onValueChange={(value) => handleInputChange("location", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown Area</SelectItem>
                        <SelectItem value="northside">Northside</SelectItem>
                        <SelectItem value="southside">Southside</SelectItem>
                        <SelectItem value="eastside">Eastside</SelectItem>
                        <SelectItem value="westside">Westside</SelectItem>
                        <SelectItem value="suburbs">Suburbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeframe">When do you need this help?</Label>
                    <Select onValueChange={(value) => handleInputChange("timeframe", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="this-week">This week</SelectItem>
                        <SelectItem value="next-week">Next week</SelectItem>
                        <SelectItem value="flexible">I'm flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Household Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Household Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="householdSize">Household Size</Label>
                    <Select onValueChange={(value) => handleInputChange("householdSize", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Number of people" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4">4 people</SelectItem>
                        <SelectItem value="5">5 people</SelectItem>
                        <SelectItem value="6+">6+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactMethod">Preferred Contact Method *</Label>
                    <Select onValueChange={(value) => handleInputChange("contactMethod", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="How should donors contact you?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="platform">Through AidConnect platform</SelectItem>
                        <SelectItem value="phone">Phone call</SelectItem>
                        <SelectItem value="text">Text message</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasChildren"
                    checked={formData.hasChildren}
                    onCheckedChange={(checked) => handleInputChange("hasChildren", checked as boolean)}
                  />
                  <Label htmlFor="hasChildren">I have children in my household</Label>
                </div>

                {formData.hasChildren && (
                  <div className="space-y-2">
                    <Label htmlFor="childrenAges">Children's Ages</Label>
                    <Input
                      id="childrenAges"
                      placeholder="e.g., 3, 7, 12"
                      value={formData.childrenAges}
                      onChange={(e) => handleInputChange("childrenAges", e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Anything else donors should know?</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any dietary restrictions, allergies, size preferences, delivery preferences, etc."
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Important Safety Information</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Never share personal financial information</li>
                      <li>• Meet donors in public places when possible</li>
                      <li>• Trust your instincts - if something feels wrong, it probably is</li>
                      <li>• Report any suspicious activity to our support team</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                  . I understand that this information will be shared with potential donors and I consent to being
                  contacted through AidConnect.
                </Label>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1"
                  size="lg"
                  disabled={!formData.agreeToTerms || !formData.title || !formData.category || !formData.description}
                >
                  Submit Request for Help
                </Button>
                <Button type="button" variant="outline" size="lg" asChild>
                  <Link href="/">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help Filling This Out?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you need assistance completing this form or have questions about how AidConnect works, we're here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Find Local Resources
              </Button>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

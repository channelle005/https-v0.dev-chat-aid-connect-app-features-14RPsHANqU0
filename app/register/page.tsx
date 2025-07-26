"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ArrowLeft, User, Users, Shield, CheckCircle, AlertCircle } from "lucide-react"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("donor")
  const [step, setStep] = useState(1)

  // Initialize tab based on URL parameter
  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "recipient" || type === "donor") {
      setActiveTab(type)
    }
  }, [searchParams])

  const [donorData, setDonorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    donationTypes: [] as string[],
    donationFrequency: "",
    maxAmount: "",
    preferredContact: "",
    motivation: "",
    agreeToTerms: false,
    agreeToBackground: false,
  })

  const [recipientData, setRecipientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    householdSize: "",
    hasChildren: false,
    childrenAges: "",
    employmentStatus: "",
    monthlyIncome: "",
    primaryNeeds: [] as string[],
    situation: "",
    emergencyContact: "",
    emergencyPhone: "",
    agreeToTerms: false,
    agreeToVerification: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleDonorChange = (field: string, value: string | boolean | string[]) => {
    setDonorData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleRecipientChange = (field: string, value: string | boolean | string[]) => {
    setRecipientData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleDonationTypeChange = (type: string, checked: boolean) => {
    setDonorData((prev) => ({
      ...prev,
      donationTypes: checked ? [...prev.donationTypes, type] : prev.donationTypes.filter((t) => t !== type),
    }))
  }

  const handlePrimaryNeedChange = (need: string, checked: boolean) => {
    setRecipientData((prev) => ({
      ...prev,
      primaryNeeds: checked ? [...prev.primaryNeeds, need] : prev.primaryNeeds.filter((n) => n !== need),
    }))
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    const data = activeTab === "donor" ? donorData : recipientData

    if (step === 1) {
      if (!data.firstName.trim()) newErrors.firstName = "First name is required"
      if (!data.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!data.email.trim()) newErrors.email = "Email is required"
      if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Please enter a valid email"
      if (!data.password) newErrors.password = "Password is required"
      if (data.password.length < 8) newErrors.password = "Password must be at least 8 characters"
      if (data.password !== data.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
      if (!data.location) newErrors.location = "Location is required"
      if (activeTab === "recipient" && !data.phone.trim()) newErrors.phone = "Phone number is required"
    }

    if (step === 2) {
      if (activeTab === "donor") {
        if (donorData.donationTypes.length === 0) newErrors.donationTypes = "Please select at least one donation type"
      } else {
        if (!recipientData.householdSize) newErrors.householdSize = "Household size is required"
        if (recipientData.primaryNeeds.length === 0) newErrors.primaryNeeds = "Please select at least one need type"
      }
    }

    if (step === 3) {
      if (activeTab === "donor") {
        if (!donorData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"
        if (!donorData.agreeToBackground) newErrors.agreeToBackground = "Background check consent is required"
      } else {
        if (!recipientData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact is required"
        if (!recipientData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency phone is required"
        if (!recipientData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"
        if (!recipientData.agreeToVerification) newErrors.agreeToVerification = "Verification consent is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep()) return

    const data = activeTab === "donor" ? donorData : recipientData
    console.log(`${activeTab} registration:`, data)

    // Simulate successful registration
    alert(`Registration successful! Welcome to AidConnect as a ${activeTab}. You can now access your dashboard.`)

    // In a real app, you would redirect to dashboard or login page
    window.location.href = "/dashboard"
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    setErrors({}) // Clear errors when going back
  }

  // Reset step when switching tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setStep(1)
    setErrors({})
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
          <div className="flex items-center space-x-4">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the AidConnect Community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you want to help others or need assistance yourself, we're here to connect hearts and change lives.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="donor" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>I Want to Help (Donor)</span>
            </TabsTrigger>
            <TabsTrigger value="recipient" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>I Need Help (Recipient)</span>
            </TabsTrigger>
          </TabsList>

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-12 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">Step {step} of 3</div>
          </div>

          {/* Donor Registration */}
          <TabsContent value="donor">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  Donor Registration - Step {step} of 3
                </CardTitle>
                <CardDescription>Thank you for wanting to help! Let's set up your donor profile.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="donor-firstName">First Name *</Label>
                          <Input
                            id="donor-firstName"
                            value={donorData.firstName}
                            onChange={(e) => handleDonorChange("firstName", e.target.value)}
                            className={errors.firstName ? "border-red-500" : ""}
                          />
                          {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="donor-lastName">Last Name *</Label>
                          <Input
                            id="donor-lastName"
                            value={donorData.lastName}
                            onChange={(e) => handleDonorChange("lastName", e.target.value)}
                            className={errors.lastName ? "border-red-500" : ""}
                          />
                          {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="donor-email">Email Address *</Label>
                        <Input
                          id="donor-email"
                          type="email"
                          value={donorData.email}
                          onChange={(e) => handleDonorChange("email", e.target.value)}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="donor-password">Password *</Label>
                          <Input
                            id="donor-password"
                            type="password"
                            value={donorData.password}
                            onChange={(e) => handleDonorChange("password", e.target.value)}
                            className={errors.password ? "border-red-500" : ""}
                          />
                          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="donor-confirmPassword">Confirm Password *</Label>
                          <Input
                            id="donor-confirmPassword"
                            type="password"
                            value={donorData.confirmPassword}
                            onChange={(e) => handleDonorChange("confirmPassword", e.target.value)}
                            className={errors.confirmPassword ? "border-red-500" : ""}
                          />
                          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="donor-phone">Phone Number</Label>
                          <Input
                            id="donor-phone"
                            type="tel"
                            value={donorData.phone}
                            onChange={(e) => handleDonorChange("phone", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="donor-location">Location *</Label>
                          <Select onValueChange={(value) => handleDonorChange("location", value)}>
                            <SelectTrigger className={errors.location ? "border-red-500" : ""}>
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
                          {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="button" onClick={nextStep}>
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Donation Preferences</h3>

                      <div className="space-y-2">
                        <Label>What types of help would you like to provide? *</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Food & Groceries",
                            "Clothing",
                            "Shelter & Housing",
                            "Utilities",
                            "Transportation",
                            "Medical & Healthcare",
                          ].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={`donor-${type}`}
                                checked={donorData.donationTypes.includes(type)}
                                onCheckedChange={(checked) => handleDonationTypeChange(type, checked as boolean)}
                              />
                              <Label htmlFor={`donor-${type}`} className="text-sm">
                                {type}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {errors.donationTypes && <p className="text-sm text-red-600">{errors.donationTypes}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>How often would you like to donate?</Label>
                          <Select onValueChange={(value) => handleDonorChange("donationFrequency", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="as-needed">As needed</SelectItem>
                              <SelectItem value="one-time">One-time donations only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Maximum amount per donation (optional)</Label>
                          <Input
                            placeholder="e.g., $100"
                            value={donorData.maxAmount}
                            onChange={(e) => handleDonorChange("maxAmount", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred contact method</Label>
                        <RadioGroup
                          value={donorData.preferredContact}
                          onValueChange={(value) => handleDonorChange("preferredContact", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="platform" id="donor-platform" />
                            <Label htmlFor="donor-platform">Through AidConnect platform</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="donor-email-contact" />
                            <Label htmlFor="donor-email-contact">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="donor-phone-contact" />
                            <Label htmlFor="donor-phone-contact">Phone</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="donor-motivation">What motivates you to help? (optional)</Label>
                        <Textarea
                          id="donor-motivation"
                          placeholder="Share what inspires you to give back to your community..."
                          value={donorData.motivation}
                          onChange={(e) => handleDonorChange("motivation", e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Previous
                        </Button>
                        <Button type="button" onClick={nextStep}>
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Verification & Agreement</h3>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900 mb-2">Trust & Safety</h4>
                            <p className="text-sm text-blue-800 mb-3">
                              To ensure the safety of our community, we may verify donor identities and conduct
                              background checks for certain types of donations.
                            </p>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• Identity verification may be required</li>
                              <li>• Background checks for in-person donations</li>
                              <li>• All donations are tracked for transparency</li>
                              <li>• Report any suspicious activity immediately</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="donor-background"
                            checked={donorData.agreeToBackground}
                            onCheckedChange={(checked) => handleDonorChange("agreeToBackground", checked as boolean)}
                          />
                          <Label htmlFor="donor-background" className="text-sm leading-relaxed">
                            I consent to identity verification and background checks as needed for community safety.
                          </Label>
                        </div>
                        {errors.agreeToBackground && <p className="text-sm text-red-600">{errors.agreeToBackground}</p>}

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="donor-terms"
                            checked={donorData.agreeToTerms}
                            onCheckedChange={(checked) => handleDonorChange("agreeToTerms", checked as boolean)}
                          />
                          <Label htmlFor="donor-terms" className="text-sm leading-relaxed">
                            I agree to the{" "}
                            <Link href="/terms" className="text-blue-600 hover:underline">
                              Terms of Service
                            </Link>
                            ,{" "}
                            <Link href="/privacy" className="text-blue-600 hover:underline">
                              Privacy Policy
                            </Link>
                            , and{" "}
                            <Link href="/donor-guidelines" className="text-blue-600 hover:underline">
                              Donor Guidelines
                            </Link>
                            .
                          </Label>
                        </div>
                        {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Previous
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete Registration
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recipient Registration - Similar structure with validation */}
          <TabsContent value="recipient">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  Recipient Registration - Step {step} of 3
                </CardTitle>
                <CardDescription>We're here to help connect you with the support you need.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="recipient-firstName">First Name *</Label>
                          <Input
                            id="recipient-firstName"
                            value={recipientData.firstName}
                            onChange={(e) => handleRecipientChange("firstName", e.target.value)}
                            className={errors.firstName ? "border-red-500" : ""}
                          />
                          {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recipient-lastName">Last Name *</Label>
                          <Input
                            id="recipient-lastName"
                            value={recipientData.lastName}
                            onChange={(e) => handleRecipientChange("lastName", e.target.value)}
                            className={errors.lastName ? "border-red-500" : ""}
                          />
                          {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipient-email">Email Address *</Label>
                        <Input
                          id="recipient-email"
                          type="email"
                          value={recipientData.email}
                          onChange={(e) => handleRecipientChange("email", e.target.value)}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="recipient-password">Password *</Label>
                          <Input
                            id="recipient-password"
                            type="password"
                            value={recipientData.password}
                            onChange={(e) => handleRecipientChange("password", e.target.value)}
                            className={errors.password ? "border-red-500" : ""}
                          />
                          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recipient-confirmPassword">Confirm Password *</Label>
                          <Input
                            id="recipient-confirmPassword"
                            type="password"
                            value={recipientData.confirmPassword}
                            onChange={(e) => handleRecipientChange("confirmPassword", e.target.value)}
                            className={errors.confirmPassword ? "border-red-500" : ""}
                          />
                          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="recipient-phone">Phone Number *</Label>
                          <Input
                            id="recipient-phone"
                            type="tel"
                            value={recipientData.phone}
                            onChange={(e) => handleRecipientChange("phone", e.target.value)}
                            className={errors.phone ? "border-red-500" : ""}
                          />
                          {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recipient-location">Location *</Label>
                          <Select onValueChange={(value) => handleRecipientChange("location", value)}>
                            <SelectTrigger className={errors.location ? "border-red-500" : ""}>
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
                          {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="button" onClick={nextStep}>
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Household & Needs Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Household Size *</Label>
                          <Select onValueChange={(value) => handleRecipientChange("householdSize", value)}>
                            <SelectTrigger className={errors.householdSize ? "border-red-500" : ""}>
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
                          {errors.householdSize && <p className="text-sm text-red-600">{errors.householdSize}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Employment Status</Label>
                          <Select onValueChange={(value) => handleRecipientChange("employmentStatus", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="employed-full">Employed Full-time</SelectItem>
                              <SelectItem value="employed-part">Employed Part-time</SelectItem>
                              <SelectItem value="unemployed">Unemployed</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="retired">Retired</SelectItem>
                              <SelectItem value="disabled">Unable to work</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="recipient-hasChildren"
                          checked={recipientData.hasChildren}
                          onCheckedChange={(checked) => handleRecipientChange("hasChildren", checked as boolean)}
                        />
                        <Label htmlFor="recipient-hasChildren">I have children in my household</Label>
                      </div>

                      {recipientData.hasChildren && (
                        <div className="space-y-2">
                          <Label htmlFor="recipient-childrenAges">Children's Ages</Label>
                          <Input
                            id="recipient-childrenAges"
                            placeholder="e.g., 3, 7, 12"
                            value={recipientData.childrenAges}
                            onChange={(e) => handleRecipientChange("childrenAges", e.target.value)}
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>What types of help do you most need? *</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Food & Groceries",
                            "Clothing",
                            "Shelter & Housing",
                            "Utilities",
                            "Transportation",
                            "Medical & Healthcare",
                          ].map((need) => (
                            <div key={need} className="flex items-center space-x-2">
                              <Checkbox
                                id={`recipient-${need}`}
                                checked={recipientData.primaryNeeds.includes(need)}
                                onCheckedChange={(checked) => handlePrimaryNeedChange(need, checked as boolean)}
                              />
                              <Label htmlFor={`recipient-${need}`} className="text-sm">
                                {need}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {errors.primaryNeeds && <p className="text-sm text-red-600">{errors.primaryNeeds}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipient-situation">Briefly describe your current situation</Label>
                        <Textarea
                          id="recipient-situation"
                          placeholder="Help us understand your circumstances so we can better connect you with appropriate help..."
                          value={recipientData.situation}
                          onChange={(e) => handleRecipientChange("situation", e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Previous
                        </Button>
                        <Button type="button" onClick={nextStep}>
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Emergency Contact & Verification</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="recipient-emergencyContact">Emergency Contact Name *</Label>
                          <Input
                            id="recipient-emergencyContact"
                            value={recipientData.emergencyContact}
                            onChange={(e) => handleRecipientChange("emergencyContact", e.target.value)}
                            className={errors.emergencyContact ? "border-red-500" : ""}
                          />
                          {errors.emergencyContact && <p className="text-sm text-red-600">{errors.emergencyContact}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recipient-emergencyPhone">Emergency Contact Phone *</Label>
                          <Input
                            id="recipient-emergencyPhone"
                            type="tel"
                            value={recipientData.emergencyPhone}
                            onChange={(e) => handleRecipientChange("emergencyPhone", e.target.value)}
                            className={errors.emergencyPhone ? "border-red-500" : ""}
                          />
                          {errors.emergencyPhone && <p className="text-sm text-red-600">{errors.emergencyPhone}</p>}
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-amber-900 mb-2">Verification Process</h4>
                            <p className="text-sm text-amber-800 mb-3">
                              To ensure fair distribution of aid and prevent fraud, we may need to verify your
                              information.
                            </p>
                            <ul className="text-sm text-amber-800 space-y-1">
                              <li>• Identity verification may be required</li>
                              <li>• Income verification for certain types of aid</li>
                              <li>• All information is kept confidential</li>
                              <li>• Verification helps us serve you better</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="recipient-verification"
                            checked={recipientData.agreeToVerification}
                            onCheckedChange={(checked) =>
                              handleRecipientChange("agreeToVerification", checked as boolean)
                            }
                          />
                          <Label htmlFor="recipient-verification" className="text-sm leading-relaxed">
                            I consent to identity and need verification as required for receiving aid.
                          </Label>
                        </div>
                        {errors.agreeToVerification && (
                          <p className="text-sm text-red-600">{errors.agreeToVerification}</p>
                        )}

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="recipient-terms"
                            checked={recipientData.agreeToTerms}
                            onCheckedChange={(checked) => handleRecipientChange("agreeToTerms", checked as boolean)}
                          />
                          <Label htmlFor="recipient-terms" className="text-sm leading-relaxed">
                            I agree to the{" "}
                            <Link href="/terms" className="text-blue-600 hover:underline">
                              Terms of Service
                            </Link>
                            ,{" "}
                            <Link href="/privacy" className="text-blue-600 hover:underline">
                              Privacy Policy
                            </Link>
                            , and{" "}
                            <Link href="/recipient-guidelines" className="text-blue-600 hover:underline">
                              Recipient Guidelines
                            </Link>
                            .
                          </Label>
                        </div>
                        {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Previous
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete Registration
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help with Registration?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you need assistance with the registration process or have questions about AidConnect, we're here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline">
                <User className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Safety Guidelines
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

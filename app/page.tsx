"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Play, ArrowRight, CheckCircle, X } from "lucide-react"
import { AnimatedBackground } from "./components/animated-background"
import { VideoModal } from "./components/video-modal"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true)
  const [showCookieModal, setShowCookieModal] = useState(false)
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          projectName: "uv-express"
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setEmail("")
      } else {
        alert(data.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting email:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
        <AnimatedBackground />
        
        {/* Success Page */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">You're In!</h1>
              <p className="text-xl text-gray-300 mb-8">
                Thank you for joining the UV Express waitlist. We'll keep you updated on our progress and let you know as soon as we're ready to launch.
              </p>
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-2 text-orange-500">What's Next?</h3>
                <ul className="text-gray-300 text-left space-y-2">
                  <li>• We'll send you updates on our development progress</li>
                  <li>• You'll be among the first to know when we launch</li>
                  <li>• Early access to exclusive features and benefits</li>
                </ul>
              </div>
              <Button
                onClick={() => setIsSuccess(false)}
                className="bg-transparent border border-gray-600 text-white hover:bg-gray-800 rounded-full px-8 py-3"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
        
        {/* Privacy Notice */}
        {showPrivacyNotice && (
          <div className="relative z-10 p-6 border-t border-gray-800">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1">We value your privacy</h4>
                <p className="text-gray-400 text-sm max-w-2xl">
                  This website uses cookies to enhance your browsing experience, serve personalized ads or content, and
                  analyze our traffic.
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCookieModal(true)}
                  className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Cookie Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPrivacyNotice(false)}
                  className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Reject All
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setShowPrivacyNotice(false)}
                  className="rounded-full bg-white text-black hover:bg-gray-200"
                >
                  Accept All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPrivacyNotice(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Logo */}
        <div
          className={`mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-center">UV Express</h1>
        </div>

        {/* Main Content Grid */}
        <div className="w-full max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
            {/* Demo Video Section */}
            <div
              className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="relative cursor-pointer group" onClick={() => setIsVideoModalOpen(true)}>
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=UV+Express+in+action"
                    alt="UV Express Demo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-3 text-center">UV Express Demo</p>
              </div>
            </div>

            {/* Main Tagline Section */}
            <div
              className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">hello,</h2>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  <span className="text-orange-500">smart transportation</span>
                </h2>
                <p className="text-gray-400 text-base">connecting drivers and passengers seamlessly</p>
              </div>
            </div>

            {/* Info Section */}
            <div
              className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="border border-gray-700 rounded-lg p-4 bg-gray-900/30">
                <h3 className="text-sm font-medium mb-3 text-gray-300 border border-gray-600 rounded-full px-3 py-1 inline-block">
                  What is UV Express?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  UV Express is the modern way to match drivers and passengers in real time. Secure, fast, and built for
                  convenience. Join our waitlist to be part of the future of public transport.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 items-center transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <form onSubmit={handleWaitlistSubmit} className="flex gap-4 items-center">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-black border-0 rounded-full px-6 py-2 h-10 w-64 placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-transparent border border-gray-600 text-white hover:bg-gray-800 rounded-full px-6 py-2 h-10 transition-all duration-300"
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        </div>
      </div>

      {/* Privacy Notice */}
      {showPrivacyNotice && (
        <div className="relative z-10 p-6 border-t border-gray-800">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <h4 className="text-white font-medium mb-1">We value your privacy</h4>
              <p className="text-gray-400 text-sm max-w-2xl">
                This website uses cookies to enhance your browsing experience, serve personalized ads or content, and
                analyze our traffic.
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCookieModal(true)}
                className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Cookie Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPrivacyNotice(false)}
                className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Reject All
              </Button>
              <Button 
                size="sm" 
                onClick={() => setShowPrivacyNotice(false)}
                className="rounded-full bg-white text-black hover:bg-gray-200"
              >
                Accept All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrivacyNotice(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      <Dialog open={showCookieModal} onOpenChange={setShowCookieModal}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-4">Cookie Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Essential Cookies</h3>
              <p className="text-gray-400 text-sm mb-3">
                These cookies are necessary for the website to function and cannot be switched off.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Always Active</span>
                <Switch 
                  checked={cookieSettings.essential} 
                  disabled={true}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Analytics Cookies</h3>
              <p className="text-gray-400 text-sm mb-3">
                These cookies help us understand how visitors interact with our website.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm">Optional</span>
                <Switch 
                  checked={cookieSettings.analytics}
                  onCheckedChange={(checked) => setCookieSettings({...cookieSettings, analytics: checked})}
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Marketing Cookies</h3>
              <p className="text-gray-400 text-sm mb-3">
                These cookies are used to deliver personalized ads and measure their effectiveness.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm">Optional</span>
                <Switch 
                  checked={cookieSettings.marketing}
                  onCheckedChange={(checked) => setCookieSettings({...cookieSettings, marketing: checked})}
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={() => {
                setShowCookieModal(false)
                setShowPrivacyNotice(false)
              }}
              className="flex-1 rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Save Preferences
            </Button>
            <Button
              onClick={() => {
                setCookieSettings({essential: true, analytics: true, marketing: true})
                setShowCookieModal(false)
                setShowPrivacyNotice(false)
              }}
              className="flex-1 rounded-full bg-white text-black hover:bg-gray-200"
            >
              Accept All
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, DownloadIcon, Shuffle, Sparkles, Image as ImageIcon } from "lucide-react"
import Footer from '@/components/ui/footer'

// Custom hook for user-specific persistent state
function useUserPersistentState<T>(key: string, defaultValue: T, userId: string | null): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(defaultValue)
  const [isInitialized, setIsInitialized] = useState(false)

  // Create user-specific key - use userId directly or 'anonymous' for non-logged users
  const userKey = userId ? `clerk_${userId}_${key}` : `anonymous_${key}`

  useEffect(() => {
    // Only initialize when we have a definitive userId (or confirmed no user)
    if (userId === undefined || userKey === null) return
    
    try {
      const item = window.localStorage.getItem(userKey)
      if (item) {
        const parsedItem = JSON.parse(item)
        setState(parsedItem)
      }
    } catch (error) {
      console.warn(`Error loading ${userKey} from localStorage:`, error)
    }
    setIsInitialized(true)
  }, [userKey])

  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    if (!isInitialized || userKey === null) return // Don't save until initialized
    
    setState(prevState => {
      const newValue = typeof value === 'function' ? (value as Function)(prevState) : value
      try {
        // Always save to localStorage once initialized
        if (userKey) {
          window.localStorage.setItem(userKey, JSON.stringify(newValue))
        }
      } catch (error) {
        console.warn(`Error saving ${userKey} to localStorage:`, error)
      }
      return newValue
    })
  }

  return [state, setValue]
}

// Clear user data on logout
function clearUserData(userId: string | null) {
  if (!userId) return
  
  const keys = [
    'ai-generator-prompt',
    'ai-generator-current-image', 
    'ai-generator-previous-images',
    'ai-generator-image-history'
  ]
  
  keys.forEach(key => {
    const userKey = `clerk_${userId}_${key}`
    try {
      window.localStorage.removeItem(userKey)
    } catch (error) {
      console.warn(`Error clearing ${userKey} from localStorage:`, error)
    }
  })
}

export default function MainPage() {
  const { user, isLoaded: userLoaded } = useUser()

  // This will be `string` when logged in, `null` when logged out, and `undefined` while loading
  const userId = userLoaded ? (user?.id || null) : undefined

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [previousUserId, setPreviousUserId] = useState<string | null>(null)

  // Wait until we know the user state
  if (userId === undefined) {
    return <div className="text-white">Loading user...</div>
  }

  // Now safe to use user-specific persistent state hooks
  const [prompt, setPrompt] = useUserPersistentState('ai-generator-prompt', '', userId)
  const [generatedImage, setGeneratedImage] = useUserPersistentState('ai-generator-current-image', '', userId)
  const [previousImages, setPreviousImages] = useUserPersistentState<string[]>(
    'ai-generator-previous-images',
    [],
    userId
  )
  const [imageHistory, setImageHistory] = useUserPersistentState<
    Array<{ image: string; prompt: string; timestamp: number }>
  >('ai-generator-image-history', [], userId)

  // Cleanup data on logout
  useEffect(() => {
    if (!userLoaded) return

    const currentUserId = user?.id || null

    // If we had a logged-in user previously and now it's null, clear that user's data
    if (previousUserId && !currentUserId) {
      clearUserData(previousUserId)
    }

    // Update previous user ID
    setPreviousUserId(currentUserId)
  }, [user?.id, userLoaded, previousUserId])
  // Show loading until user authentication is complete
  if (!userLoaded) {
    return (
      <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading your workspace...
        </div>
      </div>
    )
  }

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true)
    setError('')
    setGeneratedImage('')

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (response.status === 429) {
        setError('Rate limit exceeded. Please try again later.')
        return
      }

      const data = await response.json()

      if (data.image) {
        setGeneratedImage(data.image)
        setPreviousImages(prev => [data.image, ...prev.slice(0, 49)]) // Keep last 50 images
        
        // Add to detailed history with the actual prompt used
        setImageHistory(prev => [{
          image: data.image,
          prompt: prompt.trim(),
          timestamp: Date.now()
        }, ...prev.slice(0, 99)]) // Keep last 100 generations with details
      } else {
        setError(`Failed to generate image: ${data.error}. ${data.details || ''}`)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError('Failed to generate image: ' + err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const randomPrompts = [
    "A futuristic city floating in the clouds at sunset",
    "A cyberpunk samurai in neon-lit rain",
    "A magical forest with glowing mushrooms and fireflies",
    "An astronaut riding a horse on Mars landscape",
    "A robot chef making sushi in a Tokyo restaurant",
    "A surreal dreamscape with melting clocks and floating islands",
    "A castle made of crystal in a desert oasis",
    "An underwater library with glowing books and sea creatures",
    "A panda astronaut floating in colorful nebula",
    "A dragon flying over a neon cyberpunk skyline",
    "A Viking longship sailing through the stars",
    "A phoenix reborn in a thunderstorm with lightning",
    "An alien marketplace on a distant moon surface",
    "A steampunk owl with brass mechanical wings",
    "A haunted Victorian mansion on a cliff during storm",
    "A futuristic race between hovercrafts over lava",
    "A time traveler in medieval village with modern gadgets",
    "A floating island with waterfalls pouring into clouds",
    "A mushroom village glowing under full moonlight",
    "A desert oasis powered by solar technology panels"
  ]

  const handleRandomPrompt = () => {
    const random = randomPrompts[Math.floor(Math.random() * randomPrompts.length)]
    setPrompt(random)
  }

  const handleDownload = (imageUrl: string, index?: number) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `ai-generated-image-${index !== undefined ? `${index}-` : ''}${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen">
      <div className="py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-3 tracking-tight">
            HashBotAI Photo Generator
          </h1>
          <p className="text-lg sm:text-2xl text-slate-300 mb-4">
            Transform your ideas into stunning visuals
          </p>
          {user && (
            <div className="inline-flex items-center px-4 py-2 bg-blue-900/30 rounded-full text-blue-300 text-sm backdrop-blur-sm border border-blue-500/10">
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome back, {user.firstName || user.username || 'User'}!
            </div>
          )}
          {!user && (
            <div className="inline-flex items-center px-4 py-2 bg-slate-700/30 rounded-full text-slate-300 text-sm backdrop-blur-sm border border-slate-500/10">
              <ImageIcon className="w-4 h-4 mr-2" />
              Anonymous Session
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl space-y-10">
          {/* Input Section */}
          <Card className="border border-slate-600/50 bg-slate-800/30 backdrop-blur-md rounded-2xl shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-5">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Describe your image idea here... (e.g., 'A magical forest with glowing trees')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full text-base sm:text-lg p-4 bg-slate-700/50 border border-slate-600 placeholder-slate-400 text-white rounded-lg shadow-inner pr-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                  <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleSubmit}
                    type="button"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium py-4 px-4 text-sm sm:text-lg rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center"
                    disabled={isLoading || !prompt.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mr-2 h-5 w-5" />
                        Generate Image
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleRandomPrompt}
                    type="button"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-4 text-sm sm:text-lg rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center"
                    disabled={isLoading}
                  >
                    <Shuffle className="mr-2 h-5 w-5" />
                    Random Prompt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Card className="border border-red-500/50 bg-red-900/20 backdrop-blur-md rounded-2xl">
              <CardContent className="p-6">
                <div className="text-red-400 text-center">
                  <p className="font-medium">Error</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Image */}
          {generatedImage && (
            <Card className="border border-slate-600/50 bg-slate-800/30 backdrop-blur-md rounded-2xl shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white">Generated Image</h2>
                  <Button
                    onClick={() => handleDownload(generatedImage)}
                    className="px-5 py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg flex items-center gap-2"
                  >
                    <DownloadIcon className="h-5 w-5" />
                    Download
                  </Button>
                </div>
                <div className="aspect-square relative border-2 border-slate-600 rounded-xl overflow-hidden shadow-md group">
                  <img
                    src={generatedImage}
                    alt="AI Generated"
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    <span className="font-medium">Prompt:</span> {imageHistory.find(item => item.image === generatedImage)?.prompt || prompt.trim()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Previous Images Gallery */}
          {previousImages.length > 0 && (
            <Card className="border border-slate-600/50 bg-slate-800/30 backdrop-blur-md rounded-2xl shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6" />
                  Your Previous Generations
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {previousImages.map((img, index) => (
                    <div key={index} className="group relative">
                      <div className="aspect-square border border-slate-600 rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={img}
                          alt={`Previous generation ${index + 1}`}
                          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
                        />
                      </div>
                      {/* Show prompt on hover */}
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-3">
                        <p className="text-white text-xs line-clamp-3">
                          {imageHistory.find(item => item.image === img)?.prompt || 'Generated image'}
                        </p>
                      </div>
                      {/* Download button */}
                      <Button
                        onClick={() => handleDownload(img, index)}
                        className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        size="sm"
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                      {/* Click to set as current image */}
                      <Button
                        onClick={() => setGeneratedImage(img)}
                        className="absolute bottom-2 left-2 p-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        size="sm"
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
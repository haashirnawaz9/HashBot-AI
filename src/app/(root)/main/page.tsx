'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, DownloadIcon } from "lucide-react"

export default function Component() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [previousImages, setPreviousImages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        setPreviousImages(prev => [data.image, ...prev.slice(0, 3)])
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

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage
      link.download = `ai-generated-image-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen py-12 px-4">
      <h1 className="text-5xl sm:text-6xl font-bold text-center text-white mb-3 tracking-tight">AI Photo Generator</h1>
      <p className="text-center text-lg sm:text-2xl text-slate-300 mb-10">Transform your ideas into stunning visuals</p>

      <div className="mx-auto w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-4xl space-y-10">
        <Card className="border border-slate-600/50 bg-slate-800/30 backdrop-blur-md rounded-2xl shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="text"
                placeholder="Describe your image idea here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full text-base sm:text-lg p-4 bg-slate-700/50 border border-slate-600 placeholder-slate-400 text-white rounded-lg shadow-inner"
              />
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium sm:font-semibold py-4 px-6 text-lg rounded-xl transition-all duration-300 ease-in-out"
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Image'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <div className="text-red-500 text-center text-lg">{error}</div>
        )}

        {generatedImage && (
          <Card className="border border-slate-600/50 bg-slate-800/30 backdrop-blur-md rounded-2xl shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Generated Image:</h2>
              <div className="aspect-square relative mb-4 border-2 border-slate-600 rounded-xl overflow-hidden shadow-md">
                <img
                  src={generatedImage}
                  alt="AI Generated"
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleDownload}
                  className="px-5 py-3 text-lg bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2"
                >
                  <DownloadIcon className="h-5 w-5" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {previousImages.length > 0 && (
          <div className="border border-slate-600/50 p-6 bg-slate-800/30 backdrop-blur-md shadow-lg rounded-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">🕘 Previous Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previousImages.map((img, index) => (
                <div key={index} className="aspect-square border border-slate-600 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={img}
                    alt={`Previous generation ${index + 1}`}
                    className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-90"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

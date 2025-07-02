import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Prompt is required and must be a string.' }), { status: 400 })
    }

    // Build the multipart/form-data body
    const formData = new FormData()
    formData.append('prompt', prompt)
    formData.append('model', 'sd3.5-large-turbo')  
    formData.append('output_format', 'png')

    const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/sd3', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        accept: 'application/json',  // ask for JSON with base64 instead of raw binary
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error from Stability AI:', errorData)
      return new Response(JSON.stringify({ error: errorData.error, details: errorData }), { status: response.status })
    }

    const data = await response.json()

    // If Stability returns base64 image, wrap it as data URI
    const image = data.image ? `data:image/png;base64,${data.image}` : null

    return new Response(JSON.stringify({ image }), { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Unexpected server error:', error.message)
      return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), { status: 500 })
    } else {
      console.error('Unexpected server error:', error)
      return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
    }
  }
}  

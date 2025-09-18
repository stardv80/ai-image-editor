import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import sharp from 'sharp'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    const prompt = formData.get('prompt') as string

    if (!imageFile || !prompt) {
      return NextResponse.json(
        { error: 'Image and prompt are required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Convert File to Buffer
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Get image metadata to preserve aspect ratio
    const metadata = await sharp(buffer).metadata()
    const { width, height } = metadata

    // Determine the best size based on aspect ratio
    let size: '1024x1024' | '1536x1024' | '1024x1536'
    
    if (!width || !height) {
      // Fallback to square if dimensions can't be determined
      size = '1024x1024'
    } else {
      const aspectRatio = width / height
      
      if (aspectRatio > 1.3) {
        // Landscape (wider than tall)
        size = '1536x1024'
      } else if (aspectRatio < 0.77) {
        // Portrait (taller than wide)
        size = '1024x1536'
      } else {
        // Square or close to square
        size = '1024x1024'
      }
    }

    // Convert image to PNG format with RGBA channels (OpenAI requires RGBA, LA, or L format)
    const pngBuffer = await sharp(buffer)
      .ensureAlpha() // Ensure the image has an alpha channel (RGBA format)
      .png()
      .toBuffer()

    // Create a PNG File object for OpenAI
    const file = new File([pngBuffer], imageFile.name.replace(/\.[^/.]+$/, '.png'), { 
      type: 'image/png' 
    })

    // Use OpenAI's image editing API (GPT Image 1)
    const response = await openai.images.edit({
      model: 'gpt-image-1',
      image: file,
      prompt: prompt,
      n: 1,
      size: size,
    })

    const imageData = response.data?.[0]

    if (!imageData) {
      return NextResponse.json(
        { error: 'Failed to generate edited image' },
        { status: 500 }
      )
    }

    // GPT Image 1 returns base64 encoded images, not URLs
    if (imageData.b64_json) {
      // Convert base64 to data URL for direct display
      const dataUrl = `data:image/png;base64,${imageData.b64_json}`
      
      return NextResponse.json({
        success: true,
        imageUrl: dataUrl,
      })
    } else if (imageData.url) {
      // Fallback for URL-based responses (older models)
      return NextResponse.json({
        success: true,
        imageUrl: imageData.url,
      })
    } else {
      return NextResponse.json(
        { error: 'No image data received from OpenAI' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error editing image:', error)
    return NextResponse.json(
      { error: 'Failed to edit image. Please try again.' },
      { status: 500 }
    )
  }
} 
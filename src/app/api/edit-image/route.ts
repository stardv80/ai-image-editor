import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

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

    // Create a File object for OpenAI
    const file = new File([buffer], imageFile.name, { type: imageFile.type })

    // Use OpenAI's image editing API
    const response = await openai.images.edit({
      image: file,
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    })

    const editedImageUrl = response.data?.[0]?.url

    if (!editedImageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate edited image' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      imageUrl: editedImageUrl,
    })
  } catch (error) {
    console.error('Error editing image:', error)
    return NextResponse.json(
      { error: 'Failed to edit image. Please try again.' },
      { status: 500 }
    )
  }
} 
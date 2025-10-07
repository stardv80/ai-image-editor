'use client'

import { useState } from 'react'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setError(null)
      setEditedImageUrl(null)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedImage || !prompt.trim()) {
      setError('Please select an image and enter a prompt')
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData()
      formData.append('image', selectedImage)
      formData.append('prompt', prompt)

      const response = await fetch('/api/edit-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to edit image')
      }

      setEditedImageUrl(data.imageUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedImage(null)
    setPrompt('')
    setEditedImageUrl(null)
    setError(null)
    setPreviewUrl(null)
    
    // Reset file input
    const fileInput = document.getElementById('image-input') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Image Editor
          </h1>
          <p className="text-lg text-gray-600">
            Upload an image and describe how you want to edit it
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label
                htmlFor="image-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <label
                  htmlFor="image-input"
                  className="cursor-pointer"
                >
                  <div className="text-gray-600">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-2 text-sm">
                      <span className="font-medium text-blue-600 hover:text-blue-500">
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 4MB</p>
                  </div>
                </label>
              </div>
              {selectedImage && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {selectedImage.name}
                </p>
              )}
            </div>

            {/* Preview Image */}
            {previewUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Image
                </label>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <img
                    src={previewUrl}
                    alt="Original"
                    className="max-w-full h-auto max-h-64 mx-auto rounded"
                  />
                </div>
              </div>
            )}

            {/* Prompt Input */}
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Edit Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe how you want to edit the image (e.g., 'add a hat to the person', 'change the background to a beach', etc.)"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading || !selectedImage || !prompt.trim()}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Editing Image...' : 'Edit Image'}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Result */}
          {editedImageUrl && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Edited Image
              </h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <img
                  src={editedImageUrl}
                  alt="Edited result"
                  className="max-w-full h-auto max-h-96 mx-auto rounded"
                />
              </div>
              <div className="mt-4">
                <a
                  href={editedImageUrl}
                  download="edited-image.png"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Download Image
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

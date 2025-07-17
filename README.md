# OpenAI Image Editor

A simple Next.js application that allows you to upload images and edit them using OpenAI's image editing API with natural language prompts.

## Features

- 🖼️ Upload and preview images
- ✨ Edit images using natural language prompts
- 💾 Download edited images
- 🎨 Clean, modern UI with Tailwind CSS
- ⚡ Built with Next.js 14 and TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- An OpenAI API key with access to image editing

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd open-ai-image-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Getting an OpenAI API Key

1. Go to [OpenAI's website](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to the API keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

## How to Use

1. **Upload an Image**: Click the upload area or drag and drop an image file (PNG, JPG supported)
2. **Enter a Prompt**: Describe how you want to edit the image (e.g., "add a hat to the person", "change the background to a beach")
3. **Edit**: Click "Edit Image" and wait for the AI to process your request
4. **Download**: Once the edited image appears, you can download it

## Example Prompts

- "Add sunglasses to the person"
- "Change the background to a tropical beach"
- "Make the sky look like sunset"
- "Add snow falling in the scene"
- "Remove the background completely"

## Technical Details

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **API**: OpenAI Images API (edit endpoint)
- **Image Processing**: Client-side file handling with FormData

## API Endpoints

- `POST /api/edit-image` - Handles image upload and editing requests

## Important Notes

- Images should be square and in PNG format for best results
- The API supports images up to 4MB
- Each edit request costs credits through the OpenAI API
- Generated images are temporary URLs that may expire

## Deployment

Deploy easily on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel's dashboard
4. Deploy!

## License

MIT License - feel free to use this code for your own projects.

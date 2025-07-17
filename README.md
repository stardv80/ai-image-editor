# OpenAI Image Editor

A modern Next.js application that allows you to upload images and edit them using OpenAI's latest **GPT Image 1** model with natural language prompts. Transform your images with style conversions like pixel art, artistic filters, and detailed modifications.

## Features

- 🖼️ Upload and preview images (PNG, JPG, WEBP supported)
- ✨ Edit images using natural language prompts with GPT Image 1
- 🎨 Advanced style transformations (pixel art, artistic styles, etc.)
- 💾 Download edited images
- 🎭 Clean, modern UI with Tailwind CSS
- ⚡ Built with Next.js 14 and TypeScript
- 🔧 Automatic image format conversion (RGB to RGBA)

## Prerequisites

### Required

- Node.js 18+ 
- An OpenAI API key
- **Verified OpenAI Organization** (required for GPT Image 1 access)

### OpenAI Organization Verification

**Important**: This application uses OpenAI's GPT Image 1 model, which requires a verified organization. You must complete organization verification before using the app.

#### How to Verify Your Organization:

1. **Go to Organization Settings**: Visit [https://platform.openai.com/settings/organization/general](https://platform.openai.com/settings/organization/general)

2. **Click "Verify Organization"**: Look for the verification button on the page

3. **Complete Verification Process**: 
   By the time of writing this, the verification steps are as follows:
   - If on a computer, it would show you a QR code to scan with your phone
   - It would ask you to take a picture of your government issued ID, front and back
   - It would ask you to take a selfie, and the rotate your face to the left and then to the right
   - The verifcation happens right away

4. **Recreate an API Key**: My previous API key didn't work, so I had to create a new one.

#### Why Verification is Required:

- GPT Image 1 is OpenAI's most advanced image model
- Provides superior instruction following compared to DALL-E 2/3
- Better at style transformations and detailed edits
- Requires verified organization for security and compliance

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd open-ai-image-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Get Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **"Create new secret key"**
5. Copy the key and add it to your `.env.local` file

### 5. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

### Basic Usage

1. **Upload an Image**: 
   - Click the upload area or drag and drop
   - Supports PNG, JPG, WEBP (up to 4MB)
   - Image preview will appear

2. **Enter Your Prompt**: 
   - Describe the edit you want in natural language
   - Be specific for better results

3. **Edit Image**: 
   - Click "Edit Image" 
   - Wait for GPT Image 1 to process (usually 10-30 seconds)

4. **Download Result**: 
   - View the edited image
   - Click "Download Image" to save

### Example Prompts

#### Style Transformations
- `"Convert this to pixel art style"`
- `"Make this look like an oil painting"`
- `"Transform into watercolor style"`
- `"Convert to black and white sketch"`

#### Object Modifications
- `"Add sunglasses to the person"`
- `"Change the shirt color to red"`
- `"Remove the background completely"`
- `"Add a hat to the person"`

#### Background Changes
- `"Change the background to a tropical beach"`
- `"Make the background look like a starry night"`
- `"Replace background with a cityscape"`
- `"Add falling snow to the scene"`

#### Advanced Edits
- `"Make the person look like they're from the 1920s"`
- `"Add dramatic lighting like a movie scene"`
- `"Change the season to autumn with falling leaves"`

## Technical Details

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **API**: OpenAI GPT Image 1 (latest image model)
- **Image Processing**: Sharp.js for format conversion
- **TypeScript**: Full type safety

### AI Model Information
- **Model**: GPT Image 1 (OpenAI's latest)
- **Input**: Supports RGBA, LA, L image formats
- **Output**: Base64 encoded PNG images
- **Capabilities**: Superior instruction following, style transformation

### API Endpoints
- `POST /api/edit-image` - Handles image upload and editing

## Troubleshooting

### Common Issues

#### 1. "Organization must be verified" Error
```
Error: 403 Your organization must be verified to use the model `gpt-image-1`
```
**Solution**: Complete organization verification at [OpenAI Settings](https://platform.openai.com/settings/organization/general)

#### 2. "Invalid input image format" Error
**Solution**: This should be automatically handled by our Sharp.js conversion, but ensure your image is a valid image file.

#### 3. Image Upload Issues
- Ensure image is under 4MB
- Supported formats: PNG, JPG, WEBP
- Try refreshing the page if upload fails

#### 4. Slow Processing
- GPT Image 1 typically takes 10-30 seconds
- Complex edits may take longer
- Check your internet connection

### Getting Help

1. Check the browser console for detailed error messages
2. Verify your OpenAI API key is valid
3. Ensure organization verification is complete
4. Try with a smaller image file

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variable:
   - `OPENAI_API_KEY`: Your OpenAI API key
4. Deploy!

### Other Platforms

Ensure you set the `OPENAI_API_KEY` environment variable in your deployment platform.

## Cost Considerations

- GPT Image 1 pricing varies based on image size and quality
- Check [OpenAI Pricing](https://openai.com/api/pricing/) for current rates
- Each edit operation consumes API credits
- Consider implementing usage tracking for production apps

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this code for your own projects.

---

**Note**: This application requires OpenAI organization verification to access GPT Image 1. Make sure to complete the verification process before deployment or usage.

# Subly - AI Video Captioning

A modern web application that automatically generates and overlays captions on videos using AI transcription. Built with React, Node.js, and Remotion for professional video rendering.

## ✨ Features

- **🎥 Video Upload**: Support for various video formats
- **🤖 AI Transcription**: Automatic caption generation using Whisper AI
- **🎨 Multiple Caption Styles**: 
  - Bottom-centered captions
  - Top-bar overlay
  - Karaoke-style word-by-word highlighting
- **📱 Real-time Preview**: See captions overlaid on your video in real-time
- **🎬 Professional Export**: High-quality video rendering with embedded captions
- **🌐 Modern UI**: Clean, responsive interface built with Shadcn UI

## 🏗️ Architecture

```
Subly/
├── frontend/          # React frontend application
├── backend/           # Node.js API server
├── remotion/       # Remotion video rendering
└── README.md
```

### Frontend (React + Vite)
- **React 18** with modern hooks
- **Shadcn UI** components for professional styling
- **Tailwind CSS** for responsive design
- **Lucide React** icons
- **Toast notifications** for user feedback

### Backend (Node.js + Express)
- **Express.js** REST API
- **Multer** for file uploads
- **Whisper AI** integration for transcription
- **File management** for uploads and exports

### Video Rendering (Remotion)
- **Remotion** for programmatic video generation
- **Caption overlay** rendering
- **Multiple style support**
- **High-quality export** (1080p)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **FFmpeg** (for video processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Subly
   ```

2. **Install dependencies for all components**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install

   # Install Remotion dependencies
   cd ../remotion
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   Server runs on: `http://localhost:3001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

3. **Remotion is used for rendering** (automatically called by backend)

## 🎯 Usage

1. **Upload Video**: Click "Upload Video" and select your video file
2. **Choose Style**: Select from three caption styles:
   - **Bottom-centered**: Traditional subtitles at the bottom
   - **Top-bar**: Full-width captions at the top
   - **Karaoke**: Word-by-word highlighting effect
3. **Generate Captions**: Click "Auto-generate Captions" to process with AI
4. **Preview**: Watch your video with real-time caption overlay
5. **Export**: Download the final video with embedded captions

## 🎨 Caption Styles

### Bottom-centered
- Traditional subtitle placement
- Semi-transparent black background
- Centered at bottom of video

### Top-bar
- Full-width caption bar
- Positioned at top of video
- Dark background for readability

### Karaoke
- Word-by-word highlighting
- Golden color for sung words
- Purple gradient background
- Perfect for sing-along videos

## 🛠️ API Endpoints

### Upload
- `POST /api/upload/upload` - Upload video file

### Captions
- `POST /api/captions/generate-captions` - Generate captions using AI

### Render
- `POST /api/render/export-video` - Export video with captions

## 📁 Project Structure

```
Subly/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Shadcn UI components
│   │   │   ├── VideoUpload.jsx  # File upload component
│   │   │   ├── CaptionPreview.jsx # Video preview with captions
│   │   │   └── StyleSelector.jsx # Caption style selector
│   │   ├── hooks/               # Custom React hooks
│   │   └── App.jsx              # Main application
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   └── server.js            # Express server
│   └── package.json
├── remotion/
│   ├── src/
│   │   ├── compositions/        # Video compositions
│   │   └── Root.jsx             # Remotion root
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in respective directories:

**Backend (.env)**
```env
PORT=3001
UPLOAD_DIR=uploads
OUTPUT_DIR=outputs
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3001
```

## 🚀 Deployment

### Backend Deployment
1. Build the application
2. Set environment variables
3. Ensure FFmpeg is installed on server
4. Start with `npm start`

### Frontend Deployment
1. Build with `npm run build`
2. Deploy `dist/` folder to static hosting
3. Update API URL in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **Whisper AI** for transcription capabilities
- **Remotion** for video rendering framework
- **Shadcn UI** for beautiful components
- **React** and **Node.js** communities

## 📞 Support

For support, email jivit.rana2024@nst.rishihood.edu.in or create an issue in the repository.

---

**Made with ❤️ by Jivit Rana**

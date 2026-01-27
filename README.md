# NeuroStream 🎥

NeuroStream is an AI-powered learning assistant that transforms video content into structured educational material. Whether you upload a local file or provide a YouTube URL, NeuroStream uses advanced AI and transcription to generate summaries, highlights, quizzes, and interactive timelines.

## 🚀 Features

- **Video Transcription:** Automated speech-to-text using Vosk (offline capabilities).
- **YouTube Integration:** Process any YouTube video via URL.
- **AI-Powered Insights:**
  - **Smart Summary:** Concise bullet points covering the core video content.
  - **Key Highlights:** Important keywords and phrases for quick scanning.
  - **Enhanced Quiz:** 8 AI-generated multiple-choice questions with varying difficulty levels (Easy to Moderate).
  - **Smart Timeline:** Time-based breakdown of topics with jump-to-time functionality.
- **History Tracking:** Save and access all previous analysis results in your dashboard.
- **Secure Authentication:** JWT-based user login and signup.

## 🛠️ Technology Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, DaisyUI, Tabler Icons.
- **Backend:** Node.js, MongoDB (Mongoose).
- **AI Integration:** Google Gemini AI (Flash & Pro models).
- **Processing Engine:** Python 3.11, Vosk (Transcription), yt-dlp (YouTube Downloader), FFmpeg.

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [Python 3.11](https://www.python.org/downloads/release/python-3110/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [FFmpeg](https://ffmpeg.org/download.html) (Ensure it's added to your System PATH)

## 📥 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/neuro-stream.git
   cd neuro-stream
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Setup Python Environment:**
   ```bash
   pip install vosk yt-dlp
   ```
   *Note: Download a Vosk model (e.g., `vosk-model-small-en-us-0.15`) from [alphacephei.com/vosk/models](https://alphacephei.com/vosk/models) and extract it into the `python/` directory.*

4. **Environment Variables:**
   Create a `.env` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Update the `GEMINI_API_KEY`, `MONGO_URI`, and `JWT_SECRET`.

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```

## 📜 Usage

1. Sign up/Login to your account.
2. Navigate to **Predict** to upload a local video or provide a YouTube URL.
3. Toggle the insights you want (Summary, Quiz, Timeline).
4. Wait for processing to complete.
5. Review results and use the **Interactive Timeline** to jump to specific video sections.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
*Built with ❤️ for advanced agentic learning.*

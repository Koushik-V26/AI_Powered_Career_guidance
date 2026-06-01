# 🚀 AI Career Guidance & Navigator

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Gemini_AI-2.5_Flash-orange?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)

> A premium, highly interactive AI-powered career guidance and mentorship platform. This application leverages Google's Gemini AI to deliver personalized career roadmaps, conduct thorough skill gap analyses, and offer around-the-clock intelligent mentorship.

---

## 🌟 Key Features

### 🧠 1. Personalized Onboarding & Mindset Assessment
* **Multi-Step Onboarding**: A beautiful, fluid multi-step form built with Framer Motion that gathers information on your experience level, technical skills, interests, and professional aspirations.
* **Mindset Identification**: Analyzes your learning style and mindset type (e.g., Growth Mindset) to tailor suggestions and motivation.

### 🗺️ 2. Dynamic Career Roadmaps
* **Visual Roadmaps**: Leverages SVG and custom Canvas representations to map out step-by-step paths from your current state to your dream career.
* **Interactive Milestones**: Mark nodes as complete, track progress, and view resources customized to your experience level.

### 📊 3. Skill Gap Analysis & Progress Tracking
* **Detailed Analytics**: Integrates beautiful, interactive charts powered by Recharts to visualize your skill acquisition, streak trends, and domain metrics.
* **Milestone Progress**: Track acquired skills, keep your learning streak alive, and receive dynamic visual feedback.

### 💬 4. 24/7 AI Career Mentor
* **Smart Chatbot**: Integrated at the application level to provide support, motivation, and career strategies.
* **Resilient Architecture**: Utilizes Gemini 2.5 Flash / 1.5 Flash for contextual guidance. Built with an intelligent local fallback system to ensure uninterrupted assistance even in offline modes.

---

## 🛠️ Technology Stack

* **Frontend Framework**: [Next.js 14](https://nextjs.org/) (using the modern App Router)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Charts & Metrics**: [Recharts](https://recharts.org/)
* **AI Model Integration**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Google Gemini API)

---

## 🚀 Quick Start & Installation

Follow these steps to run the application locally on your machine.

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Clone and Install Dependencies
Navigate to the project root and run:
```bash
npm install
```

### 3. Configure Environment Variables
Create a file named `.env.local` in the root directory and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> [!TIP]
> You can acquire a Gemini API key for free from the [Google AI Studio](https://aistudio.google.com/).

### 4. Launch the Development Server
Run the local dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application!

---

## 📁 Directory Structure

```text
├── app/                      # Next.js App Router Pages & APIs
│   ├── admin/                # Admin Panel
│   ├── api/                  # API Route Handlers
│   │   └── aiMentor/         # Gemini AI Mentor API Endpoint
│   ├── assessment/           # Multi-step assessment flow
│   ├── auth/                 # User Authentication Pages
│   ├── dashboard/            # Interactive user dashboard
│   ├── recommended-domains/  # Domain recommendation visualizer
│   ├── skill-gap-analysis/   # Analytical skill assessment
│   ├── globals.css           # Tailwind & Global styles
│   └── layout.jsx            # Core page layout wrapper
├── components/               # Reusable UI Components
│   ├── AIMentor.js           # Full-page AI Mentor Chat Interface
│   ├── Chatbot.jsx           # Sticky chat widget present on all pages
│   ├── DomainGrid.jsx        # Grid displaying available career domains
│   ├── MultiStepForm.jsx     # Onboarding & questionnaire system
│   ├── RoadmapVisualizer.js  # Interactive interactive SVG map
│   └── ProgressTracker.js    # Data visualization & skill progression
├── public/                   # Static assets (images, logos, etc.)
├── package.json              # Project scripts and dependencies
└── tailwind.config.js        # Tailwind styling configurations
```

---

## 🧪 Verification & Development Scripts

* **`npm run dev`**: Starts the hot-reloading development server.
* **`npm run build`**: Compiles the Next.js production build.
* **`npm run start`**: Launches the built production server locally.
* **`npm run lint`**: Runs ESLint rules to enforce code quality standards.

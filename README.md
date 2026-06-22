# 🎙️ Lisup AI (lisup.ai)

> **Lisup AI** is an ultra-premium, interactive web landing page demonstrating an AI-powered voice assistant and real-time voice correction layer. It showcases how spoken language with filler words can be dynamically cleaned up, tone-translated (e.g., formal, casual, funny, polite, social), and injected directly into target productivity platforms.

---

## ✨ Key Features

- **🌀 Real-Time Filler Word Sweeper:** An interactive visualizer demonstrating how filler words like *"um"*, *"uh"*, and *"like"* are detected, swept out, and replaced with clean, professional text.
- **🎭 Dynamic Tone Changer:** Translate spoken sentences into 5 distinct tones: **Formal**, **Casual**, **Funny**, **Polite**, and **Social**, and watch the output adapt in real-time.
- **🎨 Ultra-Premium Interactive UI:**
  - Smooth custom cursor tracker with inertia-based ring physics.
  - Custom HTML5 Canvas audio wave and fingerprint ripple animations.
  - Scroll-linked horizontal gallery layout.
  - Modern typography powered by Bricolage Grotesque and JetBrains Mono.
  - Elegant glassmorphism and HSL-based cream-orange palette.
- **🔗 Productivity Integrations Showcase:** Visual integration badges for Slack, Notion, Gmail, WhatsApp, Figma, Discord, VS Code, Word, Excel, and Outlook.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v16.2.9)
- **Core Library:** [React](https://react.dev/) (v19.2.4)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Animations:** Custom HTML5 Canvas rendering & CSS micro-animations
- **Styles:** Vanilla CSS / Global stylesheet system

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed.

### ⚙️ Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/muzammilkarimi/lisup.ai.git
   cd lisup.ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### 🏃‍♂️ Running the Development Server

Start the development server locally:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the interactive dashboard.

### 🏗️ Production Build

Generate the production bundle:
   ```bash
   npm run build
   ```

Start the production server:
   ```bash
   npm start
   ```

---

## 📁 Directory Structure

```text
├── public/                 # Static assets (logo, etc.)
├── src/
│   └── app/
│       ├── globals.css     # Global CSS styles & design tokens
│       ├── layout.tsx      # Main application entry layout
│       └── page.tsx        # Dynamic landing page component & canvas animations
├── package.json            # Scripts & dependencies
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js configurations
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/muzammilkarimi/lisup.ai/issues).

---

## 📄 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

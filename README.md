<div align="center">
  
  # 🚀 iOSCraft

  **Build Skills. Master Swift. Crack iOS Interviews.**

  [![Live Demo](https://img.shields.io/badge/Live_Demo-View_Website-FFA500?style=for-the-badge&logo=vercel)](https://ioscraft-zeta.vercel.app/)
  
  A modern, premium developer education platform designed to help aspiring and professional iOS developers master Swift, conquer Data Structures and Algorithms (DSA), and prepare for real-world technical interviews.
  
</div>

---

## 🌟 Features

- **Structured Learning Curriculum:** Master Swift from the ground up with interactive, markdown-powered lessons featuring code examples.
- **Interview Preparation:** Over 100+ curated iOS, Swift, UIKit, and SwiftUI interview questions with detailed explanations, tips, and follow-ups.
- **DSA in Swift:** Classic data structures and algorithm problems solved in idiomatic Swift, complete with multiple approaches and time/space complexity analysis.
- **Developer Roadmap:** An interactive, step-by-step roadmap to track your journey from beginner to senior iOS developer.
- **Smart Progress Tracking:** Automatically saves your completed lessons and solved problems to your browser's local storage.
- **Bookmarks Dashboard:** Save any lesson, problem, or interview question to a personalized dashboard for easy access later.
- **Global Search (Cmd/Ctrl + K):** Instantly search across the entire platform's content.
- **Dark/Light Mode:** Beautiful, responsive UI supporting dynamic theme switching.

## 🛠️ Tech Stack

iOSCraft is built with a modern frontend stack focusing on speed, scalability, and developer experience:

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) for blazing-fast development and optimized production builds.
- **Styling:** Custom CSS architecture utilizing [Tailwind CSS](https://tailwindcss.com/) for utility classes and theming.
- **Routing:** [React Router v6](https://reactrouter.com/) for client-side navigation.
- **Content Rendering:** `react-markdown` and `remark-gfm` for rendering rich text and code blocks.
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started Locally

To run this project on your local machine for development or contributing:

### Prerequisites
Make sure you have Node.js (v18+) and npm installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ambresh20/iOSCraft.git
   cd iOSCraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:5173`.

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

The project follows a "content-first" architecture, keeping data separate from UI components:

```
src/
├── components/       # Reusable UI elements
│   ├── common/       # Buttons, Modals, Code blocks, Badges
│   └── layout/       # Navbar, Footer, Learning sidebar layout
├── data/             # Static content registry
│   ├── swiftLessons.ts
│   ├── interviewQuestions.ts
│   ├── dsaProblems.ts
│   └── roadmap.ts
├── hooks/            # Custom React hooks (Local Storage, Bookmarks, Theme)
├── pages/            # Main application routes/views
├── styles/           # Global CSS variables, custom Tailwind apply directives
└── types/            # TypeScript interfaces defining the data models
```

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

If you have suggestions to improve the platform, add new interview questions, or write new Swift tutorials:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📬 Contact & Author

**Ambresh Kumar Vaishya**

I'm an iOS Developer passionate about building tools that help other developers succeed. Let's connect!

- **LinkedIn:** [ambresh-vaishya](https://www.linkedin.com/in/ambresh-vaishya/)
- **GitHub Repository:** [ambresh20/iOSCraft](https://github.com/ambresh20/iOSCraft)
- **Live Platform:** [iOSCraft on Vercel](https://ioscraft-zeta.vercel.app/)

---
<div align="center">
  <i>Built with ❤️ for the iOS Developer Community</i>
</div>

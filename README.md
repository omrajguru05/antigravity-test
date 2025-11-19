# HelixDesk

A modern, feature-rich task and customer management platform with real-time insights and analytics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)

## Features

### 🎯 Task Management
- **Kanban Board**: Drag-and-drop task organization
- **Priority System**: High, medium, and low priority tasks
- **Real-time Updates**: Live task status synchronization
- **Today View**: Focus on current priorities

### 👥 Customer Management
- **Identity Cards**: Detailed customer profiles
- **Journey Timelines**: Track customer interaction history
- **Smart Insights**: AI-powered customer analytics

### 📊 Analytics & Insights
- **Python Analytics Engine**: Advanced task metrics and velocity tracking
- **C++ Text Processor**: High-performance search and filtering
- **InsightRibbon**: Real-time dashboard metrics

### 🎨 Modern UI/UX
- Responsive design optimized for all devices
- Smooth animations powered by GSAP
- Interactive 3D elements with React Three Fiber
- Clean, premium interface design

## Tech Stack

**Frontend:**
- React 19.2 with React Router
- TypeScript for type safety
- Zustand for state management
- Vite for lightning-fast builds
- GSAP for animations
- React Three Fiber for 3D graphics

**Backend:**
- Node.js server
- RESTful API architecture

**Utilities:**
- Python 3 for analytics
- C++17 for performance-critical operations

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ (for analytics)
- g++ compiler (optional, for C++ utilities)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/helixdesk.git
cd helixdesk

# Install dependencies
npm install

# Start development server
npm run dev:all
```

The application will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run server` | Start backend server |
| `npm run dev:all` | Run both frontend and backend concurrently |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Analytics Utilities

### Python Analytics

Analyze Kanban board performance and get actionable insights:

```bash
python scripts/analytics.py path/to/tasks.json
```

See [scripts/README.md](scripts/README.md) for detailed usage.

### C++ Text Processor

Ultra-fast fuzzy search and text analysis:

```bash
# Compile
g++ -std=c++17 -O3 scripts/text_processor.cpp -o scripts/text_processor

# Run
./scripts/text_processor --demo
```

## Project Structure

```
helixdesk/
├── src/
│   ├── components/
│   │   ├── features/        # Feature-specific components
│   │   │   ├── work/        # Kanban board components
│   │   │   ├── customers/   # Customer management
│   │   │   └── today/       # Today view
│   │   └── layout/          # Layout components
│   ├── store/               # Zustand state management
│   └── styles/              # Global styles
├── server/                  # Backend API
│   └── routes/              # API routes
├── scripts/                 # Python & C++ utilities
└── public/                  # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with modern web technologies
- Inspired by productivity tools like Trello and Linear
- Optimized for Vercel deployment

---

**Made with ❤️ by the HelixDesk team**

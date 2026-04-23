const projects = [
  {
    id: 1,
    title: "QuantFlow",
    shortDescription: "Real-time options pricing and risk analysis engine with sub-microsecond latency.",
    fullDescription: "A real-time options pricing engine built with C++ using Black-Scholes and Monte Carlo simulation models. The system computes Greeks (Delta, Gamma, Vega) across large position sets with parallel processing, enabling real-time portfolio hedging and risk management. Designed for high throughput and low-latency performance.",
    techStack: ["C++", "Python", "Java"],
    category: "Systems",
    github: "https://github.com/esh-07",
    liveDemo: "",
    images: [
      "https://placehold.co/800x450/1e293b/94a3b8?text=QuantFlow+Engine",
      "https://placehold.co/800x450/0f172a/64748b?text=Risk+Dashboard"
    ]
  },
  {
    id: 2,
    title: "PixelForge Tech",
    shortDescription: "Full-stack platform with real-time features, AI personalization, and scalable infrastructure.",
    fullDescription: "Co-founded and built a data-driven platform from the ground up as a founding engineer. The application features real-time capabilities via WebRTC, an AI-powered personalization engine using TensorFlow for user behavior analysis, and a scalable backend processing tens of thousands of concurrent sessions with sub-50ms latency.",
    techStack: ["React", "Python", "Node.js", "MongoDB", "AWS", "TensorFlow"],
    category: "Full-Stack",
    github: "https://github.com/esh-07",
    liveDemo: "",
    images: [
      "https://placehold.co/800x450/7c3aed/e9d5ff?text=PixelForge+Platform",
      "https://placehold.co/800x450/6d28d9/c4b5fd?text=Analytics+Dashboard"
    ]
  },
  {
    id: 3,
    title: "AstroClassifier",
    shortDescription: "Deep learning model for space debris trajectory prediction, presented at Regeneron ISEF.",
    fullDescription: "A machine learning system for predicting space debris trajectories, achieving high accuracy across tracked objects. Built with TensorFlow and integrated with NASA APIs for real-time orbital data. Features a distributed inference pipeline for low-latency collision detection. The project was presented at the national round of Regeneron ISEF and published in the International Journal of Software & Hardware Research.",
    techStack: ["Python", "TensorFlow", "NumPy", "REST APIs"],
    category: "ML",
    github: "https://github.com/esh-07",
    liveDemo: "",
    images: [
      "https://placehold.co/800x450/0369a1/bae6fd?text=AstroClassifier",
      "https://placehold.co/800x450/075985/7dd3fc?text=Prediction+Visualization"
    ]
  },
  {
    id: 4,
    title: "LLM Inference Benchmarking",
    shortDescription: "Benchmarking infrastructure comparing latency and throughput across major LLM providers.",
    fullDescription: "Built at Cohere: an automated benchmarking system that measures inference latency and throughput across multiple LLM providers. The system processes thousands of requests weekly with cache-hit detection and generates performance comparison reports. Includes statistical regression monitoring with rolling median trendlines for anomaly detection.",
    techStack: ["Python", "AWS", "GitHub Actions", "GCS"],
    category: "Backend",
    github: "",
    liveDemo: "",
    images: [
      "https://placehold.co/800x450/059669/a7f3d0?text=Benchmark+Dashboard",
      "https://placehold.co/800x450/047857/6ee7b7?text=Performance+Charts"
    ]
  },
  {
    id: 5,
    title: "CI/CD Release Automation",
    shortDescription: "End-to-end automated release pipelines for large-scale engineering organizations.",
    fullDescription: "Built at PlayStation: automated release pipelines with conventional commits, Docker image builds, and Helm chart deployments across hundreds of production repositories. The system includes automated versioning, comprehensive test coverage, and drastically reduced deployment times for thousands of engineers.",
    techStack: ["Docker", "GitHub Actions", "Python"],
    category: "Backend",
    github: "",
    liveDemo: "",
    images: [
      "https://placehold.co/800x450/dc2626/fca5a5?text=Pipeline+Architecture",
      "https://placehold.co/800x450/b91c1c/fecaca?text=Deployment+Flow"
    ]
  },
  {
    id: 6,
    title: "Portfolio Website",
    shortDescription: "This site: a responsive React portfolio with dark mode, filtering, and an interactive guestbook.",
    fullDescription: "A personal portfolio website built with React and Vite. Features include dark/light mode with localStorage persistence, a projects page with multi-criteria filtering (search, category, tech stack), and an interactive guestbook with emoji reactions, sorting, and search. Fully responsive with scroll-triggered animations and deployed to GitHub Pages.",
    techStack: ["React", "CSS", "Vite"],
    category: "Frontend",
    github: "https://github.com/esh-07/portfolio",
    liveDemo: "https://esh-07.github.io/portfolio/",
    images: [
      "https://placehold.co/800x450/2563eb/bfdbfe?text=Portfolio+Home",
      "https://placehold.co/800x450/1d4ed8/93c5fd?text=Projects+Page"
    ]
  }
];

export const categories = ["All", "Frontend", "Backend", "Full-Stack", "ML", "Systems"];

export const allTechStacks = [
  ...new Set(projects.flatMap((p) => p.techStack))
].sort();

export default projects;

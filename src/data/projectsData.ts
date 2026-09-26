export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  filterTags: string[];
  description: string;
  technologies: string[];
  github: string;
  image?: string;
  gradientBadge?: {
    icon: string;
    tagline: string;
  };
}

export const FILTER_CATEGORIES = [
  "ALL",
  "AI AGENTS",
  "GENAI / RAG",
  "NLP",
  "DEEP LEARNING",
  "MACHINE LEARNING",
  "CONVERSATIONAL AI",
] as const;

export type FilterCategory = (typeof FILTER_CATEGORIES)[number];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "project-1",
    number: "01",
    title: "Umer's Agent",
    subtitle: "AI-Powered City Intelligence System",
    category: "AI Agents / Generative AI",
    filterTags: ["AI AGENTS", "GENAI / RAG"],
    description:
      "Autonomous multi-tool agent built with LangChain and Mistral AI that dynamically decides between real-time weather data and Tavily live news search to provide location-grounded intelligence via Streamlit.",
    technologies: [
      "LangChain",
      "Mistral AI",
      "Python",
      "Tavily Search",
      "OpenWeatherMap",
      "Streamlit",
    ],
    github: "https://github.com/Umer8008/Weather-and-news-Agent",
    gradientBadge: {
      icon: "CITY_INTELLIGENCE",
      tagline: "Autonomous Tool Calling & Routing",
    },
  },
  {
    id: "project-2",
    number: "02",
    title: "Deep Search & Web Scraper Agent",
    subtitle: "Multi-Agent Research & Critique Pipeline",
    category: "AI Agents / Web Intelligence",
    filterTags: ["AI AGENTS"],
    description:
      "Modular multi-agent research pipeline using LangChain, Google Gemini, and Tavily Search to execute live web discovery, deep content scraping with BeautifulSoup4, automated report synthesis, and critic peer-review.",
    technologies: [
      "LangChain",
      "Google Gemini",
      "Python",
      "Tavily AI Search",
      "BeautifulSoup4",
      "Structured Outputs",
    ],
    github: "https://github.com/Umer8008/Deep-search-and-web-scraper",
    gradientBadge: {
      icon: "WEB_RESEARCH",
      tagline: "Multi-Agent Research Pipeline",
    },
  },
  {
    id: "project-3",
    number: "03",
    title: "Student Assistant",
    subtitle: "AI-Powered RAG Chatbot",
    category: "RAG / Generative AI",
    filterTags: ["GENAI / RAG", "AI AGENTS"],
    description:
      "Retrieval-Augmented Generation assistant with dual-engine architecture: document-grounded question answering via ChromaDB vector store and MMR retrieval alongside a conversational AI mode with rolling memory.",
    technologies: [
      "LangChain",
      "ChromaDB",
      "Hugging Face Embeddings",
      "Mistral AI",
      "Streamlit",
      "Python",
    ],
    github: "https://github.com/Umer8008/RAG-AI-ChatBot",
    gradientBadge: {
      icon: "RAG_KNOWLEDGE",
      tagline: "Dense Vector Search & MMR",
    },
  },
  {
    id: "project-4",
    number: "04",
    title: "Meeting Assistant",
    subtitle: "AI Meeting Intelligence System",
    category: "AI / NLP",
    filterTags: ["AI AGENTS", "NLP"],
    description:
      "AI meeting intelligence system designed for automated meeting transcription, conversational summary extraction, speaker reasoning, and action item tracking across structured discussion streams.",
    technologies: [
      "Python",
      "NLP",
      "LLMs",
      "Speech-to-Text",
      "Audio Processing",
      "Prompt Engineering",
    ],
    github: "https://github.com/Umer8008/Meeting-Assistant",
    gradientBadge: {
      icon: "MEETING_NLP",
      tagline: "Speech Transcription & Extraction",
    },
  },
  {
    id: "project-5",
    number: "05",
    title: "NLP-Based English Grammar Web Application",
    subtitle: "Intelligent Grammar & Syntax Analyzer",
    category: "NLP",
    filterTags: ["NLP"],
    description:
      "Web application leveraging NLP parsing and linguistic tokenization models to identify grammatical anomalies, evaluate sentence syntactic structures, and provide real-time suggestions for clear expression.",
    technologies: [
      "Python",
      "NLP",
      "NLTK",
      "Spacy",
      "Linguistic Parsing",
      "Streamlit",
    ],
    github:
      "https://github.com/Umer8008/NLP-based-English-Grammer-web-application",
    gradientBadge: {
      icon: "GRAMMAR_PARSER",
      tagline: "Syntactic Tree & Error Detection",
    },
  },
  {
    id: "project-6",
    number: "06",
    title: "NLP-Based Emotion Detector",
    subtitle: "Textual Sentiment & Affect Classification",
    category: "NLP",
    filterTags: ["NLP", "MACHINE LEARNING"],
    description:
      "Natural Language Processing system trained to detect and classify nuanced human emotional states and sentiments from text inputs through specialized feature extraction and statistical classification models.",
    technologies: [
      "Python",
      "NLP",
      "Scikit-Learn",
      "TF-IDF Vectorizer",
      "Classification Models",
      "Pandas",
    ],
    github: "https://github.com/Umer8008/NLP-based-Emotion-Detector",
    gradientBadge: {
      icon: "EMOTION_CLASSIFIER",
      tagline: "Affect Detection & Sentiment Scoring",
    },
  },
  {
    id: "project-7",
    number: "07",
    title: "NLP RNN-Based Next-Word-or-Sentence-Predictor",
    subtitle: "Sequential Recurrent Neural Language Model",
    category: "NLP / Deep Learning",
    filterTags: ["NLP", "DEEP LEARNING"],
    description:
      "Deep learning sequential language model utilizing Recurrent Neural Networks (RNN / LSTM) to model sequential linguistic dependencies and predict upcoming tokens or sentences based on context.",
    technologies: [
      "Python",
      "Deep Learning",
      "RNN / LSTM",
      "TensorFlow / Keras",
      "Tokenization",
      "Embeddings",
    ],
    github:
      "https://github.com/Umer8008/NLP-RNN-Based-Next-word-or-sentence-predictor",
    gradientBadge: {
      icon: "RNN_SEQUENCE",
      tagline: "Recurrent Neural Sequence Modeling",
    },
  },
  {
    id: "project-8",
    number: "08",
    title: "Chatbot",
    subtitle: "Contextual Conversational AI",
    category: "Conversational AI",
    filterTags: ["CONVERSATIONAL AI", "NLP"],
    description:
      "Interactive conversational system implementing intent classification, entity extraction, and multi-turn contextual dialog management to deliver responsive conversational experiences.",
    technologies: [
      "Python",
      "Conversational AI",
      "NLP",
      "Intent Recognition",
      "Contextual Dialogue",
      "Flask",
    ],
    github: "https://github.com/Umer8008/chatbot",
    gradientBadge: {
      icon: "CONVERSATIONAL_BOT",
      tagline: "Intent Recognition & State Tracking",
    },
  },
  {
    id: "project-9",
    number: "09",
    title: "Heart Disease Predictor",
    subtitle: "Cardiovascular Clinical Risk Prediction",
    category: "Machine Learning",
    filterTags: ["MACHINE LEARNING"],
    description:
      "Clinical predictive machine learning model trained on cardiovascular patient data to assess risk factors, perform exploratory feature analysis, and deliver binary risk classifications with high diagnostic accuracy.",
    technologies: [
      "Python",
      "Scikit-Learn",
      "Machine Learning",
      "Pandas",
      "NumPy",
      "Data Preprocessing",
    ],
    github: "https://github.com/Umer8008/Heart-Disease-predictor",
    gradientBadge: {
      icon: "HEART_ML",
      tagline: "Predictive ML & Clinical Metrics",
    },
  },
];

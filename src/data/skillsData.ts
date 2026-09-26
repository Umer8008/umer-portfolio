// ─────────────────────────────────────────────────────────────────
//  SKILLS DATA  —  Umer Nawaz · AI / ML Engineer
//  Centralized, data-driven skill categories & network edges.
//  Edit this file to add / remove / reorganise skills.
// ─────────────────────────────────────────────────────────────────

export type CategoryId =
  | "machine-learning"
  | "deep-learning"
  | "nlp"
  | "data-processing"
  | "generative-ai"
  | "agentic-ai"
  | "databases"
  | "web-backend";

export interface SkillItem {
  id: string;
  name: string;
  category: CategoryId;
  cluster: string;
  level?: "core" | "advanced" | "architecture";
}

export interface SkillCategory {
  id: CategoryId;
  name: string;
  badge: string;
  description: string;
}

// ─────────────────────────────────────────────────────────────────
//  8 CATEGORIES
// ─────────────────────────────────────────────────────────────────
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "machine-learning",
    name: "Machine Learning",
    badge: "CLASSICAL ML · ALGORITHMS",
    description:
      "Supervised & unsupervised learning, model training, evaluation and feature engineering",
  },
  {
    id: "deep-learning",
    name: "Deep Learning",
    badge: "NEURAL ARCHITECTURES",
    description:
      "Artificial, convolutional and recurrent neural network architectures",
  },
  {
    id: "nlp",
    name: "Natural Language Processing",
    badge: "TEXT · LANGUAGE · SEMANTICS",
    description:
      "Text processing, tokenisation, embeddings, transformers and semantic understanding",
  },
  {
    id: "data-processing",
    name: "Data Processing & Visualization",
    badge: "PYTHON · SCIENTIFIC STACK",
    description:
      "Python scientific ecosystem — numerical computation, data wrangling and visualisation",
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    badge: "LLMs · RAG · RETRIEVAL",
    description:
      "Large language models, retrieval-augmented generation and prompt engineering",
  },
  {
    id: "agentic-ai",
    name: "Agentic AI",
    badge: "AGENTS · TOOLS · WORKFLOWS",
    description:
      "Autonomous AI agents, tool-calling, multi-step reasoning and orchestration frameworks",
  },
  {
    id: "databases",
    name: "Databases",
    badge: "STORAGE · RETRIEVAL · QUERY",
    description:
      "Relational, document and vector database systems",
  },
  {
    id: "web-backend",
    name: "Web / AI Backend",
    badge: "BACKEND · APIs",
    description:
      "Backend web frameworks and API development for AI-powered applications",
  },
];

// ─────────────────────────────────────────────────────────────────
//  SKILLS
// ─────────────────────────────────────────────────────────────────
export const SKILLS_DATA: SkillItem[] = [

  // ── 1. MACHINE LEARNING ──────────────────────────────────────
  { id: "ml",               name: "Machine Learning",      category: "machine-learning", cluster: "core" },
  { id: "supervised",       name: "Supervised Learning",   category: "machine-learning", cluster: "paradigm" },
  { id: "unsupervised",     name: "Unsupervised Learning", category: "machine-learning", cluster: "paradigm" },
  { id: "classification",   name: "Classification",        category: "machine-learning", cluster: "tasks" },
  { id: "regression",       name: "Regression",            category: "machine-learning", cluster: "tasks" },
  { id: "logistic-reg",     name: "Logistic Regression",   category: "machine-learning", cluster: "algorithms" },
  { id: "random-forest",    name: "Random Forest",         category: "machine-learning", cluster: "algorithms" },
  { id: "scikit-learn",     name: "Scikit-learn",          category: "machine-learning", cluster: "tools" },
  { id: "data-prep",        name: "Data Preprocessing",    category: "machine-learning", cluster: "pipeline" },
  { id: "feature-eng",      name: "Feature Engineering",   category: "machine-learning", cluster: "pipeline" },
  { id: "train-test",       name: "Train / Test Split",    category: "machine-learning", cluster: "evaluation" },
  { id: "cross-val",        name: "Cross Validation",      category: "machine-learning", cluster: "evaluation" },
  { id: "model-eval",       name: "Model Evaluation",      category: "machine-learning", cluster: "evaluation" },

  // ── 2. DEEP LEARNING ─────────────────────────────────────────
  { id: "deep-learning",    name: "Deep Learning",         category: "deep-learning", cluster: "core" },
  { id: "neural-networks",  name: "Neural Networks",       category: "deep-learning", cluster: "core" },
  { id: "ann",              name: "Artificial Neural Networks (ANN)", category: "deep-learning", cluster: "architectures" },
  { id: "cnn",              name: "Convolutional Neural Networks (CNN)", category: "deep-learning", cluster: "architectures" },
  { id: "rnn",              name: "Recurrent Neural Networks (RNN)", category: "deep-learning", cluster: "architectures" },

  // ── 3. NATURAL LANGUAGE PROCESSING ──────────────────────────
  { id: "nlp",              name: "NLP",                   category: "nlp", cluster: "core" },
  { id: "text-processing",  name: "Text Processing",       category: "nlp", cluster: "preprocessing" },
  { id: "tokenization",     name: "Tokenization",          category: "nlp", cluster: "preprocessing" },
  { id: "embeddings",       name: "Embeddings",            category: "nlp", cluster: "representation" },
  { id: "semantic-search",  name: "Semantic Search",       category: "nlp", cluster: "representation" },
  { id: "transformers",     name: "Transformers",          category: "nlp", cluster: "architectures" },
  { id: "attention",        name: "Attention Mechanisms",  category: "nlp", cluster: "architectures" },

  // ── 4. DATA PROCESSING & VISUALIZATION ──────────────────────
  { id: "python",           name: "Python",                category: "data-processing", cluster: "language" },
  { id: "numpy",            name: "NumPy",                 category: "data-processing", cluster: "computation" },
  { id: "pandas",           name: "Pandas",                category: "data-processing", cluster: "computation" },
  { id: "matplotlib",       name: "Matplotlib",            category: "data-processing", cluster: "visualization" },
  { id: "seaborn",          name: "Seaborn",               category: "data-processing", cluster: "visualization" },
  { id: "eda",              name: "EDA",                   category: "data-processing", cluster: "analysis" },
  { id: "data-viz",         name: "Data Visualization",    category: "data-processing", cluster: "analysis" },

  // ── 5. GENERATIVE AI ─────────────────────────────────────────
  { id: "gen-ai",           name: "Generative AI",         category: "generative-ai", cluster: "core" },
  { id: "llms",             name: "LLMs",                  category: "generative-ai", cluster: "models" },
  { id: "prompt-eng",       name: "Prompt Engineering",    category: "generative-ai", cluster: "techniques" },
  { id: "rag",              name: "RAG",                   category: "generative-ai", cluster: "retrieval" },
  { id: "mistral-ai",       name: "Mistral AI",            category: "generative-ai", cluster: "models" },
  { id: "gen-embeddings",   name: "Embeddings",            category: "generative-ai", cluster: "retrieval" },
  { id: "vector-db",        name: "Vector Databases",      category: "generative-ai", cluster: "retrieval" },

  // ── 6. AGENTIC AI ────────────────────────────────────────────
  { id: "agentic-ai",       name: "Agentic AI",            category: "agentic-ai", cluster: "core" },
  { id: "ai-agents",        name: "AI Agents",             category: "agentic-ai", cluster: "core" },
  { id: "tool-calling",     name: "Tool Calling",          category: "agentic-ai", cluster: "execution" },
  { id: "langchain",        name: "LangChain",             category: "agentic-ai", cluster: "frameworks" },
  { id: "langgraph",        name: "LangGraph",             category: "agentic-ai", cluster: "frameworks" },
  { id: "memory",           name: "Memory",                category: "agentic-ai", cluster: "cognition" },
  { id: "reasoning",        name: "Reasoning",             category: "agentic-ai", cluster: "cognition" },
  { id: "multi-step",       name: "Multi-step Workflows",  category: "agentic-ai", cluster: "cognition" },

  // ── 7. DATABASES ─────────────────────────────────────────────
  { id: "postgresql",       name: "PostgreSQL",            category: "databases", cluster: "relational" },
  { id: "sql",              name: "SQL",                   category: "databases", cluster: "relational" },
  { id: "mongodb",          name: "MongoDB",               category: "databases", cluster: "document" },
  { id: "vector-db-db",     name: "Vector Databases",      category: "databases", cluster: "vector" },

  // ── 8. WEB / AI BACKEND ──────────────────────────────────────
  { id: "django",           name: "Django",                category: "web-backend", cluster: "framework" },
  { id: "fastapi",          name: "FastAPI",               category: "web-backend", cluster: "framework" },
];

// ─────────────────────────────────────────────────────────────────
//  NETWORK EDGES (intra-category connections for clean SVG wires)
// ─────────────────────────────────────────────────────────────────
export const SKILL_EDGES: [string, string][] = [

  // ── Machine Learning pipeline ────────────────────────────────
  ["ml",             "supervised"],
  ["ml",             "unsupervised"],
  ["supervised",     "classification"],
  ["supervised",     "regression"],
  ["classification", "logistic-reg"],
  ["regression",     "logistic-reg"],
  ["logistic-reg",   "random-forest"],
  ["random-forest",  "scikit-learn"],
  ["scikit-learn",   "model-eval"],
  ["data-prep",      "feature-eng"],
  ["feature-eng",    "train-test"],
  ["train-test",     "cross-val"],
  ["cross-val",      "model-eval"],

  // ── Deep Learning pipeline ───────────────────────────────────
  ["deep-learning",  "neural-networks"],
  ["neural-networks","ann"],
  ["ann",            "cnn"],
  ["ann",            "rnn"],

  // ── NLP pipeline ─────────────────────────────────────────────
  ["nlp",            "text-processing"],
  ["text-processing","tokenization"],
  ["tokenization",   "embeddings"],
  ["embeddings",     "semantic-search"],
  ["nlp",            "transformers"],
  ["transformers",   "attention"],

  // ── Data Processing pipeline ─────────────────────────────────
  ["python",         "numpy"],
  ["python",         "pandas"],
  ["numpy",          "pandas"],
  ["pandas",         "matplotlib"],
  ["matplotlib",     "seaborn"],
  ["pandas",         "eda"],
  ["eda",            "data-viz"],

  // ── Generative AI pipeline ───────────────────────────────────
  ["gen-ai",         "llms"],
  ["llms",           "mistral-ai"],
  ["llms",           "prompt-eng"],
  ["prompt-eng",     "rag"],
  ["rag",            "gen-embeddings"],
  ["gen-embeddings", "vector-db"],

  // ── Agentic AI pipeline ──────────────────────────────────────
  ["agentic-ai",     "ai-agents"],
  ["ai-agents",      "tool-calling"],
  ["tool-calling",   "langchain"],
  ["langchain",      "langgraph"],
  ["agentic-ai",     "memory"],
  ["memory",         "reasoning"],
  ["reasoning",      "multi-step"],

  // ── Databases ────────────────────────────────────────────────
  ["sql",            "postgresql"],
  ["sql",            "mongodb"],
  ["postgresql",     "vector-db-db"],

  // ── Web / AI Backend ─────────────────────────────────────────
  ["django",         "fastapi"],
];

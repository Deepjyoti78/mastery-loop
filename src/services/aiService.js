/**
 * AI Service Client - Direct Integration
 * Replaces n8n with Direct OpenAI/Gemini or High-Quality Local Fallback.
 */

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * Generates learning content using Direct AI (or highly realistic local generation).
 * @param {string} topic - The topic to explain.
 * @param {string} difficulty - Difficulty level.
 */
export const generateLearningCard = async (topic, difficulty = "Medium") => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // 1. If API Key exists, use Real AI
  if (apiKey) {
    return await fetchOpenAI(topic, apiKey);
  }

  // 2. Otherwise, use Sophisticated Local Generator (Instant, Reliable)
  console.log("[AI Service] No API Key found. Using Local Generator.");
  return generateLocalContent(topic);
};

// --- REAL AI IMPLEMENTATION ---
const fetchOpenAI = async (topic, apiKey) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: `You are an expert tutor. Output strictly valid JSON.
                    Schema: {
                        "core_concept": { "title": "string", "description": "string" },
                        "visual_hint": "string",
                        "analogy": "string",
                        "mechanisms": [ { "title": "string", "description": "string" } ],
                        "quiz": { "question": "string", "options": ["string"], "correct_index": number }
                    }`
        }, {
          role: "user",
          content: `Explain: ${topic}`
        }]
      })
    });

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    return transformAIResponse(content);

  } catch (e) {
    console.error("OpenAI Error:", e);
    return generateLocalContent(topic); // Fallback to local
  }
};

// --- LOCAL GENERATOR (MOCK AI) ---
const generateLocalContent = async (topic) => {
  // Simulate thinking delay for realism
  await new Promise(r => setTimeout(r, 1500));

  return {
    definition: `${topic} is a fundamental concept in this domain. It involves the systematic application of rules to achieve a specific outcome, often serving as a building block for more complex systems.`,
    visualPrompt: `Imagine a complex network where ${topic} acts as the central hub, connecting various nodes and ensuring smooth data flow like a traffic controller.`,
    examples: [
      {
        title: "Real World Analogy",
        explanation: `Think of ${topic} like a library indexing system. Just as an index helps you find books efficiently without searching every shelf, ${topic} organizes information for rapid retrieval.`
      }
    ],
    subConcepts: [
      { title: "Core Mechanism", definition: "The underlying process that drives the behavior." },
      { title: "Efficiency", definition: "Optimizes performance by reducing redundant operations." },
      { title: "Scalability", definition: "Allows the system to handle output growth gracefully." }
    ],
    quiz: [{
      question: `What is the primary function of ${topic}?`,
      options: [
        "To increase system complexity unnecessarily",
        "To optimize process efficiency and structure", // Correct
        "To delete data randomly",
        "To slow down network traffic"
      ],
      answer: 1,
      explanation: `${topic} is designed effectively to improve structure and efficiency.`
    }],
    meta: {},
    checkpoint: null
  };
};

// --- SHARED ADAPTER ---
const transformAIResponse = (data) => ({
  definition: data.core_concept?.description || `${data.core_concept?.title}: Definition`,
  visualPrompt: data.visual_hint || "Visual loading...",
  examples: [{ title: "Analogy", explanation: data.analogy || "Analogy..." }],
  subConcepts: (data.mechanisms || []).map(m => ({
    title: m.title || "Key Point",
    definition: m.description || ""
  })),
  quiz: data.quiz ? [{
    question: data.quiz.question,
    options: data.quiz.options,
    answer: data.quiz.correct_index,
    explanation: "Analyze the concept."
  }] : []
});

export const generateExplanation = async () => null;
export const generateQuiz = async () => null;

/**
 * Generates a comprehensive Career Profile analysis based on Resume Text.
 * @param {string} resumeText - The raw text content of the resume.
 * @param {string} targetRole - The desired role.
 */
export const generateCareerProfile = async (resumeText, targetRole) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "system",
            content: `You are a strict Career Architect. Analyze the resume text against the target role.
                        Output strictly valid JSON with this schema:
                        {
                            "readinessScore": number (0-100),
                            "gaps": [
                                { "id": number, "skill": "string", "status": "Critical" | "Warning", "reason": "string", "expectation": "string", "missing_evidence": "string" }
                            ],
                            "sprint": [
                                { "title": "string", "type": "Blocker" | "Skill" | "Admin", "time": "string" }
                            ],
                            "resumeIssues": [
                                { "text": "string", "fix": "string" }
                            ]
                        }`
          }, {
            role: "user",
            content: `Target Role: ${targetRole}\nResume: ${resumeText}`
          }]
        })
      });

      const data = await response.json();
      const content = JSON.parse(data.choices[0].message.content);
      return content;

    } catch (e) {
      console.error("OpenAI Error (Career):", e);
      return generateLocalCareerProfile(resumeText, targetRole);
    }
  }

  // Fallback: Smart Local Mock
  console.log("[AI Service] No API Key. Generating Local Career Profile.");
  return generateLocalCareerProfile(resumeText, targetRole);
};

const generateLocalCareerProfile = (resume, role) => {
  // Determine score based on keyword matches
  const keywords = ['react', 'node', 'system design', 'kubernetes', 'aws', 'java', 'python', 'manager'];
  const lowerResume = resume.toLowerCase();
  const matchCount = keywords.filter(k => lowerResume.includes(k)).length;
  const score = Math.min(Math.max(30 + (matchCount * 10), 40), 90);

  return {
    readinessScore: score,
    gaps: [
      {
        id: 1,
        skill: "System Design (HLD)",
        status: "Critical",
        reason: `Essential for ${role}`,
        expectation: "Design scalable systems (10M+ users)",
        missing_evidence: "No architecture projects mentioned"
      },
      {
        id: 2,
        skill: "Cloud Native Ops",
        status: "Warning",
        reason: "Modern Standard",
        expectation: "Experience with K8s/Docker in prod",
        missing_evidence: "Resume mentions AWS but not orchestration"
      }
    ],
    sprint: [
      { title: "Master Distributed Caching", type: "Blocker", time: "2h" },
      { title: "Build Microservices Project", type: "Skill", time: "6h" },
      { title: "Update Resume Summary", type: "Admin", time: "30m" }
    ],
    resumeIssues: [
      { text: "Missing quantifiable impact", fix: "Add numbers (e.g. 'Reduced latency by 20%')" },
      { text: "Generic summary section", fix: "Tailor to 'Senior Backend' keywords" }
    ]
  };
};

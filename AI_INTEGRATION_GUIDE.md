# AI Integration Guide for Adaptive Learning System

## Overview

This guide explains how to integrate AI (like Google Gemini, OpenAI, or Claude) into the adaptive learning system to generate dynamic content instead of using mock data.

## Current Architecture (Mock Data)

Currently, the system uses:
- **conceptSchema.js** - Hardcoded explanations
- **quizData.js** - Hardcoded quiz questions
- **Local evaluation** - Simple scoring logic

## AI Integration Points

### 1. Generate Explanations (Step B - Learning Content)

**Current**: Uses `currentSubConcept.explanation` from schema

**With AI**:
```javascript
// In LearningContentPage.jsx
const [explanation, setExplanation] = useState('');
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    const generateExplanation = async () => {
        setIsLoading(true);
        try {
            const prompt = `Explain the concept "${currentSubConcept.title}" in the context of ${operatingSystemsSchema.subject} - ${operatingSystemsSchema.concept}. 
            
Difficulty level: ${currentSubConcept.difficulty}
Prerequisites: ${currentSubConcept.prerequisites.join(', ')}

Provide a clear, detailed explanation suitable for students learning this topic.`;

            const response = await fetch('YOUR_AI_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${YOUR_API_KEY}`
                },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 500
                })
            });

            const data = await response.json();
            setExplanation(data.text);
        } catch (error) {
            console.error('Error generating explanation:', error);
            // Fallback to schema explanation
            setExplanation(currentSubConcept.explanation);
        }
        setIsLoading(false);
    };

    generateExplanation();
}, [currentSubConceptIndex]);
```

### 2. Generate Quiz Questions (Step C - Quiz)

**Current**: Uses `getQuizForSubConcept()`

**With AI**:
```javascript
const generateQuiz = async (subConceptTitle) => {
    const prompt = `Generate a quiz for the concept "${subConceptTitle}".

Create:
1. Three multiple choice questions (MCQs) with 4 options each
2. One conceptual short-answer question

Format as JSON:
{
  "mcqs": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0
    }
  ],
  "conceptual": {
    "question": "...",
    "sampleAnswer": "..."
  }
}`;

    const response = await fetch('YOUR_AI_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${YOUR_API_KEY}`
        },
        body: JSON.stringify({
            prompt: prompt,
            response_format: { type: "json_object" }
        })
    });

    const data = await response.json();
    return JSON.parse(data.text);
};
```

### 3. Evaluate Conceptual Answers (Step D - Evaluation)

**Current**: Simple length check (`conceptualAnswer.trim().length > 50`)

**With AI**:
```javascript
const evaluateConceptualAnswer = async (question, studentAnswer, sampleAnswer) => {
    const prompt = `Evaluate this student's answer to a conceptual question.

Question: ${question}
Student Answer: ${studentAnswer}
Sample Answer: ${sampleAnswer}

Rate the answer on a scale of 0-1 based on:
- Correctness of concepts
- Completeness
- Clarity

Return only a number between 0 and 1.`;

    const response = await fetch('YOUR_AI_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${YOUR_API_KEY}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 10
        })
    });

    const data = await response.json();
    return parseFloat(data.text);
};

// In evaluateQuiz function:
const conceptualScore = await evaluateConceptualAnswer(
    currentQuiz.conceptual.question,
    conceptualAnswer,
    currentQuiz.conceptual.sampleAnswer
);
```

### 4. Generate Simplified Explanations (Step E - Re-teach)

**Current**: Uses `currentSubConcept.simplifiedExplanation`

**With AI**:
```javascript
const generateSimplifiedExplanation = async (concept, originalExplanation, studentScore) => {
    const prompt = `A student scored ${studentScore}% on a quiz about "${concept}".

Original explanation:
${originalExplanation}

Generate a SIMPLIFIED explanation that:
- Uses simpler language
- Includes analogies or real-world examples
- Focuses on the core idea
- Is easier to understand

Keep it concise (2-3 paragraphs).`;

    const response = await fetch('YOUR_AI_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${YOUR_API_KEY}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 400
        })
    });

    const data = await response.json();
    return data.text;
};
```

## Recommended AI Services

### Option 1: Google Gemini (Recommended)
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generateContent = async (prompt) => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};
```

**Setup**:
```bash
npm install @google/generative-ai
```

**Get API Key**: https://makersuite.google.com/app/apikey

### Option 2: OpenAI
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Only for development
});

const generateContent = async (prompt) => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4",
    });
    return completion.choices[0].message.content;
};
```

**Setup**:
```bash
npm install openai
```

### Option 3: Anthropic Claude
```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
});

const generateContent = async (prompt) => {
    const message = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
    });
    return message.content[0].text;
};
```

## Implementation Steps

### Step 1: Choose AI Provider
Pick one of the above (Google Gemini is recommended for education use cases)

### Step 2: Install Dependencies
```bash
npm install @google/generative-ai
```

### Step 3: Add Environment Variables
Create `.env` file:
```
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

### Step 4: Create AI Service
Create `src/services/aiService.js`:

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateExplanation = async (concept, subject, difficulty) => {
    const prompt = `Explain "${concept}" in the context of ${subject}.
Difficulty: ${difficulty}
Provide a clear, educational explanation (300-400 words).`;

    const result = await model.generateContent(prompt);
    return result.response.text();
};

export const generateQuiz = async (concept) => {
    const prompt = `Generate a quiz for "${concept}" in JSON format:
{
  "mcqs": [
    {"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0}
  ],
  "conceptual": {"question": "...", "sampleAnswer": "..."}
}
Create 3 MCQs and 1 conceptual question.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text);
};

export const evaluateAnswer = async (question, answer, sampleAnswer) => {
    const prompt = `Evaluate this answer (0-1 scale):
Question: ${question}
Student: ${answer}
Sample: ${sampleAnswer}
Return only a number.`;

    const result = await model.generateContent(prompt);
    return parseFloat(result.response.text());
};

export const simplifyExplanation = async (concept, originalExplanation) => {
    const prompt = `Simplify this explanation of "${concept}":
${originalExplanation}

Make it easier to understand with analogies. Keep it 2-3 paragraphs.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
};
```

### Step 5: Update LearningContentPage.jsx

Replace mock data calls with AI service calls:

```javascript
import { generateExplanation, generateQuiz, evaluateAnswer, simplifyExplanation } from '../services/aiService';

// In component:
const [explanation, setExplanation] = useState('');
const [quiz, setQuiz] = useState(null);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    const loadContent = async () => {
        setIsLoading(true);
        try {
            const exp = await generateExplanation(
                currentSubConcept.title,
                operatingSystemsSchema.subject,
                currentSubConcept.difficulty
            );
            setExplanation(exp);

            const q = await generateQuiz(currentSubConcept.title);
            setQuiz(q);
        } catch (error) {
            console.error('AI Error:', error);
            // Fallback to mock data
            setExplanation(currentSubConcept.explanation);
            setQuiz(getQuizForSubConcept(currentSubConcept.id));
        }
        setIsLoading(false);
    };

    loadContent();
}, [currentSubConceptIndex]);
```

## Cost Considerations

- **Google Gemini**: Free tier available (60 requests/minute)
- **OpenAI GPT-4**: ~$0.03 per 1K tokens
- **Claude**: ~$0.015 per 1K tokens

For a learning app, Gemini's free tier is usually sufficient for development and small-scale use.

## Best Practices

1. **Caching**: Cache AI responses to avoid regenerating the same content
2. **Fallbacks**: Always have mock data as fallback if AI fails
3. **Rate Limiting**: Implement rate limiting to avoid API quota issues
4. **Loading States**: Show loading indicators while AI generates content
5. **Error Handling**: Gracefully handle AI errors and timeouts

## Security Notes

⚠️ **NEVER** expose API keys in frontend code in production!

For production:
- Use a backend API to proxy AI requests
- Store API keys in environment variables on the server
- Implement authentication and rate limiting

Example backend (Node.js/Express):
```javascript
// server.js
app.post('/api/generate-explanation', async (req, res) => {
    const { concept, subject, difficulty } = req.body;
    const explanation = await generateExplanation(concept, subject, difficulty);
    res.json({ explanation });
});
```

Then call from frontend:
```javascript
const response = await fetch('/api/generate-explanation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ concept, subject, difficulty })
});
```

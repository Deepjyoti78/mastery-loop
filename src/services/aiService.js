import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyDVhDTLvCgmFZdUjPqLJcZrRGmNOPQRSTU"; // Fallback for demo
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Generate explanation for a concept
 */
export const generateExplanation = async (conceptTitle, subject, difficulty, prerequisites = []) => {
    try {
        const prompt = `You are an expert educator teaching ${subject}.

Explain the concept: "${conceptTitle}"

Context:
- Difficulty Level: ${difficulty}
- Prerequisites: ${prerequisites.length > 0 ? prerequisites.join(', ') : 'None'}

Requirements:
1. Write a clear, educational explanation (200-300 words)
2. Use simple language appropriate for students
3. Focus on understanding, not memorization
4. Include why this concept matters

Provide ONLY the explanation text, no additional formatting.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating explanation:', error);
        throw error;
    }
};

/**
 * Generate a simplified explanation for re-teaching
 */
export const generateSimplifiedExplanation = async (conceptTitle, originalExplanation) => {
    try {
        const prompt = `You are helping a student who struggled with this concept.

Original Concept: "${conceptTitle}"

Original Explanation:
${originalExplanation}

Task: Create a SIMPLIFIED explanation that:
1. Uses simpler language and shorter sentences
2. Includes a real-world analogy or example
3. Focuses on the core idea only
4. Is easier to understand (150-200 words)

Provide ONLY the simplified explanation, no additional formatting.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating simplified explanation:', error);
        throw error;
    }
};

/**
 * Generate quiz questions for a concept
 */
export const generateQuiz = async (conceptTitle, explanation) => {
    try {
        const prompt = `Create a quiz for the concept: "${conceptTitle}"

Based on this explanation:
${explanation}

Generate a quiz in this EXACT JSON format:
{
  "mcqs": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0
    }
  ],
  "conceptual": {
    "question": "Conceptual question text here",
    "sampleAnswer": "Sample answer for evaluation"
  }
}

Requirements:
- Create exactly 3 multiple choice questions (MCQs)
- Each MCQ should have 4 options
- correctAnswer is the index (0-3) of the correct option
- Create 1 conceptual short-answer question
- Questions should test understanding, not memorization

Return ONLY valid JSON, no markdown formatting or code blocks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        // Parse JSON
        const quiz = JSON.parse(text);

        // Validate structure
        if (!quiz.mcqs || !Array.isArray(quiz.mcqs) || quiz.mcqs.length !== 3) {
            throw new Error('Invalid quiz structure: must have exactly 3 MCQs');
        }
        if (!quiz.conceptual || !quiz.conceptual.question) {
            throw new Error('Invalid quiz structure: missing conceptual question');
        }

        return quiz;
    } catch (error) {
        console.error('Error generating quiz:', error);
        throw error;
    }
};

/**
 * Evaluate a conceptual answer
 */
export const evaluateConceptualAnswer = async (question, studentAnswer, sampleAnswer) => {
    try {
        const prompt = `Evaluate this student's answer to a conceptual question.

Question: ${question}

Student's Answer:
${studentAnswer}

Sample Answer (for reference):
${sampleAnswer}

Task: Rate the student's answer on a scale of 0.0 to 1.0 based on:
- Correctness of concepts (50%)
- Completeness of explanation (30%)
- Clarity of expression (20%)

Return ONLY a single decimal number between 0.0 and 1.0, nothing else.
Examples: 0.7, 0.85, 0.6`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        // Extract number from response
        const score = parseFloat(text);

        // Validate score
        if (isNaN(score) || score < 0 || score > 1) {
            console.warn('Invalid AI score, using fallback');
            // Fallback: simple length-based scoring
            return studentAnswer.trim().length > 50 ? 0.7 : 0.3;
        }

        return score;
    } catch (error) {
        console.error('Error evaluating answer:', error);
        // Fallback scoring
        return studentAnswer.trim().length > 50 ? 0.7 : 0.3;
    }
};

/**
 * Generate a real-world analogy for a concept
 */
export const generateAnalogy = async (conceptTitle, explanation) => {
    try {
        const prompt = `Create a simple, relatable analogy for this concept.

Concept: "${conceptTitle}"

Explanation:
${explanation}

Task: Create a real-world analogy that:
1. Uses everyday situations (like grocery stores, traffic, cooking, etc.)
2. Is easy to understand
3. Clearly maps to the technical concept
4. Is 2-3 sentences maximum

Provide ONLY the analogy text, no additional formatting.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating analogy:', error);
        throw error;
    }
};

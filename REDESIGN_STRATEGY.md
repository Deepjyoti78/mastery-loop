# Academic Learning Experience - Redesign Strategy

## 1. Audit & Analysis
### Current State
- **FRAGMENTED EXPERIENCE**: Learning is split between `AcademicExcellence` (Dashboard), `AcademicFlow` (Graph), and `LearningContentPage` (Lesson).
- **REDUNDANT DATA**:
  - Subject/Concept data exists in: `AcademicExcellence.jsx` (Concepts array), `conceptSchema.js` (OS Schema), `unifiedSchema.js` (Graph Nodes).
  - Quiz data exists in: `quizData.js` and `aiService.js`.
- **DISCONNECTED FLOW**: Clicking a node in the graph currently feels isolated or redirects to a separate page, breaking the "Flow".
- **VISUAL NOISE**: Previous graph implementation was too complex for a linear learning path.

### Critical Decisions
1.  **DELETE** `LearningContentPage.jsx`: Users should never leave the context of the roadmap.
2.  **REFACTOR** `AcademicFlow.jsx`: Transform from a "Node Graph" to a "Unified Concept Board".
3.  **MERGE** Data: Create a single `src/data/curriculum.js` that acts as the Source of Truth for the centralized board.

---

## 2. New Information Architecture

### Entry Point: `AcademicExcellence.jsx` (Dashboard)
- **Role**: High-level Subject Selector.
- **Action**: User selects "Operating Systems".
- **Routing**: Navigates to `/academic/board/:subjectId`.

### Main Interface: `AcademicBoard.jsx` (Replaces `AcademicFlow`)
- **Role**: The Single Source of Learning.
- **Layout**: 3-Column "Study Sanctuary".
    - **Left (Navigator)**: Quick jump to Modules/Progress (Fixed).
    - **Center (The Path)**: Vertical stack of **Interactive Topic Cards**.
    - **Right (AI Tutor)**: Context-aware helper (Definition lookup, Quick notes).
- **Interaction Model**:
    - **Click Card** -> Expands INLINE (Accordion style).
    - **Expanded Card** contains:
        - Educational Content (AI Generated).
        - Visual Diagram (AI Prompt).
        - Inline Micro-Quiz.

---

## 3. The Card-Based System (Component: `TopicCard`)

### Visual Rules
- **Bg**: White (`bg-white`) on Off-White Canvas (`bg-[#FAF9F4]`).
- **Typography**: Slate-900 (Headings), Slate-600 (Body).
- **States**:
    1.  **Locked**: Greyscale, opacity 0.6. Icon: Lock.
    2.  **Ready**: White background, slight shadow. Icon: Play circle.
    3.  **Expanded (Learning)**: Large card, content visible. Border: Indigo-200.
    4.  **Completed**: Emerald-50 background. Icon: Check Circle.

### Content Schema (JSON)
The `aiService` will be updated to fetch this EXACT structure per card:

```json
{
  "concept": "CPU Scheduling",
  "difficulty": "Medium",
  "estimatedTime": "15 mins",
  "definition": "A process allowing one process to use the CPU while another is waiting.",
  "visualPrompt": "A diagram showing a traffic cop directing cars (processes) into a tunnel (CPU).",
  "examples": [
    { "title": "The Restaurant", "explanation": "A waiter (CPU) serving multiple tables..." }
  ],
  "subConcepts": [
    { "title": "Turnaround Time", "definition": "Total time taken...", "example": "Time from ordering to eating." }
  ],
  "quiz": [
    { "question": "...", "options": ["..."], "answer": 0, "explanation": "..." }
  ]
}
```

---

## 4. User Journey (Click-by-Click)

1.  **Dashboard**: User clicks "Operating Systems".
2.  **Board Load**: `AcademicBoard` loads. Shows vertical list of modules.
    - Module 1: Basics (Completed).
    - Module 2: Scheduling (Active).
    - Module 3: Memory (Locked).
3.  **Interaction**:
    - User clicks **"CPU Scheduling"** card.
    - **Animation**: Card expands smoothly (Height transition).
    - **Content Load**: Skeletal loader -> AI Content fades in.
    - **Learning**: User reads definition, generic example.
    - **Drill**: User clicks "Take Micro-Quiz" button *inside* the card.
    - **Quiz Mode**: Card content flips/slides to show 3 questions.
    - **Completion**: User scores 3/3. Card flashes Green. Status updates to "Mastered".
    - **Progression**: Next card "Round Robin" unlocks automatically.

---

## 5. Refactor Plan (Execution Steps)

1.  **Clean Up**:
    - Delete `LearningContentPage.jsx` and its route.
    - Delete `conceptSchema.js` (Merge into unified).
    - Delete `unifiedSchema.js` (Rename to `curriculum.js` and structure for Boards).

2.  **Service Upgrade**:
    - Update `aiService.js` to add `generateTopicCard(topic)`.

3.  **Component Build**:
    - Create `TopicCard.jsx` (Handles expanding, easy/hard modes, quiz state).
    - Create `AcademicBoard.jsx` (Layout engine, scroll handling).

4.  **Integration**:
    - Connect `AcademicExcellence` to `AcademicBoard`.

5.  **Visual Polish**:
    - Implement `AnimateHeight` for smooth card expansion.
    - styling for the "Calm" aesthetic.

// Concept Schema for Academic Excellence - Operating Systems
// This defines the syllabus structure and prevents AI hallucination

export const operatingSystemsSchema = {
    subject: "Operating Systems",
    concept: "CPU Scheduling",
    subConcepts: [
        {
            id: "why-scheduling",
            title: "Why scheduling is needed",
            difficulty: "Easy",
            prerequisites: [],
            explanation: "CPU scheduling is fundamental to operating system design. In a multiprogramming environment, multiple processes compete for CPU time. Without scheduling, the CPU would be inefficiently utilized, leading to poor system performance. Scheduling algorithms determine which process runs at any given time, ensuring fair resource allocation and maximizing throughput.",
            simplifiedExplanation: "Think of CPU scheduling like a teacher managing students who all want help at once. The teacher needs a system to decide who to help first, how long to spend with each student, and when to switch to the next one. Similarly, the CPU needs a way to decide which program to run and for how long."
        },
        {
            id: "scheduling-criteria",
            title: "Scheduling Criteria",
            difficulty: "Easy",
            prerequisites: ["why-scheduling"],
            explanation: "CPU scheduling algorithms are evaluated based on several criteria: CPU Utilization (keeping CPU busy), Throughput (number of processes completed per unit time), Turnaround Time (total time from submission to completion), Waiting Time (time spent in ready queue), and Response Time (time from submission to first response). Different algorithms optimize for different criteria.",
            simplifiedExplanation: "When choosing how to schedule tasks, we measure success in different ways: How busy is the CPU? How many tasks finish quickly? How long do tasks wait? Different scheduling methods are better at different goals, just like different study strategies work better for different types of exams."
        },
        {
            id: "fcfs",
            title: "FCFS (First Come First Serve)",
            difficulty: "Easy",
            prerequisites: ["scheduling-criteria"],
            explanation: "FCFS is the simplest scheduling algorithm. Processes are executed in the order they arrive in the ready queue. It's non-preemptive, meaning once a process starts executing, it runs to completion. While simple to implement, FCFS suffers from the convoy effect where short processes wait for long processes to complete, leading to poor average waiting time.",
            simplifiedExplanation: "FCFS is like a single line at a grocery store - first person in line gets served first, and everyone waits their turn. If someone with a full cart is ahead of you with just one item, you still have to wait. Simple and fair, but not always efficient."
        },
        {
            id: "sjf",
            title: "SJF (Shortest Job First)",
            difficulty: "Medium",
            prerequisites: ["fcfs"],
            explanation: "SJF selects the process with the smallest execution time. It can be preemptive (SRTF - Shortest Remaining Time First) or non-preemptive. SJF minimizes average waiting time, making it optimal in this regard. However, it requires knowing execution times in advance (often impossible) and can cause starvation of longer processes.",
            simplifiedExplanation: "SJF is like letting people with fewer items go first at the grocery store. Quick tasks finish fast, and the average wait time is lower. But if you have a full cart, you might wait forever as people with single items keep cutting in front of you."
        },
        {
            id: "round-robin",
            title: "Round Robin",
            difficulty: "Medium",
            prerequisites: ["fcfs"],
            explanation: "Round Robin is a preemptive algorithm designed for time-sharing systems. Each process gets a small unit of CPU time (time quantum), typically 10-100ms. After the quantum expires, the process is preempted and added to the end of the ready queue. Performance depends heavily on the time quantum size - too large and it becomes FCFS, too small and context switching overhead dominates.",
            simplifiedExplanation: "Round Robin is like a game where everyone gets a turn for a fixed time, then passes to the next person. If you don't finish in your turn, you go to the back of the line and wait for your next turn. Fair for everyone, but the turn length matters - too short and you spend all your time passing the game around."
        },
        {
            id: "priority-scheduling",
            title: "Priority Scheduling",
            difficulty: "Medium",
            prerequisites: ["sjf"],
            explanation: "Each process is assigned a priority, and the CPU is allocated to the highest priority process. Can be preemptive or non-preemptive. Priorities can be defined internally (time limits, memory requirements) or externally (importance, funding). The main problem is starvation - low priority processes may never execute. This is solved using aging, where priority increases with waiting time.",
            simplifiedExplanation: "Priority scheduling is like an emergency room - critical patients get treated first, regardless of arrival time. But if critical cases keep coming, less urgent patients might wait too long. To fix this, waiting patients gradually become higher priority (aging)."
        }
    ]
};

export const getSubConcept = (id) => {
    return operatingSystemsSchema.subConcepts.find(sc => sc.id === id);
};

export const getNextSubConcept = (currentId) => {
    const currentIndex = operatingSystemsSchema.subConcepts.findIndex(sc => sc.id === currentId);
    if (currentIndex === -1 || currentIndex === operatingSystemsSchema.subConcepts.length - 1) {
        return null;
    }
    return operatingSystemsSchema.subConcepts[currentIndex + 1];
};

export const isPrerequisiteMet = (subConceptId, completedIds) => {
    const subConcept = getSubConcept(subConceptId);
    if (!subConcept) return false;
    return subConcept.prerequisites.every(prereq => completedIds.includes(prereq));
};

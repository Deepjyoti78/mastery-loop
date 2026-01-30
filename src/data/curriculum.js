
// UNIFIED CURRICULUM SCHEMA
// The single source of truth for all academic paths.
// Structure: Subject -> Modules -> Concepts (Learning Cards)

export const curriculum = {
    "operating-systems": {
        id: "operating-systems",
        title: "Operating Systems",
        description: "Master the fundamental software that manages hardware and software resources.",
        totalConcepts: 12,
        modules: [
            {
                id: "module-1",
                title: "Process Management",
                description: "The core of OS execution and scheduling.",
                status: "unlocked",
                concepts: [
                    {
                        id: "concept-1-1",
                        title: "Intro only: Kernel vs User Mode",
                        difficulty: "Easy",
                        estimatedTime: "10 mins",
                        status: "mastered",
                        cardContent: {
                            definition: "The separation of privilege levels for system stability.",
                            visualPrompt: "A diagram showing a secure kitchen (Kernel) vs a dining area (User).",
                            examples: [
                                { title: "The Restaurant", explanation: "User mode is the dining hall. Kernel mode is the kitchen. You can't just walk into the kitchen to cook; you must ask a waiter (System Call)." }
                            ],
                            subConcepts: [
                                { title: "System Call", definition: "Requesting a service from the kernel." },
                                { title: "Trap", definition: "A software interrupt." }
                            ],
                            quiz: [
                                {
                                    question: "Which mode has direct hardware access?",
                                    options: ["User Mode", "Kernel Mode", "Guest Mode", "Safe Mode"],
                                    answer: 1,
                                    explanation: "Kernel mode (Ring 0) implies full access to hardware instructions."
                                }
                            ]
                        }
                    },
                    {
                        id: "concept-1-2",
                        title: "CPU Scheduling Basics",
                        difficulty: "Easy",
                        estimatedTime: "15 mins",
                        status: "unlocked",
                        cardContent: {
                            definition: "Deciding which process runs on the CPU when multiple are ready.",
                            visualPrompt: "A traffic controller directing cars (processes) onto a single lane highway (CPU).",
                            examples: [
                                { title: "The Doctor's Waiting Room", explanation: "The receptionist (Scheduler) decides who sees the doctor (CPU) next. Urgent cases? First come first serve? Shortest visit?" }
                            ],
                            subConcepts: [
                                { title: "Dispatcher", definition: "Module that gives control of CPU to select process." },
                                { title: "Throughput", definition: "Number of processes completed per unit time." }
                            ],
                            quiz: [
                                {
                                    question: "What is the main goal of CPU scheduling?",
                                    options: ["Maximize CPU idle time", "Maximize CPU utilization", "Minimize throughput", "Increase waiting time"],
                                    answer: 1,
                                    explanation: "We want the CPU to be busy working as much as possible."
                                },
                                {
                                    question: "Which component gives control of the CPU?",
                                    options: ["Scheduler", "Dispatcher", "Interrupt Handler", "Monitor"],
                                    answer: 1,
                                    explanation: "The scheduler selects, but the dispatcher performs the context switch."
                                },
                                {
                                    question: "Time associated with waiting in the ready queue is?",
                                    options: ["Waiting Time", "Turnaround Time", "Response Time", "Execution Time"],
                                    answer: 0,
                                    explanation: "Waiting time is strictly the time spent in the ready queue."
                                }
                            ]
                        }
                    },
                    {
                        id: "concept-1-3",
                        title: "FCFS Scheduling",
                        difficulty: "Medium",
                        estimatedTime: "20 mins",
                        status: "unlocked",
                        cardContent: {
                            definition: "First-Come, First-Served. The simplest non-preemptive scheduling algorithm.",
                            visualPrompt: "A queue at a grocery store checkout.",
                            examples: [
                                { title: "The Grocery Store Queue", explanation: "If you have 1 item but the person ahead has 100, you wait. This is the 'Convoy Effect'." }
                            ],
                            subConcepts: [
                                { title: "Convoy Effect", definition: "Short process stuck behind long process." },
                                { title: "Non-preemptive", definition: "Process keeps CPU until it finishes or waits." }
                            ],
                            quiz: [
                                {
                                    question: "FCFS suffers from which major issue?",
                                    options: ["Starvation", "Deadlock", "Convoy Effect", "Complexity"],
                                    answer: 2,
                                    explanation: "The Convoy Effect occurs when short processes wait for a long CPU-bound process."
                                },
                                {
                                    question: "Is FCFS preemptive?",
                                    options: ["Yes", "No", "Sometimes", "Only for I/O"],
                                    answer: 1,
                                    explanation: "FCFS is non-preemptive; the process holds the CPU until it yields."
                                },
                                {
                                    question: "FCFS is implemented using which data structure?",
                                    options: ["Stack", "Queue (FIFO)", "Priority Queue", "Tree"],
                                    answer: 1,
                                    explanation: "A standard FIFO Queue manages the ready processes."
                                }
                            ]
                        }
                    },
                    {
                        id: "concept-1-4",
                        title: "Round Robin",
                        difficulty: "Hard",
                        estimatedTime: "25 mins",
                        status: "locked",
                        cardContent: null
                    }
                ]
            },
            {
                id: "module-2",
                title: "Memory Management",
                description: "How RAM is allocated and virtualized.",
                status: "locked",
                concepts: [
                    { id: "concept-2-1", title: "Virtual Memory", difficulty: "Hard", status: "locked" },
                    { id: "concept-2-2", title: "Paging", difficulty: "Medium", status: "locked" }
                ]
            }
        ]
    }
};

export const getSubjectData = (subjectId) => curriculum[subjectId];

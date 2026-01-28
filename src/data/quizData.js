// Mock quiz questions for each sub-concept

export const quizData = {
    "why-scheduling": {
        mcqs: [
            {
                question: "What is the primary purpose of CPU scheduling?",
                options: [
                    "To maximize CPU utilization",
                    "To minimize power consumption",
                    "To increase RAM capacity",
                    "To reduce disk space"
                ],
                correctAnswer: 0
            },
            {
                question: "In a multiprogramming environment, what happens without CPU scheduling?",
                options: [
                    "Programs run faster",
                    "CPU remains idle while processes wait",
                    "Memory usage decreases",
                    "All programs run simultaneously"
                ],
                correctAnswer: 1
            },
            {
                question: "Which of the following is NOT a benefit of CPU scheduling?",
                options: [
                    "Better CPU utilization",
                    "Fair resource allocation",
                    "Increased hard disk speed",
                    "Improved system throughput"
                ],
                correctAnswer: 2
            }
        ],
        conceptual: {
            question: "Explain in 2-3 sentences why CPU scheduling is necessary in modern operating systems.",
            sampleAnswer: "CPU scheduling is necessary because multiple processes compete for limited CPU time in multiprogramming systems. Without scheduling, the CPU would be inefficiently utilized and processes would not get fair access to resources. Scheduling algorithms ensure optimal CPU utilization and fair distribution of processing time among all processes."
        }
    },
    "scheduling-criteria": {
        mcqs: [
            {
                question: "Which metric measures the total time from process submission to completion?",
                options: [
                    "Waiting Time",
                    "Response Time",
                    "Turnaround Time",
                    "Throughput"
                ],
                correctAnswer: 2
            },
            {
                question: "What does CPU utilization measure?",
                options: [
                    "Number of processes completed",
                    "Percentage of time CPU is busy",
                    "Time spent in ready queue",
                    "Time to first response"
                ],
                correctAnswer: 1
            },
            {
                question: "Which scheduling criterion focuses on minimizing the time a process spends in the ready queue?",
                options: [
                    "Throughput",
                    "CPU Utilization",
                    "Waiting Time",
                    "Response Time"
                ],
                correctAnswer: 2
            }
        ],
        conceptual: {
            question: "Compare and contrast Turnaround Time and Waiting Time. Why are both metrics important?",
            sampleAnswer: "Turnaround Time is the total time from submission to completion, including execution time, while Waiting Time is only the time spent waiting in the ready queue. Both are important because Turnaround Time shows overall efficiency from the user's perspective, while Waiting Time specifically measures scheduling effectiveness and fairness."
        }
    },
    "fcfs": {
        mcqs: [
            {
                question: "FCFS scheduling is:",
                options: [
                    "Preemptive",
                    "Non-preemptive",
                    "Both preemptive and non-preemptive",
                    "Neither preemptive nor non-preemptive"
                ],
                correctAnswer: 1
            },
            {
                question: "What is the convoy effect in FCFS?",
                options: [
                    "Short processes wait for long processes",
                    "Long processes wait for short processes",
                    "All processes run simultaneously",
                    "Processes are executed in random order"
                ],
                correctAnswer: 0
            },
            {
                question: "Which statement about FCFS is TRUE?",
                options: [
                    "It has the best average waiting time",
                    "It is complex to implement",
                    "It is simple but can have poor performance",
                    "It prevents starvation of long processes"
                ],
                correctAnswer: 2
            }
        ],
        conceptual: {
            question: "Given three processes with burst times P1=24ms, P2=3ms, P3=3ms arriving in that order, calculate the average waiting time using FCFS. Show your work.",
            sampleAnswer: "P1 waits 0ms, P2 waits 24ms, P3 waits 27ms. Average waiting time = (0 + 24 + 27) / 3 = 17ms. This demonstrates the convoy effect where short processes (P2, P3) wait for the long process (P1) to complete."
        }
    },
    "sjf": {
        mcqs: [
            {
                question: "SJF scheduling minimizes:",
                options: [
                    "CPU utilization",
                    "Throughput",
                    "Average waiting time",
                    "Context switches"
                ],
                correctAnswer: 2
            },
            {
                question: "What is the main disadvantage of SJF?",
                options: [
                    "High CPU utilization",
                    "Starvation of longer processes",
                    "Too many context switches",
                    "Poor response time"
                ],
                correctAnswer: 1
            },
            {
                question: "SRTF (Shortest Remaining Time First) is:",
                options: [
                    "Non-preemptive SJF",
                    "Preemptive SJF",
                    "A variant of FCFS",
                    "Same as Round Robin"
                ],
                correctAnswer: 1
            }
        ],
        conceptual: {
            question: "Why is SJF considered optimal for minimizing average waiting time, yet rarely used in practice?",
            sampleAnswer: "SJF is optimal because it always executes the shortest job first, mathematically minimizing average waiting time. However, it's rarely used because it requires knowing the exact execution time of processes in advance, which is usually impossible to predict accurately. Additionally, it can cause indefinite starvation of longer processes."
        }
    },
    "round-robin": {
        mcqs: [
            {
                question: "Round Robin scheduling is designed for:",
                options: [
                    "Batch systems",
                    "Time-sharing systems",
                    "Real-time systems",
                    "Embedded systems"
                ],
                correctAnswer: 1
            },
            {
                question: "If the time quantum in Round Robin is very large, it behaves like:",
                options: [
                    "SJF",
                    "Priority Scheduling",
                    "FCFS",
                    "Multilevel Queue"
                ],
                correctAnswer: 2
            },
            {
                question: "What happens if the time quantum is too small in Round Robin?",
                options: [
                    "Better response time",
                    "Excessive context switching overhead",
                    "Improved throughput",
                    "Reduced waiting time"
                ],
                correctAnswer: 1
            }
        ],
        conceptual: {
            question: "Explain how the choice of time quantum affects Round Robin performance. What factors should be considered when selecting it?",
            sampleAnswer: "The time quantum is critical: too large and Round Robin degrades to FCFS with poor response time; too small and context switching overhead dominates, reducing throughput. The quantum should be larger than context switch time but small enough to provide good response time. Typical values are 10-100ms, considering the average process burst time and system responsiveness requirements."
        }
    },
    "priority-scheduling": {
        mcqs: [
            {
                question: "In priority scheduling, the main problem is:",
                options: [
                    "High CPU utilization",
                    "Starvation of low-priority processes",
                    "Excessive context switches",
                    "Poor throughput"
                ],
                correctAnswer: 1
            },
            {
                question: "What is 'aging' in priority scheduling?",
                options: [
                    "Decreasing priority over time",
                    "Increasing priority as waiting time increases",
                    "Removing old processes",
                    "Executing oldest process first"
                ],
                correctAnswer: 1
            },
            {
                question: "Priority can be defined based on:",
                options: [
                    "Internal factors only (memory, time limits)",
                    "External factors only (importance, funding)",
                    "Both internal and external factors",
                    "Neither internal nor external factors"
                ],
                correctAnswer: 2
            }
        ],
        conceptual: {
            question: "Compare priority scheduling with and without aging. How does aging solve the starvation problem?",
            sampleAnswer: "Without aging, low-priority processes can starve indefinitely if high-priority processes keep arriving. Aging solves this by gradually increasing a process's priority based on its waiting time. Eventually, even a low-priority process will have its priority elevated enough to be scheduled, ensuring all processes eventually execute and preventing indefinite starvation."
        }
    }
};

export const getQuizForSubConcept = (subConceptId) => {
    return quizData[subConceptId] || null;
};

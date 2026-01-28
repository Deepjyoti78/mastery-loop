import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    BookOpen, ArrowRight, CheckCircle, AlertTriangle, XCircle,
    LayoutGrid, Calendar, Users, BarChart2, Settings, LogOut,
    Timer, RefreshCw, Zap, Brain, ChevronRight
} from 'lucide-react';

// --- Shared Components ---

const Sidebar = () => {
    const navigate = useNavigate();
    const NavItem = ({ icon: Icon, label, active, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${active
                ? 'bg-white/10 text-white font-medium shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
            <span className="text-sm tracking-wide">{label}</span>
        </button>
    );

    return (
        <aside className="w-56 bg-[#1F1F1F] rounded-[1.5rem] p-4 flex flex-col hidden md:flex shrink-0 shadow-2xl shadow-black/5 z-20">
            <div className="flex items-center gap-3 mb-8 px-2 pt-1">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1F1F1F] font-bold text-lg shadow-md">M</div>
                <span className="font-bold text-base tracking-tight text-white">MasteryLoop</span>
            </div>
            <div className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
                <section>
                    <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3">General</div>
                    <nav className="space-y-0.5">
                        <NavItem icon={LayoutGrid} label="Dashboard" onClick={() => navigate('/')} />
                        <NavItem icon={BookOpen} label="Academic" active onClick={() => navigate('/academic')} />
                        <NavItem icon={Calendar} label="Schedule" />
                        <NavItem icon={Users} label="Community" />
                        <NavItem icon={BarChart2} label="Analytics" />
                        <NavItem icon={BookOpen} label="Resources" />
                    </nav>
                </section>
                <section>
                    <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3">Tools</div>
                    <nav className="space-y-0.5">
                        <NavItem icon={Settings} label="Search" />
                        <NavItem icon={LogOut} label="Log out" />
                    </nav>
                </section>
            </div>
        </aside>
    );
};

const FlowLayout = ({ children, title, subtitle }) => (
    <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 mx-2 h-full relative">
            {/* Header */}
            <header className="h-16 flex items-center justify-between shrink-0 mb-2 px-1">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md text-[10px] font-bold uppercase tracking-wider border border-indigo-200">
                            Adaptive LAP Flow
                        </span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-[#1F1F1F] tracking-tight">{title}</h1>
                    {subtitle && <p className="text-xs font-medium text-gray-500">{subtitle}</p>}
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide pb-6">
                {children}
            </div>
        </main>
    </div>
);

// --- Pages ---

export const LapPage = () => {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const step = query.get('step') || '1';

    // Mock Next Step Content
    if (step === '2') {
        return (
            <FlowLayout title="LAP 2: Scheduling Criteria" subtitle="Advanced Metrics & Optimization">
                <div className="max-w-4xl w-full mx-auto mt-10 text-center">
                    <div className="mb-6 inline-flex p-4 bg-emerald-100 text-emerald-600 rounded-full mb-6">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#1F1F1F] mb-4">Excellent Work!</h2>
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                        You've mastered Round Robin Scheduling. You are now ready to dive into calculate Turnaround Time and Waiting Time complexities.
                    </p>
                    <button className="px-8 py-3 bg-[#1F1F1F] text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg">
                        Start LAP 2
                    </button>
                </div>
            </FlowLayout>
        );
    }

    return (
        <FlowLayout title="LAP 1: CPU Scheduling" subtitle="Topic: Round Robin Algorithm">
            <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">

                {/* Content Card */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-indigo-600" />
                            Core Concept: Time Quantum
                        </h2>
                        <div className="prose prose-sm text-slate-600 leading-relaxed mb-6">
                            <p className="mb-4">
                                <strong>Round Robin (RR)</strong> is a preemptive scheduling algorithm designed specifically for time-sharing systems.
                                It is similar to FCFS scheduling, but preemption is added to switch between processes.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <li>A small unit of time, called a <strong>time quantum</strong> or <strong>time slice</strong>, is defined.</li>
                                <li>The ready queue is treated as a circular queue.</li>
                                <li>The CPU scheduler goes around the ready queue, allocating the CPU to each process for a time interval of up to 1 time quantum.</li>
                            </ul>
                            <p>
                                If the process has a CPU burst of less than 1 time quantum, it releases the CPU voluntarily.
                                Otherwise, the timer goes off and causes an interrupt to the OS.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-900 text-sm font-medium">
                            <Zap className="w-5 h-5 shrink-0" />
                            Key Insight: Performance depends heavily on the size of the time quantum.
                        </div>
                    </div>
                </div>

                {/* Sidebar / Stats */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Concept Status</div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <span className="font-bold text-[#1F1F1F]">In Progress</span>
                            </div>
                            <span className="text-xs font-bold text-gray-400">Step 1/3</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                            <div className="h-full w-1/3 bg-amber-400" />
                        </div>
                        <button
                            onClick={() => navigate('/academic/test')}
                            className="w-full py-4 bg-[#1F1F1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Take Concept Test <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </FlowLayout>
    );
};

export const TestPage = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});

    // Mock Questions (10 items)
    const questions = [
        { id: 1, q: "RR scheduling is most suitable for:", opts: ["Real-time systems", "Time-sharing systems", "Batch systems"], c: 1 },
        { id: 2, q: "If time quantum is very large, RR becomes:", opts: ["SJF", "FCFS", "Priority"], c: 1 },
        { id: 3, q: "Preemption in RR is controlled by:", opts: ["A Timer", "Process Priority", "I/O Request"], c: 0 },
        { id: 4, q: "Context switch overhead is higher in:", opts: ["FCFS", "SJF", "Round Robin"], c: 2 },
        { id: 5, q: "What happens if time quantum is too small?", opts: ["Starvation", "Low Throughput (High Overhead)", "Deadlock"], c: 1 },
        { id: 6, q: "RR is designed to improve:", opts: ["Response Time", "Turnaround Time", "Throughput"], c: 0 },
        { id: 7, q: "Ready queue in RR is treated as:", opts: ["Stack", "Priority Queue", "Circular Queue"], c: 2 },
        { id: 8, q: "Is starvation possible in standard RR?", opts: ["Yes", "No", "Only for I/O bound"], c: 1 },
        { id: 9, q: "New processes are added to the:", opts: ["Head of queue", "Tail of queue", "Middle of queue"], c: 1 },
        { id: 10, q: "Turnaround time in RR is generally:", opts: ["Better than SJF", "Worse than SJF", "Equal to SJF"], c: 1 },
    ];

    const handleSubmit = () => {
        let score = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.c) score++;
        });
        const percentage = (score / questions.length) * 100;

        if (percentage >= 60) {
            navigate('/academic/lap?step=2');
        } else {
            navigate('/academic/reteach');
        }
    };

    return (
        <FlowLayout title="Concept Check" subtitle="Assess your understanding">
            <div className="max-w-3xl w-full mx-auto mt-4 pb-10">
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                    <div className="space-y-8">
                        {questions.map((q, i) => (
                            <div key={i} className="space-y-3">
                                <h3 className="font-bold text-[#1F1F1F] text-lg">
                                    <span className="text-gray-400 mr-2">{i + 1}.</span>
                                    {q.q}
                                </h3>
                                <div className="grid grid-cols-1 gap-2 pl-6">
                                    {q.opts.map((opt, optIndex) => (
                                        <label key={optIndex} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                                            ${answers[i] === optIndex ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-300'}`}>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                                                ${answers[i] === optIndex ? 'border-indigo-600' : 'border-slate-300'}`}>
                                                {answers[i] === optIndex && <div className="w-2 h-2 bg-indigo-600 rounded-full" />}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">{opt}</span>
                                            <input
                                                type="radio"
                                                name={`q-${i}`}
                                                className="hidden"
                                                checked={answers[i] === optIndex}
                                                onChange={() => setAnswers(prev => ({ ...prev, [i]: optIndex }))}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-3 bg-[#1F1F1F] text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg"
                        >
                            Submit Assessment
                        </button>
                    </div>
                </div>
            </div>
        </FlowLayout>
    );
};

export const ReteachPage = () => {
    const navigate = useNavigate();

    return (
        <FlowLayout title="Re-Teaching: CPU Scheduling" subtitle="Adaptive Remedial Session">
            <div className="max-w-4xl w-full mx-auto mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="col-span-12 lg:col-span-8">
                    <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-6 mb-6 flex items-start gap-4">
                        <div className="p-2 bg-white rounded-xl shadow-sm">
                            <AlertTriangle className="w-6 h-6 text-rose-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-rose-800 text-lg mb-1">Let's try a different approach.</h3>
                            <p className="text-rose-700/80 text-sm leading-relaxed">
                                You missed questions related to <strong>Time Quantum</strong> and <strong>Overhead</strong>.
                                It seems the technical definition didn't stick. Let's look at an analogy.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold mb-6">The "Pizza Slice" Analogy</h2>

                        <div className="prose prose-sm text-slate-600 leading-relaxed space-y-4">
                            <p>
                                Imagine you are sharing a <strong>single pizza (CPU)</strong> with 4 friends (Processes).
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-[#1F1F1F] mb-1">Case 1: Large Slices</h4>
                                    <p className="text-xs">
                                        If everyone gets a huge slice (Large Time Quantum), the last person waits a long time to eat.
                                        This mimics <strong>FCFS (First Come First Serve)</strong>.
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-[#1F1F1F] mb-1">Case 2: Micro Slices</h4>
                                    <p className="text-xs">
                                        If everyone takes tiny bites one by one (Tiny Time Quantum), you spend more time passing the pizza box
                                        than actually eating. This is <strong>Context Switch Overhead</strong>.
                                    </p>
                                </div>
                            </div>
                            <p>
                                <strong>Round Robin</strong> is about finding the perfect slice size where everyone eats reasonably fast without wasting time passing the box.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 sticky top-4">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Action Plan</div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                                <CheckCircle className="w-4 h-4" />
                                Review Analogy
                            </li>
                            <li className="flex items-center gap-2 text-sm font-medium text-[#1F1F1F]">
                                <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center text-[8px]">2</div>
                                Re-attempt Quiz
                            </li>
                        </ul>
                        <button
                            onClick={() => navigate('/academic/test')}
                            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Retry Assessment
                        </button>
                    </div>
                </div>

            </div>
        </FlowLayout>
    );
};

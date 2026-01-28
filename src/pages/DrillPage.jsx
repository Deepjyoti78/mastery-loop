import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Trophy, CheckCircle, AlertTriangle, XCircle,
    Timer, ArrowRight, X, RotateCcw
} from 'lucide-react';

// Mock Data
const QUESTIONS = [
    {
        id: 1,
        question: "Which of the following scheduling algorithms is non-preemptive?",
        options: ["Round Robin", "FCFS", "SRTF", "Multilevel Queue"],
        correct: 1
    },
    {
        id: 2,
        question: "In Round Robin scheduling, the time quantum impacts:",
        options: ["Context switching overhead", "Deadlock frequency", "Memory usage", "I/O bound processes"],
        correct: 0
    },
    {
        id: 3,
        question: "What is the main disadvantage of SJF scheduling?",
        options: ["Low throughput", "High complexity", "Starvation of long processes", "Frequent interrupts"],
        correct: 2
    },
    {
        id: 4,
        question: "Which scheduler selects a process from the ready queue?",
        options: ["Long-term scheduler", "Short-term scheduler", "Medium-term scheduler", "Dispatcher"],
        correct: 1
    },
    {
        id: 5,
        question: "Turnaround time is defined as:",
        options: ["Waiting time + Burst time", "Burst time + I/O time", "Exit time - Arrival time", "Wait time - Arrival time"],
        correct: 2
    }
];

const DrillPage = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (isFinished) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    finishDrill();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isFinished]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleSelect = (index) => {
        setSelectedOption(index);
        setAnswers(prev => ({ ...prev, [currentQuestion]: index }));
    };

    const handleNext = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(answers[currentQuestion + 1] ?? null);
        } else {
            finishDrill();
        }
    };

    const finishDrill = () => {
        setIsFinished(true);
    };

    const calculateScore = () => {
        let score = 0;
        QUESTIONS.forEach((q, i) => {
            if (answers[i] === q.correct) score++;
        });
        return Math.round((score / QUESTIONS.length) * 100);
    };

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

    if (isFinished) {
        const score = calculateScore();
        return (
            <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">
                {/* Reusing Sidebar for consistency */}
                <aside className="w-56 bg-[#1F1F1F] rounded-[1.5rem] p-4 flex flex-col hidden md:flex shrink-0 shadow-2xl shadow-black/5 z-20">
                    <div className="flex items-center gap-3 mb-8 px-2 pt-1">
                        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1F1F1F] font-bold text-lg shadow-md">M</div>
                        <span className="font-bold text-base tracking-tight text-white">MasteryLoop</span>
                    </div>
                    {/* ... Navigation Items reused... */}
                    <div className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
                        <section>
                            <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3">General</div>
                            <nav className="space-y-0.5">
                                <NavItem icon={LayoutGrid} label="Dashboard" onClick={() => navigate('/')} />
                                <NavItem icon={BookOpen} label="Academic" onClick={() => navigate('/academic')} />
                                <NavItem icon={Trophy} label="Competitive" active onClick={() => navigate('/competitive')} />
                            </nav>
                        </section>
                    </div>
                </aside>

                <main className="flex-1 flex flex-col min-w-0 mx-2 h-full items-center justify-center relative">
                    <div className="max-w-md w-full bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 text-center relative overflow-hidden">
                        {/* Decor */}
                        <div className={`absolute top-0 left-0 right-0 h-2 ${score >= 70 ? 'bg-emerald-400' : 'bg-amber-400'}`} />

                        <div className="mb-6">
                            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${score >= 70 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                <Trophy className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-[#1F1F1F] mb-1">Drill Complete!</h2>
                            <p className="text-gray-500 font-medium">CPU Scheduling - Speed Test</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-slate-50 rounded-2xl">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Accuracy</div>
                                <div className="text-2xl font-black text-[#1F1F1F]">{score}%</div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Time</div>
                                <div className="text-2xl font-black text-[#1F1F1F]">{formatTime(600 - timeLeft)}</div>
                            </div>
                        </div>

                        <div className="bg-rose-50 rounded-xl p-4 mb-8 flex items-center gap-3 text-left">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <AlertTriangle className="w-5 h-5 text-rose-500" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wide">Needs Focus</div>
                                <div className="font-bold text-rose-900 text-sm">Starvation & Aging</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button onClick={() => navigate('/competitive')} className="w-full py-4 bg-[#1F1F1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg active:scale-[0.98]">
                                Continue Training
                            </button>
                            <button onClick={() => window.location.reload()} className="w-full py-4 bg-white text-[#1F1F1F] border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                                Retry Drill
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">
            {/* Reusing Sidebar for consistency */}
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
                            <NavItem icon={BookOpen} label="Academic" onClick={() => navigate('/academic')} />
                            <NavItem icon={Trophy} label="Competitive" active onClick={() => navigate('/competitive')} />
                        </nav>
                    </section>
                </div>
            </aside>

            {/* Main Content Area - Drill Mode */}
            <main className="flex-1 flex flex-col min-w-0 mx-2 h-full relative">

                {/* Drill Header */}
                <div className="h-20 flex items-center justify-between shrink-0 mb-2 px-1">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[10px] font-bold uppercase tracking-wider border border-amber-200">
                                Speed Drill
                            </span>
                            <span className="text-xs font-bold text-gray-400">•</span>
                            <span className="text-xs font-bold text-gray-400">CPU Scheduling</span>
                        </div>
                        <h1 className="text-2xl font-extrabold text-[#1F1F1F] tracking-tight">Question {currentQuestion + 1} <span className="text-gray-300">/ {QUESTIONS.length}</span></h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
                            <Timer className="w-4 h-4 text-rose-500 animate-pulse" />
                            <span className="font-mono font-bold text-lg text-[#1F1F1F] w-[50px] text-center">{formatTime(timeLeft)}</span>
                        </div>
                        <button onClick={() => navigate('/competitive')} className="p-2 hover:bg-slate-100 rounded-full text-gray-400 hover:text-rose-500 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
                    <div
                        className="h-full bg-[#1F1F1F] transition-all duration-300 ease-out"
                        style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                    />
                </div>

                {/* Question Area */}
                <div className="flex-1 flex flex-col items-center justify-start pt-10 overflow-y-auto">
                    <div className="w-full max-w-3xl">

                        {/* Question Card */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden mb-8">
                            <h2 className="text-xl md:text-2xl font-bold text-[#1F1F1F] leading-relaxed mb-8">
                                {QUESTIONS[currentQuestion].question}
                            </h2>

                            <div className="space-y-3">
                                {QUESTIONS[currentQuestion].options.map((option, index) => (
                                    <label
                                        key={index}
                                        className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer group
                                            ${selectedOption === index
                                                ? 'border-[#1F1F1F] bg-[#1F1F1F]/5'
                                                : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                        onClick={() => handleSelect(index)}
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                            ${selectedOption === index
                                                ? 'border-[#1F1F1F] bg-[#1F1F1F]'
                                                : 'border-slate-300 group-hover:border-slate-400'
                                            }`}
                                        >
                                            {selectedOption === index && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                        </div>
                                        <span className={`font-bold text-base ${selectedOption === index ? 'text-[#1F1F1F]' : 'text-slate-600'}`}>{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Actions */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleNext}
                                disabled={selectedOption === null}
                                className={`px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all
                                    ${selectedOption !== null
                                        ? 'bg-[#1F1F1F] text-white hover:bg-black active:scale-[0.98]'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                    }`}
                            >
                                {currentQuestion === QUESTIONS.length - 1 ? 'Finish Drill' : 'Next Question'}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
};

export default DrillPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen, Trophy, Briefcase, ArrowRight, ArrowLeft, CheckCircle,
    Brain, Clock, Layers, Zap, Code, Target, BarChart2
} from 'lucide-react';

const SetupPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('selection'); // selection, quiz, processing
    const [selectedPath, setSelectedPath] = useState(null);
    const [quizStep, setQuizStep] = useState(0);
    const [answers, setAnswers] = useState({
        goal: '',
        subject: '',
        level: '',
        time: 45,
        preference: ''
    });

    // Quiz Questions Data with Enhanced Descriptions
    const questions = [
        {
            id: 'goal',
            question: "What is your primary study goal?",
            options: [
                { id: 'exam', label: 'University Exam Prep', icon: BookOpen, desc: "Focus on semester exams and syllabus-based mastery." },
                { id: 'gate', label: 'GATE / Competitive', icon: Trophy, desc: "Train with exam patterns, accuracy goals, and ranks." },
                { id: 'job', label: 'Job Interview Prep', icon: Briefcase, desc: "Prepare for interviews with real-world problems." }
            ]
        },
        {
            id: 'subject',
            question: "Which subject do you want to focus on first?",
            options: [
                { id: 'Operating Systems', label: 'Operating Systems', icon: Layers, desc: "Process management, threads, and concurrency." },
                { id: 'Data Structures', label: 'Data Structures', icon: Code, desc: "Arrays, Trees, Graphs, and Algorithmic thinking." },
                { id: 'DBMS', label: 'DBMS', icon: Zap, desc: "Schema design, SQL, and normalization." },
                { id: 'Computer Networks', label: 'Computer Networks', icon: Target, desc: "Protocols, layers, and secure communication." }
            ]
        },
        {
            id: 'level',
            question: "How would you rate your current grasp?",
            options: [
                { id: 'Beginner', label: 'Beginner', icon: Zap, desc: "I need to start from the absolute basics." },
                { id: 'Intermediate', label: 'Intermediate', icon: BarChart2, desc: "I understand the core but have gaps." },
                { id: 'Advanced', label: 'Advanced', icon: Trophy, desc: "I want to focus on complex problems and edge cases." }
            ]
        },
        {
            id: 'time',
            question: "Daily time commitment",
            type: 'slider',
            min: 15,
            max: 120,
            step: 15
        },
        {
            id: 'preference',
            question: "How do you prefer to learn?",
            options: [
                { id: 'theory', label: 'Theory First', icon: BookOpen, desc: "Understand the 'Why' before solving problems." },
                { id: 'balanced', label: 'Balanced', icon: Layers, desc: "Mix of reading and immediate application." },
                { id: 'practice', label: 'Practice Heavy', icon: Trophy, desc: "Learn by doing and debugging code." }
            ]
        }
    ];

    const handlePathSelect = (path) => {
        setSelectedPath(path);
        setTimeout(() => {
            if (path === 'academic') {
                setStep('quiz');
            } else {
                setStep('processing');
            }
        }, 200);
    };

    const handleQuizAnswer = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        setTimeout(() => {
            if (quizStep < questions.length - 1) {
                setQuizStep(prev => prev + 1);
            } else {
                setStep('processing');
            }
        }, 300);
    };

    const handleBack = () => {
        if (quizStep > 0) {
            setQuizStep(prev => prev - 1);
        } else {
            setStep('selection');
            setQuizStep(0); // Reset quiz if going back to selection
        }
    };

    useEffect(() => {
        if (step === 'processing') {
            // Save to LocalStorage (Legacy/Backup)
            localStorage.setItem('mastery_setup_complete', 'true');
            if (answers.goal) localStorage.setItem('mastery_goal', answers.goal);
            if (answers.subject) localStorage.setItem('mastery_subject', answers.subject);
            localStorage.setItem('mastery_level', answers.level);

            // Save to New Database
            const saveToDB = async () => {
                try {
                    const { db } = await import('../services/db');

                    // Create or update user profile
                    const userId = await db.users.add({
                        goal: answers.goal,
                        subject: answers.subject || selectedPath,
                        level: answers.level,
                        dailyTime: answers.time,
                        learningStyle: answers.preference,
                        createdAt: new Date(),
                        lastLogin: new Date()
                    });

                    // Store userId for session
                    localStorage.setItem('mastery_userid', userId.toString());
                    console.log("User profile saved to database with ID:", userId);
                } catch (error) {
                    console.error("Database save failed:", error);
                    // Fallback is already handled by localStorage above
                }
            };

            saveToDB();

            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step, answers, navigate, selectedPath]);

    // 1. Learning Mode Selection Screen (Replaces old Path Selection)
    if (step === 'selection') {
        const learningModes = [
            {
                id: 'academic',
                title: "Academic Excellence",
                icon: BookOpen,
                gradient: "from-amber-100 to-amber-50",
                accent: "text-amber-600",
                border: "group-hover:border-amber-400",
                description: "Structured syllabus-based learning with adaptive revision and exams.",
                aiFeatures: ["Syllabus breakdown", "Exam-focused scheduling", "Concept mastery tracking"]
            },
            {
                id: 'competitive',
                title: "Competitive Edge",
                icon: Trophy,
                gradient: "from-pink-100 to-pink-50",
                accent: "text-pink-600",
                border: "group-hover:border-pink-400",
                description: "Exam-oriented training with speed, accuracy, and rank improvement.",
                aiFeatures: ["Timed drills", "Error analysis", "Performance trends"]
            },
            {
                id: 'career',
                title: "Career Construction",
                icon: Briefcase,
                gradient: "from-emerald-100 to-emerald-50",
                accent: "text-emerald-600",
                border: "group-hover:border-emerald-400",
                description: "Industry-ready skill building with projects and interview prep.",
                aiFeatures: ["Skill gap detection", "Project-first learning", "Mock interviews"]
            }
        ];

        return (
            <div className="min-h-screen bg-[#FAF9F4] flex flex-col items-center justify-center p-6 text-[#1F1F1F]">
                <div className="max-w-6xl w-full">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#1F1F1F] animate-pulse"></span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step 1 of 4</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[#1F1F1F] leading-tight">
                            How do you want MasteryLoop to <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">train you?</span>
                        </h1>
                        <p className="text-lg text-[#1F1F1F]/60 font-medium max-w-2xl mx-auto leading-relaxed">
                            This choice shapes your dashboard, AI coach behavior, and daily study plan.
                        </p>
                    </div>

                    {/* Mode Selection Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-5xl mx-auto">
                        {learningModes.map((mode) => {
                            const isSelected = selectedPath === mode.id;
                            const Icon = mode.icon;

                            return (
                                <div
                                    key={mode.id}
                                    onClick={() => setSelectedPath(mode.id)}
                                    className={`relative rounded-2xl p-0.5 cursor-pointer transition-all duration-300 group ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                                >
                                    {/* Selection Glow/Border */}
                                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${isSelected ? 'bg-gradient-to-br ' + mode.gradient.replace('100', '400').replace('50', '300') : 'bg-transparent'}`} />

                                    <div className={`relative h-full bg-white rounded-2xl p-4 border transition-all duration-300 ${isSelected ? 'border-transparent shadow-lg' : 'border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-md'} flex flex-col`}>

                                        {/* Card Header */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className={`p-2 rounded-xl bg-gradient-to-br ${mode.gradient} ${mode.accent}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? `border-${mode.accent.split('-')[1]}-500 bg-${mode.accent.split('-')[1]}-500 text-white` : 'border-slate-200'}`}>
                                                {isSelected && <CheckCircle className="w-3 h-3" />}
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-[#1F1F1F] mb-1 leading-tight">{mode.title}</h3>
                                        <p className="text-slate-500 font-medium text-xs leading-relaxed mb-4 line-clamp-2">
                                            {mode.description}
                                        </p>

                                        {/* AI Preview Section */}
                                        <div className="mt-auto bg-slate-50/50 rounded-lg p-3 border border-slate-100">
                                            <div className="flex items-center gap-1.5 mb-2">
                                                <Brain className="w-2.5 h-2.5 text-[#1F1F1F]" />
                                                <span className="text-[9px] font-bold text-[#1F1F1F]/50 uppercase tracking-wider">AI Preview</span>
                                            </div>
                                            <ul className="space-y-1">
                                                {mode.aiFeatures.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                                                        <span className={`w-1 h-1 rounded-full ${mode.accent.replace('text', 'bg')}`}></span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center pb-8">
                        <button
                            onClick={() => selectedPath && handlePathSelect(selectedPath)}
                            disabled={!selectedPath}
                            className={`
                                relative overflow-hidden rounded-2xl px-12 py-5 font-bold text-lg transition-all duration-300
                                ${selectedPath
                                    ? 'bg-[#1F1F1F] text-white shadow-xl hover:shadow-2xl hover:scale-105 cursor-pointer'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                            `}
                        >
                            Build My Personalized Plan
                            {selectedPath && <ArrowRight className="inline-block ml-3 w-5 h-5 animate-pulse" />}
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    // 2. Quiz Screen
    if (step === 'quiz') {
        const q = questions[quizStep];
        const progress = ((quizStep + 1) / questions.length) * 100;

        return (
            <div className="min-h-screen bg-[#FAF9F4] flex flex-col items-center justify-center p-6 text-[#1F1F1F] relative">

                {/* Back Button (Absolute or Container) */}
                <button
                    onClick={handleBack}
                    className="absolute top-8 left-8 p-3 rounded-full hover:bg-slate-200 transition-colors group"
                    title="Go Back"
                >
                    <ArrowLeft className="w-6 h-6 text-slate-400 group-hover:text-[#1F1F1F] transition-colors" />
                </button>

                <div className="max-w-xl w-full">
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 h-1 rounded-full mb-12 overflow-hidden">
                        <div
                            className="bg-[#1F1F1F] h-full rounded-full transition-all duration-700 ease-in-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-semibold mb-3 tracking-tight leading-snug">{q.question}</h2>
                    </div>

                    <div className="space-y-4">
                        {q.type === 'slider' ? (
                            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-2xl shadow-indigo-500/10 text-center relative overflow-hidden group">
                                {/* Decorative Background Blob */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl -z-10 opacity-60"></div>

                                <div className="mb-8">
                                    <div className="text-6xl font-black text-[#1F1F1F] tracking-tighter flex items-center justify-center gap-1">
                                        {answers.time}
                                        <span className="text-lg text-slate-400 font-bold self-end mb-2">min</span>
                                    </div>
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mt-2 transition-colors duration-300 ${answers.time <= 30 ? 'bg-green-100 text-green-700' :
                                            answers.time <= 60 ? 'bg-indigo-100 text-indigo-700' :
                                                'bg-purple-100 text-purple-700'
                                        }`}>
                                        <Clock className="w-3 h-3" />
                                        {answers.time <= 30 ? "Light Session" :
                                            answers.time <= 60 ? "Steady Progress" :
                                                "Deep Dive"}
                                    </div>
                                </div>

                                <div className="relative h-12 flex items-center justify-center mb-8 px-2">
                                    {/* Custom Track Background */}
                                    <div className="absolute w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 rounded-full ${answers.time <= 30 ? 'bg-green-400' :
                                                answers.time <= 60 ? 'bg-indigo-500' :
                                                    'bg-purple-600'
                                                }`}
                                            // Simple width calculation for visual track
                                            style={{ width: `${((answers.time - q.min) / (q.max - q.min)) * 100}%` }}
                                        ></div>
                                    </div>

                                    {/* Actual slider (invisible but functional) */}
                                    <input
                                        type="range"
                                        min={q.min}
                                        max={q.max}
                                        step={q.step}
                                        value={answers.time}
                                        onChange={(e) => setAnswers(prev => ({ ...prev, time: parseInt(e.target.value) }))}
                                        className="relative w-full h-12 opacity-0 cursor-pointer z-10"
                                    />

                                    {/* Custom Thumb (Visual only) */}
                                    <div
                                        className="absolute h-8 w-8 bg-white border-4 border-[#1F1F1F] rounded-full shadow-lg pointer-events-none transition-all duration-300 z-0 flex items-center justify-center"
                                        style={{
                                            left: `calc(${((answers.time - q.min) / (q.max - q.min)) * 100}% - 16px)`
                                        }}
                                    >
                                        <div className="w-2 h-2 bg-[#1F1F1F] rounded-full"></div>
                                    </div>
                                </div>

                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                                    <span>Quick ({q.min}m)</span>
                                    <span>Intense ({q.max}m)</span>
                                </div>

                                <button
                                    onClick={() => handleQuizAnswer('time', answers.time)}
                                    className="mt-10 w-full py-4 bg-[#1F1F1F] text-white rounded-2xl font-bold text-lg hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 group-hover:shadow-2xl"
                                >
                                    Confirm Schedule
                                    <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {q.options.map((opt, idx) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleQuizAnswer(q.id, opt.id)}
                                        className="w-full p-4 bg-white border border-transparent hover:border-[#F8D57E] rounded-[1.25rem] flex items-center gap-4 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:scale-[1.01] transition-all duration-300 group text-left relative overflow-hidden animate-in fade-in slide-in-from-bottom-2"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-[#1F1F1F] group-hover:text-white transition-all shadow-sm z-10 shrink-0">
                                            <opt.icon className="w-5 h-5" />
                                        </div>

                                        <div className="z-10 flex-1">
                                            <h3 className="text-base font-bold text-[#1F1F1F] mb-0.5 group-hover:text-black">{opt.label}</h3>
                                            <p className="text-xs font-medium text-slate-500 leading-snug group-hover:text-slate-600">{opt.desc}</p>
                                        </div>

                                        <div className="w-6 h-6 rounded-full border border-slate-100 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-all ml-2 group-hover:border-[#1F1F1F]">
                                            <ArrowRight className="w-3 h-3 text-[#1F1F1F]" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 3. Processing Screen
    if (step === 'processing') {
        return (
            <div className="min-h-screen bg-[#FAF9F4] flex flex-col items-center justify-center p-6 text-[#1F1F1F]">
                <div className="text-center max-w-md">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-[#1F1F1F] rounded-full border-t-transparent animate-spin"></div>
                        <Brain className="absolute inset-0 m-auto w-8 h-8 text-[#1F1F1F] animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 tracking-tight">Constructing Roadmap</h2>
                    <p className="text-slate-500 font-medium text-base animate-pulse">
                        Aligning {answers.subject || selectedPath} modules with your goals...
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

// Compact Path Card V2
const PathCard = ({ title, subtitle, icon: Icon, bullets, gradient, onClick }) => (
    <div
        onClick={onClick}
        className={`relative ${gradient} rounded-[1.5rem] p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col items-start min-h-[240px] shadow-md`}
    >
        {/* Soft Noise/Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-white/30 transition-all" />

        <div className="flex justify-between items-start w-full mb-4 relative z-10">
            <div className="w-12 h-12 bg-[#1F1F1F] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                <Icon className="w-6 h-6" />
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-[#1F1F1F] opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm -translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="w-4 h-4" />
            </div>
        </div>

        <div className="relative z-10 flex-1">
            <h3 className="text-xl font-extrabold text-[#1F1F1F] mb-2 leading-tight tracking-tight shadow-black/5">
                {title}
            </h3>
            <p className="text-xs font-bold text-[#1F1F1F]/70 leading-relaxed mb-6">
                {subtitle}
            </p>
        </div>

        <div className="relative z-10 w-full bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/5 space-y-1.5 mt-auto">
            {bullets.map((bullet, i) => (
                <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1F1F1F] opacity-70" />
                    <span className="text-[10px] font-bold text-[#1F1F1F]/80 leading-tight">{bullet}</span>
                </div>
            ))}
        </div>
    </div>
);

export default SetupPage;

import React from 'react';
import {
    BookOpen, Clock, Target, Zap, ChevronRight,
    BarChart2, PlayCircle, CheckCircle2, Lock, ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Dashboard = ({ intent = 'academic', userData }) => {

    // Mock Data Generators (Refactored to use intent from context)
    const getRec = () => {
        if (intent === 'academic') return {
            title: 'Core Calculus Review',
            reason: 'Foundation weakness detected in limits',
            action: 'Revisit Module 2'
        };
        if (intent === 'competitive') return {
            title: 'Speed Drills: Algebra',
            reason: 'Average time per question > 2 mins',
            action: 'Start 10m Sprint'
        };
        return {
            title: 'System Design Patterns',
            reason: 'Upcoming project requires architecture skills',
            action: 'View Crash Course'
        };
    };

    const rec = getRec();

    const learningPath = [
        { id: 1, title: 'Basics & Fundamentals', status: 'mastered', time: '2h 30m' },
        { id: 2, title: 'Intermediate Concepts', status: 'learning', time: '1h 45m left' },
        { id: 3, title: 'Advanced Applications', status: 'locked', time: '4h 00m' },
        { id: 4, title: 'Final Capstone Project', status: 'locked', time: '10h 00m' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans pt-24 px-4 md:px-8 pb-12">
            <Navbar />

            <div className="max-w-[1400px] mx-auto">

                {/* Header Greeting */}
                <div className="mb-8 w-full">
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-2 tracking-tight w-full">
                        Good morning, Learner 👋
                    </h1>
                </div>

                {/* Top Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                    {/* Left Column: Context Cards */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Learning Intent Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">Current Intent</span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 capitalize mb-2">{intent} Track</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Focused on {intent === 'academic' ? 'conceptual depth and theory' : intent === 'competitive' ? 'speed and problem solving' : 'practical skills and portfolio building'}.
                                </p>
                            </div>
                        </div>

                        {/* Current Stage Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-48">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Stage</span>
                                    <h3 className="text-xl font-bold text-slate-900 mt-1">Module 2: Application</h3>
                                </div>
                                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full">
                                    Revising
                                </span>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-500 mb-2">
                                    <span>Difficulty</span>
                                    <span className="text-slate-900">Intermediate</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full w-[60%] bg-amber-500 rounded-full" />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Middle Column: Adaptive Recommendation (Hero) */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white h-full flex flex-col justify-between shadow-2xl shadow-slate-200 relative overflow-hidden">
                            {/* Decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6 text-indigo-300 font-bold text-sm uppercase tracking-wider">
                                    <Zap className="w-4 h-4" />
                                    AI Recommendation
                                </div>

                                <h2 className="text-3xl font-bold mb-4 leading-tight">
                                    {rec.title}
                                </h2>
                                <p className="text-slate-400 text-lg mb-8">
                                    {rec.reason}. We recommend spending 15 mins here before moving forward.
                                </p>
                            </div>

                            <div className="relative z-10 space-y-3">
                                <button className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group">
                                    Continue Learning
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold text-sm transition-all">
                                    View Explanation
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Progress & Visuals */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Concept Progress */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-900">Concept Mastery</h3>
                                <BarChart2 className="w-5 h-5 text-slate-400" />
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: 'Understanding', val: 85, color: 'bg-emerald-500' },
                                    { label: 'Application', val: 60, color: 'bg-indigo-500' },
                                    { label: 'Retention', val: 45, color: 'bg-orange-500' }
                                ].map((item) => (
                                    <div key={item.label}>
                                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                            <span>{item.label}</span>
                                            <span>{item.val}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Time Commitment */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <Clock className="w-5 h-5 text-slate-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Time Commitment</h4>
                                    <p className="text-xs text-slate-400">This Week</p>
                                </div>
                            </div>

                            <div className="flex items-end gap-1 mb-2">
                                <span className="text-3xl font-bold text-slate-900">8.5</span>
                                <span className="text-sm font-bold text-slate-400 mb-1">/ 15 hrs</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-[55%] bg-slate-900 rounded-full" />
                            </div>
                        </div>

                    </div>

                </div>

                {/* Bottom Section: Learning Path (Timeline) */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Your Learning Path</h2>
                            <p className="text-slate-500 mt-1">Structured timeline tailored to your {intent} goals.</p>
                        </div>
                        <button className="hidden md:flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-700">
                            View Full Syllabus <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="relative pt-8 pb-12">
                        {/* Track Background */}
                        <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-1 bg-slate-100 rounded-full" />

                        <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                            {learningPath.map((step, index) => {
                                const isActive = step.status === 'learning';
                                const isCompleted = step.status === 'mastered';
                                const isLocked = step.status === 'locked';

                                return (
                                    <div key={step.id} className="flex-1 relative flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-0 group">

                                        {/* Connector overlay for coloring previous steps (desktop) */}
                                        {index !== 0 && (
                                            <div className={`hidden md:block absolute top-[2.5rem] right-[50%] w-full h-1 -translate-y-1/2 -z-10
                                    ${isCompleted || isActive ? 'bg-emerald-500' : 'bg-transparent'}
                                  `} />
                                        )}

                                        {/* Icon Node */}
                                        <div className={`
                                  w-20 h-20 rounded-2xl flex items-center justify-center border-[6px] transition-all duration-500 relative bg-white
                                  ${isCompleted ? 'border-emerald-500 text-emerald-500 shadow-xl shadow-emerald-500/20' :
                                                isActive ? 'border-indigo-600 text-indigo-600 scale-110 shadow-2xl shadow-indigo-600/30' :
                                                    'border-slate-100 text-slate-300'
                                            }
                               `}>
                                            {isCompleted ? <CheckCircle2 className="w-8 h-8" /> :
                                                isActive ? <PlayCircle className="w-8 h-8" /> :
                                                    <Lock className="w-8 h-8" />
                                            }
                                        </div>

                                        {/* Content Card */}
                                        <div className={`
                                  flex-1 md:w-full md:mt-8 p-5 rounded-2xl border transition-all duration-300 relative
                                  ${isActive
                                                ? 'bg-white border-indigo-100 shadow-xl shadow-indigo-100/50 -translate-y-2'
                                                : 'bg-transparent border-transparent md:text-center'
                                            }
                               `}>
                                            {isActive && (
                                                <div className="absolute -top-3 left-6 md:left-1/2 md:-translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                                                    Current
                                                </div>
                                            )}

                                            <h4 className={`font-bold text-lg mb-1 leading-tight ${isActive ? 'text-indigo-900' : 'text-slate-900 group-hover:text-slate-700'}`}>
                                                {step.title}
                                            </h4>

                                            <div className={`flex flex-col md:block gap-1`}>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isCompleted ? 'text-emerald-500' : isActive ? 'text-indigo-500' : 'text-slate-400'
                                                    }`}>
                                                    {step.status}
                                                </span>
                                                <p className="text-slate-400 text-sm font-medium flex items-center gap-1 md:justify-center">
                                                    <Clock className="w-3 h-3" />
                                                    {step.time}
                                                </p>
                                            </div>

                                            {isActive && (
                                                <button className="mt-4 w-full py-2 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm hover:bg-indigo-100 transition-colors">
                                                    Continue
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;

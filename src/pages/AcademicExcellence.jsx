import React, { useState } from 'react';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight,
    CheckCircle, AlertTriangle, XCircle, ArrowRight,
    Layers, Brain, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AcademicExcellence = () => {
    const navigate = useNavigate();
    const [selectedSubject, setSelectedSubject] = useState('Data Structures');

    const NavItem = ({ icon: Icon, label, active, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ease-out group outline-none focus:ring-2 focus:ring-white/20 active:scale-[0.98] active:translate-y-0 ${active
                ? 'bg-white/10 text-white font-medium shadow-sm translate-y-[-1px]'
                : 'text-gray-400 hover:text-white hover:bg-white/5 hover:-translate-y-[1px] hover:shadow-md'
                }`}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
            <span className="text-sm tracking-wide">{label}</span>
        </button>
    );

    return (
        <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">

            {/* Sidebar - Compact (Global) */}
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
                            <NavItem icon={BookOpen} label="Academic" active />
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
                <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="bg-white/5 p-2 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-inner" />
                        <div>
                            <div className="text-sm font-bold text-white">Guest User</div>
                            <div className="text-[10px] text-gray-400 font-medium">Student Plan</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 mx-2 h-full relative">

                {/* Top Header (Global) */}
                <header className="absolute top-0 left-0 right-0 z-50 h-14 flex items-center justify-end shrink-0 pt-2 pointer-events-none px-4 gap-3">
                    <div className="pointer-events-auto flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-black/5 w-64 transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-[1px] focus-within:ring-2 focus-within:ring-indigo-100 h-10">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-gray-400 text-[#1F1F1F]"
                        />
                        <div className="flex gap-1 hidden sm:flex">
                            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-bold text-gray-500 font-mono">⌘K</kbd>
                        </div>
                    </div>
                    <div className="pointer-events-auto flex items-center gap-3">
                        <button className="relative p-2 bg-white rounded-full shadow-sm border border-black/5 hover:bg-gray-50 transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                            <Bell className="w-4 h-4 text-[#1F1F1F]" />
                            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
                        </button>
                    </div>
                </header>

                {/* Academic Content Scrollable Area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-6 pr-2 pt-16">

                    {/* 1. Page Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-extrabold text-[#1F1F1F] tracking-tight">Academic Excellence</h1>
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-200">Intermediate</span>
                        </div>
                        <p className="text-gray-500 font-medium text-sm">
                            Build strong conceptual foundations through structured mastery.
                        </p>
                    </div>

                    {/* 2. Subject Overview Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { name: 'Data Structures', count: 24, progress: 65, color: '#F8D57E' },
                            { name: 'Operating Systems', count: 18, progress: 40, color: '#E2E8F0' },
                            { name: 'DBMS', count: 12, progress: 85, color: '#E2E8F0' },
                            { name: 'Comp Networks', count: 20, progress: 25, color: '#E2E8F0' },
                        ].map((subject) => (
                            <div
                                key={subject.name}
                                onClick={() => setSelectedSubject(subject.name)}
                                className={`p-4 rounded-[1.25rem] border transition-all duration-200 ease-out cursor-pointer group relative overflow-hidden hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-[0.99]
                      ${selectedSubject === subject.name
                                        ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] shadow-lg scale-[1.01]'
                                        : 'bg-white text-[#1F1F1F] border-slate-100 hover:border-slate-300'
                                    }`}
                            >
                                <h3 className="font-bold text-sm mb-1">{subject.name}</h3>
                                <div className="flex justify-between items-end mb-3">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedSubject === subject.name ? 'text-gray-400' : 'text-gray-400'}`}>
                                        {subject.count} Concepts
                                    </span>
                                </div>
                                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-auto">
                                    <div
                                        className={`h-full rounded-full ${selectedSubject === subject.name ? 'bg-amber-400' : 'bg-slate-900/10'}`}
                                        style={{ width: `${subject.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 3. Today's Academic Focus (Primary) */}
                    <div className="bg-white border border-slate-100 rounded-[1.5rem] p-6 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 bottom-0 w-2 bg-amber-400" />
                        <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 shrink-0">
                            <Brain className="w-8 h-8" />
                        </div>
                        <div className="flex-1 z-10">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Today's Focus</span>
                                <span className="text-[10px] font-bold text-gray-400">•</span>
                                <span className="text-[10px] font-bold text-gray-400">Operating Systems</span>
                            </div>
                            <h2 className="text-2xl font-extrabold text-[#1F1F1F] mb-1">CPU Scheduling – Round Robin</h2>
                            <p className="text-sm text-gray-500 font-medium max-w-xl">
                                Selected based on your recent performance in preemptive algorithms and prerequisite gaps.
                            </p>
                        </div>
                        <div className="md:ml-auto flex items-center gap-4 z-10 w-full md:w-auto">
                            <div className="text-right hidden md:block">
                                <div className="text-xs font-bold text-[#1F1F1F]">45 min</div>
                                <div className="text-[10px] font-bold text-gray-400">Est. Time</div>
                            </div>
                            <button
                                onClick={() => navigate('/academic/learn/operating-systems/cpu-scheduling')}
                                className="flex-1 md:flex-none px-6 py-3 bg-[#1F1F1F] text-white rounded-xl font-bold text-sm transition-all duration-200 ease-out hover:bg-black hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 flex items-center justify-center gap-2"
                            >
                                Continue Learning <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        {/* Decor */}
                        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                        {/* 4. Concept Map (Left Column) */}
                        <div className="col-span-12 md:col-span-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-extrabold text-lg text-[#1F1F1F]">Concept Map: {selectedSubject}</h3>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dependency Order</span>
                            </div>

                            <div className="relative pl-4 border-l-2 border-slate-200 ml-3 space-y-6">
                                {[
                                    { title: 'Process States & PCB', status: 'mastered', diff: 'Easy' },
                                    { title: 'CPU Scheduling Algorithms', status: 'progress', diff: 'Medium' },
                                    { title: 'Thread Concurrency', status: 'weak', diff: 'Hard' },
                                    { title: 'Deadlock Prevention', status: 'locked', diff: 'Hard' },
                                ].map((concept, i) => (
                                    <div key={i} className="relative pl-6">
                                        {/* Connector Node */}
                                        <div className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 ring-4 ring-[#FAF9F4] 
                              ${concept.status === 'mastered' ? 'bg-emerald-500 border-emerald-500' :
                                                concept.status === 'progress' ? 'bg-amber-400 border-amber-400' :
                                                    concept.status === 'weak' ? 'bg-white border-rose-500' : 'bg-slate-200 border-slate-200'}`}
                                        />

                                        <div className={`p-4 rounded-2xl border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0
                              ${concept.status === 'progress' ? 'bg-white border-amber-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className={`font-bold text-sm ${concept.status === 'locked' ? 'text-gray-400' : 'text-[#1F1F1F]'}`}>
                                                    {concept.title}
                                                </h4>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider
                                    ${concept.status === 'mastered' ? 'bg-emerald-50 text-emerald-700' :
                                                        concept.status === 'progress' ? 'bg-amber-50 text-amber-700' :
                                                            concept.status === 'weak' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-400'}`}>
                                                    {concept.status === 'progress' ? 'In Progress' : concept.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold text-gray-400">{concept.diff}</span>
                                                {concept.status === 'progress' && (
                                                    <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden max-w-[100px]">
                                                        <div className="h-full bg-amber-400 w-2/3" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. Diagnostics & Insight (Right Column) */}
                        <div className="col-span-12 md:col-span-4 flex flex-col gap-6">

                            {/* Concept Mastery Snapshot */}
                            <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100">
                                <h3 className="font-extrabold text-sm text-[#1F1F1F] mb-4 uppercase tracking-wide">Concept Mastery</h3>
                                <div className="space-y-3 mb-6">
                                    {[
                                        { label: 'Process API', status: 'good' },
                                        { label: 'Scheduling', status: 'warn' },
                                        { label: 'Concurrency', status: 'bad' },
                                    ].map((c, i) => (
                                        <div key={i} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                            <span className="text-xs font-bold text-slate-700">{c.label}</span>
                                            {c.status === 'good' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                                            {c.status === 'warn' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                                            {c.status === 'bad' && <XCircle className="w-4 h-4 text-rose-500" />}
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs transition-all duration-200 ease-out border border-slate-200 hover:bg-[#1F1F1F] hover:text-white hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]">
                                    Review Weak Concepts
                                </button>
                            </div>

                            {/* Adaptive Insight */}
                            <div className="bg-indigo-50 rounded-[1.5rem] p-5 border border-indigo-100 relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-2 relative z-10">
                                    <Target className="w-4 h-4 text-indigo-600" />
                                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Adaptive Insight</span>
                                </div>
                                <h4 className="font-bold text-sm text-[#1F1F1F] mb-2 relative z-10">Why this focus?</h4>
                                <p className="text-xs font-medium text-slate-600 leading-relaxed relative z-10">
                                    You struggled with preemptive scheduling concepts in "Process States", which are required for upcoming Deadlock topics.
                                </p>
                                {/* Decor */}
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full blur-xl opacity-60 pointer-events-none" />
                            </div>

                        </div>
                    </div>

                </div>

            </main>

            {/* Right Panel - Compact Calendar & Timeline (Global) */}
            <aside className="w-72 bg-white rounded-[1.5rem] p-5 hidden xl:flex flex-col shadow-xl shadow-gray-200/50 border border-gray-100/50 shrink-0 z-10 h-full overflow-hidden">
                <div className="flex items-center justify-between mb-4 shrink-0">
                    <h3 className="font-extrabold text-sm text-[#1F1F1F]">May 2026</h3>
                    <div className="flex gap-1 bg-gray-50 p-0.5 rounded-md border border-gray-100">
                        <button className="p-1 hover:bg-white rounded transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-sm active:translate-y-0 text-gray-500 hover:text-black"><ChevronRight className="w-3 h-3 rotate-180" /></button>
                        <button className="p-1 hover:bg-white rounded transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-sm active:translate-y-0 text-gray-500 hover:text-black"><ChevronRight className="w-3 h-3" /></button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-y-2 text-center text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-6 shrink-0">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <span key={d}>{d}</span>)}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                        <div key={d} className={`w-6 h-6 mx-auto flex items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${d === 15 ? 'bg-[#F2AEC1] text-[#1F1F1F] shadow-sm' : d === 21 ? 'bg-[#1F1F1F] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                            {d}
                        </div>
                    ))}
                </div>
                <div className="w-full h-px bg-gray-100 mb-4 shrink-0" />
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-3 shrink-0">
                        <h3 className="font-extrabold text-sm text-[#1F1F1F]">Today's Timeline</h3>
                        <button className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors">See all</button>
                    </div>

                    <div className="space-y-0 overflow-y-auto scrollbar-hide flex-1 pr-1 pl-1">
                        {[
                            { time: '07:00', title: 'Calculus Review', tag: 'Academic', color: 'bg-amber-100 text-amber-900', border: 'border-amber-200' },
                            { time: '08:30', title: 'Speed Drill', tag: 'Competitive', color: 'bg-rose-100 text-rose-900', border: 'border-rose-200' },
                            { time: '14:00', title: 'System Design', tag: 'Career', color: 'bg-emerald-100 text-emerald-900', border: 'border-emerald-200' },
                            { time: '16:30', title: 'Mock Interview', tag: 'Career', color: 'bg-blue-100 text-blue-900', border: 'border-blue-200' },
                            { time: '19:00', title: 'Daily Review', tag: 'General', color: 'bg-slate-100 text-slate-900', border: 'border-slate-200' },
                        ].map((item, i, arr) => (
                            <div key={i} className="flex gap-3 items-stretch relative group">
                                {i !== arr.length - 1 && (
                                    <div className="absolute left-[5.5px] top-3 bottom-[-12px] w-[2px] bg-slate-100 group-hover:bg-slate-200 transition-colors" />
                                )}
                                <div className={`mt-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm shrink-0 z-10 ${item.color.split(' ')[0].replace('bg-', 'bg-')}`} />
                                <div className="flex-1 pb-4">
                                    <div className="flex items-baseline justify-between mb-1">
                                        <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                                    </div>
                                    <div className={`p-3 rounded-xl ${item.color} ${item.border} border transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}>
                                        <div className="font-bold text-xs mb-0.5">{item.title}</div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[9px] uppercase tracking-wider font-black opacity-70">{item.tag}</span>
                                            <div className="h-0.5 w-0.5 rounded-full bg-current opacity-50" />
                                            <span className="text-[9px] font-medium opacity-70">45m</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-3 mt-2 shrink-0 bg-[#1F1F1F] text-white rounded-xl font-bold text-xs transition-all duration-200 ease-out hover:bg-black hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2">
                        <span>View Full Schedule</span>
                        <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            </aside>

        </div>
    );
};

export default AcademicExcellence;

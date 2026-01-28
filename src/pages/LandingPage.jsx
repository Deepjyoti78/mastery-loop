import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight,
    Trophy, Briefcase, Zap, CheckCircle, AlertTriangle, XCircle, ArrowRight
} from 'lucide-react';

const LandingPage = ({ setIntent }) => {
    const navigate = useNavigate();

    const handlePathSelection = (path) => {
        if (setIntent) setIntent(path);

        // Direct navigation to specific pages
        if (path === 'academic') navigate('/academic');
        else if (path === 'competitive') navigate('/competitive');
        else if (path === 'career') navigate('/career');
        else navigate('/setup'); // Fallback
    };

    const NavItem = ({ icon: Icon, label, active }) => (
        <button
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
        <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">

            {/* Sidebar - Compact */}
            <aside className="w-56 bg-[#1F1F1F] rounded-[1.5rem] p-4 flex flex-col hidden md:flex shrink-0 shadow-2xl shadow-black/5 z-20">

                {/* Brand */}
                <div className="flex items-center gap-3 mb-8 px-2 pt-1">
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1F1F1F] font-bold text-lg shadow-md">
                        M
                    </div>
                    <span className="font-bold text-base tracking-tight text-white">MasteryLoop</span>
                </div>

                {/* Navigation */}
                <div className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
                    <section>
                        <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3">General</div>
                        <nav className="space-y-0.5">
                            <NavItem icon={LayoutGrid} label="Dashboard" active />
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

                {/* User Profile */}
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

            {/* Main Content Area - No Scroll */}
            <main className="flex-1 flex flex-col min-w-0 mx-2 h-full relative">

                {/* Top Header - Floating & Transparent */}
                <header className="absolute top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 shrink-0 pt-2 pointer-events-none">

                    {/* Left: Greeting (Navbar-like) */}
                    <div className="pointer-events-auto">
                        <h1 className="text-3xl font-extrabold text-[#1F1F1F] tracking-tight flex items-center gap-2">
                            Good morning, Learner
                            <span className="text-2xl font-normal text-gray-400">👋</span>
                        </h1>
                    </div>

                    {/* Right: Search & Actions */}
                    <div className="flex items-center gap-4 pointer-events-auto">
                        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 shadow-sm border border-black/5 w-72 transition-all hover:shadow-md h-11">
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

                        <button className="relative p-2.5 bg-white rounded-full shadow-sm border border-black/5 hover:bg-gray-50 transition-colors h-11 w-11 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-[#1F1F1F]" />
                            <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
                        </button>
                    </div>
                </header>

                {/* Dashboard Content - Elastic Grid with Full Height */}
                <div className="flex-1 flex flex-col min-h-0 overflow-y-auto scrollbar-hide pb-2 pt-24">

                    {/* Grid - Stretches Bottom Row */}
                    <div className="grid grid-cols-12 grid-rows-[auto_auto_1fr] gap-4 h-full pb-2">

                        {/* --- ROW 1: ACADEMIC & COMPETITIVE --- */}

                        {/* 1. Academic Excellence */}
                        <div
                            onClick={() => handlePathSelection('academic')}
                            className="col-span-12 lg:col-span-5 bg-[#F8D57E] rounded-[1.25rem] p-5 relative overflow-hidden group cursor-pointer transition-all hover:shadow-md hover:scale-[1.01] flex flex-col justify-between h-full min-h-[180px]"
                        >
                            <div className="flex justify-between items-start z-10 relative mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#1F1F1F] rounded-lg flex items-center justify-center text-white shadow-sm rotate-3">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg font-extrabold text-[#1F1F1F] leading-tight">Academic<br />Excellence</h3>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-60">14 Modules</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end relative z-10">
                                <div className="flex gap-1.5">
                                    <span className="text-[10px] font-bold bg-white/40 px-2 py-1 rounded-md text-[#1F1F1F] backdrop-blur-sm">Calculus</span>
                                    <span className="text-[10px] font-bold bg-white/40 px-2 py-1 rounded-md text-[#1F1F1F] backdrop-blur-sm">Physics</span>
                                </div>
                                <span className="text-[10px] font-bold text-[#1F1F1F] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                    View Details →
                                </span>
                            </div>
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full pointer-events-none blur-xl" />
                        </div>

                        {/* 2. Competitive Edge */}
                        <div
                            onClick={() => handlePathSelection('competitive')}
                            className="col-span-12 lg:col-span-7 bg-[#F2AEC1] rounded-[1.25rem] p-5 relative overflow-hidden group cursor-pointer transition-all hover:shadow-md hover:scale-[1.01] flex flex-col h-full min-h-[180px]"
                        >
                            <div className="flex justify-between items-start z-10 relative h-full">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#F2AEC1] shadow-sm -rotate-3">
                                            <Trophy className="w-4 h-4" />
                                        </div>
                                        <h3 className="text-lg font-extrabold text-[#1F1F1F] leading-tight">Competitive<br />Edge</h3>
                                    </div>
                                    <p className="text-[#1F1F1F] opacity-70 font-medium text-xs max-w-[200px] leading-relaxed">
                                        Master speed & logic.
                                    </p>
                                </div>
                                <div className="flex flex-col items-end justify-between h-full">
                                    <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-md text-[#1F1F1F] backdrop-blur-sm mb-4">
                                        24 min/day
                                    </span>
                                    <span className="text-[10px] font-bold text-[#1F1F1F] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                        Start Drill →
                                    </span>
                                </div>
                            </div>
                            {/* Decorative Micro-Trend Graph (SVG) */}
                            <div className="absolute bottom-0 right-0 w-32 h-16 opacity-30 pointer-events-none">
                                <svg width="100%" height="100%" viewBox="0 0 120 60" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="compGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0 45 C20 45, 20 20, 50 20 S80 40, 120 15"
                                        fill="url(#compGradient)"
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        fillOpacity="1"
                                    />
                                    <circle cx="120" cy="15" r="3" fill="white" />
                                </svg>
                            </div>
                        </div>


                        {/* --- ROW 2: FOCUS & MASTERY (Unconditional) --- */}
                        <>
                            {/* Today's Focus (Moss Green) - Enriched Content */}
                            <div className="col-span-12 lg:col-span-6 bg-[#A3B18A] rounded-[1.25rem] p-5 relative overflow-hidden group shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.01] flex flex-col justify-between h-full">
                                <div className="z-10 relative">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[9px] font-black text-[#1F1F1F]/60 uppercase tracking-widest">Today's Focus</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-extrabold text-[#1F1F1F] leading-tight mb-0.5">
                                            CPU Scheduling
                                        </h3>
                                        <p className="text-sm font-bold text-[#1F1F1F]/70">Round Robin Algorithm</p>
                                    </div>

                                    <div className="mt-3">
                                        <span className="text-[10px] font-bold bg-[#1F1F1F]/10 px-2 py-1 rounded text-[#1F1F1F] border border-[#1F1F1F]/5">
                                            High Priority
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between z-10 relative mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-[#1F1F1F]/60">Operating Systems</span>
                                        <span className="text-[10px] font-bold text-[#1F1F1F]/40">•</span>
                                        <span className="text-[10px] font-bold text-[#1F1F1F]/60">45 min</span>
                                    </div>
                                    <button className="w-10 h-10 bg-[#1F1F1F] rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all">
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Abstract Decor */}
                                <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#1F1F1F]/5 clip-path-triangle pointer-events-none" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
                            </div>

                            {/* Concept Mastery Snapshot (Blue) */}
                            <div className="col-span-12 lg:col-span-6 bg-[#A7C5EB] rounded-[1.25rem] p-5 relative overflow-hidden group shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.01] flex flex-col h-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-sm font-extrabold text-[#1F1F1F]">Concept Mastery</h3>
                                    <div className="p-1.5 bg-white/20 rounded-lg">
                                        <Zap className="w-3.5 h-3.5 text-[#1F1F1F]" />
                                    </div>
                                </div>

                                <div className="space-y-3 relative z-10 flex-1">
                                    <div className="flex justify-between items-center py-1 border-b border-[#1F1F1F]/5 last:border-0">
                                        <span className="text-xs font-bold text-[#1F1F1F]/80">CPU Scheduling</span>
                                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-[#1F1F1F]/5 last:border-0">
                                        <span className="text-xs font-bold text-[#1F1F1F]/80">Deadlocks</span>
                                        <XCircle className="w-4 h-4 text-rose-600" />
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-[#1F1F1F]/5 last:border-0">
                                        <span className="text-xs font-bold text-[#1F1F1F]/80">Paging</span>
                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    </div>
                                </div>
                            </div>
                        </>


                        {/* --- ROW 3: CAREER, READINESS, STATS --- */}

                        {/* Career Construction */}
                        <div
                            onClick={() => handlePathSelection('career')}
                            className="col-span-12 lg:col-span-4 bg-[#B5C99A] rounded-[1.25rem] p-5 relative overflow-hidden group cursor-pointer transition-all hover:shadow-md hover:scale-[1.01] flex flex-col justify-between h-full min-h-[160px]"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Briefcase className="w-4 h-4 text-[#1F1F1F] opacity-60" />
                                <span className="font-bold text-[#1F1F1F] uppercase tracking-wide opacity-60 text-[9px]">Professional</span>
                            </div>
                            <h3 className="text-lg font-extrabold text-[#1F1F1F] leading-tight mb-2">Career<br />Construction</h3>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-[10px] font-bold bg-[#1F1F1F]/10 px-2 py-0.5 rounded text-[#1F1F1F]/80">Sys Design</span>
                                <span className="text-[10px] font-bold text-[#1F1F1F] opacity-40">→</span>
                            </div>
                        </div>

                        {/* Readiness & Session Volume */}
                        <>
                            {/* Readiness Indicator */}
                            <div className="col-span-12 lg:col-span-4 bg-white border border-slate-100 rounded-[1.25rem] p-5 flex flex-col justify-between relative hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer h-full">
                                <div>
                                    <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Readiness</h4>
                                    <div className="flex items-end gap-2 mb-3">
                                        <div className="text-3xl font-extrabold text-slate-800 leading-none">62%</div>
                                        <span className="text-[10px] font-bold text-slate-400 mb-0.5">GATE CS</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[62%] bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full" />
                                    </div>
                                </div>
                                <div className="mt-3 text-[10px] font-bold text-rose-600 flex items-center gap-1.5">
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    Focus: System Design
                                </div>
                            </div>

                            {/* Session Volume */}
                            <div className="col-span-12 lg:col-span-4 bg-[#97BCE8] rounded-[1.25rem] p-5 flex flex-col justify-between relative overflow-hidden hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer h-full">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-[#1F1F1F] text-sm leading-snug">Session<br />Volume</h3>
                                    <BarChart2 className="w-4 h-4 text-[#1F1F1F] opacity-50" />
                                </div>
                                <div className="mt-auto relative z-10">
                                    <div className="text-3xl font-extrabold text-[#1F1F1F] tracking-tighter">
                                        03:45
                                        <span className="text-[10px] font-bold opacity-60 ml-1">hrs</span>
                                    </div>
                                    <div className="text-[9px] font-bold text-[#1F1F1F]/60 mt-1">↑ 12% vs last week</div>
                                </div>

                                {/* Session Trend Graph (SVG) */}
                                <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 pointer-events-none">
                                    <svg width="100%" height="100%" viewBox="0 0 200 60" preserveAspectRatio="none">
                                        <path
                                            d="M0 50 Q50 50, 100 30 T200 10"
                                            fill="none"
                                            stroke="#1F1F1F"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />
                                        <circle cx="200" cy="10" r="4" fill="#1F1F1F" />
                                        <line x1="200" y1="10" x2="200" y2="60" stroke="#1F1F1F" strokeWidth="2" strokeDasharray="4 4" />
                                    </svg>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </main>

            {/* Right Panel - Compact Calendar & Timeline - Always Visible */}
            <aside className="w-72 bg-white rounded-[1.5rem] p-5 hidden xl:flex flex-col shadow-xl shadow-gray-200/50 border border-gray-100/50 shrink-0 z-10 h-full overflow-hidden">
                {/* ... Right Sidebar Content ... */}
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4 shrink-0">
                    <h3 className="font-extrabold text-sm text-[#1F1F1F]">May 2026</h3>
                    <div className="flex gap-1 bg-gray-50 p-0.5 rounded-md border border-gray-100">
                        <button className="p-1 hover:bg-white rounded transition-all text-gray-500 hover:text-black"><ChevronRight className="w-3 h-3 rotate-180" /></button>
                        <button className="p-1 hover:bg-white rounded transition-all text-gray-500 hover:text-black"><ChevronRight className="w-3 h-3" /></button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-y-2 text-center text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-6 shrink-0">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <span key={d}>{d}</span>)}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                        <div key={d} className={`w-6 h-6 mx-auto flex items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${d === 15 ? 'bg-[#F2AEC1] text-[#1F1F1F] shadow-sm' : d === 21 ? 'bg-[#1F1F1F] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                            {d}
                        </div>
                    ))}
                </div>

                <div className="w-full h-px bg-gray-100 mb-4 shrink-0" />

                {/* Timeline - Filling Remaining Space */}
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
                                {/* Vertical Line */}
                                {i !== arr.length - 1 && (
                                    <div className="absolute left-[5.5px] top-3 bottom-[-12px] w-[2px] bg-slate-100 group-hover:bg-slate-200 transition-colors" />
                                )}

                                {/* Marker */}
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

                    <button className="w-full py-3 mt-2 shrink-0 bg-[#1F1F1F] text-white rounded-xl font-bold text-xs hover:bg-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                        <span>View Full Schedule</span>
                        <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            </aside>

        </div>
    );
};

export default LandingPage;

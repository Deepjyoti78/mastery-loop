import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight,
    Trophy, Briefcase, Zap, Clock, CheckCircle, AlertTriangle, XCircle, ArrowRight,
    Target, Timer, Activity
} from 'lucide-react';

const CompetitivePage = () => {
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
                            <NavItem icon={BookOpen} label="Academic" onClick={() => navigate('/academic')} />
                            <NavItem icon={Trophy} label="Competitive" active />
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

            {/* Main Content Area - No Scroll */}
            <main className="flex-1 flex flex-col min-w-0 mx-2 h-full relative">

                {/* Top Header - Floating & Transparent (Navbar Fix Applied) */}
                <header className="absolute top-0 left-0 right-0 z-50 h-14 flex items-center justify-between shrink-0 pt-2 pointer-events-none">
                    <div className="pointer-events-auto flex items-center gap-2 flex-1 bg-white rounded-full px-4 py-2 shadow-sm border border-black/5 max-w-lg transition-all hover:shadow-md h-10">
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
                    <div className="pointer-events-auto flex items-center gap-3 ml-4">
                        <button className="relative p-2 bg-white rounded-full shadow-sm border border-black/5 hover:bg-gray-50 transition-colors">
                            <Bell className="w-4 h-4 text-[#1F1F1F]" />
                            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
                        </button>
                        <div className="flex -space-x-2 hover:space-x-1 transition-all">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#FAF9F4] bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 shadow-sm relative z-${10 - i}`}>U{i}</div>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Competitive Content Scrollable Area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-6 pr-2 pt-16">

                    {/* 1. Page Header */}
                    <div className="mb-8 px-1">
                        <h1 className="text-3xl font-extrabold text-[#1F1F1F] tracking-tight mb-1">Competitive Edge</h1>
                        <p className="text-gray-500 font-medium text-sm">
                            Train for speed, accuracy, and exam pressure.
                        </p>
                    </div>

                    {/* 2. Exam Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {[
                            { name: 'GATE CS', year: '2027', time: '2h/day', active: true },
                            { name: 'UGC NET', year: '2026', time: '1.5h/day', active: false },
                            { name: 'ISRO', year: 'TBD', time: '1h/day', active: false },
                        ].map((exam, i) => (
                            <div key={i} className={`p-4 rounded-[1.25rem] border transition-all cursor-pointer hover:shadow-md group relative overflow-hidden flex flex-col justify-between h-32
                                ${exam.active ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] shadow-lg scale-[1.02]' : 'bg-white text-[#1F1F1F] border-slate-100 hover:border-slate-300'}`}>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg">{exam.name}</h3>
                                    {exam.active && <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />}
                                </div>
                                <div>
                                    <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${exam.active ? 'text-gray-400' : 'text-gray-400'}`}>Target: {exam.year}</div>
                                    <div className={`text-[10px] font-medium opacity-70`}>{exam.time} Rec.</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                        {/* 3. Active Drill (Primary) - Span 8 */}
                        <div className="col-span-12 md:col-span-8 flex flex-col gap-6">

                            {/* Drill Card */}
                            <div className="bg-[#F2AEC1] rounded-[1.5rem] p-6 relative overflow-hidden group shadow-sm flex flex-col sm:flex-row items-center gap-6 min-h-[200px]">
                                <div className="flex-1 z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                                            <Zap className="w-4 h-4 text-[#1F1F1F]" />
                                        </div>
                                        <span className="text-[10px] font-black text-[#1F1F1F]/60 uppercase tracking-widest">Active Speed Drill</span>
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-[#1F1F1F] mb-1 leading-tight">CPU Scheduling – <br />MCQ Speed Test</h2>
                                    <div className="flex items-center gap-3 mt-3">
                                        <span className="px-2 py-1 bg-white/30 rounded-md text-[10px] font-bold text-[#1F1F1F]">20 Questions</span>
                                        <span className="px-2 py-1 bg-white/30 rounded-md text-[10px] font-bold text-[#1F1F1F]">15 Minutes</span>
                                    </div>
                                </div>
                                <div className="z-10 w-full sm:w-auto">
                                    <button className="w-full sm:w-auto px-8 py-4 bg-[#1F1F1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg active:scale-[0.95] flex items-center justify-center gap-2 group-hover:px-10">
                                        Start Drill <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                                {/* Bar Chart Decor */}
                                <div className="absolute bottom-0 right-32 flex items-end gap-2 h-16 opacity-20 pointer-events-none">
                                    {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                        <div key={i} className="w-4 bg-white rounded-t-sm" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>

                            {/* 5. Weak Area Drills */}
                            <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-extrabold text-[#1F1F1F]">Targeted Practice Zones</h3>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Based on Error Logs</span>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { topic: 'Deadlocks', acc: '42%', color: 'text-rose-600', bg: 'bg-rose-50' },
                                        { topic: 'Concurrency Control', acc: '55%', color: 'text-amber-600', bg: 'bg-amber-50' },
                                        { topic: 'Memory Management', acc: '61%', color: 'text-amber-600', bg: 'bg-amber-50' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center font-bold text-xs ${item.color}`}>
                                                    {item.acc}
                                                </div>
                                                <span className="font-bold text-sm text-[#1F1F1F]">{item.topic}</span>
                                            </div>
                                            <button className="text-[10px] font-bold text-slate-400 group-hover:text-[#1F1F1F] flex items-center gap-1 transition-colors">
                                                Start <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 4. Performance Snapshot (Right Column) - Span 4 */}
                        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">

                            {/* Stats Card */}
                            <div className="bg-[#1F1F1F] rounded-[1.5rem] p-5 text-white shadow-lg relative overflow-hidden">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Performance Pulse</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-extrabold tracking-tight">84%</div>
                                        <div className="text-[10px] text-gray-400 font-medium mt-1">Global Accuracy</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-extrabold tracking-tight">42s</div>
                                        <div className="text-[10px] text-gray-400 font-medium mt-1">Avg. Time/Q</div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-gray-400">Weakest Link</span>
                                        <span className="text-[10px] font-bold text-rose-400">Deadlocks (42%)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity Mini-List */}
                            <div className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm flex-1">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Recent Sessions</h3>
                                <div className="space-y-4 relative">
                                    {/* Line */}
                                    <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-slate-100" />

                                    {[
                                        { type: 'Speed Drill', score: '18/20', time: '12m' },
                                        { type: 'Mock Test 2', score: '52/65', time: '1.5h' },
                                        { type: 'Topic: Paging', score: '8/10', time: '8m' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-3 relative z-10">
                                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white shadow-sm shrink-0" />
                                            <div>
                                                <div className="text-xs font-bold text-[#1F1F1F]">{s.type}</div>
                                                <div className="text-[10px] font-medium text-gray-400">{s.score} • {s.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
                        <button className="p-1 hover:bg-white rounded transition-all text-gray-500 hover:text-black"><ChevronRight className="w-3 h-3 rotate-180" /></button>
                        <button className="p-1 hover:bg-white rounded transition-all text-gray-500 hover:text-black"><ChevronRight className="w-3 h-3" /></button>
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
                </div>
            </aside>
        </div>
    );
};

export default CompetitivePage;

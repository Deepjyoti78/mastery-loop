import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight,
    Trophy, Briefcase, Zap, Clock, CheckCircle, AlertTriangle, XCircle, ArrowRight,
    Target, Timer, Activity, ChevronLeft
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const CompetitivePage = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


    return (
        <div className="flex flex-col md:flex-row h-screen w-full bg-[#FAF9F4] md:p-3 md:gap-3 font-sans overflow-hidden text-[#1F1F1F]">

            {/* Sidebar - Compact (Global) */}
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

            {/* Main Content Area - No Scroll */}
            <main className="flex-1 flex flex-col min-w-0 md:mx-2 h-full relative">

                {/* Top Header - Standardized for Consistency */}
                <header className="absolute top-0 left-0 right-0 z-10 h-20 flex flex-col justify-center gap-4 md:flex-row md:items-center md:justify-between px-4 md:px-2 shrink-0 pt-20 md:pt-4 pointer-events-none bg-[#FAF9F4]/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none transition-all pb-4">
                    <div className="pointer-events-auto">
                        <h1 className="text-xl md:text-2xl font-bold text-[#1F1F1F] tracking-tight flex items-center gap-2">
                            Competitive Edge
                        </h1>
                        <p className="text-[#1F1F1F]/60 font-medium text-sm">Train for speed, accuracy, and exam pressure.</p>
                    </div>

                    <div className="flex items-center gap-3 pointer-events-auto self-end md:self-auto w-full md:w-auto justify-end">
                        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-black/5 w-full md:w-56 transition-all hover:shadow-md h-10">
                            <Search className="w-3.5 h-3.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search exams..."
                                className="flex-1 bg-transparent border-none outline-none text-xs font-medium placeholder:text-gray-400 text-[#1F1F1F]"
                            />
                        </div>
                        <button className="p-2.5 bg-white rounded-full shadow-sm border border-black/5 hover:bg-gray-50 transition-colors shrink-0">
                            <Bell className="w-4 h-4 text-[#1F1F1F]" />
                        </button>
                    </div>
                </header>

                {/* Competitive Content Scrollable Area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-6 md:pr-2 pt-44 md:pt-24 px-4 md:px-0">

                    {/* 2. Exam Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                        {[
                            { name: 'GATE CS', year: '2027', time: '2h/day', active: true },
                            { name: 'UGC NET', year: '2026', time: '1.5h/day', active: false },
                            { name: 'ISRO', year: 'TBD', time: '1h/day', active: false },
                        ].map((exam, i) => (
                            <div key={i} className={`p-4 rounded-[1rem] border transition-all cursor-pointer hover:shadow-md group relative overflow-hidden flex flex-col justify-between
                                ${exam.active ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] shadow-lg scale-[1.01]' : 'bg-white text-[#1F1F1F] border-slate-100 hover:border-slate-300'}`}>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-base">{exam.name}</h3>
                                    {exam.active && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className={`text-[10px] font-bold uppercase tracking-wider ${exam.active ? 'text-gray-400' : 'text-gray-400'}`}>Target: {exam.year}</div>
                                    <div className={`text-[10px] font-medium opacity-70`}>{exam.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                        {/* 3. Active Drill (Primary) - Span 8 */}
                        <div className="col-span-12 md:col-span-8 flex flex-col gap-4">

                            {/* Drill Card */}
                            <div className="bg-[#F2AEC1] rounded-[1.25rem] p-5 relative overflow-hidden group shadow-sm flex flex-col sm:flex-row items-center gap-4 min-h-[160px]">
                                <div className="flex-1 z-10 w-full">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1 bg-white/20 rounded-lg backdrop-blur-sm">
                                            <Zap className="w-3.5 h-3.5 text-[#1F1F1F]" />
                                        </div>
                                        <span className="text-[9px] font-black text-[#1F1F1F]/60 uppercase tracking-widest">Active Speed Drill</span>
                                    </div>
                                    <h2 className="text-xl font-extrabold text-[#1F1F1F] mb-1 leading-tight">CPU Scheduling – <br />MCQ Speed Test</h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="px-2 py-0.5 bg-white/30 rounded text-[9px] font-bold text-[#1F1F1F]">20 Questions</span>
                                        <span className="px-2 py-0.5 bg-white/30 rounded text-[9px] font-bold text-[#1F1F1F]">15 Minutes</span>
                                    </div>
                                </div>
                                <div className="z-10 w-full sm:w-auto mt-2 sm:mt-0">
                                    <button
                                        onClick={() => navigate('/competitive/drill')}
                                        className="w-full sm:w-auto px-6 py-3 bg-[#1F1F1F] text-white rounded-lg font-bold text-xs hover:bg-black transition-all shadow-lg active:scale-[0.95] flex items-center justify-center gap-2 group-hover:px-8"
                                    >
                                        Start Drill <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                {/* Bar Chart Decor */}
                                <div className="absolute bottom-0 right-32 flex items-end gap-1.5 h-12 opacity-20 pointer-events-none">
                                    {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                        <div key={i} className="w-3 bg-white rounded-t-sm" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>

                            {/* 5. Weak Area Drills */}
                            <div className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-extrabold text-[#1F1F1F] text-sm">Targeted Practice Zones</h3>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Based on Error Logs</span>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { topic: 'Deadlocks', acc: '42%', color: 'text-rose-600', bg: 'bg-rose-50' },
                                        { topic: 'Concurrency Control', acc: '55%', color: 'text-amber-600', bg: 'bg-amber-50' },
                                        { topic: 'Memory Management', acc: '61%', color: 'text-amber-600', bg: 'bg-amber-50' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-7 h-7 rounded-md ${item.bg} flex items-center justify-center font-bold text-[10px] ${item.color}`}>
                                                    {item.acc}
                                                </div>
                                                <span className="font-bold text-xs text-[#1F1F1F]">{item.topic}</span>
                                            </div>
                                            <button className="text-[9px] font-bold text-slate-400 group-hover:text-[#1F1F1F] flex items-center gap-1 transition-colors">
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
                            <div className="bg-[#1F1F1F] rounded-[1.25rem] p-5 text-white shadow-lg relative overflow-hidden">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Performance Pulse</h3>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <div className="text-2xl font-extrabold tracking-tight">84%</div>
                                        <div className="text-[9px] text-gray-400 font-medium mt-0.5">Global Accuracy</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-extrabold tracking-tight">42s</div>
                                        <div className="text-[9px] text-gray-400 font-medium mt-0.5">Avg. Time/Q</div>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-gray-400">Weakest Link</span>
                                        <span className="text-[9px] font-bold text-rose-400">Deadlocks (42%)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity Mini-List */}
                            <div className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-sm flex-1">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Recent Sessions</h3>
                                <div className="space-y-3 relative">
                                    {/* Line */}
                                    <div className="absolute left-[4.5px] top-1.5 bottom-1.5 w-[1px] bg-slate-100" />

                                    {[
                                        { type: 'Speed Drill', score: '18/20', time: '12m' },
                                        { type: 'Mock Test 2', score: '52/65', time: '1.5h' },
                                        { type: 'Topic: Paging', score: '8/10', time: '8m' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-3 relative z-10">
                                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white shadow-sm shrink-0" />
                                            <div>
                                                <div className="text-xs font-bold text-[#1F1F1F] mb-0.5">{s.type}</div>
                                                <div className="text-[9px] font-medium text-gray-400">{s.score} • {s.time}</div>
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
            <div className="hidden xl:block h-full">
                <RightSidebar />
            </div>
        </div>
    );
};

export default CompetitivePage;

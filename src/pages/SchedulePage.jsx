import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight, ChevronLeft, Target,
    Clock, Plus, MoreHorizontal, Move, Trophy, Briefcase
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const SchedulePage = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [viewMode, setViewMode] = useState('Week'); // 'Week' or 'Day'


    // Mock Schedule Data for Week View
    const scheduleItems = [
        { day: 'Mon', time: '07:00', duration: 1, title: 'Calculus Review', track: 'Academic', color: 'bg-amber-100 border-amber-200 text-amber-900' },
        { day: 'Mon', time: '08:30', duration: 0.5, title: 'Speed Drill', track: 'Competitive', color: 'bg-rose-100 border-rose-200 text-rose-900' },
        { day: 'Tue', time: '14:00', duration: 1.5, title: 'System Design', track: 'Career', color: 'bg-emerald-100 border-emerald-200 text-emerald-900' },
        { day: 'Wed', time: '10:00', duration: 1, title: 'Data Structures', track: 'Academic', color: 'bg-amber-100 border-amber-200 text-amber-900' },
        { day: 'Thu', time: '16:30', duration: 0.75, title: 'Mock Interview', track: 'Career', color: 'bg-blue-100 border-blue-200 text-blue-900' },
        { day: 'Fri', time: '09:00', duration: 2, title: 'Full Length Test', track: 'Competitive', color: 'bg-rose-100 border-rose-200 text-rose-900' },
    ];

    const timeSlots = Array.from({ length: 16 }, (_, i) => i + 7); // 07:00 to 22:00

    return (
        <div className="flex flex-col md:flex-row h-screen w-full bg-[#FAF9F4] md:p-3 md:gap-3 font-sans overflow-hidden text-[#1F1F1F]">
            {/* Sidebar */}
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 md:mx-2 h-full relative">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 px-4 md:px-1 pt-16 md:pt-2 gap-4 md:gap-0 shrink-0">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1F1F1F] tracking-tight mb-1">Your Schedule</h1>
                        <p className="text-gray-500 font-medium text-sm">Plan and manage your learning sessions.</p>
                    </div>
                    <div className="flex items-center gap-3 self-start md:self-auto">
                        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                            {['Week', 'Day'].map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === mode ? 'bg-[#1F1F1F] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                        <button className="p-2 bg-[#1F1F1F] text-white rounded-xl shadow-lg hover:bg-black transition-all">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Schedule Grid */}
                <div className="flex-1 bg-white rounded-[1.5rem] border border-slate-100 flex flex-col overflow-hidden shadow-sm mx-4 md:mx-0 mb-4 md:mb-0">
                    <div className="flex-1 flex flex-col overflow-x-auto">
                        <div className="min-w-[800px] flex flex-col h-full">
                            {/* Week Header */}
                            <div className="grid grid-cols-8 border-b border-slate-100 shrink-0">
                                <div className="p-4 border-r border-slate-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center pt-5">Time</div>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                    <div key={day} className="p-4 text-center border-r border-slate-50 last:border-0">
                                        <div className="text-xs font-bold text-[#1F1F1F]">{day}</div>
                                        <div className="text-[10px] font-medium text-gray-400">12</div>
                                    </div>
                                ))}
                            </div>

                            {/* Scrollable Grid */}
                            <div className="flex-1 overflow-y-auto scrollbar-hide relative bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-opacity-5">
                                {timeSlots.map(hour => (
                                    <div key={hour} className="grid grid-cols-8 h-20 border-b border-slate-50">
                                        <div className="border-r border-slate-100 text-[10px] font-medium text-gray-400 flex justify-center pt-2 relative">
                                            <span className="-mt-3 bg-white px-1">{hour}:00</span>
                                        </div>
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                            <div key={i} className="border-r border-slate-50 last:border-0 relative group">
                                                {/* Hover effect for add */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#1F1F1F]/5 transition-opacity cursor-pointer flex items-center justify-center">
                                                    <Plus className="w-4 h-4 text-[#1F1F1F]/20" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                {/* Overlay Events */}
                                {/* This is a simplified positioning logic. Real implementation would calculate exact pixels. */}
                                <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none grid grid-cols-8">
                                    <div className="col-span-1"></div> {/* Time axis offset */}
                                    {/* Render items based on mock offsets */}

                                    {/* Calculus Review: Mon 07:00 (Row 0) */}
                                    <div className="absolute top-[0px] left-[12.5%] w-[12.5%] h-[80px] p-1 pointer-events-auto">
                                        <div className="w-full h-full bg-amber-100 border border-amber-200 rounded-lg p-2 text-amber-900 border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                            <div className="text-xs font-bold">Calculus Review</div>
                                            <div className="text-[9px] font-medium opacity-80">07:00 - 08:00</div>
                                        </div>
                                    </div>

                                    {/* Speed Drill: Mon 08:30 (Row 1.5) */}
                                    <div className="absolute top-[120px] left-[12.5%] w-[12.5%] h-[40px] p-1 pointer-events-auto">
                                        <div className="w-full h-full bg-rose-100 border border-rose-200 rounded-lg p-1 px-2 text-rose-900 border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center">
                                            <div className="text-xs font-bold truncate">Speed Drill</div>
                                        </div>
                                    </div>

                                    {/* System Design: Tue 14:00 (Row 7) -> 14-7 = 7 * 80px = 560px */}
                                    <div className="absolute top-[560px] left-[25%] w-[12.5%] h-[120px] p-1 pointer-events-auto">
                                        <div className="w-full h-full bg-emerald-100 border border-emerald-200 rounded-lg p-2 text-emerald-900 border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                            <div className="text-xs font-bold">System Design</div>
                                            <div className="text-[9px] font-medium opacity-80">14:00 - 15:30</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="hidden xl:block h-full">
                <RightSidebar />
            </div>
        </div>
    );
};

export default SchedulePage;

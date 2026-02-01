import React, { useState } from 'react';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight,
    CheckCircle, AlertTriangle, XCircle, ArrowRight,
    Layers, Brain, Target, Trophy, Briefcase, ChevronLeft,
    Clock, Zap, Info, Play, PenTool, Eye, Flag, Map
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import Sidebar from '../components/Sidebar';

const TodayFocusPage = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [currentUser, setCurrentUser] = useState({ name: 'Guest User', role: 'Student Plan' });

    React.useEffect(() => {
        const userData = localStorage.getItem('mastery_user_data');
        if (userData) {
            const parsed = JSON.parse(userData);
            setCurrentUser({ name: parsed.name, role: parsed.email || 'Student Plan' });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('mastery_auth');
        window.location.href = '/';
    };
    const [focusTopic, setFocusTopic] = useState({
        subject: 'Operating Systems',
        title: 'CPU Scheduling: Round Robin',
        time: '45 min estimated',
        insight: 'Weakness detected in Preemptive Scheduling',
        goal: 'Mastering Round Robin unlocks Deadlock Prevention'
    });

    React.useEffect(() => {
        const savedSubject = localStorage.getItem('mastery_subject');
        if (savedSubject) {
            const mapping = {
                'Operating Systems': {
                    subject: 'Operating Systems',
                    title: 'CPU Scheduling: Round Robin',
                    time: '45 min estimated',
                    insight: 'Weakness detected in Preemptive Scheduling.',
                    goal: 'Mastering Round Robin unlocks Deadlock Prevention.'
                },
                'Data Structures': {
                    subject: 'Data Structures',
                    title: 'Linked Lists: Pointer Reversal',
                    time: '60 min estimated',
                    insight: 'Gap detected in Pointer Manipulation.',
                    goal: 'Essential for Graph Algorithms and Trees.'
                },
                'DBMS': {
                    subject: 'DBMS',
                    title: 'Normalization: 3rd Normal Form',
                    time: '30 min estimated',
                    insight: 'Redundancy issues found in recent schema design.',
                    goal: 'Required for optimized Database Design.'
                },
                'Computer Networks': {
                    subject: 'Computer Networks',
                    title: 'TCP/IP: Three-Way Handshake',
                    time: '50 min estimated',
                    insight: 'Connection establishment concepts weak.',
                    goal: 'Foundation for understanding HTTP/HTTPS.'
                }
            };
            if (mapping[savedSubject]) {
                setFocusTopic(mapping[savedSubject]);
            }
        }
    }, []);

    const NavItem = ({ icon: Icon, label, active, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all duration-200 ease-out group outline-none focus:ring-2 focus:ring-white/20 active:scale-[0.98] active:translate-y-0 ${active
                ? 'bg-white/10 text-white font-medium shadow-sm translate-y-[-1px]'
                : 'text-gray-400 hover:text-white hover:bg-white/5 hover:-translate-y-[1px] hover:shadow-md'
                }`}
            title={isSidebarCollapsed ? label : ''}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
            {!isSidebarCollapsed && <span className="text-sm tracking-wide">{label}</span>}
        </button>
    );

    const SessionStep = ({ icon: Icon, title, time, status, isLast }) => (
        <div className="flex gap-3 relative group">
            <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border z-10 
                    ${status === 'active'
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                        : status === 'completed'
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white border-slate-200 text-slate-300'
                    }`}>
                    <Icon className="w-3 h-3" />
                </div>
                {!isLast && <div className={`w-0.5 flex-1 my-1 ${status === 'completed' ? 'bg-emerald-200' : 'bg-slate-100'}`} />}
            </div>
            <div className="pb-5 pt-0.5 flex-1">
                <div className="flex justify-between items-start">
                    <h4 className={`text-xs font-bold ${status === 'active' ? 'text-slate-900' : 'text-slate-500'}`}>{title}</h4>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">{time}</span>
                </div>
                {status === 'active' && (
                    <div className="mt-1.5 flex gap-2">
                        <span className="text-[9px] uppercase font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-sm border border-indigo-100/50">In Progress</span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row h-screen w-full bg-[#FAF9F4] md:p-3 md:gap-3 font-sans overflow-hidden text-[#1F1F1F]">

            {/* Sidebar - Compact (Global) */}
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 md:mx-2 h-full relative">

                {/* Top Header - Standardized for Consistency */}
                <header className="absolute top-0 left-0 right-0 z-10 h-20 flex flex-col justify-center gap-4 md:flex-row md:items-center md:justify-between px-4 md:px-2 shrink-0 pt-20 md:pt-4 pointer-events-none bg-[#FAF9F4]/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none transition-all pb-4">
                    <div className="pointer-events-auto">
                        <h1 className="text-xl md:text-2xl font-bold text-[#1F1F1F] tracking-tight flex items-center gap-2">
                            Daily Execution
                        </h1>
                        <p className="text-[#1F1F1F]/60 font-medium text-sm">Your prioritized mission plan</p>
                    </div>

                    <div className="flex items-center gap-3 pointer-events-auto self-end md:self-auto w-full md:w-auto justify-end">
                        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-black/5 w-full md:w-56 transition-all hover:shadow-md h-10">
                            <Search className="w-3.5 h-3.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search concepts..."
                                className="flex-1 bg-transparent border-none outline-none text-xs font-medium placeholder:text-gray-400 text-[#1F1F1F]"
                            />
                        </div>
                        <button className="p-2.5 bg-white rounded-full shadow-sm border border-black/5 hover:bg-gray-50 transition-colors shrink-0">
                            <Bell className="w-4 h-4 text-[#1F1F1F]" />
                        </button>
                    </div>
                </header>

                {/* Execution Dashboard Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-6 md:pr-2 pt-44 md:pt-24 px-4 md:px-0">
                    <div className="max-w-6xl mx-auto space-y-4">

                        {/* SECTION A: Mission Header - Compact */}
                        <div className="bg-white rounded-[1rem] p-5 shadow-sm border border-slate-200/60 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between relative overflow-hidden group">
                            {/* Decorative Background Blur */}
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none group-hover:opacity-80 transition-opacity" />

                            <div className="flex-1 relative z-10">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                                        Today's Mission
                                    </span>
                                    <span className="text-[9px] font-bold text-slate-300">•</span>
                                    <span className="text-[9px] font-bold text-slate-400">Step 1 of 4</span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-[#1F1F1F] leading-tight mb-3">
                                    {focusTopic.title}
                                </h2>
                                <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-slate-500">
                                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                        <Layers className="w-3 h-3 text-slate-400" />
                                        {focusTopic.subject}
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                        <Target className="w-3 h-3 text-slate-400" />
                                        Medium Difficulty
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-700 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">
                                        <Clock className="w-3 h-3 text-orange-500" />
                                        {focusTopic.time}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row items-center gap-2 w-full md:w-auto relative z-10">
                                <button
                                    className="px-4 py-2.5 rounded-lg font-bold text-xs border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
                                    onClick={() => navigate('/academic')}
                                >
                                    <Map className="w-3.5 h-3.5" />
                                    Syllabus
                                </button>
                                <button
                                    onClick={() => navigate('/academic/learn/operating-systems/round-robin')}
                                    className="px-5 py-2.5 bg-[#1F1F1F] hover:bg-black text-white rounded-lg font-bold text-xs shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 flex-1 md:flex-none"
                                >
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                    Start Session
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-20 md:pb-0">

                            {/* SECTION B: Action Breakdown */}
                            <div className="md:col-span-8 bg-white rounded-[1rem] p-5 shadow-sm border border-slate-200/60 h-full flex flex-col">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Layers className="w-3.5 h-3.5" />
                                    Session Plan
                                </h3>

                                <div className="pl-1 flex-1">
                                    <SessionStep
                                        icon={BookOpen}
                                        title="Read concept explanation"
                                        time="10 min"
                                        status="active"
                                    />
                                    <SessionStep
                                        icon={Eye}
                                        title="Walk through example"
                                        time="10 min"
                                        status="pending"
                                    />
                                    <SessionStep
                                        icon={PenTool}
                                        title="Solve practice questions"
                                        time="15 min"
                                        status="pending"
                                    />
                                    <SessionStep
                                        icon={Flag}
                                        title="Quick recap & check"
                                        time="5 min"
                                        status="pending"
                                        isLast
                                    />
                                </div>
                            </div>

                            {/* SECTION C: Why This Was Chosen */}
                            <div className="md:col-span-4 space-y-4">
                                <div className="bg-white rounded-[1rem] p-5 shadow-sm border border-slate-200/60">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Zap className="w-3.5 h-3.5" />
                                        Adaptive Insight
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-100/60 hover:border-amber-200 transition-colors">
                                            <div className="flex items-center gap-2 mb-1">
                                                <AlertTriangle className="w-3 h-3 text-amber-600" />
                                                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">Detection</span>
                                            </div>
                                            <p className="text-[10px] text-amber-900/80 leading-relaxed font-medium">
                                                {focusTopic.insight}
                                            </p>
                                        </div>

                                        <div className="p-2.5 bg-indigo-50/50 rounded-lg border border-indigo-100/60 hover:border-indigo-200 transition-colors">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Target className="w-3 h-3 text-indigo-600" />
                                                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide">Strategic Goal</span>
                                            </div>
                                            <p className="text-[10px] text-indigo-900/80 leading-relaxed font-medium">
                                                {focusTopic.goal}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mini Stat */}
                                <div className="bg-[#1F1F1F] rounded-[1rem] p-5 text-white relative overflow-hidden group shadow-lg">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Target className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">Current Streak</h3>
                                    <div className="text-2xl font-bold flex items-center gap-2 mb-3">
                                        4 Days <span className="text-lg animate-pulse">🔥</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                        <div className="w-4/5 h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full" />
                                    </div>
                                    <p className="text-[9px] font-medium text-white/50 mt-1.5">3 more days to hit weekly goal</p>
                                </div>
                            </div>
                        </div>

                        {/* NEW SECTION: Quick Resource Access (Filling Bottom Space) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-20 md:pb-0">
                            {[
                                { title: 'Previous Mistake', desc: 'Deadlock avoidance in RR', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' },
                                { title: 'Core Concept', desc: 'Time Quantum selection', icon: Brain, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                                { title: 'Flashcard Deck', desc: 'Scheduling Algorithms', icon: Layers, color: 'text-amber-500', bg: 'bg-amber-50' },
                                { title: 'Community Note', desc: 'Tips from top rankers', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                    <div className={`w-8 h-8 ${item.bg} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                    </div>
                                    <h4 className="font-bold text-[#1F1F1F] text-xs mb-1">{item.title}</h4>
                                    <p className="text-[10px] text-gray-500 font-medium">{item.desc}</p>
                                </div>
                            ))}
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

export default TodayFocusPage;

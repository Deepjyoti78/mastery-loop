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
        <div className="flex gap-4 relative">
            <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-white ${status === 'active' ? 'border-indigo-600 text-indigo-600' : 'border-slate-200 text-slate-400'
                    }`}>
                    <Icon className="w-3.5 h-3.5" />
                </div>
                {!isLast && <div className="w-0.5 flex-1 bg-slate-100 my-1" />}
            </div>
            <div className="pb-6 pt-1">
                <h4 className={`text-sm font-bold ${status === 'active' ? 'text-slate-900' : 'text-slate-500'}`}>{title}</h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-slate-400">{time}</span>
                    {status === 'active' && (
                        <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Active</span>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">

            {/* Sidebar - Compact (Global) */}
            <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-56'} bg-[#1F1F1F] rounded-[1.5rem] p-4 flex flex-col hidden md:flex shrink-0 shadow-2xl shadow-black/5 z-20 transition-all duration-300 relative`}>
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -right-3 top-10 w-6 h-6 bg-[#1F1F1F] rounded-full shadow-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 z-50 transition-colors"
                >
                    {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                <div className={`flex items-center gap-3 mb-8 px-2 pt-1 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1F1F1F] font-bold text-lg shadow-md shrink-0">M</div>
                    {!isSidebarCollapsed && <span className="font-bold text-base tracking-tight text-white whitespace-nowrap overflow-hidden">MasteryLoop</span>}
                </div>
                <div className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
                    <section>
                        {!isSidebarCollapsed && <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">General</div>}
                        <nav className="space-y-0.5">
                            <NavItem icon={LayoutGrid} label="Dashboard" onClick={() => navigate('/')} />
                            <NavItem icon={Target} label="Today's Focus" active />
                            <NavItem icon={BookOpen} label="Academic" onClick={() => navigate('/academic')} />
                            <NavItem icon={Trophy} label="Competitive" onClick={() => navigate('/competitive')} />
                            <NavItem icon={Briefcase} label="Career" onClick={() => navigate('/career')} />
                            <NavItem icon={BarChart2} label="Analytics" onClick={() => navigate('/analytics')} />
                            <NavItem icon={Calendar} label="Schedule" onClick={() => navigate('/schedule')} />
                        </nav>
                    </section>
                    <section>
                        {!isSidebarCollapsed && <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">Tools</div>}
                        <nav className="space-y-0.5">
                            <NavItem icon={Settings} label="Search" />
                            <NavItem icon={LogOut} label="Log out" onClick={handleLogout} />
                        </nav>
                    </section>
                </div>
                <div className="mt-auto pt-4 border-t border-white/5">
                    <div className={`bg-white/5 p-2 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-inner shrink-0" />
                        {!isSidebarCollapsed && (
                            <div className="overflow-hidden">
                                <div className="text-sm font-bold text-white whitespace-nowrap">{currentUser.name}</div>
                                <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{currentUser.role}</div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 mx-2 h-full relative">

                {/* Top Header */}
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

                {/* Execution Dashboard Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-6 pr-2 pt-16">
                    <div className="max-w-5xl mx-auto space-y-6">

                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-extrabold text-[#1F1F1F] tracking-tight">Daily Execution</h1>
                                <p className="text-sm font-medium text-gray-500">Your prioritized mission plan.</p>
                            </div>
                            <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 shadow-sm">
                                January 29, 2026
                            </div>
                        </div>

                        {/* SECTION A: Mission Header */}
                        <div className="bg-white rounded-[1.25rem] p-6 shadow-sm border border-slate-200/60 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                        Today's Mission
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400">•</span>
                                    <span className="text-[10px] font-bold text-slate-500">Step 1 of 4</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1F1F1F] leading-tight mb-2">
                                    {focusTopic.title}
                                </h2>
                                <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5" />
                                        {focusTopic.subject}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Target className="w-3.5 h-3.5" />
                                        Medium Difficulty
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-700">
                                        <Clock className="w-3.5 h-3.5" />
                                        {focusTopic.time}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button
                                    className="px-5 py-3 rounded-xl font-bold text-sm border-2 border-slate-100 text-slate-600 hover:border-slate-300 hover:text-slate-800 transition-all flex items-center gap-2"
                                    onClick={() => navigate('/academic')}
                                >
                                    <Map className="w-4 h-4" />
                                    View Syllabus
                                </button>
                                <button
                                    onClick={() => navigate('/academic/learn/operating-systems/round-robin')}
                                    className="px-6 py-3 bg-[#1F1F1F] hover:bg-black text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 flex-1 md:flex-none justify-center"
                                >
                                    <Play className="w-4 h-4 fill-current" />
                                    Start Session
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                            {/* SECTION B: Action Breakdown */}
                            <div className="md:col-span-7 bg-white rounded-[1.25rem] p-6 shadow-sm border border-slate-200/60 h-full">
                                <h3 className="text-base font-bold text-[#1F1F1F] mb-6 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                                        <Layers className="w-3.5 h-3.5 text-slate-600" />
                                    </div>
                                    Session Plan
                                </h3>

                                <div className="pl-2">
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
                            <div className="md:col-span-5 space-y-6">
                                <div className="bg-white rounded-[1.25rem] p-6 shadow-sm border border-slate-200/60">
                                    <h3 className="text-base font-bold text-[#1F1F1F] mb-4 flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center">
                                            <Zap className="w-3.5 h-3.5 text-indigo-600" />
                                        </div>
                                        Adaptive Insight
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                                            <div className="flex items-center gap-2 mb-1">
                                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                                <span className="text-xs font-bold text-amber-700 uppercase">Detection</span>
                                            </div>
                                            <p className="text-xs text-amber-900 leading-relaxed font-medium">
                                                {focusTopic.insight}
                                            </p>
                                        </div>

                                        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Target className="w-3.5 h-3.5 text-indigo-600" />
                                                <span className="text-xs font-bold text-indigo-700 uppercase">Strategic Goal</span>
                                            </div>
                                            <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                                                {focusTopic.goal}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mini Stat */}
                                <div className="bg-[#1F1F1F] rounded-[1.25rem] p-6 text-white relative overflow-hidden">
                                    <h3 className="text-sm font-bold opacity-80 mb-1">Current Streak</h3>
                                    <div className="text-3xl font-extrabold flex items-center gap-2">
                                        4 Days <span className="text-2xl">🔥</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                                        <div className="w-4/5 h-full bg-orange-500 rounded-full" />
                                    </div>
                                    <p className="text-[10px] font-medium opacity-60 mt-1">Keep it up to reach 7 days</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </main>

            <RightSidebar />
        </div>
    );
};

export default TodayFocusPage;

import React, { useState, useEffect } from 'react';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight,
    CheckCircle, AlertTriangle, XCircle, ArrowRight,
    Layers, Brain, Target, Trophy, Briefcase, ChevronLeft,
    Lock, Play, Book, Clock, Star, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';

const AcademicExcellence = () => {
    const navigate = useNavigate();
    const [selectedSubject, setSelectedSubject] = useState('Operating Systems');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [currentUser, setCurrentUser] = useState({ name: 'Guest User', role: 'Student Plan' });

    useEffect(() => {
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

    // Mock Data for Subjects
    const subjects = [
        { name: 'Data Structures', concepts: 24, progress: 65, color: 'text-emerald-500', status: 'On Track' },
        { name: 'Operating Systems', concepts: 18, progress: 40, color: 'text-amber-500', status: 'Needs Work' },
        { name: 'DBMS', concepts: 12, progress: 85, color: 'text-emerald-500', status: 'On Track' },
        { name: 'Comp. Networks', concepts: 20, progress: 25, color: 'text-rose-500', status: 'Behind' },
    ];

    // Mock Data for Concept Lists
    const conceptMaps = {
        'Operating Systems': [
            { title: 'Process States & PCB', difficulty: 'Easy', status: 'Mastered', time: '25 min', desc: 'Understand process lifecycle and control blocks.' },
            { title: 'CPU Scheduling Algorithms', difficulty: 'Medium', status: 'In Progress', time: '45 min', desc: 'Master FCFS, SJF, and Round Robin scheduling.' },
            { title: 'Thread Concurrency & Sync', difficulty: 'Hard', status: 'Weak', prereq: 'Process States & PCB', time: '50 min', desc: 'Deep dive into mutex locks and semaphores.' },
            { title: 'Deadlock Prevention', difficulty: 'Hard', status: 'Locked', prereq: 'Thread Concurrency', time: '40 min', desc: 'Learn strategies to avoid system standstills.' },
            { title: 'Memory Paging', difficulty: 'Medium', status: 'Locked', prereq: 'CPU Scheduling', time: '35 min', desc: 'Explore virtual memory and page tables.' },
        ],
        'Data Structures': [
            { title: 'Arrays & Strings', difficulty: 'Easy', status: 'Mastered', time: '20 min', desc: 'Fundamental operations and manipulations.' },
            { title: 'Linked Lists', difficulty: 'Easy', status: 'Mastered', time: '30 min', desc: 'Singly, doubly, and circular linked lists.' },
            { title: 'Binary Trees', difficulty: 'Medium', status: 'In Progress', time: '45 min', desc: 'Traversals, BSTs, and tree properties.' },
            { title: 'Graph Algorithms', difficulty: 'Hard', status: 'Locked', prereq: 'Binary Trees', time: '60 min', desc: 'BFS, DFS, Dijkstra, and pathfinding.' },
        ],
        'DBMS': [
            { title: 'ER Models', difficulty: 'Easy', status: 'Mastered', time: '30 min', desc: 'Entity-Relationship diagramming basics.' },
            { title: 'Normalization', difficulty: 'Medium', status: 'Mastered', time: '40 min', desc: '1NF, 2NF, 3NF and BCNF forms.' },
            { title: 'SQL Queries', difficulty: 'Medium', status: 'In Progress', time: '55 min', desc: 'Complex joins, subqueries, and aggregation.' },
            { title: 'Indexing', difficulty: 'Hard', status: 'Locked', prereq: 'SQL Queries', time: '35 min', desc: 'B-Trees and query optimization.' },
        ],
        'Comp. Networks': [
            { title: 'OSI Model', difficulty: 'Easy', status: 'In Progress', time: '25 min', desc: 'The 7 layers of networking explained.' },
            { title: 'TCP/IP', difficulty: 'Medium', status: 'Locked', prereq: 'OSI Model', time: '40 min', desc: 'Transmission Control Protocol deep dive.' },
            { title: 'Routing Algorithms', difficulty: 'Hard', status: 'Locked', prereq: 'TCP/IP', time: '50 min', desc: 'Distance vector and link state routing.' },
        ]
    };

    const currentConcepts = conceptMaps[selectedSubject] || [];

    const NavItem = ({ icon: Icon, label, active, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all duration-200 group ${active
                ? 'bg-white/10 text-white font-medium shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            title={isSidebarCollapsed ? label : ''}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
            {!isSidebarCollapsed && <span className="text-sm tracking-wide">{label}</span>}
        </button>
    );

    return (
        <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">

            {/* Sidebar */}
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
                            <NavItem icon={Target} label="Today's Focus" onClick={() => navigate('/today-focus')} />
                            <NavItem icon={BookOpen} label="Academic" active />
                            <NavItem icon={Trophy} label="Competitive" onClick={() => navigate('/competitive')} />
                            <NavItem icon={Briefcase} label="Career" onClick={() => navigate('/career')} />
                            <NavItem icon={BarChart2} label="Analytics" onClick={() => navigate('/analytics')} />
                            <NavItem icon={Calendar} label="Schedule" onClick={() => navigate('/schedule')} />
                        </nav>
                    </section>

                    <section>
                        {!isSidebarCollapsed && <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">Tools</div>}
                        <nav className="space-y-0.5">
                            <NavItem icon={Settings} label="Settings" onClick={() => navigate('/settings')} />
                            <NavItem icon={LogOut} label="Log out" onClick={handleLogout} />
                        </nav>
                    </section>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="bg-white/5 p-2 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-inner" />
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

                {/* Header */}
                <header className="absolute top-0 left-0 right-0 z-50 h-14 flex items-center justify-end shrink-0 pt-2 pointer-events-none px-4 gap-3">
                    <div className="pointer-events-auto flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-black/5 w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search..." className="flex-1 bg-transparent text-sm outline-none" />
                    </div>
                    <div className="pointer-events-auto">
                        <button className="relative p-2 bg-white rounded-full shadow-sm border border-black/5">
                            <Bell className="w-4 h-4 text-[#1F1F1F]" />
                            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto scrollbar-hide pb-6 pr-2 pt-4">
                    <div className="mb-6">
                        <h1 className="text-3xl font-black text-[#1F1F1F] tracking-tight mb-1">Academic Dashboard</h1>
                        <p className="text-gray-500 font-medium text-sm">Track your progress and master new concepts.</p>
                    </div>

                    {/* 1. SUBJECT SELECTOR (High-End Progress Cards) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {subjects.map((subject) => {
                            const isSelected = selectedSubject === subject.name;
                            return (
                                <button
                                    key={subject.name}
                                    onClick={() => setSelectedSubject(subject.name)}
                                    className={`relative p-5 rounded-[1.5rem] border transition-all duration-300 flex flex-col justify-between text-left h-36 group
                                    ${isSelected
                                            ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] shadow-2xl scale-[1.03] ring-4 ring-offset-2 ring-slate-200 z-10'
                                            : 'bg-white text-[#1F1F1F] border-slate-100 hover:border-slate-300 hover:-translate-y-1 hover:shadow-lg'}`}
                                >
                                    <div className="flex justify-between items-start w-full">
                                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/10' : 'bg-slate-50'}`}>
                                            <BookOpen className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-700'}`} />
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                            {subject.status}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-sm mb-2">{subject.name}</h3>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>{subject.progress}%</span>
                                            <span className={`text-[10px] font-medium ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>completed</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${isSelected ? 'bg-amber-400' : 'bg-slate-900'}`}
                                                style={{ width: `${subject.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* 2. ROADMAP SECTION */}
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden">
                        {/* Motivation Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                            <div>
                                <h2 className="text-xl font-black text-[#1F1F1F] mb-1">{selectedSubject} Roadmap</h2>
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                    <span>You're 2 steps away from unlocking <span className="font-bold text-slate-900">Deadlock Prevention</span></span>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <div className="px-3 py-1.5 bg-slate-50 rounded-lg flex flex-col items-center min-w-[60px]">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
                                    <span className="text-sm font-black text-slate-900">{currentConcepts.length}</span>
                                </div>
                                <div className="px-3 py-1.5 bg-emerald-50 rounded-lg flex flex-col items-center min-w-[60px]">
                                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Done</span>
                                    <span className="text-sm font-black text-emerald-700">{currentConcepts.filter(c => c.status === 'Mastered').length}</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Roadmap */}
                        <div className="relative pl-3 space-y-3">
                            {/* Vertical Connecting Line */}
                            <div className="absolute left-[2rem] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-200 via-slate-200 to-slate-100 z-0"></div>

                            {currentConcepts.length > 0 ? currentConcepts.map((concept, i) => {
                                const isLocked = concept.status === 'Locked';
                                const isActive = concept.status === 'In Progress' || concept.status === 'Weak';
                                const isMastered = concept.status === 'Mastered';

                                return (
                                    <div key={i} className={`relative z-10 group transition-all duration-300 ${isLocked ? 'opacity-60 hover:opacity-100' : ''}`}>
                                        <div className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300
                                            ${isActive ? 'bg-white border-indigo-200 shadow-lg shadow-indigo-50/50 scale-[1.01] ring-1 ring-indigo-50' :
                                                isMastered ? 'bg-slate-50/50 border-slate-100' :
                                                    'bg-white border-transparent hover:border-slate-200 hover:shadow-sm'}
                                        `}>
                                            {/* Status Indicator (Left) */}
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm z-10
                                                ${isMastered ? 'bg-emerald-500 text-white' :
                                                    isActive ? 'bg-indigo-500 text-white animate-pulse-slow' :
                                                        'bg-slate-200 text-slate-400'}
                                            `}>
                                                {isMastered && <CheckCircle className="w-4 h-4" />}
                                                {isActive && <Play className="w-3 h-3 fill-current ml-0.5" />}
                                                {isLocked && <Lock className="w-3 h-3" />}
                                            </div>

                                            {/* Content (Center) */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <h3 className={`font-bold text-sm truncate ${isLocked ? 'text-slate-500' : 'text-[#1F1F1F]'}`}>
                                                        {concept.title}
                                                    </h3>
                                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0
                                                        ${concept.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
                                                            concept.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' :
                                                                'bg-rose-50 text-rose-700'}
                                                    `}>
                                                        {concept.difficulty}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-slate-500 truncate max-w-md">{concept.desc || `Master the core concepts of ${concept.title} to advance.`}</p>
                                            </div>

                                            {/* Action Button (Right) */}
                                            <div className="self-center shrink-0">
                                                {!isLocked ? (
                                                    <button
                                                        onClick={() => navigate(`/academic/flow/${selectedSubject.toLowerCase().replace(/ /g, '-')}`)}
                                                        className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all flex items-center gap-1.5 shadow-sm
                                                            ${isActive
                                                                ? 'bg-[#1F1F1F] text-white hover:bg-black hover:scale-105'
                                                                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'}
                                                        `}
                                                    >
                                                        {isActive ? (
                                                            <>Continue <ArrowRight className="w-3 h-3" /></>
                                                        ) : (
                                                            <>Review <BookOpen className="w-3 h-3" /></>
                                                        )}
                                                    </button>
                                                ) : (
                                                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-50 text-slate-300">
                                                        <Lock className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="text-center py-12 bg-slate-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                                    <Book className="w-8 h-8 text-slate-300 mb-2" />
                                    <p className="text-xs text-slate-500 font-medium">Select a subject to view your roadmap.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <RightSidebar />
        </div>
    );
};

export default AcademicExcellence;

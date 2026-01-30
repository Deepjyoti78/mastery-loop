import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight,
    Trophy, Briefcase, Zap, CheckCircle, AlertTriangle, XCircle, ArrowRight, ChevronLeft,
    Activity, Target, Clock, Brain, GraduationCap
} from 'lucide-react';

const LandingPage = ({ setIntent }) => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [currentUser, setCurrentUser] = useState({ name: 'Guest User', role: 'Student Plan' });
    const [focusTopic, setFocusTopic] = useState({
        subject: 'Operating Systems',
        title: 'CPU Scheduling',
        progress: 65,
        timeSpent: '12m',
        totalTime: '25m'
    });

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

    useEffect(() => {
        const setupComplete = localStorage.getItem('mastery_setup_complete');
        if (!setupComplete) {
            navigate('/setup');
            return;
        }

        const savedSubject = localStorage.getItem('mastery_subject');
        if (savedSubject) {
            if (savedSubject === 'Data Structures') {
                setFocusTopic({ subject: 'Data Structures', title: 'Linked Lists', progress: 40, timeSpent: '15m', totalTime: '45m' });
            } else if (savedSubject === 'DBMS') {
                setFocusTopic({ subject: 'DBMS', title: 'Normalization', progress: 80, timeSpent: '25m', totalTime: '30m' });
            }
        }
    }, []);

    const handlePathSelection = (path) => {
        if (setIntent) setIntent(path);
        if (path === 'academic') navigate('/academic');
        else if (path === 'competitive') navigate('/competitive');
        else if (path === 'career') navigate('/career');
        else navigate('/setup');
    };

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

                {/* Brand */}
                <div className={`flex items-center gap-3 mb-8 px-2 pt-1 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1F1F1F] font-bold text-lg shadow-md shrink-0">
                        M
                    </div>
                    {!isSidebarCollapsed && <span className="font-bold text-base tracking-tight text-white whitespace-nowrap overflow-hidden">MasteryLoop</span>}
                </div>

                {/* Navigation */}
                <div className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
                    <section>
                        {!isSidebarCollapsed && <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">General</div>}
                        <nav className="space-y-0.5">
                            <NavItem icon={LayoutGrid} label="Dashboard" active />
                            <NavItem icon={Target} label="Today's Focus" onClick={() => navigate('/today-focus')} />
                            <NavItem icon={BookOpen} label="Academic" onClick={() => handlePathSelection('academic')} />
                            <NavItem icon={Trophy} label="Competitive" onClick={() => handlePathSelection('competitive')} />
                            <NavItem icon={Briefcase} label="Career" onClick={() => handlePathSelection('career')} />
                            <NavItem icon={BarChart2} label="Analytics" onClick={() => navigate('/analytics')} />
                            <NavItem icon={Calendar} label="Schedule" onClick={() => navigate('/schedule')} />
                        </nav>
                    </section>
                    <section>
                        <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3">Tools</div>
                        <nav className="space-y-0.5">
                            <NavItem icon={Settings} label="Search" />
                            <NavItem icon={LogOut} label="Log out" onClick={handleLogout} />
                        </nav>
                    </section>
                </div>

                {/* User Profile */}
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

                {/* Top Header */}
                <header className="absolute top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-2 shrink-0 pt-4 pointer-events-none">
                    <div className="pointer-events-auto">
                        <h1 className="text-2xl font-bold text-[#1F1F1F] tracking-tight flex items-center gap-2">
                            Good morning, {currentUser.name.split(' ')[0]}
                        </h1>
                        <p className="text-[#1F1F1F]/60 font-medium text-sm">Your Academic Plan</p>
                    </div>

                    <div className="flex items-center gap-3 pointer-events-auto">
                        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-black/5 w-56 transition-all hover:shadow-md h-10">
                            <Search className="w-3.5 h-3.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search concepts..."
                                className="flex-1 bg-transparent border-none outline-none text-xs font-medium placeholder:text-gray-400 text-[#1F1F1F]"
                            />
                        </div>
                        <button className="p-2.5 bg-white rounded-full shadow-sm border border-black/5 hover:bg-gray-50 transition-colors">
                            <Bell className="w-4 h-4 text-[#1F1F1F]" />
                        </button>
                    </div>
                </header>

                {/* Dashboard Grid - Darker Colors */}
                <div className="flex-1 min-h-0 pt-24 px-2 pb-2">
                    <div className="grid grid-cols-12 gap-5 h-full pb-1">

                        {/* ROW 1: Hero (Col 7) & Mastery (Col 5) */}
                        <div className="col-span-12 lg:col-span-7 bg-[#E8DCC0] rounded-[2rem] p-5 relative overflow-hidden flex flex-col justify-between shadow-sm min-h-[160px]">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-6 h-6 bg-[#1F1F1F] rounded-lg flex items-center justify-center text-white">
                                            <BookOpen className="w-3 h-3" />
                                        </div>
                                        <h3 className="text-sm font-bold text-[#1F1F1F]">Your Academic Plan</h3>
                                    </div>
                                    <p className="text-xs text-[#1F1F1F]/60 font-medium pl-8">28 modules • 43% total</p>
                                </div>
                                <span className="text-xs font-bold text-[#1F1F1F]/50">{focusTopic.timeSpent} / {focusTopic.totalTime}</span>
                            </div>

                            {/* Inner Card */}
                            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20 shadow-sm hover:translate-y-[-2px] transition-transform cursor-pointer group">
                                <div>
                                    <h2 className="text-xl font-extrabold text-[#1F1F1F] mb-1 leading-none">{focusTopic.title}</h2>
                                    <p className="text-xs font-medium text-[#1F1F1F]/60">High Priority • {focusTopic.subject}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-[10px] font-bold bg-[#1F1F1F]/5 px-2 py-0.5 rounded text-[#1F1F1F]/70">Pointer Reversal</span>
                                        <span className="text-[10px] font-bold bg-[#F8D57E]/30 px-2 py-0.5 rounded text-[#1F1F1F]/70">Data Structures</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/academic')}
                                    className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg group-hover:bg-black transition-colors"
                                >
                                    View Learning
                                </button>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-5 bg-[#C9DFF6] rounded-[2rem] p-5 relative overflow-hidden shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold text-[#1F1F1F]">Concept Mastery</h3>
                                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-blue-500 shadow-sm">
                                    <Zap className="w-3 h-3" />
                                </div>
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center justify-between group cursor-pointer bg-white/50 p-2 rounded-xl hover:bg-white/70 transition-colors">
                                    <span className="font-bold text-[#1F1F1F] text-xs pl-1">CPU Scheduling</span>
                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="flex items-center justify-between group cursor-pointer bg-white/50 p-2 rounded-xl hover:bg-white/70 transition-colors">
                                    <span className="font-bold text-[#1F1F1F] text-xs pl-1">Deadlocks</span>
                                    <XCircle className="w-4 h-4 text-rose-600" />
                                </div>
                                <div className="mt-auto">
                                    <button
                                        onClick={() => navigate('/academic')}
                                        className="w-full bg-[#1F1F1F] text-white py-2 rounded-xl text-[10px] font-bold shadow-md hover:bg-black transition-colors flex items-center justify-center gap-1"
                                    >
                                        Review Weak Concepts <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ROW 2: Mission (Col 7) & Exams (Col 5) */}
                        <div className="col-span-12 lg:col-span-7 bg-[#E8E8E8] rounded-[2rem] p-5 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden min-h-[160px]">
                            <h3 className="text-sm font-bold text-[#1F1F1F] mb-3">Today's Mission</h3>

                            {/* Inner Card */}
                            <div className="bg-[#FAF6E8] rounded-2xl p-4 flex items-center justify-between border border-[#F8D57E]/20 flex-1 group cursor-pointer hover:shadow-md transition-all">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-lg font-extrabold text-[#1F1F1F]">Pointer Arithmetic</h2>
                                        <span className="text-xs font-medium text-[#1F1F1F]/40">— Pointer Reversal</span>
                                    </div>
                                    <p className="text-xs font-bold text-[#ECA626] uppercase tracking-wide">Data Structures</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-[10px] font-bold text-[#1F1F1F]/40">45 min</span>
                                    <button
                                        onClick={() => navigate('/today-focus')}
                                        className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md group-hover:scale-105 transition-transform"
                                    >
                                        Start Learning
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-3 px-1">
                                <span className="text-[10px] font-bold text-slate-500">Data Structures</span>
                                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 cursor-pointer hover:text-[#1F1F1F]">View Syllabus <ArrowRight className="w-3 h-3" /></span>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-5 bg-[#D2EBD5] rounded-[2rem] p-5 relative overflow-hidden shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold text-[#1F1F1F]">Upcoming Exams</h3>
                                <div className="bg-white/60 px-2 py-1 rounded-lg text-[10px] font-bold text-[#1F1F1F]/60">June 2026</div>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-white/80 rounded-xl p-3 shadow-sm border border-slate-100 flex items-center gap-3 hover:translate-x-1 transition-transform cursor-pointer">
                                    <div className="w-8 h-8 rounded-lg bg-[#F8D57E]/30 flex items-center justify-center text-amber-700">
                                        <Trophy className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[#1F1F1F] text-xs">Calculus Quiz Review</h4>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase">Academic • 46m</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 rounded-xl p-3 shadow-sm border border-slate-100 flex items-center gap-3 hover:translate-x-1 transition-transform cursor-pointer">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[#1F1F1F] text-xs">OS Linked List</h4>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase">Academic • 46m</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ROW 3: Visual Tracks (Bottom) */}
                        <div
                            onClick={() => navigate('/career')}
                            className="col-span-6 bg-gradient-to-r from-[#D0EBC6] to-[#E2F5DB] rounded-[1.75rem] p-4 flex items-center justify-between cursor-pointer group hover:shadow-md transition-all border border-white/50 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#93C076] rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#1F1F1F] text-sm">Career Construction</h3>
                                    <p className="text-[10px] text-[#1F1F1F]/60 font-medium">Plan your career path</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/competitive')}
                            className="col-span-6 bg-gradient-to-r from-[#FBCFE8] to-[#FCE7F3] rounded-[1.75rem] p-4 flex items-center justify-between cursor-pointer group hover:shadow-md transition-all border border-white/50 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#EC4899] rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                                    <Trophy className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#1F1F1F] text-sm">Competitive Edge</h3>
                                    <p className="text-[10px] text-[#1F1F1F]/60 font-medium">Sharpen speed & accuracy</p>
                                </div>
                            </div>
                            <div
                                onClick={(e) => { e.stopPropagation(); navigate('/schedule'); }}
                                className="bg-white/60 px-2 py-1 rounded-lg text-[10px] font-bold text-[#1F1F1F]/60 flex items-center gap-1 group-hover:bg-white transition-colors hover:text-[#1F1F1F]"
                            >
                                Exam Tracker <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>

                        {/* Adaptive Insight (Floating/Extra) */}
                        <div className="col-span-12 bg-[#FDE68A] rounded-[1.75rem] p-4 border border-[#F59E0B]/20 flex items-start gap-4 mt-1 relative overflow-hidden shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-[#B45309] flex items-center justify-center text-white shrink-0 mt-1">
                                <Activity className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#92400E] mb-1">Adaptive Insight <span className="bg-[#B45309]/20 px-1.5 rounded ml-2 text-[9px] text-[#92400E]">5+</span></h3>
                                <p className="text-xs font-bold text-[#1F1F1F] mb-1">Weakness detected in Pointer Reversal</p>
                                <p className="text-[10px] text-[#1F1F1F]/60 leading-relaxed max-w-3xl">
                                    (46% accuracy). Mastering Linked lists unlocks advanced Tree Manipulation. We've adjusted your roadmap.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Right Panel */}
            <RightSidebar />

        </div>
    );
};

export default LandingPage;

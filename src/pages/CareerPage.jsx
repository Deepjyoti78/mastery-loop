import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight,
    Trophy, Briefcase, Zap, CheckCircle, AlertTriangle, XCircle, ArrowRight,
    Target, Network, Server, Globe, PenTool
} from 'lucide-react';

const CareerPage = () => {
    const navigate = useNavigate();

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
                            <NavItem icon={BookOpen} label="Academic" onClick={() => navigate('/academic')} />
                            <NavItem icon={Trophy} label="Competitive" onClick={() => navigate('/competitive')} />
                            <NavItem icon={Briefcase} label="Career" active />
                        </nav>
                    </section>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 mx-2 h-full relative">

                {/* Top Header */}
                <header className="absolute top-0 left-0 right-0 z-50 h-14 flex items-center justify-between shrink-0 pt-2 pointer-events-none">
                    <div className="pointer-events-auto flex items-center gap-2 flex-1 bg-white rounded-full px-4 py-2 shadow-sm border border-black/5 max-w-lg transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-[1px] h-10">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search..." className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-gray-400 text-[#1F1F1F]" />
                    </div>
                </header>

                {/* Career Content Scrollable Area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-6 pr-2 pt-16">

                    {/* 1. Page Header */}
                    <div className="mb-8 px-1">
                        <h1 className="text-3xl font-extrabold text-[#1F1F1F] tracking-tight mb-1">Career Construction</h1>
                        <p className="text-gray-500 font-medium text-sm">
                            Build skills that translate directly to job readiness.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                        {/* 2. Target Role (Primary) - Span 12 */}
                        <div className="col-span-12 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                            <div className="flex items-center gap-6 z-10">
                                <div className="w-16 h-16 rounded-2xl bg-[#B5C99A] flex items-center justify-center text-[#1F1F1F] shadow-inner">
                                    <Server className="w-8 h-8" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Target Role</div>
                                    <h2 className="text-3xl font-extrabold text-[#1F1F1F] leading-tight">Backend Developer</h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase tracking-wide">Mid-Level</span>
                                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase tracking-wide">Remote</span>
                                    </div>
                                </div>
                            </div>
                            <button className="z-10 px-6 py-3 bg-white border border-slate-200 text-[#1F1F1F] rounded-xl font-bold text-sm transition-all duration-200 hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]">
                                Change Role
                            </button>
                            {/* Decor */}
                            <div className="absolute right-0 top-0 w-64 h-64 bg-[#B5C99A] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                        </div>

                        {/* 3. Skill Gap Overview - Span 8 */}
                        <div className="col-span-12 md:col-span-7 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-extrabold text-[#1F1F1F]">Skill Gap Analysis</h3>
                                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">View All Skills</button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="p-1.5 bg-white rounded-lg shadow-sm"><CheckCircle className="w-4 h-4 text-emerald-600" /></div>
                                        <span className="text-[10px] font-black text-emerald-600 uppercase">Mastered</span>
                                    </div>
                                    <div className="font-bold text-sm text-[#1F1F1F]">Data Structs</div>
                                    <div className="font-bold text-sm text-[#1F1F1F] mt-1">Python API</div>
                                </div>
                                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="p-1.5 bg-white rounded-lg shadow-sm"><AlertTriangle className="w-4 h-4 text-amber-600" /></div>
                                        <span className="text-[10px] font-black text-amber-600 uppercase">In Progress</span>
                                    </div>
                                    <div className="font-bold text-sm text-[#1F1F1F]">System Design</div>
                                    <div className="font-bold text-sm text-[#1F1F1F] mt-1">Docker</div>
                                </div>
                                <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="p-1.5 bg-white rounded-lg shadow-sm"><XCircle className="w-4 h-4 text-rose-600" /></div>
                                        <span className="text-[10px] font-black text-rose-600 uppercase">Missing</span>
                                    </div>
                                    <div className="font-bold text-sm text-[#1F1F1F]">Scalability</div>
                                    <div className="font-bold text-sm text-[#1F1F1F] mt-1">Kubernetes</div>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-50">
                                <button className="w-full py-3 bg-[#1F1F1F] text-white rounded-xl font-bold text-sm transition-all duration-200 hover:bg-black hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2">
                                    Start Skill Plan <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* 4. Recommended Focus (Action Card) - Span 4 */}
                        <div className="col-span-12 md:col-span-5 bg-[#1F1F1F] rounded-[2rem] p-8 text-white shadow-lg flex flex-col justify-between relative overflow-hidden group">
                            <div className="z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Today's Focus</span>
                                </div>
                                <h3 className="text-2xl font-extrabold mb-1">System Design Output</h3>
                                <p className="text-white/60 font-medium text-sm">Load Balancing & Hashing</p>
                                <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/5 backdrop-blur-sm">
                                    <span className="text-[10px] font-bold text-white/50 uppercase block mb-1">Why this?</span>
                                    <p className="text-xs font-semibold text-white/90">Recurring topic in Backend interviews.</p>
                                </div>
                            </div>
                            <button className="mt-8 w-full py-3 bg-white text-[#1F1F1F] rounded-xl font-bold text-sm transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 relative z-10">
                                Start Practice <ArrowRight className="w-4 h-4" />
                            </button>
                            {/* Texture */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
                        </div>

                        {/* 5. Practice & Interview Prep - Span 12 */}
                        <div className="col-span-12">
                            <h3 className="font-extrabold text-[#1F1F1F] mb-4 px-1">Interview Prep Lab</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: 'Mock Interview', sub: 'System Design Round', time: '45m', diff: 'Hard', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
                                    { title: 'Live Coding', sub: 'LC Hard: DP', time: '30m', diff: 'Hard', icon: PenTool, color: 'bg-emerald-50 text-emerald-600' },
                                    { title: 'Behavioral', sub: 'Leadership Principles', time: '15m', diff: 'Easy', icon: Globe, color: 'bg-amber-50 text-amber-600' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 group cursor-pointer">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-2xl ${item.color}`}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase tracking-wide">{item.time}</span>
                                        </div>
                                        <h4 className="font-bold text-[#1F1F1F] text-lg mb-0.5">{item.title}</h4>
                                        <p className="text-sm font-medium text-slate-500 mb-4">{item.sub}</p>
                                        <button className="w-full py-2 bg-slate-50 text-[#1F1F1F] rounded-lg font-bold text-xs transition-colors group-hover:bg-[#1F1F1F] group-hover:text-white">
                                            Prepare Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

const StarIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

export default CareerPage;

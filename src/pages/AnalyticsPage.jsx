import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight, ChevronLeft,
    CheckCircle, AlertTriangle, XCircle, ArrowRight,
    TrendingUp, Activity, Clock, Target, Zap, Trophy, Briefcase
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

// Removed duplicate import

// --- Smooth Line Chart Helper ---
// --- Linear Chart Helper (Matching Reference) ---
// --- Linear Chart Helper (Matching Reference Exact) ---
// --- Linear Chart Helper (Full Width & Responsive) ---
// --- Smooth Area Chart Helper (Premium & Responsive) ---
const ResponsiveAreaChart = () => {
    // Mock Data for Smooth Curve
    const data = [
        { label: 'S', value: 20 },
        { label: 'M', value: 35 },
        { label: 'T', value: 25 },
        { label: 'W', value: 45 },
        { label: 'T', value: 30 },
        { label: 'F', value: 55 },
        { label: 'S', value: 40 },
    ];

    const width = 1000;
    const height = 300;
    const padding = { left: 40, right: 10, top: 40, bottom: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const yMax = 60;

    // Helper to control cubic bezier curvature (0 = linear, 0.5 = smooth)
    const smoothing = 0.2;

    // Calculate control point for bezier curve
    const controlPoint = (current, previous, next, reverse) => {
        const p = previous || current;
        const n = next || current;
        const o = {
            x: n.x - p.x,
            y: n.y - p.y
        };
        const r = reverse ? Math.PI : 0;
        const theta = Math.atan2(o.y, o.x) + r;
        const length = Math.sqrt(Math.pow(o.x, 2) + Math.pow(o.y, 2)) * smoothing;
        const x = current.x + Math.cos(theta) * length;
        const y = current.y + Math.sin(theta) * length;
        return { x, y };
    };

    const getPoints = (dataset) => {
        const xStep = chartWidth / (dataset.length - 1);
        return dataset.map((d, i) => ({
            x: padding.left + i * xStep,
            y: padding.top + chartHeight - (d.value / yMax) * chartHeight,
            value: d.value,
            label: d.label
        }));
    };

    const generateBezierPath = (points) => {
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const startCP = controlPoint(points[i - 1], points[i - 2], points[i], false);
            const endCP = controlPoint(points[i], points[i - 1], points[i + 1], true);
            d += ` C ${startCP.x} ${startCP.y}, ${endCP.x} ${endCP.y}, ${points[i].x} ${points[i].y}`;
        }
        return d;
    };

    const points = getPoints(data);
    const pathD = generateBezierPath(points);
    const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

    return (
        <div className="w-full h-full bg-white rounded-xl p-2 relative overflow-hidden">
            <svg viewBox="0 0 1000 300" className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818CF8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Horizontal Grid Lines */}
                {[0, 20, 40, 60].map((tick) => {
                    const y = padding.top + chartHeight - (tick / yMax) * chartHeight;
                    return (
                        <g key={`h-${tick}`}>
                            <line
                                x1={padding.left} y1={y}
                                x2={width - padding.right} y2={y}
                                stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4,4"
                            />
                            <text
                                x={padding.left - 10} y={y + 4}
                                className="text-[12px] fill-slate-400 font-medium"
                                textAnchor="end"
                            >
                                {tick}
                            </text>
                        </g>
                    );
                })}

                {/* Area Fill */}
                <path d={areaD} fill="url(#areaGradient)" />

                {/* Line Path */}
                <path
                    d={pathD}
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                />

                {/* Points */}
                {points.map((p, i) => (
                    <g key={`p-${i}`} className="group">
                        <circle
                            cx={p.x} cy={p.y} r="6"
                            fill="white" stroke="#6366F1" strokeWidth="3"
                            className="transition-all duration-300 group-hover:r-8 z-10"
                        />
                        {/* Tooltip on Hover */}
                        <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <rect x={p.x - 20} y={p.y - 40} width="40" height="25" rx="6" fill="#1E293B" />
                            <text x={p.x} y={p.y - 23} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                {p.value}%
                            </text>
                            <path d={`M ${p.x} ${p.y - 15} L ${p.x - 5} ${p.y - 15} L ${p.x} ${p.y - 10} L ${p.x + 5} ${p.y - 15} Z`} fill="#1E293B" />
                        </g>
                    </g>
                ))}

                {/* X-Axis Labels */}
                {points.map((p, i) => (
                    <text
                        key={`x-${i}`}
                        x={p.x}
                        y={height - 10}
                        textAnchor="middle"
                        className="text-[14px] fill-slate-500 font-bold"
                    >
                        {p.label}
                    </text>
                ))}
            </svg>
        </div>
    );
};

const AnalyticsPage = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('Academic');


    return (
        <div className="flex flex-col md:flex-row h-screen w-full bg-[#FAF9F4] md:p-3 md:gap-3 font-sans overflow-hidden text-[#1F1F1F]">
            {/* Sidebar - Compact (Global Copy) */}
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 md:mx-2 h-full relative overflow-y-auto scrollbar-hide">
                {/* Header (Compact) */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between mb-6 px-4 md:px-1 pt-16 md:pt-2">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#1F1F1F] tracking-tight mb-1">Learning Analytics</h1>
                        <p className="text-gray-500 font-medium text-sm">Understand how you learn, where you struggle, and what to improve next.</p>
                    </div>
                    <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100 self-start md:self-auto">
                        {['Academic', 'Competitive', 'Career'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-[#1F1F1F] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 pb-6 px-4 md:px-0 md:pr-2">
                    {/* 2. High-Level Progress Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {[
                            { label: 'Concepts Covered', value: '18 / 42', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                            { label: 'Average Accuracy', value: '72%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            { label: 'Consistency', value: '4 days/wk', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white rounded-[1.25rem] p-4 border border-slate-100 shadow-sm flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</div>
                                    <div className="text-2xl font-extrabold text-[#1F1F1F]">{stat.value}</div>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 3. Learning Trend (Visual Graph) */}
                    <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm mb-6 relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="font-bold text-[#1F1F1F]">Conceptual Accuracy Over Time</h3>
                                <div className="text-xs text-slate-400 mt-1">Comparison with previous performance</div>
                            </div>
                            {/* Legend */}
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                                    <span className="text-xs font-bold text-gray-500">Performance</span>
                                </div>
                            </div>
                        </div>

                        {/* SVG Line Chart */}
                        <div className="w-full h-64 select-none">
                            <ResponsiveAreaChart />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                        {/* 4. Concept Mastery Breakdown (Most Important) - Span 7 */}
                        <div className="col-span-12 md:col-span-7 bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-[#1F1F1F]">Concept Mastery</h3>
                                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View Details</button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'Process Synchronization', diff: 'Hard', status: 'weak', last: '2d ago' },
                                    { name: 'Deadlock Handling', diff: 'Medium', status: 'progress', last: '1d ago' },
                                    { name: 'CPU Scheduling', diff: 'Easy', status: 'mastered', last: '4d ago' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-3">
                                            {item.status === 'mastered' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                            {item.status === 'progress' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                                            {item.status === 'weak' && <XCircle className="w-5 h-5 text-rose-500" />}
                                            <div>
                                                <div className="font-bold text-sm text-[#1F1F1F]">{item.name}</div>
                                                <div className="text-[10px] font-medium text-gray-400">{item.diff} • Last: {item.last}</div>
                                            </div>
                                        </div>
                                        {item.status === 'weak' && (
                                            <button className="px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-[10px] font-bold uppercase tracking-wide hover:bg-rose-100 transition-colors">
                                                Review
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. Error Pattern Insights & 6. Time Analysis - Span 5 */}
                        <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
                            <div className="bg-[#FAF9F4] rounded-[1.5rem] p-6 border border-slate-200">
                                <h3 className="font-bold text-[#1F1F1F] mb-4">Learning Insights</h3>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-[#1F1F1F]/80">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                        Struggles more with preemptive algorithms.
                                    </li>
                                    <li className="flex gap-3 text-sm text-[#1F1F1F]/80">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                        Accuracy drops on concurrency-related topics.
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm flex-1">
                                <h3 className="font-bold text-[#1F1F1F] mb-4">Time & Effort</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs font-medium mb-1">
                                            <span className="text-gray-500">Practice</span>
                                            <span className="text-[#1F1F1F] font-bold">65%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[65%] bg-indigo-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-medium mb-1">
                                            <span className="text-gray-500">Theory</span>
                                            <span className="text-[#1F1F1F] font-bold">35%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[35%] bg-emerald-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. Action-Oriented Footer */}
                    <div className="bg-[#1F1F1F] rounded-[1.5rem] p-6 text-white flex flex-col md:flex-row items-center justify-between shadow-lg gap-4">
                        <div className="text-center md:text-left">
                            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Recommended Focus</div>
                            <h3 className="text-xl font-bold">Process Synchronization</h3>
                            <p className="text-sm text-white/70">Weakest area this week. High impact on improved scores.</p>
                        </div>
                        <button className="w-full md:w-auto px-6 py-3 bg-white text-[#1F1F1F] rounded-xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                            Start Focus Session <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </main>

            <div className="hidden xl:block h-full">
                <RightSidebar />
            </div>
        </div>
    );
};

export default AnalyticsPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight,
    Trophy, Briefcase, ChevronLeft, Upload, CheckCircle2,
    AlertCircle, Target, ArrowRight, ShieldAlert,
    FileText, Zap, ChevronDown, Rocket, Sliders,
    TrendingUp, Activity, Lock, RefreshCw, Star
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { generateCareerProfile } from '../services/aiService';
import { extractTextFromPDF } from '../utils/resumeParser';

const CareerPage = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [setupStep, setSetupStep] = useState(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Persisted Profile
    const [careerProfile, setCareerProfile] = useState(() => {
        const saved = localStorage.getItem('mastery_career_profile');
        return saved ? JSON.parse(saved) : null;
    });

    // DB Integration: Load and Sync
    useEffect(() => {
        const loadFromDB = async () => {
            try {
                const { getCareerProfile, initDefaultUser } = await import('../services/db');
                let userId = localStorage.getItem('mastery_userid');

                if (!userId) {
                    userId = await initDefaultUser();
                    localStorage.setItem('mastery_userid', userId.toString());
                }

                const dbProfile = await getCareerProfile(parseInt(userId));
                // Only load if local storage is empty to avoid overwriting session state unintentionally
                if (dbProfile && !careerProfile) {
                    setCareerProfile(dbProfile.data);
                }
            } catch (err) {
                console.error("Failed to load from DB:", err);
            }
        };
        loadFromDB();
    }, []);

    // DB Integration: Save on Change
    useEffect(() => {
        if (careerProfile) {
            // Keep localStorage in sync immediately
            localStorage.setItem('mastery_career_profile', JSON.stringify(careerProfile));

            // Async save to robust DB
            const saveToDB = async () => {
                try {
                    const { saveCareerProfile, initDefaultUser } = await import('../services/db');
                    let userId = localStorage.getItem('mastery_userid');
                    if (!userId) {
                        userId = await initDefaultUser();
                        localStorage.setItem('mastery_userid', userId.toString());
                    }

                    await saveCareerProfile(parseInt(userId), {
                        targetRole: careerProfile.targetRole,
                        readinessScore: careerProfile.readinessScore,
                        data: careerProfile,
                        updatedAt: new Date()
                    });
                } catch (err) {
                    console.error("Failed to save to DB:", err);
                }
            };
            saveToDB();
        }
    }, [careerProfile]);

    // Form State
    const [formData, setFormData] = useState({
        experience: '2-4 years',
        currentRole: '',
        targetRole: 'Senior Backend Engineer',
        timeline: '6', // months (string for slider)
        strategy: 'Market Switch', // Default
        resumeText: '' // Changed to Text Content for AI
    });

    // --- Standard Sidebar Navigation ---

    // --- Actions ---
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) setFormData(prev => ({ ...prev, resume: file.name }));
    };

    const handleSetupComplete = async () => {
        setIsAnalyzing(true);
        try {
            // CALL REAL AI SERVICE
            const aiData = await generateCareerProfile(formData.resumeText, formData.targetRole);

            const profile = {
                ...formData,
                ...aiData, // readinessScore, gaps, sprint, resumeIssues
                // Ensure IDs exist for unique keys
                gaps: aiData.gaps.map((g, i) => ({ ...g, id: i })),
                sprint: aiData.sprint || []
            };

            setCareerProfile(profile);
        } catch (error) {
            console.error("Analysis Failed", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    // --- Sub-Components ---

    // 1. Interactive Control Panel
    const StrategyControls = ({ profile, updateProfile }) => {
        const [timeline, setTimeline] = useState(profile.timeline);

        return (
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">Career Control Panel</h2>
                    <p className="text-xs text-slate-500 font-medium">Adjust variables to simulate outcomes.</p>
                </div>

                <div className="flex items-center gap-6 flex-1 w-full md:w-auto">
                    {/* Strategy Selector */}
                    <div className="flex-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Strategy</label>
                        <div className="relative">
                            <select
                                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-2 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                                defaultValue={profile.strategy}
                            >
                                <option>Market Switch (Aggressive)</option>
                                <option>Internal Promotion (Steady)</option>
                                <option>Skill Acquisition Only</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-2.5 text-slate-400 pointer-events-none" size={14} />
                        </div>
                    </div>

                    {/* Timeline Slider */}
                    <div className="flex-1 min-w-[150px]">
                        <div className="flex justify-between mb-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Timeline</label>
                            <span className="text-[10px] font-bold text-indigo-600">{timeline} Months</span>
                        </div>
                        <input
                            type="range"
                            min="3" max="12" step="1"
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between mt-1 text-[9px] text-slate-400 font-medium">
                            <span>Aggressive</span>
                            <span>Steady</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // 2. Expandable Gap Card
    const GapCard = ({ gap }) => {
        const [expanded, setExpanded] = useState(false);

        return (
            <div className={`border rounded-xl transition-all duration-200 ${expanded ? 'border-indigo-200 bg-indigo-50/10' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                <div
                    onClick={() => setExpanded(!expanded)}
                    className="p-4 flex items-center justify-between cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${gap.status === 'Critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 'bg-amber-400'}`} />
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">{gap.skill}</h4>
                            <p className="text-[10px] text-slate-500 font-medium">{gap.reason}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {gap.status === 'Critical' && <span className="bg-rose-100 text-rose-700 text-[9px] font-bold px-1.5 py-0.5 rounded">BLOCKER</span>}
                        <ChevronRight size={14} className={`text-slate-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
                    </div>
                </div>

                {expanded && (
                    <div className="px-4 pb-4 pt-0 text-xs animate-in slide-in-from-top-2">
                        <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-3">
                            <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Interview Expectation</span>
                                <p className="text-slate-700 font-medium mt-0.5">{gap.expectation}</p>
                            </div>
                            <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Missing Evidence</span>
                                <p className="text-slate-700 font-medium mt-0.5 flex items-center gap-1">
                                    <AlertCircle size={10} className="text-amber-500" />
                                    {gap.missing_evidence}
                                </p>
                            </div>
                            <button className="w-full bg-slate-900 text-white py-2 rounded-lg font-bold text-[10px] hover:bg-black flex items-center justify-center gap-1">
                                <Zap size={12} /> Add "Master {gap.skill}" to Sprint
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // 3. Sprint Board (Interactive)
    const SprintBoard = ({ tasks }) => (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Target size={14} className="text-indigo-600" /> Execution Sprint
                </h3>
                <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                    <RefreshCw size={10} /> Regenerate
                </button>
            </div>
            <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                {(tasks || []).map((task, i) => (
                    <div key={i} className="group p-3 bg-white border border-slate-100 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all cursor-move flex items-center gap-3">
                        <div className={`w-1 h-6 rounded-full ${task.type === 'Blocker' ? 'bg-rose-500' : task.type === 'Skill' ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                        <div className="flex-1">
                            <div className="font-bold text-slate-900 text-xs">{task.title}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[9px] font-bold text-slate-400 uppercase">{task.type}</span>
                                <span className="text-[9px] font-medium text-slate-400 flex items-center gap-0.5"><Activity size={8} /> {task.time}</span>
                            </div>
                        </div>
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                    </div>
                ))}
            </div>
            <div className="p-2 border-t border-slate-100 bg-slate-50">
                <button className="w-full py-1.5 border border-dashed border-slate-300 rounded-lg text-slate-400 text-[10px] font-bold hover:border-slate-400 hover:text-slate-600 transition-colors">
                    + Add Custom Task
                </button>
            </div>
        </div>
    );

    // 4. Resume Action Card
    const ResumeAction = ({ issue }) => (
        <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-white/10">
            <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
                <p className="text-[10px] text-slate-300 leading-snug mb-2">{issue.text}</p>
                <div className="flex gap-2">
                    <button className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[9px] font-bold transition-colors flex items-center gap-1">
                        <Star size={8} /> AI Fix
                    </button>
                    <button className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[9px] font-bold transition-colors">
                        Ignor
                    </button>
                </div>
            </div>
        </div>
    );

    const CareerDashboard = () => (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-12">

            <StrategyControls profile={careerProfile} />

            <div className="grid grid-cols-12 gap-6">

                {/* COLUMN 1: DIAGNOSIS & ACTION (Span 8) */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">

                    {/* Market Reality Banner */}
                    <div className="bg-indigo-900 text-white rounded-xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden">
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <TrendingUp className="text-emerald-400" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Market Reality: {careerProfile.targetRole}</h3>
                                <div className="flex gap-3 text-[10px] text-slate-300 mt-0.5 font-medium">
                                    <span className="flex items-center gap-1"><Users size={10} /> High Competition</span>
                                    <span className="text-slate-400">•</span>
                                    <span>~240 Applicants/Role</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 text-right">
                            <div className="text-2xl font-black">Top 15%</div>
                            <div className="text-[9px] uppercase font-bold text-indigo-200">Required Percentile</div>
                        </div>
                        {/* Decor */}
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-indigo-500/30 to-transparent pointer-events-none" />
                    </div>

                    {/* Split: Gaps & Sprint */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                        {/* Gaps */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                    <ShieldAlert size={14} className="text-rose-500" /> Critical Gaps
                                </h3>
                                <span className="text-[10px] font-bold text-slate-400">{careerProfile.gaps.length} Items</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {careerProfile.gaps.map((gap) => <GapCard key={gap.id} gap={gap} />)}
                            </div>

                            {/* Micro-Assessment */}
                            <div className="mt-4 p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Refine Accuracy</h4>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-700">Rate your SQL confidence:</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <button key={n} className="w-5 h-5 rounded bg-white border border-slate-200 text-[10px] font-bold hover:bg-indigo-50 hover:border-indigo-300 text-slate-600">{n}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sprint */}
                        <SprintBoard tasks={careerProfile.sprint} />
                    </div>
                </div>

                {/* COLUMN 2: PROOF & SCORES (Span 4) */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

                    {/* Readiness Score Card */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm text-center relative overflow-hidden group">
                        <div className="absolute top-2 right-2 text-[9px] font-bold text-slate-300 uppercase">Live Metrics</div>
                        <div className="w-32 h-32 mx-auto relative flex items-center justify-center mb-2">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="351.86" strokeDashoffset={351.86 * (1 - careerProfile.readinessScore / 100)} className="text-indigo-600 transition-all duration-1000" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-slate-900">{careerProfile.readinessScore}%</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Readiness</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 px-4 leading-relaxed">
                            You are <strong className="text-rose-600">Off Track</strong> for a 6-month transition. Increase sprint velocity to catch up.
                        </p>
                        <button className="mt-4 w-full py-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                            View Burn-down Chart
                        </button>
                    </div>

                    {/* Resume Audit 2.0 */}
                    <div className="bg-[#1F1F1F] rounded-xl p-4 shadow-lg flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-sm text-white flex items-center gap-2">
                                <FileText size={14} className="text-indigo-400" /> Resume & Proof
                            </h3>
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Action Required</span>
                        </div>

                        <div className="space-y-3 flex-1">
                            {careerProfile.resumeIssues.map((issue, i) => (
                                <ResumeAction key={i} issue={issue} />
                            ))}
                        </div>

                        <button className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2">
                            <Upload size={12} /> Upload New Version
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );

    // --- Setup Components (Reused but Compact) ---
    const SetupStep1 = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div><h3 className="text-lg font-bold text-slate-900">Baseline Data</h3></div>
            <div className="space-y-3">

                {/* File Upload Zone */}
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-slate-800 hover:bg-slate-50 transition-all relative group">
                    <input
                        type="file"
                        accept=".pdf,.txt,.doc,.docx"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            setFormData(prev => ({ ...prev, resume: file.name }));

                            // Handle File Types
                            if (file.type === 'application/pdf') {
                                try {
                                    setFormData(prev => ({ ...prev, resumeText: "Extracting text from PDF... keep waiting..." }));
                                    const text = await extractTextFromPDF(file);
                                    setFormData(prev => ({ ...prev, resumeText: text }));
                                } catch (err) {
                                    console.error(err);
                                    setFormData(prev => ({ ...prev, resumeText: "Error reading PDF. Please paste text manually below." }));
                                }
                            } else if (file.type === 'text/plain') {
                                const reader = new FileReader();
                                reader.onload = (ev) => setFormData(prev => ({ ...prev, resumeText: ev.target.result }));
                                reader.readAsText(file);
                            } else {
                                // Fallback for DOC/Other
                                setFormData(prev => ({ ...prev, resumeText: `[File detected: ${file.name}]. Please verify content or paste text manually if extraction failed.` }));
                            }
                        }}
                    />
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-slate-500" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{formData.resume ? `File: ${formData.resume}` : "Upload Resume (PDF/DOC)"}</span>
                    <span className="text-xs text-slate-400 mt-1">Drag & drop or click to browse</span>
                </div>

                {/* Text Area (Visible for Verification) */}
                {formData.resumeText && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Verified Content (Editable)</label>
                        <textarea
                            className="w-full h-24 text-xs p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none resize-none font-mono text-slate-600"
                            value={formData.resumeText}
                            onChange={(e) => setFormData({ ...formData, resumeText: e.target.value })}
                        />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    <select className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium outline-none" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}>
                        <option>0-1 years</option><option>2-4 years</option><option>5-8 years</option>
                    </select>
                    <input type="text" className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium outline-none" placeholder="Current Role" value={formData.currentRole} onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })} />
                </div>
                <button onClick={() => setSetupStep(2)} disabled={!formData.resumeText || !formData.currentRole} className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-bold text-xs hover:bg-black disabled:opacity-50 transition-all mt-2">Next Step</button>
            </div>
        </div>
    );

    const SetupStep2 = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div><h3 className="text-lg font-bold text-slate-900">Target Role</h3></div>
            <div className="space-y-3">
                {['Senior Backend Engineer', 'Staff Engineer', 'Engineering Manager'].map(role => (
                    <div key={role} onClick={() => setFormData({ ...formData, targetRole: role })} className={`p-3 rounded-lg border cursor-pointer transition-all ${formData.targetRole === role ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-200 hover:border-slate-400'}`}>
                        <span className="font-bold text-xs block">{role}</span>
                    </div>
                ))}
                <button onClick={handleSetupComplete} className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold text-xs hover:bg-indigo-700 shadow-md transition-all mt-4">Run Analysis</button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row h-screen w-full bg-[#FAF9F4] md:p-3 md:gap-3 font-sans overflow-hidden text-[#1F1F1F]">
            {/* Sidebar (Standard) */}
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 md:mx-2 h-full relative overflow-y-auto scrollbar-hide">
                <header className="flex flex-col gap-4 md:flex-row md:items-center justify-between px-4 md:px-2 pt-16 md:pt-2 shrink-0 mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Career Architecture</h1>
                        <p className="text-xs text-slate-500">Design, Plan, Execute.</p>
                    </div>
                    {careerProfile && (
                        <button onClick={() => setCareerProfile(null)} className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 underline self-start md:self-auto">Reset Plan</button>
                    )}
                </header>

                <div className="flex-1 max-w-6xl mx-auto w-full pb-10 px-4 md:px-0">
                    {!careerProfile ? (
                        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                            {isAnalyzing ? (
                                <div className="flex flex-col items-center justify-center h-64">
                                    <div className="w-10 h-10 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                                    <h3 className="text-sm font-bold text-slate-900 animate-pulse">Analyzing Market Data...</h3>
                                </div>
                            ) : (
                                setupStep === 1 ? <SetupStep1 /> : <SetupStep2 />
                            )}
                        </div>
                    ) : (
                        <CareerDashboard />
                    )}
                </div>
            </main>

            <div className="hidden xl:block h-full">
                <RightSidebar />
            </div>
        </div>
    );
};

export default CareerPage;

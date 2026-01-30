import React, { useState, useEffect } from 'react';
import {
    BookOpen, CheckCircle, Lock, Play,
    ChevronRight, ChevronDown, Check,
    Trophy, ArrowRight, Zap, Target, Search, X, Loader2,
    LayoutGrid, Calendar, Users, BarChart2,
    Settings, LogOut, Bell, ChevronLeft,
    Layers, Brain, Briefcase, Clock, Plus, Star, Hash
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectData, curriculum } from '../data/curriculum';
import { generateLearningCard } from '../services/aiService';
import RightSidebar from '../components/RightSidebar';

const AcademicFlow = () => {
    const navigate = useNavigate();
    const { subjectId } = useParams();

    // --- Global Sidebar State ---
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [currentUser] = useState(() => {
        const userData = localStorage.getItem('mastery_user_data');
        return userData ? JSON.parse(userData) : { name: 'Deep Jyoti', role: 'Student Plan' };
    });

    // --- Learning Board State ---
    const [subjectData, setSubjectData] = useState(null);
    const [expandedCardId, setExpandedCardId] = useState(null);
    const [loadingCardId, setLoadingCardId] = useState(null);
    const [aiContentCache, setAiContentCache] = useState({});
    const [quizState, setQuizState] = useState({});

    // --- Checkpoint Quiz State ---
    const [activeCheckpoint, setActiveCheckpoint] = useState(null); // { id, title, questions: [], currentStep: 0, score: 0, completed: false }

    useEffect(() => {
        const data = getSubjectData(subjectId) || curriculum['operating-systems'];
        setSubjectData(data);
    }, [subjectId]);

    const handleLogout = () => {
        localStorage.removeItem('mastery_auth');
        window.location.href = '/';
    };

    // --- Actions ---
    const handleCardClick = async (concept) => {
        if (concept.status === 'locked') return;

        if (expandedCardId === concept.id) {
            setExpandedCardId(null);
            return;
        }

        setExpandedCardId(concept.id);

        // Serve from cache if available
        if (aiContentCache[concept.id]) {
            return;
        }

        // Fetch fresh content
        setLoadingCardId(concept.id);

        try {
            const generated = await generateLearningCard(concept.title, concept.difficulty);
            // Ensure we set state even if object is partial, effectively stopping 'loading'
            setAiContentCache(prev => ({ ...prev, [concept.id]: generated }));
        } catch (error) {
            console.error("Critical Render Error", error);
            setAiContentCache(prev => ({ ...prev, [concept.id]: { definition: "Unable to load content." } }));
        } finally {
            // Guaranteed to stop loading spinner
            setLoadingCardId(null);
        }
    };

    const handleQuizOption = (conceptId, isCorrect) => {
        setQuizState(prev => {
            const current = prev[conceptId] || { step: 0, score: 0, completed: false };
            const nextStep = current.step + 1;
            const newScore = isCorrect ? current.score + 1 : current.score;

            const content = subjectData.modules.flatMap(m => m.concepts).find(c => c.id === conceptId)?.cardContent || aiContentCache[conceptId];
            const totalQ = content?.quiz?.length || 1;

            if (nextStep >= totalQ) {
                return { ...prev, [conceptId]: { ...current, step: nextStep, score: newScore, completed: true } };
            }
            return { ...prev, [conceptId]: { ...current, step: nextStep, score: newScore } };
        });
    };

    // --- Checkpoint Logic ---
    const handleCheckpointClick = (node) => {
        // 1. Identify concepts covered
        const coveredConcepts = subjectData.modules.flatMap(m => m.concepts).filter(c => node.conceptIds.includes(c.id));

        // 2. Generate Review Quiz
        const questions = coveredConcepts.map(c => ({
            id: c.id, // Track ID for adaptive matching
            question: `What is the core purpose of ${c.title}?`,
            options: [
                `To optimize ${c.title} latency unnecessarily.`,
                `Fundamental concept for ${c.title} stability and structure.`,
                `It has no real impact on the system.`,
                `To delete user data securely.`
            ],
            answer: 1,
            explanation: `Review ${c.title}: It is critical for system stability.`
        }));

        setActiveCheckpoint({
            id: node.id,
            title: node.title,
            originalQuestions: questions, // Keep full set
            questions: questions, // Current active set (shrinks in adaptive mode)
            currentStep: 0,
            wrongIndices: [], // Track indexes of WRONG answers in the current set
            isAdaptive: false,
            completed: false
        });
    };

    const handleCheckpointAnswer = (optionIndex) => {
        if (!activeCheckpoint) return;

        const currentQ = activeCheckpoint.questions[activeCheckpoint.currentStep];
        const isCorrect = optionIndex === currentQ.answer;

        // Track wrong answers
        let nextWrongIndices = [...activeCheckpoint.wrongIndices];
        if (!isCorrect) {
            nextWrongIndices.push(activeCheckpoint.currentStep);
        }

        const nextStep = activeCheckpoint.currentStep + 1;

        if (nextStep >= activeCheckpoint.questions.length) {
            // Quiz Round Finished
            if (nextWrongIndices.length === 0) {
                // ALL CORRECT -> Success
                setActiveCheckpoint(prev => ({ ...prev, currentStep: nextStep, completed: true }));
            } else {
                // ERRORS FOUND -> Adaptive Loop
                // content: "Let's review the concepts you missed."
                const wrongQuestions = activeCheckpoint.questions.filter((_, idx) => nextWrongIndices.includes(idx));

                // Introduce a small delay or UI transition could be nice, but we'll swap immediately for speed
                setActiveCheckpoint(prev => ({
                    ...prev,
                    questions: wrongQuestions, // New set is ONLY the wrong ones
                    currentStep: 0,
                    wrongIndices: [], // Reset for new round
                    isAdaptive: true, // Flag to show "Adaptive Mode" UI
                    completed: false
                }));
            }
        } else {
            // Next Question
            setActiveCheckpoint(prev => ({ ...prev, currentStep: nextStep, wrongIndices: nextWrongIndices }));
        }
    };

    // --- Renderers ---
    const renderQuiz = (concept, content) => {
        const state = quizState[concept.id] || { step: 0, score: 0, completed: false };
        const question = content.quiz?.[state.step];

        // Ensure we have quiz content
        if (!content.quiz || content.quiz.length === 0) return null;

        if (state.completed) {
            return (
                <div className="bg-emerald-50 rounded-lg p-3 text-center animate-in fade-in zoom-in border border-emerald-100 flex flex-row items-center justify-center gap-4 mt-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                        <Trophy size={16} />
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold text-emerald-900 text-sm">Concept Mastered!</h4>
                        <p className="text-xs text-emerald-700">Score: {state.score}/{content.quiz.length}</p>
                    </div>
                </div>
            );
        }

        if (!question) return null;

        return (
            <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    <span>Micro-Quiz</span>
                    <span>{state.step + 1} / {content.quiz.length}</span>
                </div>

                <h4 className="font-bold text-slate-900 mb-2 text-xs">{question.question}</h4>

                <div className="space-y-1.5">
                    {question.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleQuizOption(concept.id, idx === question.answer)}
                            className="w-full text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-xs font-medium text-slate-700 hover:shadow-sm"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    // --- Sidebar Nav Item ---
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

    if (!subjectData) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

    // --- Data Flattening ---
    const timelineNodes = subjectData.modules.flatMap(m => m.concepts).reduce((acc, concept, index) => {
        acc.push({ type: 'concept', ...concept, globalIndex: index });
        if ((index + 1) % 3 === 0) {
            acc.push({
                type: 'checkpoint',
                id: `quiz-checkpoint-${index}`,
                title: 'Review Checkpoint',
                description: 'Verify your knowledge.',
                conceptIds: [acc[acc.length - 3].id, acc[acc.length - 2].id, concept.id]
            });
        }
        return acc;
    }, []);

    return (
        <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">

            {/* 1. SIDEBAR */}
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
                                <div className="text-sm font-bold text-white whitespace-nowrap">{currentUser?.name || 'Guest'}</div>
                                <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{currentUser?.role || 'Student'}</div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0 mx-2 h-full relative">

                {/* Header */}
                <header className="absolute top-0 left-0 right-0 z-50 h-14 flex items-center justify-between shrink-0 pt-2 px-4 gap-3 pointer-events-none">
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-3">
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
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto custom-scrollbar pt-20 pb-10 px-4 md:px-8">
                    {/* --- SQUARE GRID --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-20">
                        {timelineNodes.map((node, i) => {
                            if (node.type === 'checkpoint') {
                                // --- CHECKPOINT CARD ---
                                const isPink = i % 2 === 0;
                                return (
                                    <div key={node.id}
                                        onClick={() => handleCheckpointClick(node)}
                                        className={`aspect-[4/5] rounded-2xl p-5 relative flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer ${isPink ? 'bg-pink-100' : 'bg-[#E3F5E3]'}`}
                                    >
                                        <div>
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${isPink ? 'bg-pink-500 text-white' : 'bg-green-600 text-white'}`}>
                                                <Trophy size={20} />
                                            </div>
                                            <h3 className="text-base font-bold text-slate-800 leading-tight mb-1">
                                                Mastery Checkpoint
                                            </h3>
                                            <p className="text-[10px] text-slate-600 font-medium">
                                                Verify your retention.
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Take Quiz</span>
                                            <button className={`w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${isPink ? 'bg-pink-200 text-pink-700' : 'bg-green-200 text-green-700'}`}>
                                                <Play size={14} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            }

                            // --- REGULAR CONCEPT CARD ---
                            const isExpanded = expandedCardId === node.id;
                            const isLocked = node.status === 'locked';

                            const colorIndex = i % 4;
                            const theme =
                                isLocked ? { bg: 'bg-slate-100', text: 'text-slate-400', sub: 'text-slate-400', accent: 'bg-slate-200 text-slate-500' } :
                                    colorIndex === 0 ? { bg: 'bg-[#F0E6D2]', text: 'text-[#3D342B]', sub: 'text-[#6B5D52]', accent: 'bg-[#3D342B] text-white' } : // Warm Sand
                                        colorIndex === 1 ? { bg: 'bg-[#D6E6F2]', text: 'text-[#1B3A4B]', sub: 'text-[#4A6fa5]', accent: 'bg-[#1B3A4B] text-white' } : // Soft Blue
                                            colorIndex === 2 ? { bg: 'bg-[#E0F2E9]', text: 'text-[#1D402F]', sub: 'text-[#4C7561]', accent: 'bg-[#1D402F] text-white' } : // Soft Green
                                                { bg: 'bg-[#FEF9C3]', text: 'text-[#854D0E]', sub: 'text-[#A16207]', accent: 'bg-[#854D0E] text-white' };               // Soft Yellow

                            if (isExpanded) {
                                // EXPANDED VIEW - COMPACT LAYOUT with AI INTEGRATION
                                const content = aiContentCache[node.id] || {}; // Fallback safe

                                return (
                                    <div key={node.id} className="col-span-1 sm:col-span-2 lg:col-span-3 row-span-2 bg-white rounded-2xl shadow-xl relative flex flex-col h-[600px] overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 ring-1 ring-black/5">
                                        {/* Minimal Header */}
                                        <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-start bg-white rounded-t-2xl sticky top-0 z-10 gap-3">
                                            <div className="flex items-start gap-3 flex-1 overflow-hidden">
                                                <div className={`p-1.5 rounded-md shrink-0 mt-0.5 ${theme.accent}`}>
                                                    <BookOpen size={16} />
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 leading-tight break-words pr-2 line-clamp-2">
                                                    {node.title}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setExpandedCardId(null); }}
                                                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 shrink-0 transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>

                                        {/* Content Body */}
                                        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-slate-50/50">
                                            {loadingCardId === node.id ? (
                                                <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                                                    <Loader2 className="animate-spin" size={24} />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">Generating In-Depth Lesson...</span>
                                                </div>
                                            ) : (
                                                <div className="max-w-3xl mx-auto space-y-3">
                                                    {/* 1. Core Definition & Visual */}
                                                    <div className="flex flex-col sm:flex-row gap-3">
                                                        <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                            <div className="text-[9px] font-black text-indigo-900 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                                                <Layers size={12} className="text-indigo-500" /> Core Concept
                                                            </div>
                                                            <p className="text-sm font-medium text-slate-800 leading-snug">
                                                                {content.definition}
                                                            </p>
                                                        </div>
                                                        <div className="sm:w-48 bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                                                            <div className="text-2xl mb-1">💡</div>
                                                            <p className="text-[10px] text-slate-500 font-bold leading-tight">{content.visualPrompt}</p>
                                                        </div>
                                                    </div>

                                                    {/* 2. Analogy */}
                                                    {content.examples?.[0] && (
                                                        <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                                                            <h4 className="text-[9px] font-black text-amber-800 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                                                <Brain size={12} /> Real World Analogy
                                                            </h4>
                                                            <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
                                                                "{content.examples[0].explanation}"
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* 3. Key Concepts / Mechanics */}
                                                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                                        <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center gap-2">
                                                            <BookOpen size={12} className="text-slate-500" />
                                                            <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Key Concepts & Mechanics</h4>
                                                        </div>

                                                        <div className="divide-y divide-slate-50">
                                                            {(content.subConcepts || []).map((sub, idx) => (
                                                                <div key={idx} className="p-3 hover:bg-slate-50/50 transition-colors">
                                                                    <h5 className="text-xs font-bold text-slate-900 mb-0.5 flex items-center gap-1.5">
                                                                        <span className="w-1 h-1 rounded-full bg-indigo-500" /> {sub.title}
                                                                    </h5>
                                                                    <p className="text-[10px] text-slate-600 leading-relaxed pl-2.5 border-l border-slate-100">
                                                                        {sub.definition}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                            {(!content.subConcepts || content.subConcepts.length === 0) && (
                                                                <div className="p-3 text-[10px] text-slate-400 italic">Core concepts loaded. Detailed mechanics implied.</div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* 4. Mastery Checkpoint (if available) */}
                                                    {/* Quiz Removed from Concept Card per user request. 
                                                        Quiz is now only available via Mastery Checkpoint Modal. */}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={node.id}
                                    onClick={() => handleCardClick(node)}
                                    className={`
                                        aspect-[4/5] rounded-2xl p-5 relative flex flex-col justify-between group 
                                        ${theme.bg} ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                                        transition-all duration-300 hover:shadow-lg
                                    `}
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider opacity-80 ${isLocked ? 'bg-slate-200' : 'bg-white/40'}`}>
                                                {node.difficulty}
                                            </span>
                                            {node.status === 'mastered' ? (
                                                <div className="bg-emerald-500 text-white p-1 rounded-full"><Check size={10} /></div>
                                            ) : isLocked && (
                                                <Lock size={12} className="text-slate-400" />
                                            )}
                                        </div>
                                        <h3 className={`text-base font-bold leading-tight mb-2 tracking-tight ${theme.text}`}>
                                            {node.title}
                                        </h3>
                                        <p className={`text-[10px] font-medium leading-relaxed opacity-80 line-clamp-3 ${theme.sub}`}>
                                            {node.desc || "Fundamental concept required for system stability."}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                                        <div className={`text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 ${theme.sub}`}>
                                            <Clock size={10} /> {node.estimatedTime || '15m'}
                                        </div>
                                        {!isLocked && (
                                            <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm hover:scale-105 transition-transform ${theme.accent}`}>
                                                Start
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </main>

            {/* Checkpoint Modal Overlay */}
            {activeCheckpoint && (
                <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/10">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                <Trophy size={16} className="text-yellow-500" /> Mastery Checkpoint
                            </h3>
                            <button onClick={() => setActiveCheckpoint(null)} className="p-1 hover:bg-slate-200 rounded-full text-slate-500">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6">
                            {activeCheckpoint.completed ? (
                                <div className="text-center py-4 animate-in zoom-in-90">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Trophy size={32} />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-1">Concept Mastered!</h2>
                                    <p className="text-sm text-slate-500 mb-6">
                                        You demonstrated perfect retention.
                                    </p>
                                    <button
                                        onClick={() => setActiveCheckpoint(null)}
                                        className="w-full py-3 bg-[#1F1F1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
                                    >
                                        Continue Learning
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                        <span>
                                            {activeCheckpoint.isAdaptive ? (
                                                <span className="text-amber-600 flex items-center gap-1"><Zap size={12} /> Adaptive Review</span>
                                            ) : (
                                                <span>Question {activeCheckpoint.currentStep + 1} of {activeCheckpoint.questions.length}</span>
                                            )}
                                        </span>
                                        <span>Progress: {Math.round((activeCheckpoint.currentStep / activeCheckpoint.questions.length) * 100)}%</span>
                                    </div>

                                    <h4 className="text-lg font-bold text-slate-900 mb-6 leading-snug">
                                        {activeCheckpoint.questions[activeCheckpoint.currentStep].question}
                                    </h4>

                                    <div className="space-y-3">
                                        {activeCheckpoint.questions[activeCheckpoint.currentStep].options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleCheckpointAnswer(idx)}
                                                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 transition-all font-medium text-slate-700 hover:shadow-md active:scale-[0.98]"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <RightSidebar />
        </div>
    );
};

export default AcademicFlow;

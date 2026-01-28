import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Target, Trophy, ArrowRight, CheckCircle2, Zap, Lightbulb, Lock, Check, Loader2 } from 'lucide-react';
import { operatingSystemsSchema } from '../data/conceptSchema';
import { getQuizForSubConcept } from '../data/quizData';
import QuizComponent from '../components/QuizComponent';
import ReteachView from '../components/ReteachView';
import { generateExplanation, generateQuiz, generateAnalogy, generateSimplifiedExplanation, evaluateConceptualAnswer } from '../services/aiService';

const LearningContentPage = () => {
    const navigate = useNavigate();

    // State management for adaptive loop
    const [currentSubConceptIndex, setCurrentSubConceptIndex] = useState(0);
    const [flowState, setFlowState] = useState('explain');
    const [quizResults, setQuizResults] = useState(null);
    const [attemptsCount, setAttemptsCount] = useState(0);
    const [completedSubConcepts, setCompletedSubConcepts] = useState([]);

    // AI-generated content state
    const [aiExplanation, setAiExplanation] = useState('');
    const [aiAnalogy, setAiAnalogy] = useState('');
    const [aiQuiz, setAiQuiz] = useState(null);
    const [aiSimplifiedExplanation, setAiSimplifiedExplanation] = useState('');
    const [isLoadingContent, setIsLoadingContent] = useState(false);
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
    const [useAI, setUseAI] = useState(true); // Toggle AI on/off

    const currentSubConcept = operatingSystemsSchema.subConcepts[currentSubConceptIndex];
    const currentQuiz = useAI && aiQuiz ? aiQuiz : getQuizForSubConcept(currentSubConcept?.id);
    const progress = ((currentSubConceptIndex + 1) / operatingSystemsSchema.subConcepts.length) * 100;

    // Load AI-generated content when concept changes
    useEffect(() => {
        if (useAI && flowState === 'explain') {
            loadAIContent();
        }
    }, [currentSubConceptIndex, useAI, flowState]);

    const loadAIContent = async () => {
        setIsLoadingContent(true);
        try {
            // Generate explanation and analogy in parallel
            const [explanation, analogy] = await Promise.all([
                generateExplanation(
                    currentSubConcept.title,
                    operatingSystemsSchema.subject,
                    currentSubConcept.difficulty,
                    currentSubConcept.prerequisites
                ),
                generateAnalogy(currentSubConcept.title, currentSubConcept.explanation)
            ]);

            setAiExplanation(explanation);
            setAiAnalogy(analogy);
        } catch (error) {
            console.error('Error loading AI content:', error);
            // Fallback to schema content
            setAiExplanation(currentSubConcept.explanation);
            setAiAnalogy(currentSubConcept.simplifiedExplanation);
        } finally {
            setIsLoadingContent(false);
        }
    };

    const loadAIQuiz = async () => {
        setIsLoadingQuiz(true);
        try {
            const explanation = aiExplanation || currentSubConcept.explanation;
            const quiz = await generateQuiz(currentSubConcept.title, explanation);
            setAiQuiz(quiz);
        } catch (error) {
            console.error('Error loading AI quiz:', error);
            // Fallback to mock quiz
            setAiQuiz(getQuizForSubConcept(currentSubConcept.id));
        } finally {
            setIsLoadingQuiz(false);
        }
    };

    // Split explanation into digestible parts
    const getExplanationBlocks = (explanation) => {
        const sentences = explanation.split('. ');
        const midPoint = Math.ceil(sentences.length / 2);
        return {
            main: sentences.slice(0, midPoint).join('. ') + '.',
            detail: sentences.slice(midPoint).join('. ')
        };
    };

    const explanationBlocks = getExplanationBlocks(useAI && aiExplanation ? aiExplanation : currentSubConcept.explanation);

    // Evaluate quiz answers
    const evaluateQuiz = async (answers) => {
        const { mcqAnswers, conceptualAnswer } = answers;

        let mcqScore = 0;
        currentQuiz.mcqs.forEach((mcq, index) => {
            if (mcqAnswers[index] === mcq.correctAnswer) {
                mcqScore++;
            }
        });

        // Use AI to evaluate conceptual answer if enabled
        let conceptualScore = 0.7; // Default
        if (useAI && currentQuiz.conceptual) {
            try {
                conceptualScore = await evaluateConceptualAnswer(
                    currentQuiz.conceptual.question,
                    conceptualAnswer,
                    currentQuiz.conceptual.sampleAnswer
                );
            } catch (error) {
                console.error('Error evaluating conceptual answer:', error);
                // Fallback to simple length check
                conceptualScore = conceptualAnswer.trim().length > 50 ? 0.7 : 0.3;
            }
        } else {
            conceptualScore = conceptualAnswer.trim().length > 50 ? 0.7 : 0.3;
        }

        const totalScore = Math.round(((mcqScore / currentQuiz.mcqs.length) * 75) + (conceptualScore * 25));
        const passed = totalScore >= 70;

        setQuizResults({
            score: totalScore,
            passed,
            mcqScore,
            totalMcqs: currentQuiz.mcqs.length,
            conceptualAnswer
        });

        setFlowState('results');
    };

    const handleQuizSubmit = async (answers) => {
        setAttemptsCount(attemptsCount + 1);
        await evaluateQuiz(answers);
    };

    const handleContinue = () => {
        if (quizResults.passed) {
            setCompletedSubConcepts([...completedSubConcepts, currentSubConcept.id]);

            if (currentSubConceptIndex < operatingSystemsSchema.subConcepts.length - 1) {
                setCurrentSubConceptIndex(currentSubConceptIndex + 1);
                setFlowState('explain');
                setQuizResults(null);
                setAttemptsCount(0);
            } else {
                setFlowState('completed');
            }
        } else {
            setFlowState('reteach');
        }
    };

    const handleRetry = () => {
        setFlowState('quiz');
        setQuizResults(null);
    };

    // Progress Panel Component
    const ProgressPanel = () => (
        <div className="sticky top-6 space-y-4">
            {/* Progress Card */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Progress</span>
                    <span className="text-xs font-bold text-slate-900">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-slate-800 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Concept List */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Concepts</h3>
                <div className="space-y-2">
                    {operatingSystemsSchema.subConcepts.map((concept, index) => {
                        const isCompleted = completedSubConcepts.includes(concept.id);
                        const isCurrent = index === currentSubConceptIndex;
                        const isLocked = index > currentSubConceptIndex && !isCompleted;

                        return (
                            <div
                                key={concept.id}
                                className={`flex items-center gap-2 p-2 rounded-lg transition-all ${isCurrent ? 'bg-indigo-50 border border-indigo-200' :
                                    isCompleted ? 'bg-emerald-50 border border-emerald-200' :
                                        'bg-slate-50 border border-slate-100'
                                    }`}
                            >
                                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isCompleted ? 'bg-emerald-500' :
                                    isCurrent ? 'bg-indigo-500' :
                                        'bg-slate-300'
                                    }`}>
                                    {isCompleted ? (
                                        <Check className="w-3 h-3 text-white" />
                                    ) : isLocked ? (
                                        <Lock className="w-2.5 h-2.5 text-white" />
                                    ) : (
                                        <span className="text-[10px] font-bold text-white">{index + 1}</span>
                                    )}
                                </div>
                                <span className={`text-xs font-medium flex-1 ${isCurrent ? 'text-indigo-900' :
                                    isCompleted ? 'text-emerald-900' :
                                        'text-slate-600'
                                    }`}>
                                    {concept.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (flowState) {
            case 'explain':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Main Content Column */}
                        <div className="lg:col-span-8 space-y-4">
                            {/* Compact Header */}
                            <div className="bg-slate-800 rounded-xl px-6 py-4 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider">
                                        {operatingSystemsSchema.subject}
                                    </span>
                                    <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold">
                                        {currentSubConcept.difficulty}
                                    </span>
                                    <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold">
                                        {currentSubConceptIndex + 1} of {operatingSystemsSchema.subConcepts.length}
                                    </span>
                                </div>
                                <h1 className="text-xl font-bold tracking-tight">{currentSubConcept.title}</h1>
                            </div>

                            {/* Content Blocks */}

                            {isLoadingContent ? (
                                <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-center gap-3 text-slate-600">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span className="text-sm font-medium">AI is generating content...</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Block 1: Main Explanation */}
                                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                                                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900">Concept Explanation</h3>
                                            {useAI && <span className="ml-auto text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded font-bold">AI Generated</span>}
                                        </div>
                                        <p className="text-sm leading-relaxed text-slate-700">
                                            {explanationBlocks.main}
                                        </p>
                                    </div>

                                    {/* Block 2: Detailed Explanation */}
                                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center">
                                                <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900">Understanding Deeper</h3>
                                        </div>
                                        <p className="text-sm leading-relaxed text-slate-700">
                                            {explanationBlocks.detail}
                                        </p>
                                    </div>

                                    {/* Block 3: Analogy/Example */}
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 shadow-sm">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                                                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                                            </div>
                                            <h3 className="text-sm font-bold text-amber-900">Real-World Analogy</h3>
                                            {useAI && <span className="ml-auto text-[10px] px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-bold">AI Generated</span>}
                                        </div>
                                        <p className="text-sm leading-relaxed text-amber-800">
                                            {useAI && aiAnalogy ? aiAnalogy : currentSubConcept.simplifiedExplanation}
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Block 4: Key Takeaway */}
                            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                                <div className="flex items-start gap-2">
                                    <Zap className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-xs font-bold text-indigo-900 mb-1">Key Takeaway</h4>
                                        <p className="text-xs text-indigo-800 leading-relaxed">
                                            Master this concept before moving forward—it's foundational to understanding {operatingSystemsSchema.concept}.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Bar */}
                            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-900 mb-0.5">Ready to test your knowledge?</p>
                                    <p className="text-xs text-slate-600">Take the quiz to move to the next concept</p>
                                </div>
                                <button
                                    onClick={async () => {
                                        if (useAI && !aiQuiz) {
                                            await loadAIQuiz();
                                        }
                                        setFlowState('quiz');
                                    }}
                                    disabled={isLoadingQuiz}
                                    className="px-5 py-2.5 bg-[#1F1F1F] text-white rounded-lg font-bold text-sm hover:bg-black transition-all shadow-md hover:shadow-lg flex items-center gap-2 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoadingQuiz ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Generating Quiz...
                                        </>
                                    ) : (
                                        <>
                                            <Target className="w-4 h-4" />
                                            Practice This Concept
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="lg:col-span-4">
                            <ProgressPanel />
                        </div>
                    </div>
                );

            case 'quiz':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-900 mb-1">Quiz: {currentSubConcept.title}</h2>
                                <p className="text-sm text-slate-600">Answer all questions to test your understanding</p>
                            </div>
                            <QuizComponent quiz={currentQuiz} onSubmit={handleQuizSubmit} />
                        </div>
                        <div className="lg:col-span-4">
                            <ProgressPanel />
                        </div>
                    </div>
                );

            case 'results':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 space-y-6">
                            <div className={`rounded-xl p-6 border ${quizResults.passed
                                ? 'bg-emerald-50 border-emerald-200'
                                : 'bg-amber-50 border-amber-200'
                                }`}>
                                <div className="text-center">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${quizResults.passed ? 'bg-emerald-500' : 'bg-amber-500'
                                        }`}>
                                        <span className="text-2xl font-black text-white">
                                            {quizResults.score}%
                                        </span>
                                    </div>
                                    <h2 className={`text-xl font-bold mb-2 ${quizResults.passed ? 'text-emerald-900' : 'text-amber-900'
                                        }`}>
                                        {quizResults.passed ? '🎉 Excellent Work!' : '💪 Keep Going!'}
                                    </h2>
                                    <p className={`text-sm font-medium ${quizResults.passed ? 'text-emerald-700' : 'text-amber-700'
                                        }`}>
                                        {quizResults.passed
                                            ? 'You\'ve demonstrated strong understanding!'
                                            : 'Let\'s review this concept together.'}
                                    </p>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                                        <span className="text-xs font-bold text-slate-700">Multiple Choice</span>
                                        <span className="text-xs font-black text-slate-900">
                                            {quizResults.mcqScore} / {quizResults.totalMcqs} correct
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                                        <span className="text-xs font-bold text-slate-700">Conceptual Question</span>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={handleContinue}
                                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-xl flex items-center gap-2 ${quizResults.passed
                                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                                        }`}
                                >
                                    {quizResults.passed ? (
                                        <>
                                            Continue to Next Concept
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    ) : (
                                        <>
                                            <BookOpen className="w-4 h-4" />
                                            Review Concept
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="lg:col-span-4">
                            <ProgressPanel />
                        </div>
                    </div>
                );

            case 'reteach':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8">
                            <ReteachView subConcept={currentSubConcept} score={quizResults.score} onRetry={handleRetry} />
                        </div>
                        <div className="lg:col-span-4">
                            <ProgressPanel />
                        </div>
                    </div>
                );

            case 'completed':
                return (
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <div className="bg-white rounded-xl p-10 border border-slate-100 shadow-sm">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-4">
                                <Trophy className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">🎊 Congratulations!</h1>
                            <p className="text-base text-slate-700 mb-2">
                                You've mastered <span className="font-bold">{operatingSystemsSchema.concept}</span>
                            </p>
                            <p className="text-sm text-slate-600 mb-4">
                                Total attempts: <span className="font-bold">{attemptsCount}</span> •
                                Concepts completed: <span className="font-bold">{completedSubConcepts.length}</span>
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {completedSubConcepts.map((id, index) => (
                                    <span key={id} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                                        ✓ Concept {index + 1}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/academic')}
                            className="px-6 py-3 bg-[#1F1F1F] hover:bg-black text-white rounded-xl font-bold text-sm transition-all shadow-lg"
                        >
                            Return to Academic Excellence
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F4] py-6 px-4">
            {/* Top Bar */}
            <div className="max-w-7xl mx-auto mb-6">
                <button
                    onClick={() => navigate('/academic')}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Academic Excellence
                </button>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default LearningContentPage;

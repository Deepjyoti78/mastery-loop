import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

const ReteachView = ({ subConcept, score, onRetry }) => {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Feedback Header - Compact */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-amber-900 mb-1">Let's Review This Concept</h3>
                        <p className="text-sm text-amber-800 font-medium">
                            You scored <span className="font-bold">{score}%</span> on this quiz.
                            Let's review the concept with a simpler explanation before trying again.
                        </p>
                    </div>
                </div>
            </div>

            {/* Simplified Explanation */}
            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <div className="mb-4">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Simplified Explanation</span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">{subConcept.title}</h2>
                </div>

                <p className="text-sm leading-relaxed text-slate-700 mb-6">
                    {subConcept.simplifiedExplanation}
                </p>

                {/* Key Points */}
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <h4 className="text-xs font-bold text-indigo-900 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                        Why This Matters
                    </h4>
                    <p className="text-xs text-indigo-800 leading-relaxed">
                        Understanding this concept is crucial for mastering CPU scheduling.
                        Take your time to review the explanation above, and when you're ready,
                        try the quiz again with this clearer perspective.
                    </p>
                </div>
            </div>

            {/* Retry Button */}
            <div className="flex justify-center">
                <button
                    onClick={onRetry}
                    className="px-6 py-3 bg-[#1F1F1F] hover:bg-black text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Retry Quiz
                </button>
            </div>
        </div>
    );
};

export default ReteachView;

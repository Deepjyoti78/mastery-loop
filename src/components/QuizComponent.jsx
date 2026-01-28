import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const QuizComponent = ({ quiz, onSubmit }) => {
    const [mcqAnswers, setMcqAnswers] = useState({});
    const [conceptualAnswer, setConceptualAnswer] = useState('');

    const handleMcqSelect = (questionIndex, optionIndex) => {
        setMcqAnswers({
            ...mcqAnswers,
            [questionIndex]: optionIndex
        });
    };

    const handleSubmit = () => {
        // Check if all MCQs are answered
        const allMcqsAnswered = quiz.mcqs.every((_, index) => mcqAnswers[index] !== undefined);

        if (!allMcqsAnswered) {
            alert('Please answer all multiple choice questions');
            return;
        }

        if (!conceptualAnswer.trim()) {
            alert('Please answer the conceptual question');
            return;
        }

        onSubmit({
            mcqAnswers,
            conceptualAnswer
        });
    };

    return (
        <div className="space-y-6">
            {/* MCQ Questions */}
            <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Multiple Choice Questions</h3>

                {quiz.mcqs.map((mcq, qIndex) => (
                    <div key={qIndex} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <div className="flex gap-2 mb-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center">
                                {qIndex + 1}
                            </span>
                            <p className="font-semibold text-sm text-slate-900 flex-1">{mcq.question}</p>
                        </div>

                        <div className="space-y-2 ml-8">
                            {mcq.options.map((option, oIndex) => {
                                const isSelected = mcqAnswers[qIndex] === oIndex;
                                return (
                                    <button
                                        key={oIndex}
                                        onClick={() => handleMcqSelect(qIndex, oIndex)}
                                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-2 ${isSelected
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                                            }`}
                                    >
                                        {isSelected ? (
                                            <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                                        )}
                                        <span className={`text-sm font-medium ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                                            {option}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Conceptual Question */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="flex gap-2 mb-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-600 font-bold text-xs flex items-center justify-center">
                        Q
                    </span>
                    <div className="flex-1">
                        <h3 className="font-bold text-sm text-slate-900 mb-1">Conceptual Question</h3>
                        <p className="text-sm text-slate-700">{quiz.conceptual.question}</p>
                    </div>
                </div>

                <textarea
                    value={conceptualAnswer}
                    onChange={(e) => setConceptualAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full mt-3 p-3 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none text-sm font-medium text-slate-900 placeholder:text-slate-400"
                    rows={5}
                />
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="w-full py-3 bg-[#1F1F1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
                Submit Answers
            </button>
        </div>
    );
};

export default QuizComponent;

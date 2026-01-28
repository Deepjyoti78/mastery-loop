import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle2, Clock, BarChart, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';

const InputPage = ({ intent, setUserData }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        skillLevel: 'intermediate',
        hoursPerWeek: 10,
        resume: null,
        manualSkills: [],
    });

    const [inputMethod, setInputMethod] = useState('manual');

    const skillOptions = {
        academic: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
        competitive: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation'],
        career: ['React', 'Node.js', 'Python', 'System Design', 'Project Management'],
    };

    const handleLevelChange = (e) => setFormData({ ...formData, skillLevel: e.target.value });

    const handleTimeChange = (e) => setFormData({ ...formData, hoursPerWeek: e.target.value });

    const handleSkillToggle = (skill) => {
        if (formData.manualSkills.includes(skill)) {
            setFormData({ ...formData, manualSkills: formData.manualSkills.filter(s => s !== skill) });
        } else {
            setFormData({
                ...formData,
                manualSkills: [...formData.manualSkills, skill]
            });
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, resume: file.name });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API/Calibration process
        setTimeout(() => {
            setUserData({
                ...formData,
                intent: intent,
                generatedAt: new Date().toISOString(),
            });
            navigate('/dashboard');
        }, 1500);
    };

    const getThemeColor = () => {
        if (intent === 'academic') return 'text-indigo-600 bg-indigo-600 border-indigo-200';
        if (intent === 'competitive') return 'text-amber-600 bg-amber-600 border-amber-200';
        if (intent === 'career') return 'text-emerald-600 bg-emerald-600 border-emerald-200';
        return 'text-indigo-600 bg-indigo-600 border-indigo-200';
    };

    const themeClass = getThemeColor();
    const baseColor = themeClass.split(' ')[1].replace('bg-', '');

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden pt-24">
            <Navbar />
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-white to-white"></div>
            <div className={`absolute top-20 right-20 w-64 h-64 rounded-full bg-${baseColor}-100 blur-3xl opacity-60 animate-pulse`}></div>

            <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-indigo-100 ring-1 ring-slate-100">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4 text-slate-900">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Tailor Your Experience</h2>
                    <p className="text-slate-500 text-lg">Help us calibrate the difficulty and pace of your curriculum.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">

                    {/* Skill Level */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-lg font-bold text-slate-800">
                            <BarChart className={`w-5 h-5 ${themeClass.split(' ')[0]}`} />
                            Current Proficiency
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            {['beginner', 'intermediate', 'advanced'].map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => handleLevelChange({ target: { value: level } })}
                                    className={`py-3 px-4 rounded-xl border-2 font-semibold capitalize transition-all duration-200 shadow-sm
                    ${formData.skillLevel === level
                                            ? `border-${baseColor}-500 bg-${baseColor}-50 text-${baseColor}-700`
                                            : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:text-slate-600'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2 text-lg font-bold text-slate-800">
                                <Clock className={`w-5 h-5 ${themeClass.split(' ')[0]}`} />
                                Weekly Commitment
                            </label>
                            <span className={`font-bold text-2xl ${themeClass.split(' ')[0]}`}>
                                {formData.hoursPerWeek} hrs
                            </span>
                        </div>
                        <input
                            type="range"
                            min="2"
                            max="40"
                            step="2"
                            value={formData.hoursPerWeek}
                            onChange={handleTimeChange}
                            className={`w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-${baseColor}-600`}
                        />
                    </div>

                    {/* Resume or Skills - Conditional on Intent */}
                    <div className="space-y-4">
                        <div className="flex gap-6 border-b border-slate-100 pb-1">
                            <button
                                type="button"
                                onClick={() => setInputMethod('manual')}
                                className={`pb-3 text-sm font-bold transition-all ${inputMethod === 'manual' ? `text-slate-900 border-b-2 border-${baseColor}-600` : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Select Skills
                            </button>
                            {intent === 'career' && (
                                <button
                                    type="button"
                                    onClick={() => setInputMethod('upload')}
                                    className={`pb-3 text-sm font-bold transition-all ${inputMethod === 'upload' ? `text-slate-900 border-b-2 border-${baseColor}-600` : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Upload Resume
                                </button>
                            )}
                        </div>

                        {intent === 'career' && inputMethod === 'upload' ? (
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-indigo-400 transition-all cursor-pointer relative group">
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf,.doc,.docx"
                                />
                                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-indigo-600">
                                    <Upload className="w-8 h-8" />
                                </div>

                                {formData.resume ? (
                                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full font-medium">
                                        <CheckCircle2 className="w-4 h-4" />
                                        {formData.resume}
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-slate-700 font-semibold mb-1">Click to upload or drag and drop</p>
                                        <p className="text-slate-400 text-sm">PDF, DOCX up to 10MB</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {(skillOptions[intent] || skillOptions.academic).map((skill) => (
                                    <div
                                        key={skill}
                                        onClick={() => handleSkillToggle(skill)}
                                        className={`cursor-pointer p-3 rounded-xl border flex items-center gap-3 transition-all ${formData.manualSkills.includes(skill)
                                            ? `bg-${baseColor}-50 border-${baseColor}-200 text-${baseColor}-700 shadow-sm`
                                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.manualSkills.includes(skill) ? `border-${baseColor}-500 bg-${baseColor}-500` : 'border-slate-300'
                                            }`}>
                                            {formData.manualSkills.includes(skill) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <span className="text-sm font-medium">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-indigo-200 ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800'
                            }`}
                    >
                        {loading ? (
                            <>Generating Plan...</>
                        ) : (
                            <>
                                Generate My Learning Plan
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default InputPage;

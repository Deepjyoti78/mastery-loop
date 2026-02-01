import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, defaultMode = 'signup', onAuthenticated }) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState(defaultMode); // 'signup' or 'login'
    const [showPassword, setShowPassword] = useState(false);

    // Form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    if (!isOpen) return null;

    const toggleMode = () => {
        setMode(mode === 'signup' ? 'login' : 'signup');
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        setShowPassword(false);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate auth
        setTimeout(() => {
            // Priority: Navigate first if signup
            if (mode === 'signup') {
                navigate('/setup');
            }
            onAuthenticated({ name: formData.firstName || 'User', email: formData.email });
            onClose();
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-sm p-4 font-sans antialiased">

            {/* Modal Container - Compact Minimal Design */}
            <div className="w-full max-w-[750px] bg-white rounded-[1.5rem] shadow-2xl p-1.5 flex overflow-hidden relative animate-in fade-in zoom-in-95 duration-300 h-[480px]">

                {/* Left Side - Visual Card (Floating inside) */}
                <div className="hidden md:block w-[43%] h-full relative rounded-[1.2rem] overflow-hidden">
                    {/* Background Image */}
                    {/* Image moved to public/assets/login-visual.png */}
                    <img
                        src="/assets/login-visual.png"
                        alt="Visual"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1622979135228-5b1ed37053e3?q=80&w=1887&auto=format&fit=crop"
                        }}
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-[#0B1121]/20 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B1121]/60 via-transparent to-[#0B1121]/60"></div>

                    {/* Logo Overlay */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2">
                        <div className="w-11 h-11 border-2 border-white/50 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 12c2.5-2.5 4-5 4-7s-2.5-4-5-4-5 2-5 4 1.5 4.5 4 7zm0 0c-2.5 2.5-4 5-4 7s2.5 4 5 4 5-2 5-4-1.5-4.5-4-7z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 h-full flex flex-col justify-center px-6 md:px-10 py-6 relative overflow-y-auto scrollbar-hide">

                    {/* Close Button */}
                    <button className="absolute top-4 right-6 text-slate-400 hover:text-slate-900 transition-colors" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </button>

                    <div className="w-full mx-auto">

                        {/* Header */}
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">
                                {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                            </h2>
                            <p className="text-xs font-bold text-slate-500">
                                {mode === 'signup' ? (
                                    <>Already have an account? <button onClick={toggleMode} className="text-slate-900 underline decoration-slate-900/30 underline-offset-4 hover:decoration-slate-900 transition-all ml-1">Log in</button></>
                                ) : (
                                    <>Don't have an account? <button onClick={toggleMode} className="text-slate-900 underline decoration-slate-900/30 underline-offset-4 hover:decoration-slate-900 transition-all ml-1">Sign up</button></>
                                )}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {mode === 'signup' && (
                                <div className="flex gap-3">
                                    <div className="space-y-1 flex-1">
                                        <label className="text-[0.65rem] font-bold text-slate-900 uppercase tracking-widest ml-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300 shadow-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <label className="text-[0.65rem] font-bold text-slate-900 uppercase tracking-widest ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300 shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-[0.65rem] font-bold text-slate-900 uppercase tracking-widest ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300 shadow-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[0.65rem] font-bold text-slate-900 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300 shadow-sm pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-2 pt-1">
                                <div className="relative flex items-center pt-0.5">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="peer h-3.5 w-3.5 cursor-pointer appearance-none rounded border border-slate-900 shadow-sm bg-slate-900 checked:bg-black checked:border-black transition-all"
                                        defaultChecked
                                    />
                                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <label htmlFor="terms" className="text-[10px] font-bold text-slate-500 select-none cursor-pointer leading-tight">
                                    I agree to <span className="text-slate-900 underline decoration-slate-300 underline-offset-2">Terms</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-10 bg-black text-white rounded-full font-bold text-xs tracking-wide hover:bg-slate-800 hover:shadow-lg transition-all duration-300 active:scale-[0.98] mt-2 shadow-md shadow-slate-200"
                            >
                                {mode === 'signup' ? 'Create Account' : 'Log in'}
                            </button>
                        </form>

                        <div className="relative my-3">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-100"></span>
                            </div>
                            <div className="relative flex justify-center text-[10px] lowercase font-bold text-slate-300">
                                <span className="bg-white px-3">or</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 h-9 border border-slate-200 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-all hover:border-slate-300 group">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="G" className="w-3.5 h-3.5 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-900">Google</span>
                            </button>
                            <button className="flex-1 h-9 border border-slate-200 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-all hover:border-slate-300 group">
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="F" className="w-3.5 h-3.5 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-900">Facebook</span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthModal;

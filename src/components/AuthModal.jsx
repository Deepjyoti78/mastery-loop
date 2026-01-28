import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, defaultMode = 'signup', onAuthenticated }) => {
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
            onAuthenticated({ name: formData.firstName || 'User', email: formData.email });
            onClose();
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-sm p-4 font-sans antialiased">

            {/* Modal Container */}
            <div className="w-full max-w-[900px] bg-white rounded-[2rem] shadow-2xl p-1 flex overflow-hidden relative animate-in fade-in zoom-in-95 duration-300 h-[600px]">

                {/* Left Side - Visual Card (Floating inside) */}
                <div className="hidden md:block w-[45%] h-full relative rounded-[1.7rem] overflow-hidden">
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
                <div className="flex-1 h-full flex flex-col justify-center px-8 md:px-12 py-8 relative overflow-y-auto scrollbar-hide">

                    {/* Close Button */}
                    <button className="absolute top-6 right-8 text-slate-400 hover:text-slate-900 transition-colors" onClick={onClose}>
                        <X className="w-6 h-6" />
                    </button>

                    <div className="w-full mx-auto">

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                                {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                            </h2>
                            <p className="text-sm font-bold text-slate-500">
                                {mode === 'signup' ? (
                                    <>Already have an account? <button onClick={toggleMode} className="text-slate-900 underline decoration-slate-900/30 underline-offset-4 hover:decoration-slate-900 transition-all ml-1">Log in</button></>
                                ) : (
                                    <>Don't have an account? <button onClick={toggleMode} className="text-slate-900 underline decoration-slate-900/30 underline-offset-4 hover:decoration-slate-900 transition-all ml-1">Sign up</button></>
                                )}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'signup' && (
                                <div className="flex gap-4">
                                    <div className="space-y-1.5 flex-1">
                                        <label className="text-xs font-bold text-slate-900 uppercase tracking-widest ml-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300 shadow-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5 flex-1">
                                        <label className="text-xs font-bold text-slate-900 uppercase tracking-widest ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300 shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-900 uppercase tracking-widest ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300 shadow-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-900 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300 shadow-sm pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-2 pt-1">
                                <div className="relative flex items-center pt-0.5">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-900 shadow-sm bg-slate-900 checked:bg-black checked:border-black transition-all"
                                        defaultChecked
                                    />
                                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <label htmlFor="terms" className="text-xs font-bold text-slate-500 select-none cursor-pointer leading-tight">
                                    I agree to <span className="text-slate-900 underline decoration-slate-300 underline-offset-2">Terms</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 bg-black text-white rounded-full font-bold text-sm tracking-wide hover:bg-slate-800 hover:shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] mt-3 shadow-md shadow-slate-200"
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

                        <div className="flex gap-4">
                            <button className="flex-1 h-11 border border-slate-200 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-all hover:border-slate-300 group">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="G" className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900">Google</span>
                            </button>
                            <button className="flex-1 h-11 border border-slate-200 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-all hover:border-slate-300 group">
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="F" className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900">Facebook</span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthModal;

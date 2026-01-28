import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[90vw]">
            <div className="bg-[#1C1C1E] rounded-full p-1.5 flex items-center shadow-2xl shadow-black/10 ring-1 ring-white/5 gap-2 md:gap-4">

                {/* Logo (Left, White Circle) */}
                <div
                    onClick={() => navigate('/')}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black cursor-pointer hover:scale-105 transition-transform shadow-lg"
                >
                    <Sparkles className="w-5 h-5 fill-black" />
                </div>

                {/* Links (Center, Dark Theme) */}
                <div className="hidden md:flex items-center px-4 gap-8 text-sm font-medium text-zinc-400">
                    {['Work', 'About', 'Playground', 'Resource'].map((item) => (
                        <button
                            key={item}
                            onClick={() => item === 'Playground' ? navigate('/dashboard') : null}
                            className="hover:text-white transition-colors"
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Profile Pill (Right, White Pill) */}
                <div className="bg-white rounded-full px-5 py-2.5 flex items-center gap-2 cursor-pointer hover:bg-zinc-100 transition-colors">
                    <span className="text-sm font-bold text-black tracking-tight">student@mastery.com</span>
                </div>

            </div>
        </div>
    );
};

export default Navbar;

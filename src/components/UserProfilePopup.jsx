import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, User, Shield, Camera, Upload } from 'lucide-react';

const UserProfilePopup = ({ isOpen, onClose, userData, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        avatar: null
    });
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || '',
                role: userData.role || '',
                avatar: userData.avatar || null
            });
        }
    }, [userData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Use Portal to render into document.body to avoid clipping
    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center font-sans">
            {/* Dark Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Popup Card */}
            <div className="relative w-full max-w-xs bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 mx-4 border border-slate-100">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors z-20"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="relative px-6 pb-6 pt-8 flex flex-col items-center">

                    {/* Avatar Selection */}
                    <div className="relative group cursor-pointer mb-4" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-20 h-20 rounded-full shadow-lg border-2 border-white overflow-hidden bg-slate-100 ring-2 ring-purple-50 relative">
                            {formData.avatar ? (
                                <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                                    {(formData.name.charAt(0) || 'U').toUpperCase()}
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Camera className="w-6 h-6" />
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-tight">Edit Profile</h3>
                    <p className="text-xs text-slate-400 font-medium mb-5">Update your details</p>

                    <form onSubmit={handleSubmit} className="w-full space-y-3">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-300"
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                                Role / Plan
                            </label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                                className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-300"
                                placeholder="Student Plan"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full h-10 mt-2 bg-[#1F1F1F] text-white rounded-lg font-bold text-xs tracking-wide hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default UserProfilePopup;

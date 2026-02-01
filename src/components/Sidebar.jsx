import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutGrid, BookOpen, Trophy, Briefcase, BarChart2, Calendar, Target,
    Settings, LogOut, ChevronRight, ChevronLeft
} from 'lucide-react';
import UserProfilePopup from './UserProfilePopup';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(() => {
        const userData = localStorage.getItem('mastery_user_data');
        return userData ? JSON.parse(userData) : { name: 'Guest User', role: 'Student Plan', avatar: null };
    });
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        // Keep in sync with storage events for cross-tab or component updates
        const updateUserData = () => {
            const userData = localStorage.getItem('mastery_user_data');
            if (userData) {
                const parsed = JSON.parse(userData);
                setCurrentUser({
                    name: parsed.name,
                    role: parsed.role || parsed.email || 'Student Plan',
                    avatar: parsed.avatar || null
                });
            }
        };

        window.addEventListener('storage', updateUserData);
        updateUserData();

        return () => window.removeEventListener('storage', updateUserData);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('mastery_auth');
        localStorage.removeItem('mastery_user_data');
        window.location.href = '/';
    };

    const handleSaveProfile = (newData) => {
        const updatedUser = { ...currentUser, ...newData };
        setCurrentUser(updatedUser);

        const existingDataStr = localStorage.getItem('mastery_user_data');
        const existingData = existingDataStr ? JSON.parse(existingDataStr) : {};

        const dataToSave = {
            ...existingData,
            name: newData.name,
            role: newData.role,
            avatar: newData.avatar
        };

        localStorage.setItem('mastery_user_data', JSON.stringify(dataToSave));
        setIsProfileOpen(false);
    };

    const NavItem = ({ icon: Icon, label, path, active, onClickOverride }) => (
        <button
            onClick={() => {
                if (onClickOverride) onClickOverride();
                else navigate(path);
                setIsMobileOpen(false); // Close sidebar on mobile nav
            }}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all duration-200 group ${active
                ? 'bg-white/10 text-white font-medium shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            title={isCollapsed ? label : ''}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
            {!isCollapsed && <span className="text-sm tracking-wide">{label}</span>}
        </button>
    );

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Mobile Menu Button - Fixed at top left */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-[#1F1F1F] text-white rounded-lg shadow-lg hover:bg-black transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm animate-in fade-in"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50 h-full md:h-auto
                bg-[#1F1F1F] 
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                ${isCollapsed ? 'w-20' : 'w-64'} 
                rounded-r-3xl md:rounded-[1.5rem] 
                p-4 flex flex-col shrink-0 
                shadow-2xl shadow-black/20 
                transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
            `}>
                {/* Desktop Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-10 w-6 h-6 bg-[#1F1F1F] rounded-full shadow-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 z-50 transition-colors hidden md:flex"
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                {/* Brand */}
                <div className={`flex items-center gap-3 mb-8 px-2 pt-1 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1F1F1F] font-bold text-lg shadow-md shrink-0">
                        M
                    </div>
                    {!isCollapsed && <span className="font-bold text-base tracking-tight text-white whitespace-nowrap overflow-hidden">MasteryLoop</span>}

                    {/* Mobile Close Button (Inside Sidebar) */}
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden ml-auto text-gray-400 hover:text-white"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
                    <section>
                        {!isCollapsed && <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">General</div>}
                        <nav className="space-y-0.5">
                            <NavItem icon={LayoutGrid} label="Dashboard" path="/" active={isActive('/')} />
                            <NavItem icon={Target} label="Today's Focus" path="/today-focus" active={isActive('/today-focus')} />
                            <NavItem icon={BookOpen} label="Academic" path="/academic" active={isActive('/academic') || location.pathname.startsWith('/academic')} />
                            <NavItem icon={Trophy} label="Competitive" path="/competitive" active={isActive('/competitive') || location.pathname.startsWith('/competitive')} />
                            <NavItem icon={Briefcase} label="Career" path="/career" active={isActive('/career')} />
                            <NavItem icon={BarChart2} label="Analytics" path="/analytics" active={isActive('/analytics')} />
                            <NavItem icon={Calendar} label="Schedule" path="/schedule" active={isActive('/schedule')} />
                        </nav>
                    </section>
                    <section>
                        {!isCollapsed && <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">Tools</div>}
                        <nav className="space-y-0.5">
                            <NavItem
                                icon={Settings}
                                label="Settings"
                                path="#"
                                active={false}
                                onClickOverride={() => setIsProfileOpen(true)}
                            />
                            <button
                                onClick={handleLogout}
                                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all duration-200 group text-gray-400 hover:text-white hover:bg-white/5`}
                                title={isCollapsed ? "Log out" : ''}
                            >
                                <LogOut className="w-4 h-4 text-gray-500 group-hover:text-white" />
                                {!isCollapsed && <span className="text-sm tracking-wide">Log out</span>}
                            </button>
                        </nav>
                    </section>
                </div>

                {/* User Profile */}
                <div className="mt-auto pt-4 border-t border-white/5 relative">
                    <div
                        onClick={() => setIsProfileOpen(true)}
                        className={`bg-white/5 p-2 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        {currentUser.avatar ? (
                            <img
                                src={currentUser.avatar}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover shadow-inner shrink-0 bg-slate-100"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-inner shrink-0 flex items-center justify-center text-white text-[10px] font-bold">
                                {(currentUser.name?.charAt(0) || 'U').toUpperCase()}
                            </div>
                        )}
                        {!isCollapsed && (
                            <div className="overflow-hidden">
                                <div className="text-sm font-bold text-white whitespace-nowrap">{currentUser.name}</div>
                                <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap truncate">{currentUser.role}</div>
                            </div>
                        )}
                    </div>

                    {/* Profile Popup */}
                    <UserProfilePopup
                        isOpen={isProfileOpen}
                        onClose={() => setIsProfileOpen(false)}
                        userData={currentUser}
                        onSave={handleSaveProfile}
                    />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

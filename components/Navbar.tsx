
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Clock, Menu, X } from 'lucide-react';

interface NavbarProps {
  variant?: 'landing' | 'app';
  userName?: string;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'landing', userName, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md border-b border-slate-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-200/50">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">AttendX</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {variant === 'landing' ? (
            <>
              <div className="hidden md:flex items-center gap-8 mr-8">
                <Link to="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Features</Link>
                <Link to="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Pricing</Link>
                <Link to="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Resources</Link>
              </div>
              <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-indigo-600 px-4 py-2 transition-colors">
                Login
              </Link>
              <Link to="/login" className="text-sm font-bold bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-95">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-black text-slate-800 tracking-tight">{userName}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Employee Dashboard</span>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-5 py-2.5 rounded-xl transition-all active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

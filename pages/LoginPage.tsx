
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { mockUsers } from '../mockData';
import { User, UserRole } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulated login delay
    setTimeout(() => {
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        onLogin(foundUser);
        if (foundUser.role === UserRole.ADMIN) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Invalid credentials. Try admin@attendx.com or john@attendx.com');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Visual/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center p-12 text-white relative overflow-hidden">
        <div className="max-w-md relative z-10">
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Welcome back to the future of workforce management.</h2>
          <p className="text-indigo-100 text-lg leading-relaxed">
            Manage your time effectively and stay connected with your team through AttendX.
          </p>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-indigo-500 rounded-full opacity-30"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-white rounded-full opacity-10"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="md:hidden flex items-center gap-2 mb-12">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">AttendX</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h1>
          <p className="text-slate-500 mb-8">Access your personalized dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Login <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4 text-sm text-center">
            <p className="text-slate-500">
              Don't have an account? <Link to="#" className="text-indigo-600 font-bold hover:underline">Request Access</Link>
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-widest">
              <div className="p-2 bg-slate-50 rounded border border-slate-100">admin@attendx.com</div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">john@attendx.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

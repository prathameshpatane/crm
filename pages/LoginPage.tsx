import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../lib/firebase";

interface LoginPageProps {
  onLogin: (user: any) => void;
}

const ADMIN_EMAIL = 'admin@attendx.com';
const ADMIN_PASSWORD = 'Admin@123';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Admin login check (hardcoded, no Firebase auth)
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        onLogin({
          id: 'admin-001',
          name: 'Admin User',
          email: ADMIN_EMAIL,
          phone: '+1234567890',
          role: 'ADMIN',
          avatar: 'https://i.pravatar.cc/150?u=admin',
          department: 'Human Resources'
        });
        navigate('/admin');
        return;
      }

      if (isSignUp) {
        // Sign up new employee
        if (!firstName || !lastName) {
          setError('Please enter your first and last name');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fullName = `${firstName} ${lastName}`;
        const userId = userCredential.user.uid;
        
        const userData = {
          id: userId,
          name: fullName,
          email: email,
          phone: '',
          role: 'EMPLOYEE',
          avatar: `https://i.pravatar.cc/150?u=${email}`,
          department: 'Engineering',
          createdAt: new Date().toISOString()
        };
        
        // Store user profile in Firestore
        await db.collection('users').doc(userId).set(userData);
        
        onLogin(userData);
        navigate('/dashboard');
      } else {
        // Login existing employee
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        
        // Fetch user profile from Firestore
        const userDoc = await db.collection('users').doc(userId).get();
        
        if (userDoc.exists) {
          const userData = userDoc.data();
          onLogin({
            id: userId,
            name: userData?.name || email.split('@')[0],
            email: email,
            phone: userData?.phone || '',
            role: 'EMPLOYEE',
            avatar: userData?.avatar || `https://i.pravatar.cc/150?u=${email}`,
            department: userData?.department || 'Engineering'
          });
        } else {
          // Fallback if user profile doesn't exist
          onLogin({
            id: userId,
            name: email.split('@')[0],
            email: email,
            phone: '',
            role: 'EMPLOYEE',
            avatar: `https://i.pravatar.cc/150?u=${email}`,
            department: 'Engineering'
          });
        }
        navigate('/dashboard');
      }

    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Account not found. Please sign up first.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Invalid password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use. Please login instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.');
      } else {
        setError(err.message || 'Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center p-12 text-white">
        <div>
          <Clock className="w-12 h-12 mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Welcome to ClientLeo
          </h2>
          <p className="text-indigo-100">
            Workforce management made simple.
          </p>
          <p className="text-indigo-200 text-sm mt-6">
            <strong>Demo Admin:</strong> admin@attendx.com / Admin@123
          </p>
          <p className="text-indigo-200 text-sm mt-2">
            <strong>Or:</strong> Sign up with your own Gmail account
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold mb-2">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h1>
          <p className="text-slate-500 mb-8">
            {isSignUp ? 'Join AttendX as an employee' : 'Access your dashboard'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <>
                <div>
                  <label className="text-sm font-semibold">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-semibold">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex justify-center hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Processing…' : (isSignUp ? 'Create Account' : 'Login')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
              }}
              className="text-indigo-600 font-bold hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ClientLoginPage from './pages/ClientLoginPage';
import WhatsAppInfoPage from './pages/WhatsAppInfoPage';
import LeadManagement from './pages/LeadManagement';
import { User, UserRole } from './types';
import { auth } from './lib/firebase';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('attendx_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('attendx_user', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    localStorage.removeItem('attendx_user');
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={user ? (
              user.role === UserRole.ADMIN ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )} 
          />
          <Route 
            path="/dashboard" 
            element={user && user.role === UserRole.EMPLOYEE ? (
              <EmployeeDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )} 
          />
          <Route 
            path="/admin" 
            element={user && user.role === UserRole.ADMIN ? (
              <AdminDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )} 
          />
          <Route 
            path="/client-portal" 
            element={<ClientLoginPage />} 
          />
          <Route 
            path="/client-dashboard" 
            element={<ClientDashboard onLogout={handleLogout} />} 
          />
          <Route 
            path="/whatsapp-automation" 
            element={<WhatsAppInfoPage onLogout={handleLogout} />} 
          />
          <Route 
            path="/lead-management" 
            element={<LeadManagement />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;


import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { User, AttendanceRecord } from '../types';
import { mockAttendance } from '../mockData';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Timer, 
  Coffee, 
  History, 
  LayoutDashboard, 
  UserCircle,
  Briefcase,
  ChevronRight,
  FileText,
  BarChart3,
  Mail,
  ShieldCheck,
  Award
} from 'lucide-react';

interface EmployeeDashboardProps {
  user: User;
  onLogout: () => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ user, onLogout }) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [history, setHistory] = useState<AttendanceRecord[]>(mockAttendance.filter(a => a.userId === user.id));
  
  // Timer states
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (checkedIn) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [checkedIn]);

  const formatElapsedTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return { h, m, s, formatted: `${h}h ${m}m ${s}s` };
  };

  const handleToggleCheckIn = () => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    if (!checkedIn) {
      // Clock In
      setCheckInTime(timeString);
      setElapsedSeconds(0);
      setCheckedIn(true);
    } else {
      // Finish Shift (Clock Out)
      const checkOutTime = timeString;
      const totalHrs = parseFloat((elapsedSeconds / 3600).toFixed(2));
      
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        userId: user.id,
        date: now.toISOString().split('T')[0],
        checkIn: checkInTime || '--:--',
        checkOut: checkOutTime,
        status: 'Present',
        totalHours: totalHrs
      };

      setHistory((prev) => [newRecord, ...prev]);
      setCheckedIn(false);
      // We don't reset checkInTime immediately so user can see what happened, 
      // but the state logic handles the transition.
    }
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => {
    const active = activeMenu === id;
    return (
      <button 
        onClick={() => setActiveMenu(id)}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
          active 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
        }`}
      >
        <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
        {label}
      </button>
    );
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'reports':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Attendance Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Avg. Check-in</div>
                <div className="text-3xl font-black text-slate-900">08:42 AM</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Hours (Oct)</div>
                <div className="text-3xl font-black text-slate-900">164.5h</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Punctuality Score</div>
                <div className="text-3xl font-black text-emerald-600">98%</div>
              </div>
            </div>
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm h-64 flex items-center justify-center text-slate-300 font-bold italic">
              [ Interactive Performance Chart Loading... ]
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Profile</h2>
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-32 bg-indigo-600 relative">
                 <div className="absolute -bottom-12 left-8">
                    <img src={user.avatar} className="w-24 h-24 rounded-[32px] border-4 border-white shadow-xl" alt="avatar" />
                 </div>
              </div>
              <div className="pt-16 pb-8 px-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-900">{user.name}</h3>
                  <p className="text-slate-500 font-bold">{user.department} Team • Senior Associate</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Mail className="w-5 h-5"/></div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</div>
                      <div className="text-sm font-bold text-slate-700">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><ShieldCheck className="w-5 h-5"/></div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee ID</div>
                      <div className="text-sm font-bold text-slate-700">EMP-{user.id.padStart(4, '0')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Award className="w-5 h-5"/></div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role Privilege</div>
                      <div className="text-sm font-bold text-slate-700">{user.role} Access</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        const { h, m, formatted } = formatElapsedTime(elapsedSeconds);
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Attendance Card */}
            <div className="xl:col-span-2 space-y-8">
              <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                      Today's Clock <div className={`w-2 h-2 rounded-full ${checkedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                    </h2>
                    <p className="text-slate-500 mb-8 font-medium">Status: {checkedIn ? 'Logged In & Productive' : 'Ready to start your day?'}</p>
                    
                    <div className="flex items-baseline gap-2 mb-10">
                      <span className="text-6xl font-black text-slate-900 tracking-tighter">
                        {checkedIn ? checkInTime : '--:--'}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Entry Time</span>
                        <span className="text-indigo-600 font-bold text-xs">GMT +05:30</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleToggleCheckIn}
                      className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl active:scale-95 flex items-center gap-3 ${
                        checkedIn 
                          ? 'bg-white text-rose-600 border-2 border-rose-100 hover:bg-rose-50 shadow-rose-100/20' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200/40'
                      }`}
                    >
                      {checkedIn ? (
                        <>
                          <Timer className="w-6 h-6" /> Finish Shift
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-6 h-6" /> Clock In Now
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <Timer className="w-6 h-6 text-indigo-500 mb-3" />
                      <div className="text-2xl font-black text-slate-800">{h}h {m}m</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Duty</div>
                    </div>
                    <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <Coffee className="w-6 h-6 text-amber-500 mb-3" />
                      <div className="text-2xl font-black text-slate-800">45m</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Break Balance</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance History */}
              <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                      <History className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Attendance Log</h2>
                      <p className="text-xs font-medium text-slate-400">Recent logs</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline">
                    Full Report <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-slate-100">
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check In</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check Out</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {history.map((record) => (
                        <tr key={record.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="py-5 font-bold text-slate-700">{record.date}</td>
                          <td className="py-5 text-slate-600 font-medium">{record.checkIn}</td>
                          <td className="py-5 text-slate-600 font-medium">{record.checkOut || '--:--'}</td>
                          <td className="py-5">
                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                              record.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="py-5 font-bold text-slate-800">{record.totalHours}h</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Leave Balance</h3>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="text-4xl font-black">12</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Days<br/>Remaining</div>
                </div>
                <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-900/40 active:scale-95 relative z-10">
                  Request Time Off
                </button>
              </div>

              <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-8">Monthly Overview</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">Days Present</span>
                    </div>
                    <span className="font-black text-slate-900">18 / 22</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">Lateness</span>
                    </div>
                    <span className="font-black text-slate-900">2 Occurrences</span>
                  </div>
                  
                  <div className="pt-8 border-t border-slate-100 mt-8">
                    <div className="mb-3 flex justify-between items-end">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reliability Score</span>
                      <span className="text-lg font-black text-emerald-600">94%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar variant="app" userName={user.name} onLogout={onLogout} />
      
      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="w-72 hidden lg:block h-[calc(100vh-80px)] sticky top-20 border-r border-slate-200 bg-white px-4 py-6">
          <div className="space-y-2">
            <h3 className="px-4 text-[10px] uppercase font-black text-slate-400 tracking-widest mb-4">Main Menu</h3>
            
            <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <SidebarItem id="attendance" icon={Clock} label="Attendance" />
            <SidebarItem id="reports" icon={BarChart3} label="Attendance Reports" />
            <SidebarItem id="leaves" icon={Calendar} label="Leaves" />

            <div className="pt-8">
              <h3 className="px-4 text-[10px] uppercase font-black text-slate-400 tracking-widest mb-4">Account</h3>
              <SidebarItem id="profile" icon={UserCircle} label="Profile" />
              <SidebarItem id="documents" icon={FileText} label="Documents" />
            </div>
          </div>

          <div className="absolute bottom-8 left-4 right-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System Status</span>
            </div>
            <p className="text-xs font-semibold text-slate-800 tracking-tight">Version 2.1.0 - All Clear</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-4 md:px-8 py-8 overflow-hidden">
          <div className="max-w-6xl">
            {/* Conditional Header for Dashboard specifically */}
            {activeMenu === 'dashboard' && (
              <header className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl border-2 border-white shadow-md" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome, {user.name}</h1>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      {user.department} Department
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span className="font-bold text-slate-700">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </header>
            )}

            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

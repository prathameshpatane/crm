
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { User, AttendanceRecord } from '../types';
import { mockAttendance } from '../mockData';
import { Clock, Calendar, CheckCircle2, Timer, Coffee, History, ChevronRight } from 'lucide-react';

interface EmployeeDashboardProps {
  user: User;
  onLogout: () => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ user, onLogout }) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [history] = useState<AttendanceRecord[]>(mockAttendance.filter(a => a.userId === user.id));

  const handleToggleCheckIn = () => {
    if (!checkedIn) {
      const now = new Date();
      setCheckInTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
      setCheckedIn(true);
    } else {
      setCheckedIn(false);
      setCheckInTime(null);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      <Navbar variant="app" userName={user.name} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Profile/Welcome Header */}
        <header className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl border-2 border-white shadow-sm" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Welcome, {user.name}</h1>
              <p className="text-slate-500">{user.department} Team</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
            <Calendar className="w-5 h-5 text-indigo-600 ml-2" />
            <span className="font-semibold text-slate-700 pr-3">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Attendance Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 mb-1">Today's Attendance</h2>
                  <p className="text-slate-500 mb-6">Status: {checkedIn ? 'Working' : 'Not Logged In'}</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-black text-slate-900">
                      {checkedIn ? checkInTime : '--:--'}
                    </span>
                    <span className="text-slate-400 font-medium">Check-in Time</span>
                  </div>

                  <button 
                    onClick={handleToggleCheckIn}
                    className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center gap-3 ${
                      checkedIn 
                        ? 'bg-rose-50 text-rose-600 border-2 border-rose-100 hover:bg-rose-100 shadow-rose-100/50' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100/50'
                    }`}
                  >
                    {checkedIn ? (
                      <>
                        <Timer className="w-6 h-6" /> Check Out
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-6 h-6" /> Check In Now
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Timer className="w-6 h-6 text-indigo-500 mb-2" />
                    <div className="text-xl font-bold text-slate-800">0h 0m</div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Work Duration</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Coffee className="w-6 h-6 text-amber-500 mb-2" />
                    <div className="text-xl font-bold text-slate-800">45m</div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Break Taken</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-8">
                <div className={`w-3 h-3 rounded-full animate-pulse ${checkedIn ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
              </div>
            </div>

            {/* Attendance History */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <History className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Recent Logs</h2>
                </div>
                <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-slate-100">
                      <th className="pb-4 text-sm font-semibold text-slate-400">DATE</th>
                      <th className="pb-4 text-sm font-semibold text-slate-400">CHECK IN</th>
                      <th className="pb-4 text-sm font-semibold text-slate-400">CHECK OUT</th>
                      <th className="pb-4 text-sm font-semibold text-slate-400">STATUS</th>
                      <th className="pb-4 text-sm font-semibold text-slate-400">HOURS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {history.map((record) => (
                      <tr key={record.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="py-4 font-medium text-slate-700">{record.date}</td>
                        <td className="py-4 text-slate-600">{record.checkIn}</td>
                        <td className="py-4 text-slate-600">{record.checkOut || '--:--'}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            record.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="py-4 font-semibold text-slate-800">{record.totalHours}h</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Quick Action Card */}
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200/50">
              <h3 className="text-xl font-bold mb-2">Need a day off?</h3>
              <p className="text-indigo-100 text-sm mb-6">Apply for leaves and track approval status instantly.</p>
              <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                Apply for Leave
              </button>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">This Month</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-slate-600 text-sm font-medium">Days Present</span>
                  </div>
                  <span className="font-bold text-slate-800">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-slate-600 text-sm font-medium">Late Arrivals</span>
                  </div>
                  <span className="font-bold text-slate-800">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="text-slate-600 text-sm font-medium">Total Overtime</span>
                  </div>
                  <span className="font-bold text-slate-800">4.5h</span>
                </div>
                
                <div className="pt-6 border-t border-slate-100 mt-6">
                  <div className="mb-2 flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Performance Score</span>
                    <span>94%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;

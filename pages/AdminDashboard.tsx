
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, Clock, AlertTriangle, UserMinus, Search, Filter, Download, UserCheck, MoreVertical } from 'lucide-react';
import Navbar from '../components/Navbar';
import { User, AttendanceRecord, Stats } from '../types';
import { mockUsers, mockAttendance } from '../mockData';

const chartData = [
  { name: 'Mon', present: 85 },
  { name: 'Tue', present: 92 },
  { name: 'Wed', present: 88 },
  { name: 'Thu', present: 95 },
  { name: 'Fri', present: 82 },
];

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const stats: Stats = {
    totalEmployees: mockUsers.length - 1,
    presentToday: 88,
    lateToday: 4,
    onLeave: 8
  };

  const filteredEmployees = mockUsers.filter(u => 
    u.id !== '1' && // Hide self
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.department.toLowerCase().includes(searchTerm.toLowerCase()))
  ).slice(0, 10); // Only show top 10 for demo

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      <Navbar variant="app" userName={user.name} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Workforce Overview</h1>
            <p className="text-slate-500">Real-time status of all {stats.totalEmployees} employees.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-md">
              <Users className="w-4 h-4" /> Add Employee
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Staff', value: stats.totalEmployees, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
            { label: 'Present Today', value: stats.presentToday, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { label: 'Late Arrivals', value: stats.lateToday, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100' },
            { label: 'On Leave', value: stats.onLeave, icon: UserMinus, color: 'text-rose-600', bg: 'bg-rose-100' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main List Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-bold text-slate-800">Employee Attendance Status</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search name or dept..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 text-left border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Employee</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Department</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Today Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Check-in</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredEmployees.map((emp, idx) => (
                      <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full border border-slate-200 shadow-sm" />
                            <span className="font-semibold text-slate-800">{emp.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">{emp.department}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            idx % 5 === 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {idx % 5 === 0 ? 'Late' : 'On-Time'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-500">
                          {idx % 5 === 0 ? '09:15 AM' : '08:45 AM'}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Showing {filteredEmployees.length} of {stats.totalEmployees} Employees
              </div>
            </div>
          </div>

          {/* Right Column: Charts & Side Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6">Attendance Trend (This Week)</h3>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="present" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 3 ? '#4f46e5' : '#e2e8f0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-xs text-slate-500 text-center">Numbers represent % of staff present each day.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">Pending Requests</h3>
              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-slate-800 text-sm">Sick Leave Request</div>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">Employee {i + 5} requested 2 days leave starting tomorrow.</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors">Approve</button>
                      <button className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell 
} from 'recharts';
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
  Award,
  Wallet,
  TrendingUp,
  Banknote,
  Download
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

  // Salary Constants (Mock Data)
  const MONTHLY_SALARY = 4400; // Base salary
  const TOTAL_WORKING_DAYS = 22; // Expected days in month

  // Derived Salary Metrics
  const salaryData = useMemo(() => {
    const daysWorked = history.length;
    const perDaySalary = MONTHLY_SALARY / TOTAL_WORKING_DAYS;
    const payableSalary = perDaySalary * daysWorked;
    return {
      monthly: MONTHLY_SALARY,
      daily: perDaySalary,
      payable: payableSalary,
      daysWorked,
      remainingDays: Math.max(0, TOTAL_WORKING_DAYS - daysWorked)
    };
  }, [history]);

  // Derived Chart Data
  const productivityData = useMemo(() => {
    return history.slice(0, 7).reverse().map(record => ({
      date: new Date(record.date).toLocaleDateString('en-US', { weekday: 'short' }),
      hours: record.totalHours,
    }));
  }, [history]);

  const punctualityData = [
    { name: 'Week 1', score: 85 },
    { name: 'Week 2', score: 92 },
    { name: 'Week 3', score: 88 },
    { name: 'Week 4', score: 98 },
  ];

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
      setCheckInTime(timeString);
      setElapsedSeconds(0);
      setCheckedIn(true);
    } else {
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
    }
  };

  const handleDownloadPayslip = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const content = `
=========================================
          ATTENDX PAYROLL SLIP
=========================================
PERIOD: ${currentMonth}
-----------------------------------------
EMPLOYEE DETAILS
Name: ${user.name}
Employee ID: EMP-${user.id.padStart(4, '0')}
Department: ${user.department}
Email: ${user.email}
-----------------------------------------
SALARY STRUCTURE
Base Monthly Salary: $${salaryData.monthly.toFixed(2)}
Daily Rate: $${salaryData.daily.toFixed(2)}
-----------------------------------------
ATTENDANCE SUMMARY
Days Worked: ${salaryData.daysWorked}
Total Working Days: ${TOTAL_WORKING_DAYS}
Attendance Rate: ${Math.round((salaryData.daysWorked / TOTAL_WORKING_DAYS) * 100)}%
-----------------------------------------
EARNINGS CALCULATION
(Base / Working Days) * Days Worked
($${salaryData.monthly.toFixed(2)} / ${TOTAL_WORKING_DAYS}) * ${salaryData.daysWorked}
-----------------------------------------
TOTAL PAYABLE: $${salaryData.payable.toFixed(2)}
=========================================
Generated via AttendX Platform
Date: ${new Date().toLocaleDateString()}
=========================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Payslip_${user.name.replace(/\s+/g, '_')}_${currentMonth.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
            
            {/* Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Avg. Check-in</div>
                <div className="text-2xl font-black text-slate-900">08:42 AM</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Days</div>
                <div className="text-2xl font-black text-slate-900">{salaryData.daysWorked} Days</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Reliability Score</div>
                <div className="text-2xl font-black text-emerald-600">98%</div>
              </div>
              <div className="bg-emerald-600 p-6 rounded-3xl shadow-lg shadow-emerald-100 text-white cursor-pointer hover:bg-emerald-700 transition-colors" onClick={() => setActiveMenu('salary')}>
                <div className="text-emerald-100 text-[10px] font-black uppercase tracking-widest mb-1">Accrued Salary</div>
                <div className="text-2xl font-black">${salaryData.payable.toLocaleString()}</div>
              </div>
            </div>

            {/* Visualization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Daily Productivity Chart */}
              <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Daily Productivity</h3>
                    <p className="text-xs text-slate-400 font-medium">Hours worked over the last 7 sessions</p>
                  </div>
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Timer className="w-5 h-5" />
                  </div>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productivityData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                      />
                      <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                        {productivityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.hours >= 8 ? '#4f46e5' : '#94a3b8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Punctuality Trend Chart */}
              <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Check-in Consistency</h3>
                    <p className="text-xs text-slate-400 font-medium">Punctuality score trend over the month</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={punctualityData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[32px] p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Want to improve your scores?</h3>
                  <p className="text-slate-400 text-sm max-w-md">Our AI analysis suggests arriving 10 minutes earlier could boost your punctuality score to 100% and unlock the premium attendance bonus.</p>
                </div>
                <button className="px-8 py-3 bg-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all">Download Analysis Report</button>
              </div>
            </div>
          </div>
        );
      case 'salary':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Salary & Payroll</h2>
              <button 
                onClick={handleDownloadPayslip}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white border border-transparent rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" /> Download Payslip
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                {/* Salary Breakdown Card */}
                <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-indigo-600" /> Monthly Breakdown
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Monthly Salary</div>
                        <div className="text-xl font-black text-slate-900">${salaryData.monthly.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Per Day Rate</div>
                        <div className="text-xl font-black text-indigo-600">${salaryData.daily.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-sm font-bold text-slate-700">Monthly Progress ({salaryData.daysWorked}/{TOTAL_WORKING_DAYS} Days)</span>
                        <span className="text-indigo-600 font-black">{Math.round((salaryData.daysWorked/TOTAL_WORKING_DAYS)*100)}%</span>
                      </div>
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-1000" 
                          style={{ width: `${(salaryData.daysWorked/TOTAL_WORKING_DAYS)*100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Payable Now</div>
                        <div className="text-3xl font-black text-emerald-700">${salaryData.payable.toLocaleString()}</div>
                      </div>
                      <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Pending Accrual</div>
                        <div className="text-3xl font-black text-indigo-700">${(salaryData.monthly - salaryData.payable).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
                  <TrendingUp className="w-12 h-12 text-emerald-400 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Earnings Projection</h3>
                  <p className="text-slate-400 text-sm mb-6 font-medium leading-relaxed">
                    Based on your current 98% punctuality score, you are eligible for the monthly efficiency bonus.
                  </p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Estimated Bonus</div>
                    <div className="text-2xl font-black text-emerald-400">+$250.00</div>
                  </div>
                </div>
              </div>
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
                </div>
              </div>
            </div>
          </div>
        );
      default:
        const { h, m } = formatElapsedTime(elapsedSeconds);
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

            <div className="space-y-8">
              <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Earnings This Month</h3>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="text-4xl font-black text-emerald-400">${salaryData.payable.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Net<br/>Accrued</div>
                </div>
                <button 
                  onClick={() => setActiveMenu('salary')}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-900/40 active:scale-95 relative z-10"
                >
                  View Salary Details
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
                    <span className="font-black text-slate-900">{salaryData.daysWorked} / {TOTAL_WORKING_DAYS}</span>
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
        <aside className="w-72 hidden lg:block h-[calc(100vh-80px)] sticky top-20 border-r border-slate-200 bg-white px-4 py-6">
          <div className="space-y-2">
            <h3 className="px-4 text-[10px] uppercase font-black text-slate-400 tracking-widest mb-4">Main Menu</h3>
            <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <SidebarItem id="attendance" icon={Clock} label="Attendance" />
            <SidebarItem id="reports" icon={BarChart3} label="Attendance Reports" />
            <SidebarItem id="leaves" icon={Calendar} label="Leaves" />
            <SidebarItem id="salary" icon={Wallet} label="Salary & Payroll" />

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
            <p className="text-xs font-semibold text-slate-800 tracking-tight">Version 2.2.0 - All Clear</p>
          </div>
        </aside>

        <main className="flex-1 px-4 md:px-8 py-8 overflow-hidden">
          <div className="max-w-6xl">
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

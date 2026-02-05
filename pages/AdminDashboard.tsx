
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  UserMinus, 
  Search, 
  Download, 
  UserCheck, 
  MoreVertical, 
  X, 
  Calendar as CalendarIcon, 
  Mail, 
  Shield, 
  Upload,
  UserPlus,
  Briefcase
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { User, Stats, UserRole } from '../types';
import { mockUsers } from '../mockData';

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [employees, setEmployees] = useState<User[]>(mockUsers);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    bloodGroup: '',
    birthPlace: '',
    nationality: '',
    motherTongue: '',
    email: '',
    aadharNo: '',
    department: 'Engineering'
  });

  const stats: Stats = {
    totalEmployees: employees.length - 1,
    presentToday: Math.floor(employees.length * 0.85),
    lateToday: 4,
    onLeave: 8
  };

  const filteredEmployees = employees.filter(u => 
    u.id !== '1' && // Hide self (Admin)
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.department.toLowerCase().includes(searchTerm.toLowerCase()))
  ).slice(0, 15);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.dob) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEmployee: User = {
      id: (employees.length + 1).toString(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: UserRole.EMPLOYEE,
      avatar: `https://i.pravatar.cc/150?u=${formData.email}`,
      department: formData.department
    };

    setEmployees(prev => [newEmployee, ...prev]);
    setShowAddModal(false);
    
    // Reset form
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      dob: '',
      gender: 'Male',
      bloodGroup: '',
      birthPlace: '',
      nationality: '',
      motherTongue: '',
      email: '',
      aadharNo: '',
      department: 'Engineering'
    });
  };

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
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              <UserPlus className="w-4 h-4" /> Add Employee
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

          {/* Right Column */}
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

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col my-auto animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-none">Employee</h2>
                  <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest">Administrator Portal</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-8 overflow-y-auto max-h-[80vh]">
              <div className="mb-6 border-b border-slate-100 pb-2">
                <h3 className="text-indigo-600 font-bold inline-block px-1 text-sm uppercase tracking-wide border-b-2 border-indigo-600">
                  Personal Details
                </h3>
              </div>

              {/* Single Form Area - Only Personal Details */}
              <div className="max-w-4xl pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                  {/* First Name */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">First Name <span className="text-red-500">*</span></label>
                  <div className="md:col-span-2">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" />
                  </div>

                  {/* Middle Name */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Middle Name</label>
                  <div className="md:col-span-2">
                    <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} placeholder="Middle Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" />
                  </div>

                  {/* Last Name */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Last Name <span className="text-red-500">*</span></label>
                  <div className="md:col-span-2">
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" />
                  </div>

                  {/* Date of Birth */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Date of Birth <span className="text-red-500">*</span></label>
                  <div className="md:col-span-2 relative max-w-[240px]">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>

                  {/* Gender */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-1">Gender <span className="text-red-500">*</span></label>
                  <div className="md:col-span-2 flex items-center gap-6">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleInputChange} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{g}</span>
                      </label>
                    ))}
                  </div>

                  {/* Department */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Department <span className="text-red-500">*</span></label>
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select name="department" value={formData.department} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700 font-medium">
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                        <option value="Human Resources">Human Resources</option>
                      </select>
                    </div>
                  </div>

                  {/* Blood Group */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Blood Group</label>
                  <div className="md:col-span-2">
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700 font-medium">
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
                    </select>
                  </div>

                  {/* Birth Place */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Birth Place</label>
                  <div className="md:col-span-2">
                    <input type="text" name="birthPlace" value={formData.birthPlace} onChange={handleInputChange} placeholder="Birth Place" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" />
                  </div>

                  {/* Nationality */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Nationality</label>
                  <div className="md:col-span-2">
                    <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder="Nationality" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" />
                  </div>

                  {/* Mother Tongue */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Mother Tongue</label>
                  <div className="md:col-span-2">
                    <input type="text" name="motherTongue" value={formData.motherTongue} onChange={handleInputChange} placeholder="Mother Tongue" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" />
                  </div>

                  {/* Email */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Email <span className="text-red-500">*</span></label>
                  <div className="md:col-span-2 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" />
                  </div>

                  {/* Social Security */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Social Security / Aadhar No.</label>
                  <div className="md:col-span-2">
                    <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleInputChange} placeholder="Social Security / Aadhar No." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" />
                  </div>

                  {/* Upload Card */}
                  <label className="md:col-span-1 text-sm font-bold text-slate-700 pt-3">Upload Social Security / Aadhar Card</label>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        Browse...
                        <input type="file" className="hidden" />
                      </label>
                      <span className="text-xs text-slate-400 italic">No file selected.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
              >
                Save Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

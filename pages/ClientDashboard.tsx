
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Settings, 
  History, 
  CreditCard, 
  LifeBuoy, 
  ArrowLeft, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle,
  ChevronRight,
  Download,
  BarChart,
  User,
  Plus,
  Trash2,
  X,
  AlertCircle,
  Clock,
  Edit2,
  UserPlus,
  Building2,
  Globe,
  MoreVertical,
  AlertOctagon,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { ClientProfile, ActivityLog, SupportTicket, PaymentMethod, ClientContact } from '../types';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'activity' | 'selfservice'>('overview');
  
  // --- STATE FOR MULTI-ORGANIZATION CRUD ---
  
  const [organizations, setOrganizations] = useState<ClientProfile[]>([
    {
      id: 'ORG-1',
      companyName: "Acme Global Corp",
      taxId: "USA-998877-XX",
      address: "123 Innovation Drive, Palo Alto, CA 94301",
      email: "corp@acme.com",
      phone: "+1 (555) 000-0000",
      industry: "Technology"
    },
    {
      id: 'ORG-2',
      companyName: "Stark Industries",
      taxId: "NY-112233-SI",
      address: "10880 Malibu Point, CA 90265",
      email: "billing@stark.com",
      phone: "+1 (212) 555-0199",
      industry: "Manufacturing"
    }
  ]);

  const [selectedOrgId, setSelectedOrgId] = useState<string>('ORG-1');

  const [contacts, setContacts] = useState<ClientContact[]>([
    { id: 'C1', orgId: 'ORG-1', name: 'Sarah Jenkins', role: 'Account Manager', email: 'sarah@acme.com', isPrimary: true },
    { id: 'C2', orgId: 'ORG-1', name: 'Mark Wilson', role: 'IT Director', email: 'm.wilson@acme.com', isPrimary: false },
    { id: 'C3', orgId: 'ORG-2', name: 'Pepper Potts', role: 'CEO', email: 'pepper@stark.com', isPrimary: true }
  ]);

  // --- LOGS, TICKETS, PAYMENTS (Multi-tenant CRUD) ---
  const [logs, setLogs] = useState<ActivityLog[]>([
    { id: 'L1', orgId: 'ORG-1', event: "Organization Created", date: "2023-01-15", category: "Settings" },
    { id: 'L2', orgId: 'ORG-2', event: "Workspace Initialized", date: "2023-02-01", category: "Settings" }
  ]);
  const [tickets, setTickets] = useState<SupportTicket[]>([
    { id: 'T-101', orgId: 'ORG-1', subject: "Initial Workspace Setup", priority: "Medium", status: "Closed", createdAt: "2023-01-16" },
    { id: 'T-102', orgId: 'ORG-2', subject: "Reactor Power Issues", priority: "High", status: "Open", createdAt: "2023-11-20" }
  ]);
  const [payments, setPayments] = useState<PaymentMethod[]>([
    { id: 'P-1', orgId: 'ORG-1', type: "Visa", lastFour: "4242", expiry: "09/25", isDefault: true },
    { id: 'P-2', orgId: 'ORG-2', type: "Amex", lastFour: "8888", expiry: "12/26", isDefault: true }
  ]);

  const currentOrg = useMemo(() => 
    organizations.find(o => o.id === selectedOrgId) || organizations[0], 
  [organizations, selectedOrgId]);

  const currentContacts = useMemo(() => 
    contacts.filter(c => c.orgId === selectedOrgId), 
  [contacts, selectedOrgId]);

  const currentTickets = useMemo(() => 
    tickets.filter(t => t.orgId === selectedOrgId),
  [tickets, selectedOrgId]);

  const currentPayments = useMemo(() => 
    payments.filter(p => p.orgId === selectedOrgId),
  [payments, selectedOrgId]);

  const currentLogs = useMemo(() => 
    logs.filter(l => l.orgId === selectedOrgId),
  [logs, selectedOrgId]);

  // Modals / Forms state
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Form states
  const [orgForm, setOrgForm] = useState<Omit<ClientProfile, 'id'>>({
    companyName: '', taxId: '', address: '', email: '', phone: '', industry: 'Technology'
  });
  const [contactForm, setContactForm] = useState<Omit<ClientContact, 'id' | 'orgId'>>({
    name: '', role: '', email: '', isPrimary: false
  });
  const [ticketForm, setTicketForm] = useState<Omit<SupportTicket, 'id' | 'orgId' | 'createdAt'>>({
    subject: '', priority: 'Medium', status: 'Open'
  });
  const [paymentForm, setPaymentForm] = useState<Omit<PaymentMethod, 'id' | 'orgId'>>({
    type: 'Visa', lastFour: '', expiry: '', isDefault: false
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  // --- CRUD HANDLERS ---

  // 1. Organization CRUD
  const handleAddOrg = () => {
    if (!orgForm.companyName) return;
    const newOrg: ClientProfile = { ...orgForm, id: `ORG-${Date.now()}` };
    setOrganizations([...organizations, newOrg]);
    setSelectedOrgId(newOrg.id);
    setShowOrgModal(false);
    setOrgForm({ companyName: '', taxId: '', address: '', email: '', phone: '', industry: 'Technology' });
  };

  const handleUpdateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    setOrganizations(organizations.map(o => o.id === selectedOrgId ? { ...o, ...currentOrg } : o));
    alert("Organization profile updated!");
  };

  const handleDeleteOrg = (id: string) => {
    if (organizations.length <= 1) return alert("At least one organization must remain.");
    if (!confirm("Are you sure? All associated data will be archived.")) return;
    const remaining = organizations.filter(o => o.id !== id);
    setOrganizations(remaining);
    setSelectedOrgId(remaining[0].id);
  };

  // 2. Contact CRUD
  const handleSaveContact = () => {
    if (!contactForm.name) return;
    if (editingId) {
      setContacts(contacts.map(c => c.id === editingId ? { ...c, ...contactForm } : c));
    } else {
      setContacts([...contacts, { ...contactForm, id: `C-${Date.now()}`, orgId: selectedOrgId }]);
    }
    setShowContactModal(false);
    setEditingId(null);
  };

  const deleteContact = (id: string) => setContacts(contacts.filter(c => c.id !== id));

  // 3. Ticket CRUD (Technical Support)
  const handleSaveTicket = () => {
    if (!ticketForm.subject) return;
    if (editingId) {
      setTickets(tickets.map(t => t.id === editingId ? { ...t, ...ticketForm } : t));
    } else {
      setTickets([...tickets, { ...ticketForm, id: `T-${Date.now()}`, orgId: selectedOrgId, createdAt: new Date().toISOString().split('T')[0] }]);
    }
    setShowTicketModal(false);
    setEditingId(null);
    setTicketForm({ subject: '', priority: 'Medium', status: 'Open' });
  };

  const deleteTicket = (id: string) => setTickets(tickets.filter(t => t.id !== id));

  // 4. Payment CRUD (Billing)
  const handleSavePayment = () => {
    if (!paymentForm.lastFour || paymentForm.lastFour.length !== 4) return;
    if (editingId) {
      setPayments(payments.map(p => p.id === editingId ? { ...p, ...paymentForm } : p));
    } else {
      setPayments([...payments, { ...paymentForm, id: `P-${Date.now()}`, orgId: selectedOrgId }]);
    }
    setShowPaymentModal(false);
    setEditingId(null);
    setPaymentForm({ type: 'Visa', lastFour: '', expiry: '', isDefault: false });
  };

  const deletePayment = (id: string) => setPayments(payments.filter(p => p.id !== id));

  // --- TAB UI ---
  const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 border-b-2 transition-all font-bold text-sm whitespace-nowrap ${
        activeTab === id 
          ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' 
          : 'border-transparent text-slate-500 hover:text-slate-800'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Navbar variant="landing" />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Exit Portal
          </button>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-3">Switch Organization:</span>
            <select 
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
              className="bg-slate-50 border-none text-sm font-bold text-slate-800 focus:ring-0 rounded-xl px-4 py-2"
            >
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.companyName}</option>
              ))}
            </select>
            <button 
              onClick={() => {
                setOrgForm({ companyName: '', taxId: '', address: '', email: '', phone: '', industry: 'Technology' });
                setShowOrgModal(true);
              }}
              className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-slate-900 rounded-[28px] flex items-center justify-center shadow-2xl shadow-slate-200 group overflow-hidden">
               <Building2 className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">{currentOrg.companyName}</h1>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Selected Org</span>
              </div>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                <Globe className="w-4 h-4" /> {currentOrg.industry} • {currentOrg.taxId}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
             <button onClick={() => handleDeleteOrg(selectedOrgId)} className="p-4 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition-colors">
               <Trash2 className="w-5 h-5" />
             </button>
          </div>
        </header>

        <div className="bg-white rounded-[48px] border border-slate-200 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
          <div className="flex border-b border-slate-100 px-6 overflow-x-auto scrollbar-hide bg-slate-50/30">
            <TabButton id="overview" label="Performance" icon={BarChart} />
            <TabButton id="profile" label="Organization Profile" icon={User} />
            <TabButton id="activity" label="Security Audits" icon={History} />
            <TabButton id="selfservice" label="Admin Console" icon={Settings} />
          </div>

          <div className="flex-1 p-8 md:p-12">
            {activeTab === 'overview' && (
              <div className="space-y-12 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Contacts</div>
                    <div className="text-3xl font-black text-slate-900">{currentContacts.length} Authorized</div>
                    <p className="text-xs text-slate-500 mt-2">Managing workforce access</p>
                  </div>
                  <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="text-indigo-100 text-[10px] font-black uppercase tracking-widest mb-2">Security Status</div>
                    <div className="text-3xl font-black">High Compliance</div>
                    <p className="text-xs text-indigo-100 mt-2">All identity checks passed</p>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Support Tickets</div>
                    <div className="text-2xl font-black text-slate-900">{currentTickets.filter(t => t.status !== 'Closed').length} Active</div>
                    <button onClick={() => setActiveTab('selfservice')} className="text-xs text-indigo-600 font-bold mt-2 hover:underline">Manage Tickets</button>
                  </div>
                </div>

                <div className="p-10 bg-slate-900 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                   <div>
                     <h3 className="text-2xl font-black mb-2">Organization Overview</h3>
                     <p className="text-slate-400 max-w-md font-medium">Manage multiple business units under a single administrative umbrella with AttendX Enterprise Control.</p>
                   </div>
                   <button onClick={() => setActiveTab('profile')} className="px-10 py-4 bg-white text-slate-900 rounded-[20px] font-black hover:bg-slate-100 transition-all">
                      Manage Detailed Profile
                   </button>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-20 animate-in fade-in duration-300">
                {/* Profile Edit Section (Update) */}
                <section>
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Corporate Identity</h3>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Edits</span>
                    </div>
                  </div>
                  <form onSubmit={handleUpdateOrg} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Legal Entity Name</label>
                      <input 
                        type="text" 
                        value={currentOrg.companyName} 
                        onChange={e => setOrganizations(organizations.map(o => o.id === selectedOrgId ? {...o, companyName: e.target.value} : o))}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-800 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Industry Sector</label>
                      <select 
                         value={currentOrg.industry}
                         onChange={e => setOrganizations(organizations.map(o => o.id === selectedOrgId ? {...o, industry: e.target.value} : o))}
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-800 transition-all"
                      >
                         <option>Technology</option>
                         <option>Manufacturing</option>
                         <option>Finance</option>
                         <option>Retail</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Corporate Headquarters</label>
                      <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                          type="text" 
                          value={currentOrg.address} 
                          onChange={e => setOrganizations(organizations.map(o => o.id === selectedOrgId ? {...o, address: e.target.value} : o))}
                          className="w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-800" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Billing Email</label>
                      <input 
                        type="email" 
                        value={currentOrg.email} 
                        onChange={e => setOrganizations(organizations.map(o => o.id === selectedOrgId ? {...o, email: e.target.value} : o))}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-800" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Phone Line</label>
                      <input 
                        type="tel" 
                        value={currentOrg.phone} 
                        onChange={e => setOrganizations(organizations.map(o => o.id === selectedOrgId ? {...o, phone: e.target.value} : o))}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-800" 
                      />
                    </div>
                    <div className="pt-4 md:col-span-2">
                       <button type="submit" className="px-12 py-4 bg-slate-900 text-white rounded-3xl font-black text-sm hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-95">
                          Update Organization Records
                       </button>
                    </div>
                  </form>
                </section>

                <div className="h-px bg-slate-100"></div>

                {/* Contacts CRUD Section */}
                <section>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Authorized Personnel</h3>
                      <p className="text-slate-500 font-medium">Individuals authorized to manage {currentOrg.companyName} workspace.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setContactForm({ name: '', role: '', email: '', isPrimary: false });
                        setEditingId(null);
                        setShowContactModal(true);
                      }}
                      className="px-8 py-4 bg-indigo-600 text-white rounded-[20px] font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2"
                    >
                      <UserPlus className="w-5 h-5" /> Add New Authorized User
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentContacts.map(contact => (
                      <div key={contact.id} className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                        <div className="flex items-center gap-5 mb-8">
                          <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center font-black text-2xl ${contact.isPrimary ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {contact.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                               <h4 className="font-black text-slate-900">{contact.name}</h4>
                               {contact.isPrimary && <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md uppercase">Primary</span>}
                            </div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{contact.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 mb-8 bg-slate-50 p-4 rounded-2xl">
                           <Mail className="w-4 h-4 text-indigo-500" /> {contact.email}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setEditingId(contact.id);
                              setContactForm({ name: contact.name, role: contact.role, email: contact.email, isPrimary: contact.isPrimary });
                              setShowContactModal(true);
                            }}
                            className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                          >
                             <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button 
                             onClick={() => deleteContact(contact.id)}
                             className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-100 transition-colors"
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="animate-in fade-in duration-300">
                 <h3 className="text-2xl font-black text-slate-900 mb-8">Audit & Security Logs</h3>
                 <div className="space-y-4">
                    {currentLogs.length > 0 ? currentLogs.map(log => (
                      <div key={log.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                               <Clock className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                               <div className="font-bold text-slate-800">{log.event}</div>
                               <div className="text-xs text-slate-400 font-medium">{log.date} • {log.category}</div>
                            </div>
                         </div>
                         <button className="text-slate-300 hover:text-slate-500"><MoreVertical className="w-5 h-5" /></button>
                      </div>
                    )) : (
                      <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                        <History className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-bold">No activity logs found for this organization.</p>
                      </div>
                    )}
                 </div>
              </div>
            )}

            {activeTab === 'selfservice' && (
              <div className="animate-in fade-in duration-300 space-y-20">
                 {/* TECHNICAL SUPPORT CRUD */}
                 <section>
                    <div className="flex items-center justify-between mb-10">
                       <div>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Technical Support</h3>
                          <p className="text-slate-500 font-medium">Manage support tickets for {currentOrg.companyName}.</p>
                       </div>
                       <button 
                          onClick={() => {
                            setTicketForm({ subject: '', priority: 'Medium', status: 'Open' });
                            setEditingId(null);
                            setShowTicketModal(true);
                          }}
                          className="px-8 py-4 bg-indigo-600 text-white rounded-[20px] font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2"
                       >
                          <Plus className="w-5 h-5" /> New Ticket
                       </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {currentTickets.map(ticket => (
                         <div key={ticket.id} className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm hover:shadow-xl transition-all group flex flex-col">
                            <div className="flex items-start justify-between mb-6">
                               <div>
                                  <div className="flex items-center gap-2 mb-2">
                                     <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                        ticket.status === 'Open' ? 'bg-emerald-50 text-emerald-600' : 
                                        ticket.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                                        'bg-slate-100 text-slate-500'
                                     }`}>{ticket.status}</span>
                                     <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                        ticket.priority === 'High' ? 'bg-rose-50 text-rose-600' : 
                                        ticket.priority === 'Medium' ? 'bg-indigo-50 text-indigo-600' : 
                                        'bg-slate-50 text-slate-400'
                                     }`}>{ticket.priority} Priority</span>
                                  </div>
                                  <h4 className="text-lg font-black text-slate-800">{ticket.subject}</h4>
                               </div>
                               <span className="text-[10px] font-bold text-slate-400">ID: {ticket.id}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-8">
                               <Clock className="w-3.5 h-3.5" /> Created on {ticket.createdAt}
                            </div>
                            <div className="mt-auto flex gap-2">
                               <button 
                                  onClick={() => {
                                     setEditingId(ticket.id);
                                     setTicketForm({ subject: ticket.subject, priority: ticket.priority, status: ticket.status });
                                     setShowTicketModal(true);
                                  }}
                                  className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors"
                               >
                                  Edit Ticket
                               </button>
                               <button 
                                  onClick={() => deleteTicket(ticket.id)}
                                  className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-100 transition-colors"
                               >
                                  <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>

                 <div className="h-px bg-slate-100"></div>

                 {/* BILLING & WALLET CRUD */}
                 <section>
                    <div className="flex items-center justify-between mb-10">
                       <div>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Corporate Billing</h3>
                          <p className="text-slate-500 font-medium">Manage organization-wide payment methods.</p>
                       </div>
                       <button 
                          onClick={() => {
                             setPaymentForm({ type: 'Visa', lastFour: '', expiry: '', isDefault: false });
                             setEditingId(null);
                             setShowPaymentModal(true);
                          }}
                          className="px-8 py-4 bg-slate-900 text-white rounded-[20px] font-black text-sm hover:bg-slate-800 shadow-xl transition-all flex items-center gap-2"
                       >
                          <CreditCard className="w-5 h-5" /> Add Card
                       </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {currentPayments.map(p => (
                         <div key={p.id} className="p-8 bg-slate-900 rounded-[40px] text-white relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                               <CreditCard className="w-24 h-24 rotate-12" />
                            </div>
                            <div className="flex justify-between items-start mb-10">
                               <div className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">{p.type}</div>
                               {p.isDefault && (
                                  <div className="flex items-center gap-1.5 text-emerald-400">
                                     <CheckCircle2 className="w-3.5 h-3.5" />
                                     <span className="text-[9px] font-black uppercase">Primary</span>
                                  </div>
                               )}
                            </div>
                            <div className="text-2xl font-black tracking-[0.2em] mb-8">•••• •••• •••• {p.lastFour}</div>
                            <div className="flex justify-between items-end">
                               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valid Thru: {p.expiry}</div>
                               <div className="flex gap-2">
                                  <button 
                                     onClick={() => {
                                        setEditingId(p.id);
                                        setPaymentForm({ type: p.type, lastFour: p.lastFour, expiry: p.expiry, isDefault: p.isDefault });
                                        setShowPaymentModal(true);
                                     }}
                                     className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                  >
                                     <Edit2 className="w-4 h-4 text-white" />
                                  </button>
                                  <button 
                                     onClick={() => deletePayment(p.id)}
                                     className="p-2 bg-rose-500/20 rounded-lg hover:bg-rose-500/40 transition-colors"
                                  >
                                     <Trash2 className="w-4 h-4 text-rose-400" />
                                  </button>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- MODALS FOR CRUD --- */}

      {/* Organization Create Modal */}
      {showOrgModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl p-10 animate-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Add New Business Unit</h3>
              <button onClick={() => setShowOrgModal(false)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2 space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Legal Company Name</label>
                 <input type="text" value={orgForm.companyName} onChange={e => setOrgForm({...orgForm, companyName: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-100 font-bold" placeholder="e.g. Acme Ltd" />
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Industry</label>
                 <input type="text" value={orgForm.industry} onChange={e => setOrgForm({...orgForm, industry: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-100 font-bold" placeholder="Technology" />
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tax ID / VAT</label>
                 <input type="text" value={orgForm.taxId} onChange={e => setOrgForm({...orgForm, taxId: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-100 font-bold" placeholder="ID Number" />
               </div>
               <div className="md:col-span-2 space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Office Address</label>
                 <input type="text" value={orgForm.address} onChange={e => setOrgForm({...orgForm, address: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-100 font-bold" placeholder="Street, City, Country" />
               </div>
               <div className="flex gap-4 md:col-span-2 pt-6">
                  <button onClick={() => setShowOrgModal(false)} className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-3xl font-black hover:bg-slate-200">Cancel</button>
                  <button onClick={handleAddOrg} className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-2xl shadow-indigo-100 hover:bg-indigo-700">Initialize Workspace</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket CRUD Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
           <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl p-10 animate-in zoom-in duration-200">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingId ? 'Edit Ticket' : 'Create New Request'}</h3>
                 <button onClick={() => setShowTicketModal(false)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600"><X /></button>
              </div>
              <div className="space-y-6">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</label>
                    <input type="text" value={ticketForm.subject} onChange={e => setTicketForm({...ticketForm, subject: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-100 font-bold text-slate-800" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</label>
                       <select value={ticketForm.priority} onChange={e => setTicketForm({...ticketForm, priority: e.target.value as any})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl font-bold outline-none">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</label>
                       <select value={ticketForm.status} onChange={e => setTicketForm({...ticketForm, status: e.target.value as any})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl font-bold outline-none">
                          <option>Open</option>
                          <option>Pending</option>
                          <option>Closed</option>
                       </select>
                    </div>
                 </div>
                 <div className="flex gap-4 pt-8">
                    <button onClick={() => setShowTicketModal(false)} className="flex-1 py-5 bg-slate-50 text-slate-500 rounded-3xl font-black">Cancel</button>
                    <button onClick={handleSaveTicket} className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-xl hover:bg-indigo-700">Save Request</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Payment CRUD Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
           <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl p-10 animate-in zoom-in duration-200">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingId ? 'Edit Card' : 'Link New Card'}</h3>
                 <button onClick={() => setShowPaymentModal(false)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600"><X /></button>
              </div>
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Card Provider</label>
                       <select value={paymentForm.type} onChange={e => setPaymentForm({...paymentForm, type: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl font-bold outline-none">
                          <option>Visa</option>
                          <option>Mastercard</option>
                          <option>Amex</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last 4 Digits</label>
                       <input type="text" maxLength={4} value={paymentForm.lastFour} onChange={e => setPaymentForm({...paymentForm, lastFour: e.target.value.replace(/\D/g, '')})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl font-bold text-center tracking-widest outline-none" placeholder="0000" />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiry Date (MM/YY)</label>
                    <input type="text" maxLength={5} value={paymentForm.expiry} onChange={e => setPaymentForm({...paymentForm, expiry: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl font-bold text-center outline-none" placeholder="12/28" />
                 </div>
                 <label className="flex items-center gap-4 py-2 cursor-pointer group">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${paymentForm.isDefault ? 'bg-slate-900 border-slate-900' : 'border-slate-200'}`}>
                       <input type="checkbox" checked={paymentForm.isDefault} onChange={e => setPaymentForm({...paymentForm, isDefault: e.target.checked})} className="hidden" />
                       {paymentForm.isDefault && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-sm font-bold text-slate-700">Set as Primary Corporate Card</span>
                 </label>
                 <div className="flex gap-4 pt-8">
                    <button onClick={() => setShowPaymentModal(false)} className="flex-1 py-5 bg-slate-50 text-slate-500 rounded-3xl font-black">Cancel</button>
                    <button onClick={handleSavePayment} className="flex-1 py-5 bg-slate-900 text-white rounded-3xl font-black shadow-xl hover:bg-slate-800 transition-all">Link Card</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Contact CRUD Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl p-10 animate-in zoom-in duration-200">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingId ? 'Modify Access' : 'Authorize New Personnel'}</h3>
                <button onClick={() => setShowContactModal(false)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600"><X /></button>
             </div>
             <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input type="text" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-100 font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Role</label>
                  <input type="text" value={contactForm.role} onChange={e => setContactForm({...contactForm, role: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-100 font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Corporate Email</label>
                  <input type="email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-100 font-bold" />
                </div>
                <label className="flex items-center gap-4 py-2 cursor-pointer group">
                   <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${contactForm.isPrimary ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200 group-hover:border-indigo-400'}`}>
                      <input type="checkbox" checked={contactForm.isPrimary} onChange={e => setContactForm({...contactForm, isPrimary: e.target.checked})} className="hidden" />
                      {contactForm.isPrimary && <CheckCircle className="w-4 h-4 text-white" />}
                   </div>
                   <span className="text-sm font-bold text-slate-700">Primary Contact (Super Admin Permissions)</span>
                </label>
                <div className="flex gap-4 pt-8">
                   <button onClick={() => setShowContactModal(false)} className="flex-1 py-5 bg-slate-50 text-slate-500 rounded-3xl font-black">Cancel</button>
                   <button onClick={handleSaveContact} className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700">Grant Access</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;

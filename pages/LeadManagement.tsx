import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import Navbar from '../components/Navbar';
import {
  Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye,
  Users, TrendingUp, Target, DollarSign, Calendar, Phone,
  Mail, Building, Briefcase, Star, Clock, MessageSquare,
  ArrowLeft, X, Save
} from 'lucide-react';

interface Lead {
  id: string;
  workspaceId: string;
  leadName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  source: string;
  campaign: string;
  medium: string;
  landingPage: string;
  leadScore: number;
  qualificationStatus: 'Hot' | 'Warm' | 'Cold';
  fitScore: number;
  budget: string;
  timeline: string;
  lastContactDate: string;
  notes: string;
  followUpDate: string;
  createdAt: string;
}

interface Workspace {
  id: string;
  organizationName: string;
  createdAt: string;
  ownerId: string;
}

const LeadManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showEditLead, setShowEditLead] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [orgName, setOrgName] = useState('');

  const [formData, setFormData] = useState<Partial<Lead>>({
    leadName: '', email: '', phone: '', company: '', jobTitle: '',
    source: '', campaign: '', medium: '', landingPage: '',
    leadScore: 0, qualificationStatus: 'Cold', fitScore: 0,
    budget: '', timeline: '', notes: '', followUpDate: ''
  });

  useEffect(() => {
    loadWorkspace();
  }, []);

  useEffect(() => {
    if (workspace) {
      loadLeads();
    }
  }, [workspace]);

  const loadWorkspace = async () => {
    const snapshot = await db.collection('workspaces').limit(1).get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      setWorkspace({ id: doc.id, ...doc.data() } as Workspace);
    } else {
      setShowCreateWorkspace(true);
    }
  };

  const loadLeads = () => {
    if (!workspace) return;
    const unsubscribe = db.collection('leads')
      .where('workspaceId', '==', workspace.id)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const leadsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Lead));
        setLeads(leadsData);
      });
    return unsubscribe;
  };

  const createWorkspace = async () => {
    if (!orgName.trim()) return;
    const newWorkspace = {
      organizationName: orgName,
      createdAt: new Date().toISOString(),
      ownerId: 'current-user-id'
    };
    const docRef = await db.collection('workspaces').add(newWorkspace);
    setWorkspace({ id: docRef.id, ...newWorkspace });
    setShowCreateWorkspace(false);
    setOrgName('');
  };

  const addLead = async () => {
    if (!workspace || !formData.leadName) return;
    const newLead = {
      ...formData,
      workspaceId: workspace.id,
      lastContactDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    await db.collection('leads').add(newLead);
    setShowAddLead(false);
    resetForm();
  };

  const updateLead = async () => {
    if (!selectedLead) return;
    await db.collection('leads').doc(selectedLead.id).update(formData);
    setShowEditLead(false);
    setSelectedLead(null);
    resetForm();
  };

  const deleteLead = async (id: string) => {
    if (window.confirm('Delete this lead?')) {
      await db.collection('leads').doc(id).delete();
    }
  };

  const resetForm = () => {
    setFormData({
      leadName: '', email: '', phone: '', company: '', jobTitle: '',
      source: '', campaign: '', medium: '', landingPage: '',
      leadScore: 0, qualificationStatus: 'Cold', fitScore: 0,
      budget: '', timeline: '', notes: '', followUpDate: ''
    });
  };

  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    setFormData(lead);
    setShowEditLead(true);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.qualificationStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: leads.length,
    hot: leads.filter(l => l.qualificationStatus === 'Hot').length,
    warm: leads.filter(l => l.qualificationStatus === 'Warm').length,
    cold: leads.filter(l => l.qualificationStatus === 'Cold').length
  };

  if (showCreateWorkspace) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full shadow-2xl border border-slate-200">
          <Target className="w-16 h-16 text-indigo-600 mb-6 mx-auto" />
          <h2 className="text-3xl font-black text-slate-900 mb-4 text-center">Create Workspace</h2>
          <p className="text-slate-500 mb-8 text-center">Enter your organization name to get started</p>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Organization Name"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={createWorkspace}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700"
          >
            Create Workspace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Navbar variant="landing" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-900">{workspace?.organizationName}</h1>
              <p className="text-slate-500 font-medium">Lead Management System</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddLead(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5" /> Add Lead
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <Users className="w-8 h-8 text-indigo-600 mb-2" />
            <div className="text-3xl font-black text-slate-900">{stats.total}</div>
            <div className="text-sm text-slate-500 font-medium">Total Leads</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <TrendingUp className="w-8 h-8 text-red-600 mb-2" />
            <div className="text-3xl font-black text-slate-900">{stats.hot}</div>
            <div className="text-sm text-slate-500 font-medium">Hot Leads</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <Target className="w-8 h-8 text-amber-600 mb-2" />
            <div className="text-3xl font-black text-slate-900">{stats.warm}</div>
            <div className="text-sm text-slate-500 font-medium">Warm Leads</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <DollarSign className="w-8 h-8 text-slate-600 mb-2" />
            <div className="text-3xl font-black text-slate-900">{stats.cold}</div>
            <div className="text-sm text-slate-500 font-medium">Cold Leads</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 mb-6">
          <div className="flex gap-2 p-2 border-b border-slate-100">
            {['overview', 'source', 'qualification', 'engagement'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-bold text-sm capitalize ${
                  activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="p-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search leads..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="Hot">Hot</option>
              <option value="Warm">Warm</option>
              <option value="Cold">Cold</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Lead</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Company</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Score</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Source</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{lead.leadName}</div>
                      <div className="text-sm text-slate-500">{lead.jobTitle}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-4 h-4" /> {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4" /> {lead.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{lead.company}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        lead.qualificationStatus === 'Hot' ? 'bg-red-100 text-red-700' :
                        lead.qualificationStatus === 'Warm' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {lead.qualificationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-slate-900">{lead.leadScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{lead.source}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(lead)}
                          className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Lead Modal */}
      {(showAddLead || showEditLead) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">
                {showEditLead ? 'Edit Lead' : 'Add New Lead'}
              </h3>
              <button
                onClick={() => { setShowAddLead(false); setShowEditLead(false); resetForm(); }}
                className="p-2 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Lead Name *"
                    value={formData.leadName}
                    onChange={(e) => setFormData({...formData, leadName: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Lead Source */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Lead Source & Acquisition</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Source</option>
                    <option value="SEO">SEO</option>
                    <option value="Ad Campaign">Ad Campaign</option>
                    <option value="Event">Event</option>
                    <option value="Referral">Referral</option>
                    <option value="Website">Website</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Campaign Name"
                    value={formData.campaign}
                    onChange={(e) => setFormData({...formData, campaign: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={formData.medium}
                    onChange={(e) => setFormData({...formData, medium: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Medium</option>
                    <option value="Email">Email</option>
                    <option value="Social">Social</option>
                    <option value="Paid Ads">Paid Ads</option>
                    <option value="Organic">Organic</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Landing Page URL"
                    value={formData.landingPage}
                    onChange={(e) => setFormData({...formData, landingPage: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Qualification */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Lead Qualification</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Lead Score (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.leadScore}
                      onChange={(e) => setFormData({...formData, leadScore: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Qualification Status</label>
                    <select
                      value={formData.qualificationStatus}
                      onChange={(e) => setFormData({...formData, qualificationStatus: e.target.value as any})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Hot">Hot</option>
                      <option value="Warm">Warm</option>
                      <option value="Cold">Cold</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Fit Score (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.fitScore}
                      onChange={(e) => setFormData({...formData, fitScore: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Timeline to Purchase"
                    value={formData.timeline}
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Engagement */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Engagement & Interaction</h4>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="date"
                    placeholder="Follow-up Date"
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <textarea
                    placeholder="Notes / Comments"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={4}
                    className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={showEditLead ? updateLead : addLead}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {showEditLead ? 'Update Lead' : 'Add Lead'}
                </button>
                <button
                  onClick={() => { setShowAddLead(false); setShowEditLead(false); resetForm(); }}
                  className="px-8 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;

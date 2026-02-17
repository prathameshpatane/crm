
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Globe, 
  Smartphone,
  ChevronRight,
  MessageCircle,
  Rocket,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Mail,
  Phone,
  Layout,
  Briefcase,
  History,
  CreditCard,
  Target,
  TrendingUp
} from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage: React.FC = () => {
  return (
    <div className="pt-16 bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar variant="landing" />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-40 overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[80%] bg-indigo-50/50 rounded-full blur-[120px] -rotate-12"></div>
          <div className="absolute top-[10%] right-[-10%] w-[50%] h-[70%] bg-sky-50/50 rounded-full blur-[120px] rotate-12"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-8">
                <Zap className="w-4 h-4" />
                Version 2.0 is now live
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                Modern Attendance for <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">Modern Teams.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Ditch the spreadsheets. Automate clock-ins, manage leave requests, and track workforce productivity in one sleek, unified platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link to="/login" className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200/50 flex items-center justify-center gap-2">
                  Start for Free <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
                  Book a Demo <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-2xl lg:max-w-none">
              <div className="animate-float relative">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3" 
                  alt="Dashboard View" 
                  className="rounded-3xl shadow-2xl border border-slate-200 grayscale-[0.2]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Integration Section */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <MessageCircle className="w-10 h-10 text-emerald-400 mb-4" />
                  <h4 className="text-white font-bold mb-2">Instant Broadcast</h4>
                  <p className="text-slate-400 text-sm">Send updates to your entire team via WhatsApp in one click.</p>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm translate-y-8">
                  <Rocket className="w-10 h-10 text-sky-400 mb-4" />
                  <h4 className="text-white font-bold mb-2">Rocket Sender Power</h4>
                  <p className="text-slate-400 text-sm">Leverage specialized automation for high-volume messaging.</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                <MessageCircle className="w-4 h-4" />
                New Integration
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                WhatsApp Attendance Automation
              </h2>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
                Connect your workspace directly to WhatsApp using the Rocket Sender extension. Send automated check-in reminders, broadcast company announcements, and manage your workforce where they already are.
              </p>
              <Link 
                to="/whatsapp-automation" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/40 group"
              >
                Learn How to Setup <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Email Bulk Messaging Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 order-1 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                <Mail className="w-4 h-4" />
                Email Automation
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Email Bulk Messaging Plugin
              </h2>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
                Send professional bulk emails to your entire workforce with our powerful Chrome extension. Perfect for company-wide announcements, policy updates, and mass communications.
              </p>
              <Link 
                to="/email-automation" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40 group"
              >
                Learn How to Setup <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="flex-1 order-2 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <Mail className="w-10 h-10 text-blue-400 mb-4" />
                  <h4 className="text-white font-bold mb-2">Mass Email</h4>
                  <p className="text-slate-400 text-sm">Send emails to hundreds of employees simultaneously.</p>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm translate-y-8">
                  <CheckCircle className="w-10 h-10 text-sky-400 mb-4" />
                  <h4 className="text-white font-bold mb-2">Professional Templates</h4>
                  <p className="text-slate-400 text-sm">Use pre-built templates for quick deployment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Management Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-sky-50 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-indigo-600/5 blur-3xl rounded-[60px]"></div>
                <div className="bg-white border border-slate-200 rounded-[32px] shadow-2xl overflow-hidden relative p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl">
                      <Target className="w-8 h-8 text-red-600 mb-2" />
                      <div className="text-2xl font-black text-red-900">247</div>
                      <div className="text-xs text-red-700 font-bold">Hot Leads</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl">
                      <TrendingUp className="w-8 h-8 text-amber-600 mb-2" />
                      <div className="text-2xl font-black text-amber-900">89%</div>
                      <div className="text-xs text-amber-700 font-bold">Conversion</div>
                    </div>
                  </div>
                  <div className="h-32 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
                    <div className="text-slate-400 text-sm font-bold">Lead Pipeline View</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6">
                <Target className="w-4 h-4" />
                Lead Tracking
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Lead Management System
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                Track, qualify, and convert leads with our comprehensive CRM. Monitor lead sources, engagement history, and qualification status all in one powerful workspace.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Lead Source & Campaign Tracking",
                  "Qualification & Scoring System",
                  "Engagement & Interaction History",
                  "Workspace for Organizations"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-bold">
                    <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to="/lead-management" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 group"
              >
                Launch Lead Manager <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Dashboard Section */}
      <section className="py-24 bg-slate-50 overflow-hidden relative border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6">
                <Layout className="w-4 h-4" />
                Enterprise Portal
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Executive Client Dashboard
              </h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                Our high-tier dashboard provides a birds-eye view for organization owners. Manage your corporate profile, track cross-departmental activity, and handle billing through a dedicated self-service portal.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Briefcase, text: "Client Overview & Status" },
                  { icon: CheckCircle, text: "Profile Management" },
                  { icon: History, text: "Activity & Reports" },
                  { icon: CreditCard, text: "Self-Service Payments" }
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-bold bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <feature.icon className="w-5 h-5 text-indigo-600" />
                    {feature.text}
                  </li>
                ))}
              </ul>

              <Link 
                to="/client-portal" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group"
              >
                Access Client Portal <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute -inset-4 bg-indigo-600/5 blur-3xl rounded-[60px]"></div>
                <div className="bg-white border border-slate-200 rounded-[32px] shadow-2xl overflow-hidden relative">
                   {/* Mini Dashboard Preview */}
                   <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preview Mode</div>
                   </div>
                   <div className="p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-indigo-600 rounded-xl"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-slate-200 rounded-md w-1/2 mb-2"></div>
                          <div className="h-3 bg-slate-100 rounded-md w-1/3"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-slate-50 rounded-2xl border border-slate-100"></div>
                        <div className="h-32 bg-slate-50 rounded-2xl border border-slate-100"></div>
                      </div>
                      <div className="mt-4 h-40 bg-slate-50 rounded-2xl border border-slate-100"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Powerful Features</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Everything you need to manage your hybrid workforce</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">Precision Tracking</h4>
              <p className="text-slate-600 leading-relaxed">Geofencing and biometric options ensure attendance data is accurate every time.</p>
            </div>
            
            <div className="group p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-8">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">Instant Reporting</h4>
              <p className="text-slate-600 leading-relaxed">Generate payroll-ready reports in seconds. Filter by department or performance.</p>
            </div>

            <div className="group p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                <Smartphone className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">Mobile Ready</h4>
              <p className="text-slate-600 leading-relaxed">Employees can clock in on the go with our responsive interface on any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="bg-indigo-600 rounded-[48px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-400/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10 max-w-2xl mx-auto leading-tight">
              Ready to transform your workforce management?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link to="/login" className="w-full sm:w-auto bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all active:scale-95">
                Get Started Free
              </Link>
              <button className="w-full sm:w-auto bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-400 transition-all border border-indigo-400">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-24 pb-12 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Branding Column */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <img 
                  src="/clientleo.png" 
                  alt="ClientLeo Logo" 
                  className="w-10 h-10 shadow-lg rounded-lg"
                />
                <span className="text-2xl font-black tracking-tighter text-white">ClientLeo</span>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                The UI-first workforce platform designed to empower teams with real-time clarity and effortless attendance tracking.
              </p>
              <div className="flex items-center gap-4">
                {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                  <Link key={i} to="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Product</h4>
              <ul className="space-y-4">
                {['Features', 'Integrations', 'Pricing', 'Rocket Sender Guide', 'API Documentation'].map((item, i) => (
                  <li key={i}>
                    <Link to={item === 'Rocket Sender Guide' ? '/whatsapp-automation' : '#'} className="text-slate-400 font-medium hover:text-indigo-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Success Stories', 'Privacy Policy', 'Terms of Service'].map((item, i) => (
                  <li key={i}>
                    <Link to="#" className="text-slate-400 font-medium hover:text-indigo-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex flex-shrink-0 items-center justify-center text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Email Us</div>
                    <div className="text-slate-300 font-medium">hello@attendx.com</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex flex-shrink-0 items-center justify-center text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Call Support</div>
                    <div className="text-slate-300 font-medium">+1 (555) 000-0000</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-slate-500 text-sm font-medium">
              &copy; 2024 AttendX. Built with precision and care.
            </div>
            <div className="flex items-center gap-8">
              <Link to="#" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Privacy</Link>
              <Link to="#" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Cookies</Link>
              <Link to="#" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

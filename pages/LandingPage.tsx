
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
  ChevronRight
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
              
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-sm font-semibold text-slate-400">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  ))}
                </div>
                <span>Joined by 10k+ HR Managers</span>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-2xl lg:max-w-none">
              <div className="animate-float relative">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3" 
                  alt="Dashboard View" 
                  className="rounded-3xl shadow-2xl border border-slate-200 grayscale-[0.2]"
                />
                {/* Decorative floating card 1 */}
                <div className="absolute -top-10 -right-6 md:-right-12 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block animate-bounce [animation-duration:5s]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold">98%</div>
                    <div className="text-xs font-bold text-slate-800">On-time Rate<br/><span className="text-slate-400 font-normal">This Week</span></div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[98%]"></div>
                  </div>
                </div>
                {/* Decorative floating card 2 */}
                <div className="absolute -bottom-10 -left-6 md:-left-12 bg-indigo-600 p-4 md:p-6 rounded-2xl shadow-xl text-white hidden sm:block animate-pulse [animation-duration:4s]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6" />
                    <div className="text-xs font-bold uppercase tracking-widest">Live Check-ins<br/><span className="text-indigo-200 font-normal">Active Now: 24</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
            {['Techflow', 'LogiCorp', 'NovaHR', 'WaveSystems', 'PrimeStaff'].map((name) => (
              <span key={name} className="text-xl md:text-2xl font-black text-slate-400 cursor-default">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Powerful Features</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Everything you need to manage your hybrid workforce</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              We built AttendX to solve the friction points between employees and HR teams. Focus on work, not on logging it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">Precision Tracking</h4>
              <p className="text-slate-600 leading-relaxed">
                Geofencing and biometric options ensure attendance data is accurate, secure, and verifiable every time.
              </p>
            </div>
            
            <div className="group p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">Instant Reporting</h4>
              <p className="text-slate-600 leading-relaxed">
                Generate payroll-ready reports in seconds. Filter by department, date, or individual performance metrics.
              </p>
            </div>

            <div className="group p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">Mobile Ready</h4>
              <p className="text-slate-600 leading-relaxed">
                Employees can clock in on the go with our responsive interface, featuring native-like experience on any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Numbers Section */}
      <section className="py-32 bg-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-black text-white mb-2">99.9%</div>
              <div className="text-indigo-100 font-bold uppercase tracking-widest text-xs">System Uptime</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">15m</div>
              <div className="text-indigo-100 font-bold uppercase tracking-widest text-xs">Saved daily / staff</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">30%</div>
              <div className="text-indigo-100 font-bold uppercase tracking-widest text-xs">Less Late Arrivals</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">12+</div>
              <div className="text-indigo-100 font-bold uppercase tracking-widest text-xs">Active Integrations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-slate-900 overflow-hidden relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-indigo-500/20 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to elevate your team's culture?</h2>
          <p className="text-xl text-slate-400 mb-12 font-medium">
            Join thousands of teams who have transformed their workforce management with AttendX. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/login" className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-900/50">
              Start Your Free Trial
            </Link>
            <button className="w-full sm:w-auto text-white font-bold text-lg hover:underline underline-offset-8">
              Contact Sales
            </button>
          </div>
          <div className="mt-16 flex items-center justify-center gap-8 text-slate-500 font-bold text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 14-day free trial</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Unlimited users</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> No setup fees</div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 border-t border-white/5 pt-20 pb-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">AttendX</span>
              </div>
              <p className="text-slate-400 max-w-xs mb-8">
                Building the future of attendance tracking and employee engagement for teams worldwide.
              </p>
              <div className="flex gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <Globe className="w-5 h-5 text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6">Product</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6">Company</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6">Legal</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center text-slate-500 text-sm font-medium">
            &copy; 2024 AttendX. All rights reserved. Crafted for excellence.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

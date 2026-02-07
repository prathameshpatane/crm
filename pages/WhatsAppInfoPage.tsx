
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Puzzle, 
  QrCode, 
  Settings, 
  ExternalLink,
  Chrome,
  MousePointer2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { User } from '../types';

interface WhatsAppInfoPageProps {
  user: User;
  onLogout: () => void;
}

const WhatsAppInfoPage: React.FC<WhatsAppInfoPageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const WA_ROCKET_URL = 'https://chromewebstore.google.com/detail/warocket/jcfgjifalfldkffiklbhkkddhcpfehio';

  const steps = [
    {
      icon: Chrome,
      title: "Install Extension",
      description: "Open the link in Google Chrome and click 'Add to Chrome' → 'Add extension'.",
      action: () => window.open(WA_ROCKET_URL, '_blank'),
      actionLabel: "Go to Chrome Store"
    },
    {
      icon: Puzzle,
      title: "Pin WARocket",
      description: "After installation, pin WARocket from the Extensions (🧩) icon in your browser toolbar.",
    },
    {
      icon: MousePointer2,
      title: "Access WhatsApp Web",
      description: "Go to web.whatsapp.com to begin the automation process.",
      action: () => window.open('https://web.whatsapp.com', '_blank'),
      actionLabel: "Open WhatsApp Web"
    },
    {
      icon: QrCode,
      title: "Log In",
      description: "Log in to WhatsApp Web by scanning the QR code with your mobile device.",
    },
    {
      icon: Settings,
      title: "Configure Features",
      description: "Click the WARocket icon and configure its features from the side panel.",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Navbar variant="app" userName={user.name} onLogout={onLogout} />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/admin')}
          className="group flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="bg-emerald-600 p-12 text-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Settings className="w-48 h-48 rotate-12" />
            </div>
            <h1 className="text-4xl font-black mb-4 relative z-10">WARocket Setup</h1>
            <p className="text-emerald-50 text-lg font-medium max-w-xl relative z-10">
              Follow these simple steps to enable powerful WhatsApp broadcasting and automation for your workforce.
            </p>
          </div>

          <div className="p-12 space-y-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-8 relative group">
                {idx !== steps.length - 1 && (
                  <div className="absolute left-7 top-14 bottom-[-3rem] w-0.5 bg-slate-100 group-hover:bg-emerald-100 transition-colors"></div>
                )}
                
                <div className="flex-shrink-0 w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-all duration-300">
                  <step.icon className="w-6 h-6" />
                </div>

                <div className="pt-2 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">Step {idx + 1}</span>
                    <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                  </div>
                  <p className="text-slate-500 font-medium mb-4 leading-relaxed">{step.description}</p>
                  
                  {step.action && (
                    <button 
                      onClick={step.action}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                    >
                      {step.actionLabel}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-12 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
                <Download className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Ready to broadcast?</h4>
                <p className="text-sm text-slate-500 font-medium">Once installed, you can reach all your employees instantly.</p>
              </div>
            </div>
            <button 
              onClick={() => window.open(WA_ROCKET_URL, '_blank')}
              className="w-full md:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all active:scale-95"
            >
              Get WARocket Extension
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WhatsAppInfoPage;

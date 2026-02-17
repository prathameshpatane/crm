import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Chrome, Download, Mail, CheckCircle } from 'lucide-react';

const EmailSetupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">Email Bulk Messaging Setup</h1>
              <p className="text-slate-600 mt-2">Install the Chrome extension and start sending bulk emails</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Chrome className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Step 1: Install Chrome Extension</h3>
                  <p className="text-slate-600 mb-4">Download and install our Chrome extension to enable bulk email functionality.</p>
                  <a 
                    href="https://chromewebstore.google.com/detail/gmass-powerful-mail-merge/ehomdgjhgmbidokdgicgmdiedadncbgf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Install Extension
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Step 2: Configure Extension</h3>
                  <p className="text-slate-600 mb-4">After installation, click the extension icon and configure your settings:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Connect your email account
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Set sending preferences
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Configure email templates
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Step 3: Import Employee List</h3>
                  <p className="text-slate-600">Upload your employee email list in CSV format or sync with your dashboard.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Step 4: Start Sending</h3>
                  <p className="text-slate-600">Compose your message and send bulk emails to your entire workforce instantly.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Need Help?</h3>
            <p className="text-slate-600 mb-4">Contact our support team for assistance with setup and configuration.</p>
            <a 
              href="mailto:support@attendx.com" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold"
            >
              <Mail className="w-5 h-5" />
              support@attendx.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSetupPage;

import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Globe, Bell } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      icon: <Eye className="text-red-500" />,
      title: "Information Collection",
      content: "We collect information you provide directly to us, such as when you create an account, participate in blood donation requests, or communicate with us. This includes your name, blood group, contact details, and location."
    },
    {
      icon: <ShieldCheck className="text-emerald-500" />,
      title: "Data Security",
      content: "We implement a variety of security measures to maintain the safety of your personal information. Your sensitive data (like medical history or location) is encrypted and accessible only by authorized personnel."
    },
    {
      icon: <Lock className="text-blue-500" />,
      title: "Cookie Policy",
      content: "Bludly uses cookies to enhance your experience. These cookies help us remember your preferences and provide a seamless login experience across different sessions."
    },
    {
      icon: <Globe className="text-purple-500" />,
      title: "Third-Party Sharing",
      content: "We do not sell, trade, or otherwise transfer your personal information to outside parties except for the sole purpose of connecting donors with recipients in emergency situations."
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-500 font-body py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-base-200 dark:bg-zinc-800 text-base-content/60 px-4 py-1.5 rounded-full mb-4">
            <Lock size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Trust & Safety</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-base-content tracking-tighter mb-4">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <p className="text-base-content/50 font-medium">Last updated: January 2026</p>
          <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Introduction Card */}
        <div className="bg-base-200/50 dark:bg-zinc-900/50 p-8 md:p-12 rounded-[2.5rem] mb-12 border border-base-200 dark:border-white/5">
          <div className="flex gap-4 items-start">
            <div className="bg-red-600 p-3 rounded-2xl text-white hidden sm:block">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-black text-base-content mb-4">Introduction</h2>
              <p className="text-base-content/70 leading-relaxed">
                At <span className="font-bold text-red-600">Bludly</span>, your privacy is our top priority. We are committed to protecting the personal information you share with us while using our platform to save lives. This policy explains how we collect, use, and safeguard your data.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, idx) => (
            <div 
              key={idx} 
              className="p-8 bg-base-100 dark:bg-zinc-900 rounded-[2rem] border border-base-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-base-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {section.icon}
              </div>
              <h3 className="text-xl font-heading font-black text-base-content mb-3 uppercase tracking-tight">
                {section.title}
              </h3>
              <p className="text-sm text-base-content/60 leading-relaxed font-medium">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Updates Section */}
        <div className="mt-12 p-8 bg-red-600 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-red-500/20">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Bell size={24} className="animate-bounce" />
            </div>
            <div>
              <h4 className="font-heading font-black text-xl uppercase tracking-tight">Stay Updated</h4>
              <p className="text-white/80 text-sm">We'll notify you whenever we update our policy.</p>
            </div>
          </div>
          <button className="btn bg-white hover:bg-zinc-100 text-red-600 border-none rounded-xl px-8 font-black uppercase tracking-widest text-xs h-12">
            Got it
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-12 text-base-content/30 text-xs font-bold uppercase tracking-widest leading-loose">
          By using Bludly, you agree to the terms outlined in this privacy policy. <br />
          If you have questions, contact us at <span className="text-red-600/50">privacy@bludly.org</span>
        </p>

      </div>
    </div>
  );
};

export default Privacy;
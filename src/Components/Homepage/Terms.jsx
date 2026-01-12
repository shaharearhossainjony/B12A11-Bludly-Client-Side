import React, { useState } from 'react';
import { 
  ChevronDown, 
  Scale, 
  ShieldAlert, 
  UserCheck, 
  AlertCircle, 
  HeartHandshake, 
  Clock,
  Printer,
  ChevronRight
} from 'lucide-react';

const Terms = () => {
  const [activeTab, setActiveTab] = useState(0);

  const sections = [
    {
      id: "acceptance",
      icon: <Scale size={20} />,
      title: "1. Acceptance of Terms",
      content: "By accessing or using Bludly, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services. Our platform is built on trust and humanitarian values, and we expect all users to uphold these principles."
    },
    {
      id: "eligibility",
      icon: <UserCheck size={20} />,
      title: "2. Donor Eligibility",
      content: "Donors must be 18 years or older, meet the minimum weight requirement (typically 50kg), and pass all local health regulations for blood donation. Bludly does not perform medical screening; all medical verifications happen at the designated hospital or blood bank."
    },
    {
      id: "conduct",
      icon: <ShieldAlert size={20} />,
      title: "3. User Conduct",
      content: "Users are strictly prohibited from posting false blood requests or using donor information for purposes other than arranging blood donations. Harassment, data scraping, or any form of commercial exploitation of the database will lead to immediate legal action and account termination."
    },
    {
      id: "liability",
      icon: <AlertCircle size={20} />,
      title: "4. Limitation of Liability",
      content: "Bludly is a connecting platform and does not provide medical services. We are not liable for any health complications, incidents at donation sites, or interactions between users. The actual donation process is governed by the hospital's own policies."
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-500 font-body py-12 px-4 md:py-20 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Material Header */}
        <div className="flex flex-col md:flex-row justify-center items-end  mb-12 border-b border-base-200 dark:border-white/5 pb-10">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">
              <div className="w-8 h-[2px] bg-red-600"></div>
              Legal Framework
            </div>
            <h1 className="text-3xl md:text-6xl font-heading font-black text-base-content tracking-tighter">
              Terms &  <span className="text-red-600">Conditions</span>
            </h1>
          </div>
          
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Material Navigation (Sticky) */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 space-y-2">
              <p className="text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em] mb-4 ml-4">Quick Navigation</p>
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full flex items-center justify-between p-5 rounded-[1.5rem] transition-all duration-300 ${
                    activeTab === index 
                    ? "bg-red-600 text-white shadow-xl shadow-red-500/20 translate-x-2" 
                    : "bg-base-200/50 dark:bg-zinc-900/50 text-base-content hover:bg-base-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`p-2 rounded-xl ${activeTab === index ? "bg-white/20" : "bg-base-300 dark:bg-zinc-700"}`}>
                      {section.icon}
                    </span>
                    <span className="font-bold text-sm tracking-tight">{section.title.split('.')[1]}</span>
                  </div>
                  <ChevronRight size={16} className={activeTab === index ? "opacity-100" : "opacity-0"} />
                </button>
              ))}
            </div>
          </aside>

          {/* Right Side: Content Area */}
          <div className="lg:w-2/3 space-y-6">
            {sections.map((section, index) => (
              <div 
                key={section.id}
                className={`group p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 ${
                  activeTab === index 
                  ? "bg-base-100 dark:bg-zinc-900 border-red-600/30 shadow-2xl" 
                  : "bg-base-100 dark:bg-zinc-900/30 border-base-200 dark:border-white/5 opacity-60 grayscale"
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className={`hidden md:flex w-12 h-12 rounded-2xl items-center justify-center font-black ${
                    activeTab === index ? "bg-red-600 text-white" : "bg-base-200 dark:bg-zinc-800 text-base-content/30"
                  }`}>
                    0{index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-heading font-black mb-4 tracking-tight uppercase ${
                      activeTab === index ? "text-base-content" : "text-base-content/40"
                    }`}>
                      {section.title}
                    </h3>
                    <div className="h-1 w-12 bg-red-600 mb-6 rounded-full opacity-30"></div>
                    <p className={`leading-relaxed text-sm md:text-base font-medium ${
                      activeTab === index ? "text-base-content/70" : "text-base-content/20"
                    }`}>
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Support Highlight */}
            <div className="mt-12 p-10 rounded-[3rem] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-500/10 flex flex-col md:flex-row items-center gap-8 group">
               <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
                  <HeartHandshake size={40} />
               </div>
               <div className="text-center md:text-left flex-1">
                  <h4 className="text-2xl font-heading font-black text-emerald-600 mb-2">Humanitarian Clause</h4>
                  <p className="text-emerald-900/60 dark:text-emerald-400/60 text-sm font-medium">
                    We prioritize life over everything. In extreme emergencies, Bludly reserves the right to expedite certain requests to save lives.
                  </p>
               </div>
            </div>
          </div>

        </div>

        
      </div>
    </div>
  );
};

export default Terms;
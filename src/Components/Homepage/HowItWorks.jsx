import React from "react";
import { Search, Calendar, CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Find Donor",
    desc: "Search through our verified list of donors based on your blood group and location.",
    icon: <Search size={40} />,
  },
  {
    title: "Request Blood",
    desc: "Send a formal request and wait for a donor to accept or coordinate with you.",
    icon: <Calendar size={40} />,
  },
  {
    title: "Save Lives",
    desc: "Once the donation is completed, you've successfully helped save a life!",
    icon: <CheckCircle2 size={40} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Simple <span className="text-red-600">3-Step</span> Process
          </h2>
          <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center group">
              
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center
                              bg-red-100 dark:bg-red-900/20 text-red-600
                              group-hover:bg-red-600 group-hover:text-white
                              transition-all duration-500 shadow-xl shadow-red-500/10">
                {step.icon}
              </div>

              <h4 className="text-2xl font-bold mb-3 uppercase tracking-tighter">
                {step.title}
              </h4>

              <p className="text-sm text-base-content/60 leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;



import React from 'react';
import { Heart, Activity, ShieldCheck, Users } from 'lucide-react';

const FeaturedSection = () => {
  const features = [
    {
      icon: <Heart className="text-red-500" size={32} />,
      title: "Save Lives",
      desc: "One single donation can save up to three lives in emergency situations."
    },
    {
      icon: <ShieldCheck className="text-blue-500" size={32} />,
      title: "Verified Donors",
      desc: "Our platform ensures all donor profiles are verified for safety and reliability."
    },
    {
      icon: <Activity className="text-green-500" size={32} />,
      title: "Health Benefits",
      desc: "Regular donation helps in maintaining healthy iron levels and heart health."
    },
    {
      icon: <Users className="text-purple-500" size={32} />,
      title: "Community",
      desc: "Join thousands of volunteers and donors dedicated to making a difference."
    }
  ];

  return (
    <section className="py-24 bg-base-100 transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-base-content mb-4">
            Why Choose <span className="text-red-600">Bludly?</span>
          </h2>
          <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-3xl bg-base-200/50 dark:bg-slate-900/50 border border-gray-100 dark:border-white/5 
                         hover:bg-red-600 transition-all duration-300 
                         hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="mb-6 bg-white dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center 
                              shadow-sm group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>

              {/* Title: group-hover e color white hobe */}
              <h3 className="text-xl font-heading font-bold text-base-content mb-3 
                             group-hover:text-white transition-colors duration-300">
                {item.title}
              </h3>
              
              {/* Description: group-hover e text white/90 hobe */}
              <p className="font-body leading-relaxed text-base text-base-content/70 
                            group-hover:text-white/90 transition-colors duration-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
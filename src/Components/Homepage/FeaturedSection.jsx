import React from 'react';
import { Heart, Activity, ShieldCheck, Users } from 'lucide-react';

const FeaturedSection = () => {
  const features = [
    {
      icon: <Heart className="text-red-500" size={40} />,
      title: "Save Lives",
      desc: "One single donation can save up to three lives in emergency situations."
    },
    {
      icon: <ShieldCheck className="text-blue-500" size={40} />,
      title: "Verified Donors",
      desc: "Our platform ensures all donor profiles are verified for safety and reliability."
    },
    {
      icon: <Activity className="text-green-500" size={40} />,
      title: "Health Benefits",
      desc: "Regular donation helps in maintaining healthy iron levels and heart health."
    },
    {
      icon: <Users className="text-purple-500" size={40} />,
      title: "Community",
      desc: "Join thousands of volunteers and donors dedicated to making a difference."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Bludly?</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors group border border-transparent hover:border-red-100">
              <div className="mb-4 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
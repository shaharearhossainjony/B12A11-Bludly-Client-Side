import React from 'react';
import { Heart, ShieldCheck, Users, Droplets, Target, Activity } from 'lucide-react';
import { useNavigate } from 'react-router';

const AboutUs = () => {
  const navigate = useNavigate()
  const stats = [
    { label: "Successful Donors", value: "15k+", icon: <Users size={20} /> },
    { label: "Lives Saved", value: "45k+", icon: <Heart size={20} /> },
    { label: "Verified Banks", value: "250+", icon: <ShieldCheck size={20} /> },
    { label: "Blood Requests", value: "10k+", icon: <Activity size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-500 font-body overflow-hidden">
      
      {/* --- Hero Section --- */}
      <section className="relative py-20 lg:py-32 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-red-600/5 dark:bg-red-600/10 -skew-y-6 origin-top-left"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 px-4 py-1.5 rounded-full">
                <Droplets size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Our Story</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-black text-base-content tracking-tighter leading-none">
                Connecting Hearts, <br />
                <span className="text-red-600">Saving Lives.</span>
              </h1>
              <p className="text-lg text-base-content/70 leading-relaxed font-medium">
                Bludly is a dedicated platform designed to bridge the gap between blood donors and recipients. 
                Our mission is to ensure that no life is lost due to the unavailability of blood. 
                Started in 2024, we've built a community of thousands of lifesavers.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <button onClick={() => navigate('/register')} className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl px-8 font-black uppercase tracking-widest shadow-xl shadow-red-500/20">
                  Join As Donor
                </button>
                <button onClick={() => navigate('/blogs')} className="btn btn-outline border-2 border-base-content/20 text-base-content hover:bg-base-content hover:text-base-100 rounded-2xl px-8 font-black uppercase tracking-widest">
                  Learn More
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-800">
                <img 
                  src="https://i.ibb.co.com/9HVdLSK0/Screenshot-637.png" 
                  alt="Blood Donation" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="py-16 bg-base-200/50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2 p-6 bg-base-100 dark:bg-zinc-800 rounded-[2rem] shadow-sm border border-base-200 dark:border-white/5 transition-transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-950/30 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-heading font-black text-base-content">{stat.value}</h3>
                <p className="text-xs font-black uppercase tracking-widest text-base-content/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Mission & Vision --- */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Our Mission */}
            <div className="group p-10 bg-base-100 dark:bg-zinc-900 rounded-[3rem] border border-base-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-heading font-black text-base-content mb-4 tracking-tight">Our Mission</h3>
              <p className="text-base-content/60 leading-relaxed font-medium">
                To simplify the process of blood donation by connecting donors and seekers through a real-time, 
                secure, and efficient digital platform, ensuring help reaches those in need without delay.
              </p>
            </div>

            {/* Our Vision */}
            <div className="group p-10 bg-base-100 dark:bg-zinc-900 rounded-[3rem] border border-base-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-950/30 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Activity size={32} />
              </div>
              <h3 className="text-3xl font-heading font-black text-base-content mb-4 tracking-tight">Our Vision</h3>
              <p className="text-base-content/60 leading-relaxed font-medium">
                To create a world where no medical emergency goes unanswered due to blood shortage, 
                empowering individuals to become heroes in their own communities through donation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- Simple FAQ/Trust Section --- */}
      <section className="py-20 bg-red-600 text-white mx-4 rounded-[3rem] mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="container mx-auto px-8 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 tracking-tighter uppercase leading-none">
            Become a part of the <br /> life-saving movement.
          </h2>
          <p className="text-white/80 text-lg mb-10 font-medium">
            Your single contribution can be the reason for someone's smile. Join Bludly today.
          </p>
          <button onClick={() => navigate('/')} className="btn bg-white hover:bg-zinc-100 text-red-600 border-none rounded-2xl px-12 h-14 font-black uppercase tracking-widest shadow-2xl">
            Get Started Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
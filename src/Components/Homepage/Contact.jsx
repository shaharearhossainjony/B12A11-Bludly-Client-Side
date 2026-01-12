
import React from 'react';
import { Phone, Mail, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
  };

  return (
    <section className="py-24 bg-base-100 transition-colors duration-500 font-body">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col lg:flex-row items-stretch rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5">
          
          {/* Left Side: High-Impact Info Panel */}
          <div className="lg:w-1/3 bg-red-600 p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Decorations from Design 1 */}
            <div className="absolute top-[-5%] right-[-5%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-heading font-black tracking-tighter mb-6">
                Contact Us
              </h2>
              <p className="text-white/80 font-medium leading-relaxed mb-12 text-lg">
                Have questions or need urgent blood support? Reach out to our 24/7 support team.
              </p>

              <div className="space-y-8">
                {[
                  { icon: <Phone size={22} />, label: "Call Us", val: "+8801771420235" },
                  { icon: <Mail size={22} />, label: "Email Us", val: "support@bludly.org" },
                  { icon: <MapPin size={22} />, label: "Location", val: "Dhanmondi, Dhaka" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white group-hover:text-red-600 transition-all duration-300 shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/60 mb-1">{item.label}</p>
                      <p className="text-lg font-bold">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links from Design 2 */}
            <div className="relative z-10 mt-16 pt-8 border-t border-white/20">
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/60 mb-4">Follow Our Impact</p>
              <div className="flex gap-4">
                {[<Facebook size={18}/>, <Twitter size={18}/>, <Instagram size={18}/>, <Linkedin size={18}/>].map((icon, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white hover:text-red-600 transition-all">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Clean Modern Form */}
          <div className="lg:w-2/3 p-10 md:p-16 bg-white dark:bg-zinc-900 transition-colors duration-500">
            <h3 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-10">
              Send us a <span className="text-red-600">Message</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Name Input */}
                <div className="group space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-transparent border-b-2 border-gray-100 dark:border-zinc-800 py-3 focus:border-red-600 outline-none transition-all text-slate-900 dark:text-white font-bold placeholder:font-medium placeholder:text-slate-300 dark:placeholder:text-zinc-700"
                    required
                  />
                </div>
                {/* Email Input */}
                <div className="group space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-transparent border-b-2 border-gray-100 dark:border-zinc-800 py-3 focus:border-red-600 outline-none transition-all text-slate-900 dark:text-white font-bold placeholder:font-medium placeholder:text-slate-300 dark:placeholder:text-zinc-700"
                    required
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div className="group space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="w-full bg-transparent border-b-2 border-gray-100 dark:border-zinc-800 py-3 focus:border-red-600 outline-none transition-all text-slate-900 dark:text-white font-bold placeholder:font-medium placeholder:text-slate-300 dark:placeholder:text-zinc-700"
                />
              </div>

              {/* Message Input */}
              <div className="group space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-1">Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Type your message here..." 
                  className="w-full bg-transparent border-b-2 border-gray-100 dark:border-zinc-800 py-3 focus:border-red-600 outline-none transition-all text-slate-900 dark:text-white font-bold placeholder:font-medium placeholder:text-slate-300 dark:placeholder:text-zinc-700 resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  className="group relative inline-flex items-center gap-3 bg-red-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-red-600/30 overflow-hidden transition-all active:scale-95 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 "></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
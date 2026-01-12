
import React, { useState } from "react";
import { PhoneIncoming } from "lucide-react";

const ContactUs = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <>
      {/* --- EMERGENCY SUPPORT SECTION --- */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto bg-base-200 dark:bg-zinc-900 rounded-[3rem] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10 border border-base-300 dark:border-white/5 shadow-2xl">
          
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tighter leading-none uppercase">
              In Need of <br />
              <span className="text-red-600 underline">Emergency</span> Blood?
            </h2>

            <p className="text-base-content/60 max-w-md font-medium">
              Our 24/7 volunteer team is ready to assist you in finding the nearest donor immediately.
              Don't wait.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="btn btn-error bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl px-8 h-16 font-black uppercase tracking-widest shadow-xl shadow-red-600/20">
                Call Support Now
              </button>

              <div className="flex items-center gap-3 text-red-600 font-black">
                <PhoneIncoming />
                <span>+8801771420235</span>
              </div>
            </div>
          </div>

          <div className="text-9xl md:text-[12rem] animate-pulse opacity-20 hidden md:block">
            🆘
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;

import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
 
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          
 
          <div className="lg:w-1/3 bg-red-600 p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="opacity-80 mb-10">
                Have questions or need urgent blood support? Reach out to our 24/7 support team.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg"><Phone size={24} /></div>
                  <div>
                    <p className="text-xs uppercase opacity-60">Call Us</p>
                    <p className="font-bold">+880 1234-567890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg"><Mail size={24} /></div>
                  <div>
                    <p className="text-xs uppercase opacity-60">Email Us</p>
                    <p className="font-bold">support@bludly.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg"><MapPin size={24} /></div>
                  <div>
                    <p className="text-xs uppercase opacity-60">Location</p>
                    <p className="font-bold">Dhanmondi, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

       
          <div className="lg:w-2/3 p-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Full Name</label>
                <input type="text" placeholder="John Doe" className="input input-bordered w-full bg-gray-50 focus:bg-white" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <input type="email" placeholder="john@example.com" className="input input-bordered w-full bg-gray-50 focus:bg-white" required />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700">Message</label>
                <textarea rows="4" placeholder="How can we help you?" className="textarea textarea-bordered w-full bg-gray-50 focus:bg-white" required></textarea>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="btn btn-error text-white px-10 rounded-full flex items-center gap-2">
                  <Send size={18} /> Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;
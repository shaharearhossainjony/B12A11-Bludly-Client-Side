import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Search, UserPlus, Heart } from 'lucide-react';
import { AuthContext } from '../../Provider/AuthProvider'; 

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 

  return (
    <div className="relative min-h-[600px] flex items-center justify-center transition-colors duration-500 bg-base-100">
      
 
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        
        {/* Modern Label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-widest font-body">
            Save Lives Today
          </span>
        </div>

        {/* Heading: Using Text-Base-Content for auto color switch */}
        <h1 className="text-5xl md:text-8xl font-heading font-black text-base-content mb-8 leading-none tracking-tighter">
          Your Blood Can <br />
          <span className="text-red-600 dark:text-red-500 italic">Give Life</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-2xl font-body text-base-content/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          The most precious gift that anyone can give to another person is the gift of life. Join our community and start donating.
        </p>

        {/* Buttons: DaisyUI buttons automatically handle dark mode */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {user ? (
            <button 
              onClick={() => navigate('/donation-requests')}
              className="btn btn-primary btn-lg rounded-2xl px-10 font-bold shadow-xl shadow-red-500/20 hover:scale-105 transition-transform border-none"
            >
              <Heart size={22} className="fill-current" /> Donate Now
            </button>
          ) : (
            <button 
              onClick={() => navigate('/register')}
              className="btn btn-primary btn-lg rounded-2xl px-10 font-bold shadow-xl shadow-red-500/20 hover:scale-105 transition-transform border-none"
            >
              <UserPlus size={22} /> Join as Donor
            </button>
          )}
          
          <button 
            onClick={() => navigate('/search-requests')}
            className="btn btn-outline btn-lg rounded-2xl px-10 font-bold dark:border-gray-700 dark:text-gray-300 hover:scale-105 transition-transform"
          >
            <Search size={22} /> Search Requests
          </button>
        </div>
      </div>

      {/* Grid Pattern (Subtle touch) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000' stroke-width='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default Banner;
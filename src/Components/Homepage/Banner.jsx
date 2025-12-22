
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Search, UserPlus, Heart } from 'lucide-react';
import { AuthContext } from '../../Provider/AuthProvider'; 

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 

  return (
    <div className="relative bg-gradient-to-r from-red-700 to-red-500 h-[500px] flex items-center justify-center text-white overflow-hidden">
  
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#pattern)" /></svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Your Blood Can Give <span className="text-yellow-300">Life</span> to Someone
        </h1>
        <p className="text-lg md:text-xl mb-10 opacity-90">
          Join our community of heroes. Bridge the gap between donors and those in need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        
          {user ? (
            <button 
              onClick={() => navigate('/donation-requests')}
              className="flex items-center justify-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              <Heart size={20} className="fill-current" /> Donate Blood
            </button>
          ) : (
            <button 
              onClick={() => navigate('/register')}
              className="flex items-center justify-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              <UserPlus size={20} /> Join as a Donor
            </button>
          )}
          
          <button 
            onClick={() => navigate('/search-requests')}
            className="flex items-center justify-center gap-2 bg-red-800 text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-900 transition-all shadow-lg hover:scale-105"
          >
            <Search size={20} /> Search Donors
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
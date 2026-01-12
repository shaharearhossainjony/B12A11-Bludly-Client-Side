import React from 'react';
import { useNavigate } from 'react-router';
import { XCircle, ArrowLeft, RefreshCw, LifeBuoy } from 'lucide-react';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-10 bg-base-100 flex items-center justify-center px-4 transition-colors duration-500 font-body">
      <div className="max-w-md w-full bg-base-100 dark:bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-10 text-center border border-base-200 dark:border-white/5 relative overflow-hidden">
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-bl-[5rem]"></div>

        {/* Error Icon Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-600/20 rounded-full animate-pulse"></div>
            <div className="relative bg-red-100 dark:bg-red-600/10 p-5 rounded-full">
              <XCircle className="text-red-600" size={64} />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl md:text-4xl font-heading font-black text-base-content mb-3 tracking-tighter uppercase">
          Payment <span className="text-red-600">Cancelled</span>
        </h2>
        <p className="text-base-content/60 mb-10 leading-relaxed font-medium">
          It seems the process was interrupted. Don't worry, no funds were deducted from your account. You can try again whenever you're ready.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate('/create-payment-checkout')}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-red-500/20 uppercase tracking-widest text-xs active:scale-95"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-base-200 dark:bg-zinc-800 text-base-content font-black py-4 rounded-2xl border-none transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs hover:bg-base-300 dark:hover:bg-zinc-700 active:scale-95"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>

        {/* Support Link */}
        <div className="mt-10 pt-8 border-t border-base-200 dark:border-white/5 flex items-center justify-center gap-2 text-sm">
          <LifeBuoy size={16} className="text-red-500" />
          <span className="text-base-content/40 font-bold uppercase tracking-widest text-[10px]">
            Need help? 
            <button className="text-red-600 ml-1 hover:underline cursor-pointer">
              Contact Support
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
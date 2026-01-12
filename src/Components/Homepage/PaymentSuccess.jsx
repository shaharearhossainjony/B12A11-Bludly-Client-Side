

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { CheckCircle2, Home, LayoutDashboard, ArrowRight, Loader2 } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      axiosInstance.post(`/success-payment?session_id=${sessionId}`)
        .then(res => {
          setPaymentData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Payment verification error:", err);
          setLoading(false);
        });
    }
  }, [axiosInstance, sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 transition-colors duration-500">
        <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
        <p className="text-base-content/60 font-heading font-bold italic tracking-wide animate-pulse">Finalizing your contribution...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-12 transition-colors duration-500 font-body">
      <div className="max-w-lg w-full bg-base-100 dark:bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] overflow-hidden border border-base-200 dark:border-white/5">
        
        {/* Top Status Bar */}
        <div className="bg-emerald-500 h-2 w-full"></div>

        <div className="p-8 md:p-12 text-center">
          {/* Animated Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
              <div className="relative bg-emerald-100 dark:bg-emerald-500/10 p-5 rounded-full">
                <CheckCircle2 className="text-emerald-500" size={64} />
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-black text-base-content mb-3 tracking-tighter">
            Payment <span className="text-emerald-500">Received!</span>
          </h2>
          <p className="text-base-content/60 mb-10 px-2 leading-relaxed font-medium">
            Thank you for your support. Your donation has been successfully processed and will help save lives.
          </p>

          {/* Payment Details Card */}
          {paymentData && (
            <div className="bg-base-200 dark:bg-zinc-800/50 rounded-3xl p-6 mb-10 border border-dashed border-emerald-500/30">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base-content/50 text-xs font-black uppercase tracking-widest italic">Amount Donated</span>
                <span className="font-black text-emerald-500 text-2xl tracking-tighter">${paymentData.amount}</span>
              </div>
              
              <div className="flex justify-between items-center mb-4 text-[10px] md:text-xs">
                <span className="text-base-content/50 font-black uppercase tracking-widest italic">Transaction ID</span>
                <span className="font-mono text-base-content font-bold bg-base-300 dark:bg-zinc-700 px-2 py-1 rounded">
                    {paymentData.transactionId?.slice(0, 18)}...
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm border-t border-base-content/5 pt-4">
                <span className="text-base-content/50 font-black uppercase tracking-widest italic text-[10px]">Payment Status</span>
                <div className="badge badge-success gap-2 font-black text-[10px] uppercase py-3 shadow-lg shadow-emerald-500/20">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    Paid
                </div>
              </div>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-2xl transition-all duration-300 font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 shadow-xl"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-base-200 dark:bg-zinc-800 border-none text-base-content py-4 rounded-2xl transition-all duration-300 font-black uppercase tracking-widest text-xs hover:bg-base-300 dark:hover:bg-zinc-700 active:scale-95"
            >
              <Home size={18} />
              Home
            </button>
          </div>

          {/* Secondary Link */}
          <button 
            onClick={() => navigate('/create-payment-checkout')}
            className="mt-8 text-base-content/40 hover:text-red-500 text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 mx-auto group"
          >
            Make another donation 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
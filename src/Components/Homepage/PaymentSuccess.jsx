
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { CheckCircle2, Home, LayoutDashboard, ArrowRight } from 'lucide-react';

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
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 mb-4"></div>
        <p className="text-gray-600 font-medium italic">Finalizing your contribution...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-green-100">
        
        {/* Top Status Bar */}
        <div className="bg-green-600 h-2 w-full"></div>

        <div className="p-8 text-center">
          {/* Animated Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full animate-pulse">
              <CheckCircle2 className="text-green-600" size={60} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Received!</h2>
          <p className="text-gray-500 mb-8 px-4">
            Thank you for your support. Your donation has been successfully processed and will help save lives.
          </p>

          {/* Payment Details Card */}
          {paymentData && (
            <div className="bg-green-50/50 rounded-2xl p-6 mb-8 border border-dashed border-green-200">
              <div className="flex justify-between mb-3">
                <span className="text-gray-500 font-medium">Amount Donated</span>
                <span className="font-bold text-green-700 text-lg">${paymentData.amount}</span>
              </div>
              <div className="flex justify-between mb-3 text-xs">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-mono text-gray-700 font-semibold">{paymentData.transactionId?.slice(0, 18)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-green-100 pt-3">
                <span className="text-gray-500">Payment Status</span>
                <span className="text-green-600 font-bold uppercase tracking-widest">Paid</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dashboard Button */}
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-black text-white py-3.5 rounded-xl transition duration-300 font-semibold shadow-md"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
            
            {/* Home Button (New) */}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-700 py-3.5 rounded-xl transition duration-300 font-semibold"
            >
              <Home size={18} />
              Back to Home
            </button>
          </div>

          {/* Secondary Action */}
          <button 
            onClick={() => navigate('/create-payment-checkout')}
            className="mt-8 text-gray-400 hover:text-red-500 text-sm font-medium transition flex items-center justify-center gap-1 mx-auto"
          >
            Make another donation <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
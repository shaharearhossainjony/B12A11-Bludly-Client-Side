import React from 'react';
import { useNavigate } from 'react-router';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 text-center border border-red-100">
        
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <XCircle className="text-red-600" size={64} />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
        <p className="text-gray-600 mb-8">
          It seems you have cancelled the payment process or something went wrong. Don't worry, your money hasn't been deducted.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/create-payment-checkout')}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-red-200"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl border border-gray-200 transition duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>

        {/* Support Note */}
        <p className="mt-8 text-sm text-gray-400">
          Need help? <span className="text-red-500 cursor-pointer font-medium hover:underline">Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelled;
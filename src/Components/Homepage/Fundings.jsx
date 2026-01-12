


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { DollarSign, Gift, Calendar, User, TrendingUp, CreditCard } from "lucide-react";

const FundingPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [amount, setAmount] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get("/payments");
        setDonors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    const formData = {
      donorName: user?.displayName,
      donorEmail: user?.email,
      donateAmount: amount,
    };

    try {
      const res = await axiosSecure.post("/create-payment-checkout", formData);
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment error", error);
    }
  };

  if (loading) return <LoaderSpinner />;

  return (
    <div className="py-8 md:py-16 min-h-screen bg-base-100 transition-colors duration-500 px-4 font-body">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-red-600 mb-4 tracking-tighter">
                Fuel Our <span className="text-base-content">Mission</span>
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto font-medium italic text-sm md:text-base px-2">
                Your financial contribution helps us maintain the infrastructure to save lives 24/7.
            </p>
            <div className="w-20 md:w-24 h-1.5 bg-red-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          
          {/* Donation Form Card */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-base-100 dark:bg-zinc-900 shadow-2xl rounded-[2rem] p-6 md:p-8 border border-base-200 dark:border-white/5 sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-red-600 p-3 rounded-2xl text-white">
                    <Gift size={24} />
                </div>
                <h3 className="text-xl font-heading font-black text-base-content">Make a Donation</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest italic">Donor Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" size={18} />
                    <input
                        type="text"
                        value={user?.displayName || "Anonymous Donor"}
                        readOnly
                        className="w-full pl-12 pr-4 py-4 bg-base-200 dark:bg-zinc-800 border-none rounded-2xl text-base-content font-bold outline-none cursor-not-allowed text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest italic">Amount (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 font-bold" size={18} />
                    <input
                        type="number"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-12 pr-4 py-4 bg-base-100 dark:bg-zinc-800 border-2 border-base-200 dark:border-zinc-700 rounded-2xl text-base-content font-bold focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all placeholder:text-base-content/20 text-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-500/20 transition-all active:scale-95 uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} /> Confirm & Pay
                </button>
              </form>
            </div>
          </div>

          {/* Donation History Table */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-base-100 dark:bg-zinc-900 shadow-xl rounded-[2rem] overflow-hidden border border-base-200 dark:border-white/5">
              <div className="p-6 md:p-8 border-b border-base-200 dark:border-white/5 flex justify-between items-center bg-base-100 dark:bg-zinc-900">
                <h3 className="text-lg md:text-xl font-heading font-black text-base-content flex items-center gap-2">
                    <TrendingUp className="text-emerald-500" /> Recent Contributors
                </h3>
                <span className="badge badge-error badge-outline font-black text-[10px] uppercase px-3 py-3 md:py-4">{donors.length} Donors</span>
              </div>

              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-base-200 dark:bg-zinc-800/50">
                    <tr className="border-none text-base-content/40 uppercase text-[10px] tracking-widest">
                      <th className="py-5 pl-6 md:pl-8">#</th>
                      <th>Donor</th>
                      <th>Amount</th>
                      <th className="pr-6 md:pr-8 text-right lg:text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donors.map((donor, index) => (
                      <tr key={donor._id} className="border-b border-base-200 dark:border-white/5 hover:bg-base-200/50 dark:hover:bg-zinc-800/50 transition-colors group">
                        <td className="py-5 pl-6 md:pl-8 font-bold text-base-content/30 text-xs md:text-sm">{index + 1}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="hidden sm:flex w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 items-center justify-center font-black text-[10px]">
                                {donor.customer_name?.charAt(0) || "D"}
                            </div>
                            <span className="font-bold text-base-content text-xs md:text-sm line-clamp-1 truncate max-w-[80px] md:max-w-full">
                                {donor.customer_name || "Donor"}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 md:px-3 py-1 rounded-lg font-black text-[10px] md:text-sm whitespace-nowrap">
                            ${donor.amount}
                          </span>
                        </td>
                        <td className="pr-6 md:pr-8 text-right lg:text-left">
                          <div className="flex items-center justify-end lg:justify-start gap-1 md:gap-2 text-base-content/50 text-[10px] md:text-xs font-bold whitespace-nowrap">
                            <Calendar size={12} className="hidden xs:block" />
                            {new Date(donor.paidAt).toLocaleDateString("en-GB")}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {donors.length === 0 && (
                  <div className="py-20 text-center text-base-content/20 italic font-bold">
                      No contributions found yet. Be the first one!
                  </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FundingPage;
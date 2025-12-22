import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

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
    <div className="py-10 min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-2">Fund for Blood Donation</h2>
        <p className="text-center text-gray-600 mb-8">Your contribution helps save lives </p>

        {/* Donation Form */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="px-4 py-2 border rounded-md bg-gray-100 outline-none cursor-not-allowed"
            />
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (USD)"
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-400"
            />
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition py-2">
              Donate Now
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Serial</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Amount ($)</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={donor._id} className="border-b hover:bg-red-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-medium">{donor.customer_name || "Donor"}</td>
                  <td className="px-4 py-2 font-bold text-red-600">${donor.amount}</td>
                  <td className="px-4 py-2">{new Date(donor.paidAt).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;
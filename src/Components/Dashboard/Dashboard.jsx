
import React, { useContext, useEffect, useState } from "react";
import { FaUserFriends, FaDollarSign, FaHandHoldingMedical } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { Link } from "react-router";


const MainDashboard = () => {
  const { user,role, loading, roleLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    totalRequests: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setStatsLoading(true);
        const response = await axiosSecure.get("/admin-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setStatsLoading(false);
      }
    };


    if (!loading && !roleLoading && user?.email) {
      fetchAdminStats();
    }
  }, [user?.email, loading, roleLoading, axiosSecure]);


  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">

      <section className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white rounded-2xl p-8 mb-8 shadow-lg flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.displayName || 'User'}!</h1>
          <p className="mt-2 text-lg">Here’s what’s happening on your dashboard today.</p>
        </div>
        <div className="text-6xl animate-bounce">🏠</div>
      </section>


      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsLoading ? (
          <div className="col-span-3 text-center py-10 text-gray-500">Updating stats...</div>
        ) : (
          <>
       
            <div className="group hover:bg-purple-600 bg-white rounded-xl border border-purple-200 shadow p-6 flex items-center gap-4 transition-all duration-300">
              <div className="bg-purple-100 group-hover:bg-purple-400 text-purple-700 group-hover:text-white p-4 rounded-full text-2xl transition-colors">
                <FaUserFriends />
              </div>
              <div>
                <h2 className="text-3xl font-bold group-hover:text-white">{stats.totalUsers}</h2>
                <p className="text-gray-500 group-hover:text-purple-100">Total Donors</p>
              </div>
            </div>

           
            <div className="group hover:bg-green-600 bg-white rounded-xl border border-green-200 shadow p-6 flex items-center gap-4 transition-all duration-300">
              <div className="bg-green-100 group-hover:bg-green-400 text-green-700 group-hover:text-white p-4 rounded-full text-2xl transition-colors">
                <FaDollarSign />
              </div>
              <div>
                <h2 className="text-3xl font-bold group-hover:text-white">${stats.totalFunds}</h2>
                <p className="text-gray-500 group-hover:text-green-100">Total Funding</p>
              </div>
            </div>

  
            <div className="group hover:bg-red-600 bg-white rounded-xl border border-red-200 shadow p-6 flex items-center gap-4 transition-all duration-300">
              <div className="bg-red-100 group-hover:bg-red-400 text-red-700 group-hover:text-white p-4 rounded-full text-2xl transition-colors">
                <FaHandHoldingMedical />
              </div>
              <div>
                <h2 className="text-3xl font-bold group-hover:text-white">{stats.totalRequests}</h2>
                <p className="text-gray-500 group-hover:text-red-100">Blood Requests</p>
              </div>
            </div>
          </>
        )}
      </section>


      <section >
        
      </section>
      <div className="mt-5 flex justify-center">
        {
          role == 'donor' && <Link to={'/dashboard/my-donation-requests'} className="btn btn-primary">View my all request</Link>
        }
      </div>
    </div>
  );
};

export default MainDashboard;
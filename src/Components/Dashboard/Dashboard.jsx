import React, { useContext, useEffect, useState } from "react"
import { FaUserFriends, FaDollarSign, FaHandHoldingMedical } from "react-icons/fa"
import { AuthContext } from "../../Provider/AuthProvider"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner"
import { Link } from "react-router"

const MainDashboard = () => {
  const { user, role, loading, roleLoading } = useContext(AuthContext);
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
    }

    if (!loading && !roleLoading && user?.email) {
      fetchAdminStats();
    }
  }, [user?.email, loading, roleLoading, axiosSecure])

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 lg:p-8 bg-base-200 dark:bg-zinc-950 min-h-screen transition-colors duration-300">
      
      {/* Welcome Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white rounded-[2rem] p-6 md:p-10 mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">
              Welcome back, <span className="underline decoration-white/30">{user?.displayName || 'User'}</span>!
            </h1>
            <p className="mt-2 text-white/80 font-medium md:text-lg">
              Here’s a quick overview of your platform's activity today.
            </p>
          </div>
          <div className="text-5xl md:text-7xl animate-bounce drop-shadow-lg">🏠</div>
        </div>
        {/* Decorative circle for glassmorphism effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {statsLoading ? (
          // Skeleton Loaders
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-32 w-full bg-base-300 animate-pulse rounded-2xl"></div>
          ))
        ) : (
          <>
            {/* Total Donors Card */}
            <StatCard 
              icon={<FaUserFriends />} 
              value={stats.totalUsers} 
              label="Total Donors" 
              colorClass="hover:bg-purple-600 border-purple-200 dark:border-purple-900/30"
              iconBg="bg-purple-100 text-purple-700"
              hoverIconBg="group-hover:bg-purple-400"
            />

            {/* Total Funding Card */}
            <StatCard 
              icon={<FaDollarSign />} 
              value={`$${stats.totalFunds}`} 
              label="Total Funding" 
              colorClass="hover:bg-emerald-600 border-emerald-200 dark:border-emerald-900/30"
              iconBg="bg-emerald-100 text-emerald-700"
              hoverIconBg="group-hover:bg-emerald-400"
            />

            {/* Blood Requests Card */}
            <StatCard 
              icon={<FaHandHoldingMedical />} 
              value={stats.totalRequests} 
              label="Blood Requests" 
              colorClass="hover:bg-rose-600 border-rose-200 dark:border-rose-900/30"
              iconBg="bg-rose-100 text-rose-700"
              hoverIconBg="group-hover:bg-rose-400"
            />
          </>
        )}
      </section>

      {/* Action Section */}
      <div className="mt-10 flex justify-center">
        {role === 'donor' && (
          <Link 
            to="/dashboard/my-donation-requests" 
            className="btn btn-lg btn-primary rounded-2xl shadow-lg hover:scale-105 transition-transform px-8"
          >
            View My All Requests
          </Link>
        )}
      </div>
    </div>
  );
};

/* Reusable Stat Card Component for consistency */
const StatCard = ({ icon, value, label, colorClass, iconBg, hoverIconBg }) => (
  <div className={`group ${colorClass} bg-base-100 dark:bg-zinc-900 rounded-2xl border p-6 flex items-center gap-5 transition-all duration-300 shadow-sm hover:shadow-xl`}>
    <div className={`${iconBg} ${hoverIconBg} group-hover:text-white p-4 rounded-2xl text-2xl transition-all duration-300`}>
      {icon}
    </div>
    <div>
      <h2 className="text-2xl md:text-3xl font-black text-base-content group-hover:text-white transition-colors">
        {value}
      </h2>
      <p className="text-base-content/60 group-hover:text-white/80 font-bold uppercase text-[10px] tracking-widest transition-colors">
        {label}
      </p>
    </div>
  </div>
);

export default MainDashboard;











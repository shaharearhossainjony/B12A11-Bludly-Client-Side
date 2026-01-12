


import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import { Search, MapPin, Droplets, Calendar, Hospital } from "lucide-react";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { useNavigate } from "react-router";
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const SearchRequests = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const axiosInstance = useAxios();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/donation-requests')
            .then(res => {
                const pending = res.data.filter(req =>
                    req.donationStatus?.toLowerCase() === 'pending'
                );
                setRequests(pending);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, [axiosSecure]);

  useEffect(() => {
    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });

    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosInstance
      .get(
        `/search-requests?bloodGroup=${encodeURIComponent(
          bloodGroup
        )}&district=${district}&upazila=${upazila}`
      )
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Search Error:", err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-base-100 min-h-screen transition-colors duration-500 font-body">
      {/* Search Form Card */}
      <div className="max-w-5xl mx-auto bg-base-100 dark:bg-zinc-900 p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/5">
        <h2 className="text-3xl md:text-4xl font-heading font-black text-red-600 text-center mb-10 flex items-center justify-center gap-3">
          <Search size={32} className="animate-pulse" /> Search Donation Requests
        </h2>

        <form onSubmit={handleSearch} className="grid md:grid-cols-3 gap-8 items-end">
          
          {/* Blood Group Select */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-base-content/70 flex items-center gap-2 ml-1 italic">
              <Droplets size={16} className="text-red-500" /> Blood Group*
            </label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="select select-bordered w-full bg-base-200 dark:bg-zinc-800 text-base-content border-none focus:ring-2 focus:ring-red-500 rounded-xl"
              required
            >
              <option value="">Select Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* District Select */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-base-content/70 flex items-center gap-2 ml-1 italic">
              <MapPin size={16} className="text-red-500" /> District*
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="select select-bordered w-full bg-base-200 dark:bg-zinc-800 text-base-content border-none focus:ring-2 focus:ring-red-500 rounded-xl"
              required
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Upazila Select */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-base-content/70 flex items-center gap-2 ml-1 italic">
              <MapPin size={16} className="text-red-500" /> Upazila*
            </label>
            <select
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="select select-bordered w-full bg-base-200 dark:bg-zinc-800 text-base-content border-none focus:ring-2 focus:ring-red-500 rounded-xl"
              required
            >
              <option value="">Select Upazila</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn bg-red-600 hover:bg-red-700 border-none text-white px-12 h-14 rounded-2xl font-black text-lg shadow-xl shadow-red-500/30 transition-all hover:-translate-y-1 active:scale-95"
            >
              <Search size={20} /> Search Now
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto mt-20 px-4">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {results.map((donor) => (
              <div 
                key={donor._id} 
                className="bg-base-100 dark:bg-zinc-900 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/5 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="bg-red-600 p-6 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-white text-red-600 h-12 w-12 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner group-hover:rotate-[360deg] transition-transform duration-700">
                      {donor.bloodGroup}
                    </div>
                    <span className="font-heading font-bold text-lg">{donor.recipientName}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {donor.status || "Pending"}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-8 space-y-6">
                  <div className="flex items-start gap-4 text-base-content/80">
                    <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-500"><MapPin size={20} /></div>
                    <div>
                      <p className="text-[10px] text-base-content/40 font-black uppercase tracking-tighter">Location</p>
                      <p className="text-md font-bold">{donor.upazila}, {donor.district}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-base-content/80">
                    <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-500"><Calendar size={20} /></div>
                    <div>
                      <p className="text-[10px] text-base-content/40 font-black uppercase tracking-tighter">Date Needed</p>
                      <p className="text-md font-bold">{donor.donationDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-base-content/80">
                    <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-500"><Hospital size={20} /></div>
                    <div>
                      <p className="text-[10px] text-base-content/40 font-black uppercase tracking-tighter">Hospital</p>
                      <p className="text-md font-bold line-clamp-1">{donor.hospitalName}</p>
                    </div>
                  </div>

                  <button onClick={() => navigate(`/request-details/${donor._id}`)} className="btn btn-block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-none rounded-2xl font-black text-md hover:bg-red-600 hover:text-white transition-all shadow-md group-hover:scale-[1.02]">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && results.length === 0 && (
            <div className="text-center py-32 bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300">
              <div className="bg-base-200 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Search size={40} className="text-base-content/20" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-base-content/30 italic">
                No donation requests found matching your search.
              </h3>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchRequests;







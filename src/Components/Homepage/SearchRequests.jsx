import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import { Search, MapPin, Droplets, Calendar, Hospital } from "lucide-react";

const SearchRequests = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const axiosInstance = useAxios();
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

      console.log(results);
  };

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-8 flex items-center justify-center gap-2">
          <Search size={28} /> Search Donation Requests
        </h2>

        <form
          onSubmit={handleSearch}
          className="grid md:grid-cols-3 gap-6 items-end"
        >
    
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Droplets size={16} className="text-red-500" /> Blood Group*
            </label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 outline-none bg-gray-50"
              required
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

   
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <MapPin size={16} className="text-red-500" /> District*
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 outline-none bg-gray-50"
              required
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

      
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <MapPin size={16} className="text-red-500" /> Upazila*
            </label>
            <select
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 outline-none bg-gray-50"
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
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-3 rounded-full transition-all shadow-lg hover:shadow-red-200 active:scale-95 flex items-center gap-2"
            >
              {loading ? "Searching..." : "Search Now"}
            </button>
          </div>
        </form>
      </div>

     
      <div className="max-w-6xl mx-auto mt-16 px-4">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((donor) => (
              <div 
                key={donor._id} 
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
              
                <div className="bg-red-600 p-4 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-white text-red-600 h-10 w-10 rounded-full flex items-center justify-center font-black text-xl">
                      {donor.bloodGroup}
                    </div>
                    <span className="font-semibold">{donor.recipientName}</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-red-800 px-2 py-1 rounded">
                    {donor.status || "Pending"}
                  </span>
                </div>

         
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin size={18} className="text-red-500 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Location</p>
                      <p className="text-sm font-medium">{donor.upazila}, {donor.district}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-gray-600">
                    <Calendar size={18} className="text-red-500 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Donation Date</p>
                      <p className="text-sm font-medium">{donor.donationDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-gray-600">
                    <Hospital size={18} className="text-red-500 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Hospital</p>
                      <p className="text-sm font-medium line-clamp-1">{donor.hospitalName}</p>
                    </div>
                  </div>

                  <button className="w-full mt-2 bg-gray-900 text-white py-2.5 rounded-xl font-bold hover:bg-red-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && results.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-400 italic">
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
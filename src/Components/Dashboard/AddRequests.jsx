
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { Droplets, MapPin, Hospital, Calendar, Clock, MessageSquare, User, Mail, Send } from "lucide-react";
import Swal from "sweetalert2";

const AddRequests = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [upazila, setUpazila] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/districts.json").then((res) => setDistricts(res.data.districts));
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      district: form.district.value,
      upazila: form.upazila.value,
      hospitalName: form.hospitalName.value,
      address: form.address.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      message: form.message.value,
      donationStatus: "Pending",
    };

    try {
      const res = await axiosSecure.post("/requests", formData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Created!",
          text: "Your blood donation request has been posted.",
          confirmButtonColor: "#ef4444",
        });
        form.reset();
        navigate("/dashboard/my-donation-requests");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  if (loading) return <LoaderSpinner />;

  const inputClass = "input input-bordered w-full bg-base-200 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-red-500 transition-all rounded-xl pl-10";
  const labelClass = "text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest italic flex items-center gap-1";

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4 transition-colors duration-500">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-base-200 dark:border-white/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-red-600 p-8 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tighter uppercase">Create Blood Request</h2>
          <p className="opacity-80 text-sm mt-2 font-medium italic">Fill in the details to find a donor quickly.</p>
        </div>

        <form onSubmit={handleRequest} className="p-8 md:p-12 space-y-8">
          
          {/* Section: Requester Info (Read Only) */}
          <div className="grid md:grid-cols-2 gap-6 p-6 bg-base-200/50 dark:bg-zinc-800/30 rounded-3xl border border-dashed border-base-300 dark:border-zinc-700">
            <div className="space-y-2">
              <label className={labelClass}><User size={14}/> Requester Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" size={18} />
                <input type="text" value={user?.displayName || ""} readOnly className={inputClass + " opacity-60 cursor-not-allowed"} />
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelClass}><Mail size={14}/> Requester Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" size={18} />
                <input type="email" value={user?.email || ""} readOnly className={inputClass + " opacity-60 cursor-not-allowed"} />
              </div>
            </div>
          </div>

          {/* Section: Recipient Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Recipient Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                <input type="text" name="recipientName" placeholder="Enter recipient name" required className={inputClass} />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Blood Group</label>
              <div className="relative">
                <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                <select name="bloodGroup" required className="select select-bordered w-full bg-base-200 dark:bg-zinc-800 border-none rounded-xl pl-10 focus:ring-2 focus:ring-red-500">
                  <option value="">Select Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section: Location Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>District</label>
              <select name="district" value={district} onChange={(e) => setDistrict(e.target.value)} required className="select select-bordered w-full bg-base-200 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-red-500">
                <option value="">Select District</option>
                {districts?.map((d, i) => <option key={i} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Upazila</label>
              <select name="upazila" value={upazila} onChange={(e) => setUpazila(e.target.value)} required className="select select-bordered w-full bg-base-200 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-red-500">
                <option value="">Select Upazila</option>
                {upazilas?.map((u) => <option key={u.id} value={u.name}>{u.name}</option>)}
              </select>
            </div>
          </div>

          {/* Section: Hospital Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Hospital Name</label>
              <div className="relative">
                <Hospital className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                <input type="text" name="hospitalName" placeholder="DMCH, Evercare, etc." required className={inputClass} />
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Full Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                <input type="text" name="address" placeholder="House, Road, Area..." required className={inputClass} />
              </div>
            </div>
          </div>

          {/* Section: DateTime */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Donation Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                <input type="date" name="donationDate" required className={inputClass} />
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Donation Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                <input type="time" name="donationTime" required className={inputClass} />
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="space-y-2">
            <label className={labelClass}>Request Message</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 text-red-500" size={18} />
              <textarea name="message" rows="4" placeholder="Why you need blood..." required className="textarea textarea-bordered w-full bg-base-200 dark:bg-zinc-800 border-none rounded-xl pl-10 focus:ring-2 focus:ring-red-500 text-base"></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="btn btn-block bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl h-14 font-black uppercase tracking-widest shadow-xl shadow-red-500/30 transition-all active:scale-95">
              <Send size={18} className="mr-2" /> Submit Blood Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequests;
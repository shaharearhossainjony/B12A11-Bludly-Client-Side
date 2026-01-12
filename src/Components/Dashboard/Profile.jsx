import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { Edit2, Save, X, User, MapPin, Droplets, Mail, Loader2, Camera } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const ProfilePage = () => {
  const { user, updateUser, role } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    upazila: "",
    bloodGroup: "",
    mainPhotoURL: "",
  });

  useEffect(() => {
    if (user?.email) {
      setProfileLoading(true);
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            name: data.name || "",
            district: data.district || "",
            upazila: data.upazila || "",
            bloodGroup: data.bloodGroup || "",
            mainPhotoURL: data.mainPhotoURL || "",
          });
          setProfileLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setProfileLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      let currentPhotoURL = formData.mainPhotoURL;
      const file = fileInputRef.current?.files[0];

      if (file) {
        const imgFormData = new FormData();
        imgFormData.append("image", file);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=68de729ed61ce9171a7e8bcd89290876`,
          imgFormData
        );
        if(res.data.success) {
            currentPhotoURL = res.data.data.display_url;
        }
      }

      const updatedData = { ...formData, mainPhotoURL: currentPhotoURL };
      const response = await axiosSecure.patch(
        `/users/update/${user.email}`,
        updatedData
      );

      if (response.data.modifiedCount > 0 || response.data.matchedCount > 0) {
        await updateUser({
          displayName: updatedData.name,
          photoURL: updatedData.mainPhotoURL,
        });
        setFormData(updatedData);
        setIsEditing(false);
        Swal.fire({ 
          icon: "success", 
          title: "Profile Updated", 
          showConfirmButton: false,
          timer: 1500 
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      Swal.fire("Error", "Could not update profile", "error");
    } finally {
      setBtnLoading(false);
    }
  };

  if (profileLoading) return <LoaderSpinner />;

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4 transition-colors duration-500 font-body">
      <div className="max-w-4xl mx-auto bg-base-100 dark:bg-zinc-900 shadow-2xl rounded-[2.5rem] overflow-hidden border border-base-200 dark:border-white/5">
        
        {/* Banner Section */}
        <div className="h-40 md:h-52 bg-gradient-to-r from-red-600 to-red-500 relative">
          <div className="absolute -bottom-16 left-8 md:left-12 group">
            <div className="relative">
                <img
                src={formData.mainPhotoURL || "https://i.ibb.co/mR709P1/user.png"}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] border-8 border-base-100 object-cover bg-base-200 shadow-xl"
                />
                {isEditing && (
                    <div className="absolute inset-0 bg-black/40 rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => fileInputRef.current.click()}>
                        <Camera className="text-white" size={32} />
                    </div>
                )}
            </div>
          </div>
        </div>

        {/* Action Header */}
        <div className="pt-20 pb-10 px-8 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-black text-base-content tracking-tight">
                {formData.name || "Anonymous User"}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="badge badge-error text-white font-bold uppercase p-3">
                    {role}
                </span>
                <span className="text-base-content/40 text-sm font-medium italic">Member since 2026</span>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-neutral grow md:grow-0 rounded-2xl flex items-center gap-2 font-black uppercase tracking-widest text-xs"
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={btnLoading}
                    className="btn btn-success grow md:grow-0 text-white rounded-2xl flex items-center gap-2 font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20"
                  >
                    {btnLoading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-ghost grow md:grow-0 rounded-2xl font-black uppercase tracking-widest text-xs bg-base-200"
                  >
                    <X size={16} /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Form Grid */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest italic flex items-center gap-2">
                <User size={14} /> Full Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your name"
                className={`w-full p-4 rounded-2xl border-none font-bold text-base-content transition-all ${
                  isEditing ? "bg-base-200 ring-2 ring-red-500/20 focus:ring-red-500" : "bg-base-200/50 cursor-not-allowed"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest italic flex items-center gap-2">
                <Mail size={14} /> Registered Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full p-4 rounded-2xl border-none bg-base-200/30 text-base-content/40 font-bold cursor-not-allowed italic"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest italic flex items-center gap-2">
                <MapPin size={14} /> District
              </label>
              <input
                name="district"
                type="text"
                value={formData.district}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-4 rounded-2xl border-none font-bold text-base-content transition-all ${
                  isEditing ? "bg-base-200 ring-2 ring-red-500/20 focus:ring-red-500" : "bg-base-200/50 cursor-not-allowed"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest italic flex items-center gap-2">
                <MapPin size={14} /> Upazila
              </label>
              <input
                name="upazila"
                type="text"
                value={formData.upazila}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-4 rounded-2xl border-none font-bold text-base-content transition-all ${
                  isEditing ? "bg-base-200 ring-2 ring-red-500/20 focus:ring-red-500" : "bg-base-200/50 cursor-not-allowed"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest italic flex items-center gap-2">
                <Droplets size={14} /> Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`select select-bordered w-full h-14 border-none rounded-2xl font-bold text-base-content transition-all ${
                  isEditing ? "bg-base-200 ring-2 ring-red-500/20 focus:ring-red-500" : "bg-base-200/50 cursor-not-allowed"
                }`}
              >
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest italic">Update Profile Picture</label>
              <input 
                ref={fileInputRef}
                name='photoURL' 
                type="file" 
                disabled={!isEditing}
                accept="image/*"
                className={`file-input file-input-bordered w-full h-14 border-none rounded-2xl font-bold ${
                    isEditing ? "bg-base-200" : "bg-base-200/50 opacity-50"
                }`} 
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
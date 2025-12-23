
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { Edit2, Save, X, User, MapPin, Droplets, Mail, Loader2 } from "lucide-react";
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

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderSpinner></LoaderSpinner>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        

        <div className="h-32 bg-gradient-to-r from-red-600 to-red-500 relative">
          <div className="absolute -bottom-12 left-10">
            <img
              src={formData.mainPhotoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white object-cover bg-gray-200"
            />
          </div>
        </div>

        <div className="pt-16 pb-10 px-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{formData.name}</h1>
              <span className="mt-2 inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase">
                {role}
              </span>
            </div>

            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <Edit2 size={18} /> Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={btnLoading}
                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    {btnLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    <X size={18} /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                <User size={16} /> Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-xl border transition-all ${
                  isEditing ? "border-red-300 ring-2 ring-red-50" : "bg-gray-50 border-transparent"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                <Mail size={16} /> Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full p-3 rounded-xl border border-transparent bg-gray-100 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                <MapPin size={16} /> District
              </label>
              <input
                name="district"
                type="text"
                value={formData.district}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-xl border transition-all ${
                  isEditing ? "border-red-300 ring-2 ring-red-50" : "bg-gray-50 border-transparent"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                <MapPin size={16} /> Upazila
              </label>
              <input
                name="upazila"
                type="text"
                value={formData.upazila}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-xl border transition-all ${
                  isEditing ? "border-red-300 ring-2 ring-red-50" : "bg-gray-50 border-transparent"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                <Droplets size={16} /> Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-xl border transition-all ${
                  isEditing ? "border-red-300 ring-2 ring-red-50" : "bg-gray-50 border-transparent"
                }`}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500">Upload Photo</label>
              <input 
                ref={fileInputRef}
                name='photoURL' 
                type="file" 
                disabled={!isEditing}
                accept="image/*"
                className={`file-input w-full border ${isEditing ? "border-red-300" : "bg-gray-50 border-transparent"}`} 
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
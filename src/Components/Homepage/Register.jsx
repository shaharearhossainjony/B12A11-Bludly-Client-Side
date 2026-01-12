import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/districts.json").then((res) => setDistricts(res.data.districts));
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
  }, []);

  const handleRegisterBtn = async (event) => {
    event.preventDefault();
    setFirebaseError("");
    setLoading(true);

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const file = form.photoURL.files[0];
    const bloodGroup = form.bloodGroup.value;

    if (name.length < 6) {
      setNameError("Name must be at least 6 characters");
      setLoading(false);
      return;
    } else setNameError("");

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      setLoading(false);
      return;
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setPasswordError("Include both uppercase and lowercase letters");
      setLoading(false);
      return;
    } else setPasswordError("");

    if (confirmPassword !== password) {
      setPasswordError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=68de729ed61ce9171a7e8bcd89290876`,
        { image: file },
        { headers: { "content-type": "multipart/form-data" } }
      );

      const mainPhotoURL = imgRes.data.data.display_url;

      const formData = {
        name,
        email,
        mainPhotoURL,
        bloodGroup,
        district,
        upazila,
        status: "active",
        role: "donor"
      };

      await createUser(email, password);
      await updateUser({ displayName: name, photoURL: mainPhotoURL });
      await axiosSecure.post("/users", formData);
      
      form.reset();
      navigate("/");
    } catch (error) {
      setFirebaseError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      setFirebaseError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen py-10 px-4 font-body transition-colors duration-500">
      <div className="hero-content flex-col lg:flex-row w-full max-w-6xl justify-between gap-12">
        
        {/* --- Left Text Section --- */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-5xl lg:text-7xl font-black text-base-content tracking-tighter uppercase leading-none">
            Start <span className="text-red-600">Saving</span> <br /> Lives Today.
          </h1>
          <p className="py-8 text-base-content/60 font-medium max-w-md text-lg">
            Create your profile and join a network of dedicated donors. Your presence makes a difference in urgent medical moments.
          </p>
          <div className="hidden lg:flex items-center gap-4">
             <div className="p-4 bg-red-600 rounded-2xl text-white shadow-xl shadow-red-500/20 animate-pulse">
                <FontAwesomeIcon icon={faUserPlus} size="2x" />
             </div>
             <p className="text-xs font-black text-base-content/40 uppercase tracking-widest leading-relaxed">
                Verified Medical <br /> Community Access
             </p>
          </div>
        </div>

        {/* --- Registration Card --- */}
        <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl rounded-[2.5rem] border border-base-200">
          <div className="card-body p-6 md:p-10">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-8 text-red-600 text-center">Create Account</h2>
            
            <form onSubmit={handleRegisterBtn} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="form-control">
                <label className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/40 mb-2">Full Name</label>
                <input name="name" type="text" placeholder="John Doe" className="input input-bordered bg-base-200 border-none rounded-2xl h-12" required />
                {nameError && <p className="text-[10px] text-error mt-1 font-bold italic uppercase">{nameError}</p>}
              </div>

              <div className="form-control">
                <label className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/40 mb-2">Email Address</label>
                <input name="email" type="email" placeholder="john@example.com" className="input input-bordered bg-base-200 border-none rounded-2xl h-12" required />
              </div>

              <div className="form-control">
                <label className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/40 mb-2">Avatar Image</label>
                <input name="photoURL" type="file" className="file-input file-input-bordered bg-base-200 border-none rounded-2xl w-full h-12" required />
              </div>

              <div className="form-control">
                <label className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/40 mb-2">Blood Group</label>
                <select name="bloodGroup" className="select select-bordered bg-base-200 border-none rounded-2xl h-12" required>
                  <option value="">Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div className="form-control">
                <label className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/40 mb-2">District</label>
                <select required value={district} onChange={(e) => setDistrict(e.target.value)} name="district" className="select select-bordered bg-base-200 border-none rounded-2xl h-12">
                  <option value="">Select District</option>
                  {districts?.map((d) => <option key={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div className="form-control">
                <label className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/40 mb-2">Upazila</label>
                <select required value={upazila} onChange={(e) => setUpazila(e.target.value)} name="upazila" className="select select-bordered bg-base-200 border-none rounded-2xl h-12">
                  <option value="">Select Upazila</option>
                  {upazilas?.map((u) => <option key={u.id}>{u.name}</option>)}
                </select>
              </div>

              <div className="form-control relative">
                <label className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/40 mb-2">Password</label>
                <input name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="input input-bordered bg-base-200 border-none rounded-2xl w-full h-12" required />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[2.7rem] cursor-pointer text-base-content/30 hover:text-red-600 transition-colors">
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>

              <div className="form-control relative">
                <label className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/40 mb-2">Confirm Password</label>
                <input name="confirmPassword" type={showPassword ? "text" : "password"} placeholder="••••••••" className="input input-bordered bg-base-200 border-none rounded-2xl w-full h-12" required />
              </div>

              <div className="md:col-span-2 mt-2">
                {(passwordError || firebaseError) && (
                  <div className="alert alert-error py-2 rounded-xl text-[10px] font-black text-white uppercase tracking-widest italic">
                    <span>{passwordError || firebaseError}</span>
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading} className="btn md:col-span-2 bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl h-14 shadow-xl shadow-red-500/20 text-md font-bold transition-all uppercase tracking-widest mt-4">
                {loading ? <span className="loading loading-spinner"></span> : "Complete Registration"}
              </button>
            </form>

            <div className="divider text-[10px] font-black uppercase text-base-content/20 tracking-[0.2em] my-6">Social Connect</div>

            {/* --- Google Login Button --- */}
            <button 
              onClick={handleGoogleLogin} 
              className="btn btn-outline w-full border-base-300 dark:border-zinc-800 hover:bg-base-200 hover:text-base-content rounded-2xl h-14 flex items-center justify-center gap-3 transition-all"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-bold uppercase tracking-widest text-xs">Register with Google</span>
            </button>

            <p className="text-center mt-8 text-sm font-bold text-base-content/40 uppercase tracking-widest">
              Existing user? <Link className="text-red-600 hover:underline" to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
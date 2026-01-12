
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const executeSignIn = async (userEmail, userPassword) => {
    setError("");
    setIsLoading(true);
    try {
      await signIn(userEmail, userPassword);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginBtn = async (event) => {
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;
    executeSignIn(email, password);
  };

  const handleAdminDemoLogin = () => {
    const demoEmail = "shaharearhossainjony@gmail.com";
    const demoPassword = "A1234a";

    setEmail(demoEmail);
    executeSignIn(demoEmail, demoPassword);
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen font-body py-10">
      {/* Changed flex-col-reverse to flex-col and lg:flex-row-reverse to lg:flex-row */}
      <div className="hero-content flex-col lg:flex-row w-full max-w-6xl justify-between gap-12">
        {/* --- Text Section (Left on Desktop) --- */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-5xl lg:text-7xl font-black text-base-content tracking-tighter uppercase leading-none">
            Saving <span className="text-red-600">Lives</span> <br /> Together.
          </h1>
          <p className="py-8 text-base-content/60 font-medium max-w-md text-lg">
            Join our community of heroes. Sign in to manage blood donation
            requests, track your contributions, and help those in urgent need.
          </p>
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="avatar border-2 border-base-200 rounded-full"
                >
                  <div className="w-10 rounded-full border-2 border-red-600">
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="user"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest">
              Join 500+ Donors
            </p>
          </div>
        </div>

        {/* --- Login Card (Right on Desktop) --- */}
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl rounded-[2rem] border border-base-200">
          <div className="card-body p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tight text-center text-red-600">
                Sign In
              </h2>
              <p className="text-sm text-base-content/50 font-medium text-center">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleLoginBtn} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/40">
                    Email Address
                  </span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered bg-base-200 border-none focus:ring-2 focus:ring-red-600 rounded-2xl h-14"
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/40">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered bg-base-200 border-none focus:ring-2 focus:ring-red-600 rounded-2xl w-full h-14"
                    placeholder="••••••••"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 cursor-pointer text-base-content/30 hover:text-red-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
                {/* Forgot Password Link */}
                <div className="mt-3 text-right">
                  <Link
                    to="/forgotpassword"
                    state={{ email }}
                    className="text-xs font-black uppercase tracking-widest text-red-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {error && (
                <div className="alert alert-error py-3 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest">
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col gap-3 mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn w-full bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl h-14 shadow-xl shadow-red-500/20 text-md font-bold"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleAdminDemoLogin}
                  className="btn btn-outline border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl h-12 flex items-center justify-center gap-2 group transition-all"
                >
                  <FontAwesomeIcon
                    icon={faUserShield}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="font-bold">Quick Admin Login</span>
                </button>
              </div>
            </form>

            <div className="divider text-[10px] font-black uppercase text-base-content/20 tracking-[0.3em] my-8">
              Secure Access
            </div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-ghost bg-base-200 hover:bg-base-300 w-full rounded-2xl h-14 border-none"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-bold text-base-content/70">
                Continue with Google
              </span>
            </button>

            <p className="text-center mt-10 text-sm font-bold text-base-content/40 uppercase tracking-widest">
              New Here?{" "}
              <Link className="text-red-600 hover:underline" to="/register">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

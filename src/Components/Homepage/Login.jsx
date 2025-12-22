
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

 
  const from = location.state?.from?.pathname || "/";

  const handleLoginBtn = (event) => {
    event.preventDefault();
    setError("");

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        console.log("Login success:", result.user);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("Invalid email or password");
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        console.log("Google login success:", res.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Google login failed:", err);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLoginBtn} className="fieldset">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />

              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input w-full"
                  placeholder="Password"
                  required
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-sm"
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </span>
              </div>

              {error && <p className="text-xs text-error">{error}</p>}

              <div>
                <Link
                  to="/forgotpassword"
                  state={{
                    email: document.querySelector("input[name='email']")?.value,
                  }}
                  className="link link-hover"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn mt-4 bg-purple-700 hover:bg-purple-800 text-white"
              >
                Login
              </button>

              {/* <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn bg-gradient-to-r from-[#7F00FF] to-[#E100FF] bg-clip-text text-transparent mt-2"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Log In with Google
              </button> */}

              <p className="font-semibold text-center pt-5">
                Don’t Have An Account?{" "}
                <Link
                  className="bg-gradient-to-r from-[#7F00FF] to-[#E100FF] bg-clip-text text-transparent"
                  to="/register"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
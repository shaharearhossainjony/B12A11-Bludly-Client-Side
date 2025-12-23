import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure()

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");

  const [upazilas, setUpazilas] = useState([]);
  const [upazila, setUpazila] = useState("");

  useEffect(() => {
    axios.get("/districts.json").then((res) => {
      console.log(res.data);
      setDistricts(res.data.districts);
    });

    axios.get("/upazilas.json").then((res) => {
      console.log(res.data);
      setUpazilas(res.data.upazilas);
    });
  }, []);

  const navigate = useNavigate();

  const handleRegisterBtn = async (event) => {
    event.preventDefault();
    setFirebaseError("");

    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const file = photoURL.files[0];
    const bloodGroup = form.bloodGroup.value;

    if (name.length < 6) {
      setNameError("Name should have at least 6 characters");
      return;
    } else {
      setNameError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setPasswordError("Confirm Password do not match with Password");
      return;
    }

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=68de729ed61ce9171a7e8bcd89290876`,
      { image: file },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    const mainPhotoURL = res.data.data.display_url;

    const formData = {
      name,
      email,
      mainPhotoURL,
      bloodGroup,
      district,
      upazila,
    };

    if (res.data.success == true) {
      createUser(email, password)
        .then(() => {
          updateUser({ displayName: name, photoURL: mainPhotoURL }).then(() => {
            axiosSecure
              .post("/users", formData)
              .then((res) => {
                console.log(res.data);
                form.reset();
                navigate("/");
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((error) => setFirebaseError(error.message));
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegisterBtn} className="fieldset">
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                required
                placeholder="Enter Your Name"
              />
              {nameError && <p className="text-xs text-error">{nameError}</p>}

              <input
                name="photoURL"
                type="file"
                className="input"
                required
                placeholder="Give Photo URL"
              />

              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                required
                placeholder="Enter Your Email"
              />

              <select
                name="bloodGroup"
                defaultValue="Select Blood Group"
                className="select"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <select
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                name="district"
                defaultValue="Select Your District"
                className="select"
              >
                <option>Select Your District</option>
                {districts?.map((district) => (
                  <option key={district?.id}>{district?.name}</option>
                ))}
              </select>

              <select
                required
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                name="upazila"
                defaultValue="Select Your Upazila"
                className="select"
              >
                <option>Select Your Upazila</option>
                {upazilas?.map((upazila) => (
                  <option key={upazila?.id}>{upazila?.name}</option>
                ))}
              </select>

              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input w-full"
                  required
                  placeholder="password"
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

              <label className="label">Confirm Password</label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className="input w-full"
                  required
                  placeholder="password"
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

              {passwordError && (
                <p className="text-xs text-error">{passwordError}</p>
              )}

              {firebaseError && (
                <p className="text-xs text-error">{firebaseError}</p>
              )}

              <button
                type="submit"
                className="btn bg-purple-700 hover:bg-purple-800 text-white mt-4"
              >
                Register
              </button>

              <p className="font-semibold text-center pt-5">
                Already Have An Account ?{" "}
                <Link
                  className="bg-gradient-to-r from-[#7F00FF] to-[#E100FF] bg-clip-text text-transparent"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../Hooks/useAxios";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const AddRequests = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");

  const [upazilas, setUpazilas] = useState([]);
  const [upazila, setUpazila] = useState("");

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

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

  console.log(districts, upazilas);

  const handleRequest = (e) => {
    e.preventDefault();

    const form = e.target;

    const recipientName = form.recipientName.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const hospitalName = form.hospitalName.value;
    const address = form.address.value;
    const bloodGroup = form.bloodGroup.value;
    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const message = form.message.value;
    const donationStatus = "Pending";

    const formData = {
      requesterName : user?.displayName,
      requesterEmail : user?.email,
      recipientName,
      district,
      upazila,
      hospitalName,
      address,
      bloodGroup,
      donationDate,
      donationTime,
      message,
      donationStatus,
    };

    axiosSecure
      .post("/requests", formData)
      .then((res) => {
        alert(res.data.insertedId);
        form.reset()
      })
      .catch((err) => console.log(err));
      form.reset()
  };
  if (loading){
  return <LoaderSpinner></LoaderSpinner>
}


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6">Create Blood Donation Request</h2>
      <form onSubmit={handleRequest} className="space-y-4">
        {/* Requester Name */}
        <div>
          <label className="block mb-1 font-medium">Requester Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="block mb-1 font-medium">Requester Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="block mb-1 font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* District */}
        <div>
          <label className="block mb-1 font-medium">Recipient District</label>
          <select
            name="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select District</option>
            {districts?.map((d, i) => (
              <option key={i} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="block mb-1 font-medium">Recipient Upazila</label>
          <select
            name="upazila"
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Upazila</option>
            {upazilas?.map((upazila) => (
              <option key={upazila?.id}>{upazila?.name}</option>
            ))}
          </select>
        </div>

        {/* Hospital Name */}
        <div>
          <label className="block mb-1 font-medium">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            placeholder="e.g., Dhaka Medical College Hospital"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Full Address</label>
          <input
            type="text"
            name="address"
            placeholder="e.g., Zahir Raihan Rd, Dhaka"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block mb-1 font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            required
            className="w-full border px-3 py-2 rounded"
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
        </div>

        {/* Donation Date */}
        <div>
          <label className="block mb-1 font-medium">Donation Date</label>
          <input
            type="date"
            name="donationDate"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Donation Time */}
        <div>
          <label className="block mb-1 font-medium">Donation Time</label>
          <input
            type="time"
            name="donationTime"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Request Message */}
        <div>
          <label className="block mb-1 font-medium">Request Message</label>
          <textarea
            name="message"
            rows="4"
            placeholder="Why you need blood..."
            required
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRequests;

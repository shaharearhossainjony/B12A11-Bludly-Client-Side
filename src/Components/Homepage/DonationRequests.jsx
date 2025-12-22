
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'; // Ensure 'react-router-dom'
import { Calendar, Clock, MapPin, Droplets, Eye, Loader2 } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const DonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    

    const axiosSecure = useAxiosSecure();

   useEffect(() => {
    axiosSecure.get('/donation-requests') 
        .then(res => {
            console.log("Data from DB:", res.data); 

    
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-red-600" size={40} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Pending Donation Requests</h2>
                <p className="text-gray-500 mt-2">Help someone today by accepting a request</p>
            </div>

            {requests.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
                    <p className="text-gray-400 text-lg">No pending donation requests at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((request) => (
                        <div key={request._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-red-50 p-3 rounded-lg text-red-600">
                                    <Droplets size={24} />
                                </div>
                                <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                    {request.bloodGroup}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase">
                                {request.recipientName}
                            </h3>

                            <div className="space-y-3 text-gray-600 mb-6">
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin size={16} className="text-gray-400" />
                                    <span>{request.district}, {request.upazila}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>{request.donationDate}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>{request.donationTime}</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate(`/request-details/${request._id}`)}
                                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                            >
                                <Eye size={18} /> View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationRequests;
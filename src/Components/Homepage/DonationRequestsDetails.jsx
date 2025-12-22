import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Droplets, Calendar, Clock, MapPin, Hospital, User, MessageSquare, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const DonationRequestsDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get(`/request-details/${id}`)
            .then(res => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, axiosSecure]);

    const handleConfirmDonation = async (e) => {
        e.preventDefault();
        
        const donationInfo = {
            donorName: user?.displayName,
            donorEmail: user?.email,
            donationStatus: 'inprogress'
        };

        try {
            const res = await axiosSecure.patch(`/requests/accept/${id}`, donationInfo);
            if (res.data.modifiedCount > 0) {
                
                document.getElementById('donation_modal').close();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Accepted!',
                    text: 'You have accepted this blood donation request.',
                    confirmButtonColor: '#ef4444',
                });
                navigate('/donation-requests');
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    if (loading) return <div className="h-screen flex justify-center items-center"><Loader2 className="animate-spin text-red-600" size={50} /></div>;
    if (!request) return <div className="text-center py-20">Request not found!</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
                {/* Header Section */}
                <div className="bg-red-600 p-8 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold uppercase tracking-tight">Donation Details</h2>
                        <p className="opacity-80">Request for: {request.recipientName}</p>
                    </div>
                    <div className="bg-white text-red-600 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-inner">
                        {request.bloodGroup}
                    </div>
                </div>

                {/* Info Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-xl"><User size={20}/></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Requester</p>
                                <p className="font-semibold">{request.requesterName} ({request.requesterEmail})</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-xl"><MapPin size={20}/></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
                                <p className="font-semibold">{request.upazila}, {request.district}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-xl"><Hospital size={20}/></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Hospital & Address</p>
                                <p className="font-semibold">{request.hospitalName}</p>
                                <p className="text-sm text-gray-500">{request.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-xl"><Calendar size={20}/></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Date</p>
                                <p className="font-semibold">{request.donationDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-xl"><Clock size={20}/></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Time</p>
                                <p className="font-semibold">{request.donationTime}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-xl"><MessageSquare size={20}/></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Note</p>
                                <p className="font-semibold">{request.message}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Donate Button */}
                <div className="p-8 bg-gray-50 border-t flex justify-center">
                    <button 
                        onClick={() => document.getElementById('donation_modal').showModal()}
                        className="btn btn-error btn-wide text-white font-bold rounded-full shadow-lg"
                    >
                        <Droplets size={20} /> Donate Now
                    </button>
                </div>
            </div>

            {/* Donation Modal */}
            <dialog id="donation_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-red-600 mb-4">Confirm Donation</h3>
                    <form onSubmit={handleConfirmDonation} className="space-y-4">
                        <div>
                            <label className="label text-sm font-bold">Your Name</label>
                            <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full bg-gray-100" />
                        </div>
                        <div>
                            <label className="label text-sm font-bold">Your Email</label>
                            <input type="email" value={user?.email} readOnly className="input input-bordered w-full bg-gray-100" />
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-success text-white">Confirm Donation</button>
                            <button type="button" onClick={() => document.getElementById('donation_modal').close()} className="btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default DonationRequestsDetails;
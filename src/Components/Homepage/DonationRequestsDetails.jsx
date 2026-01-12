

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Droplets, Calendar, Clock, MapPin, Hospital, User, MessageSquare, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

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

    if (loading) return (
        <div className="h-screen flex justify-center items-center bg-base-100">
            <LoaderSpinner/>
        </div>
    );

    if (!request) return <div className="text-center py-20 text-base-content font-heading text-2xl italic">Request not found!</div>;

    return (
        <div className="min-h-screen bg-base-100 py-12 px-4 transition-colors duration-500 font-body">
            <div className="max-w-4xl mx-auto bg-base-100 dark:bg-zinc-900 shadow-2xl rounded-[2.5rem] overflow-hidden border border-base-200 dark:border-white/5">
                
                {/* Header Section */}
                <div className="bg-red-600 p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tighter">Donation Details</h2>
                        <p className="opacity-90 mt-2 font-medium">Recipient: {request.recipientName}</p>
                    </div>
                    <div className="bg-white text-red-600 w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-xl group">
                        <span className="text-[10px] font-black uppercase leading-none mb-1">Group</span>
                        <span className="text-3xl font-black">{request.bloodGroup}</span>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl shadow-sm italic"><User size={24}/></div>
                            <div>
                                <p className="text-[10px] text-base-content/40 uppercase font-black tracking-widest mb-1">Requester Info</p>
                                <p className="font-bold text-base-content text-lg">{request.requesterName}</p>
                                <p className="text-sm text-base-content/60">{request.requesterEmail}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl shadow-sm italic"><MapPin size={24}/></div>
                            <div>
                                <p className="text-[10px] text-base-content/40 uppercase font-black tracking-widest mb-1">Location</p>
                                <p className="font-bold text-base-content text-lg">{request.upazila}, {request.district}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl shadow-sm italic"><Hospital size={24}/></div>
                            <div>
                                <p className="text-[10px] text-base-content/40 uppercase font-black tracking-widest mb-1">Hospital Details</p>
                                <p className="font-bold text-base-content text-lg">{request.hospitalName}</p>
                                <p className="text-sm text-base-content/60 mt-1">{request.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl shadow-sm italic"><Calendar size={24}/></div>
                            <div>
                                <p className="text-[10px] text-base-content/40 uppercase font-black tracking-widest mb-1">Donation Date</p>
                                <p className="font-bold text-base-content text-lg">{request.donationDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl shadow-sm italic"><Clock size={24}/></div>
                            <div>
                                <p className="text-[10px] text-base-content/40 uppercase font-black tracking-widest mb-1">Scheduled Time</p>
                                <p className="font-bold text-base-content text-lg">{request.donationTime}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl shadow-sm italic"><MessageSquare size={24}/></div>
                            <div>
                                <p className="text-[10px] text-base-content/40 uppercase font-black tracking-widest mb-1">Patient Note</p>
                                <p className="font-medium text-base-content leading-relaxed italic">"{request.message}"</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Donate CTA Section */}
                <div className="p-10 bg-base-200/50 dark:bg-zinc-800/50 border-t border-base-200 dark:border-white/5 flex flex-col items-center gap-4">
                    <p className="text-base-content/60 text-sm font-medium">By clicking below, you agree to show up on time at the hospital.</p>
                    <button 
                        onClick={() => document.getElementById('donation_modal').showModal()}
                        className="btn btn-error btn-wide h-14 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-xl shadow-red-500/20 transition-all hover:-translate-y-1 active:scale-95 border-none uppercase tracking-widest"
                    >
                        <Droplets size={22} className="mr-2 animate-bounce" /> Donate Now
                    </button>
                </div>
            </div>

            {/* Donation Modal - Theme Fixed */}
            <dialog id="donation_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box bg-base-100 dark:bg-zinc-900 rounded-[2rem] p-8 border dark:border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <Droplets className="text-red-600" size={32} />
                        <h3 className="font-heading font-black text-2xl text-base-content uppercase">Confirm Donation</h3>
                    </div>
                    
                    <form onSubmit={handleConfirmDonation} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest">Donor Name</label>
                            <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full bg-base-200 dark:bg-zinc-800 border-none font-bold text-base-content focus:ring-0 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-base-content/40 ml-1 tracking-widest">Donor Email</label>
                            <input type="email" value={user?.email} readOnly className="input input-bordered w-full bg-base-200 dark:bg-zinc-800 border-none font-bold text-base-content focus:ring-0 rounded-xl" />
                        </div>

                        <div className="modal-action flex gap-4 mt-8">
                            <button type="submit" className="btn btn-success flex-1 bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl font-bold uppercase tracking-widest">Confirm</button>
                            <button type="button" onClick={() => document.getElementById('donation_modal').close()} className="btn flex-1 bg-base-300 dark:bg-zinc-700 hover:bg-base-400 dark:hover:bg-zinc-600 text-base-content border-none rounded-xl font-bold uppercase tracking-widest">Cancel</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default DonationRequestsDetails;

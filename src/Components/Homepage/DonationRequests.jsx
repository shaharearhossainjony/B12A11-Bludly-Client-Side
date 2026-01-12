import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Clock, MapPin, Droplets, Eye, MessageSquare } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const DonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/donation-requests')
            .then(res => {
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

    // --- Skeleton Loader Component ---
    const SkeletonCard = () => (
        <div className="bg-base-200/50 animate-pulse rounded-[2rem] p-8 border border-base-200 h-[450px] flex flex-col justify-between">
            <div>
                <div className="flex justify-between mb-6">
                    <div className="w-12 h-12 bg-base-300 rounded-2xl"></div>
                    <div className="w-16 h-8 bg-base-300 rounded-xl"></div>
                </div>
                <div className="w-3/4 h-6 bg-base-300 rounded mb-4"></div>
                <div className="w-full h-12 bg-base-300 rounded-lg mb-6"></div>
                <div className="space-y-4">
                    <div className="w-full h-4 bg-base-300 rounded"></div>
                    <div className="w-5/6 h-4 bg-base-300 rounded"></div>
                </div>
            </div>
            <div className="w-full h-12 bg-base-300 rounded-2xl"></div>
        </div>
    );

    return (
        <div className="bg-base-100 min-h-screen transition-colors duration-500 font-body">
            <div className="container mx-auto px-4 py-16">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-base-content mb-4 tracking-tight uppercase">
                        Pending <span className="text-red-600">Donation</span> Requests
                    </h2>
                    <div className="w-24 h-1.5 bg-red-600 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Grid Layout: Desktop 4 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
                    ) : requests.length === 0 ? (
                        <div className="col-span-full text-center py-24 bg-base-200/50 rounded-[2.5rem] border-2 border-dashed border-base-300 w-full">
                            <Droplets size={40} className="text-base-content/20 mx-auto mb-4" />
                            <p className="text-base-content/40 text-xl font-bold italic">No pending requests available.</p>
                        </div>
                    ) : (
                        requests.map((request) => (
                            <div 
                                key={request._id} 
                                className="group relative bg-base-100 dark:bg-zinc-900 rounded-[2rem] p-8 border border-base-200 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between h-[450px] w-full"
                            >
                                {/* Background Accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-bl-[5rem] group-hover:bg-red-600/10 transition-colors"></div>

                                <div>
                                    {/* Blood Group & Urgent Tag */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl text-red-600 group-hover:rotate-12 transition-transform">
                                            <Droplets size={28} />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="bg-red-600 text-white text-sm font-black px-4 py-1.5 rounded-xl shadow-lg">
                                                {request.bloodGroup}
                                            </span>
                                            <span className="text-[10px] font-black uppercase text-red-500 mt-2 tracking-widest">Urgent</span>
                                        </div>
                                    </div>

                                    {/* Recipient Name */}
                                    <h3 className="text-xl font-black text-base-content mb-3 uppercase tracking-tight line-clamp-1 group-hover:text-red-600 transition-colors">
                                        {request.recipientName}
                                    </h3>
                                    
                                    {/* Short Description (Database message) */}
                                    <div className="flex items-start gap-2 mb-6 bg-base-200/50 dark:bg-zinc-800/50 p-3 rounded-xl min-h-[60px]">
                                        <MessageSquare size={14} className="text-red-500 mt-1 shrink-0" />
                                        <p className="text-xs text-base-content/70 line-clamp-2 italic font-medium">
                                            {request.message || "No additional message provided."}
                                        </p>
                                    </div>

                                    {/* Meta Info Section */}
                                    <div className="space-y-3 text-base-content/70 font-bold">
                                        <div className="flex items-center gap-3">
                                            <MapPin size={16} className="text-red-500" />
                                            <span className="text-[11px] truncate">{request.hospitalName}, {request.district}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Calendar size={16} className="text-red-500" />
                                            <span className="text-[11px]">{request.donationDate}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock size={16} className="text-red-500" />
                                            <span className="text-[11px]">{request.donationTime}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button 
                                    onClick={() => navigate(`/request-details/${request._id}`)}
                                    className="btn btn-block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-none rounded-2xl font-black text-xs hover:bg-red-600 hover:text-white transition-all shadow-md active:scale-95 mt-4 h-12 min-h-0"
                                >
                                    <Eye size={18} className="mr-2" /> View Details
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonationRequests;
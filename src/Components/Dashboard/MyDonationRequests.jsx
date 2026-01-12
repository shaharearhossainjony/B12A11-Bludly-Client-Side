
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight, Filter, Calendar as CalendarIcon, MapPin, Clock, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider'; 
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

const MyDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { role } = useContext(AuthContext);

    const [requests, setRequests] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(6);
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const endpoint = role === 'admin' ? '/donation-requests' : '/my-request';
            const res = await axiosSecure.get(`${endpoint}?size=${itemsPerPage}&page=${currentPage}`);
            
            let rawData = role === 'admin' 
                ? (Array.isArray(res.data) ? res.data : res.data.request || [])
                : (res.data.request || []);
            
            let count = res.data.totalRequest || rawData.length;

            if (statusFilter !== 'all') {
                rawData = rawData.filter(req => req.donationStatus?.toLowerCase() === statusFilter.toLowerCase());
            }

            setRequests(rawData);
            setTotalCount(count);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role) fetchRequests();
    }, [currentPage, itemsPerPage, statusFilter, axiosSecure, role]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/requests/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: `Status marked as ${newStatus}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchRequests();
            }
        } catch (err) {
            Swal.fire("Error", "Failed to update status", "error");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/requests/${id}`);
                    if (res.data.success || res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Request removed successfully.", "success");
                        fetchRequests(); 
                    }
                } catch (err) {
                    Swal.fire("Error", "Could not delete.", "error");
                }
            }
        });
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    if (loading) return <LoaderSpinner />;

    const getStatusStyle = (status) => {
        const s = status?.toLowerCase();
        if (s === 'pending') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        if (s === 'inprogress') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
        if (s === 'done') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
        if (s === 'canceled') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
        return 'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-400';
    };

    return (
        <div className="bg-base-100 dark:bg-zinc-950 min-h-screen p-4 md:p-8 transition-colors duration-300 font-body">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-base-100 dark:bg-zinc-900 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-base-200 dark:border-white/5 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="p-4 bg-red-600 rounded-2xl text-white shadow-xl shadow-red-500/20">
                            <CalendarIcon size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tighter uppercase">
                                {role === 'admin' ? 'Global Requests' : 'My Requests'}
                            </h2>
                            <p className="text-base-content/50 font-medium text-sm">Managing {totalCount} total blood requests</p>
                        </div>
                    </div>

                    <div className="w-full sm:w-auto flex items-center justify-between gap-4 bg-base-200 dark:bg-zinc-800 px-5 py-2.5 rounded-2xl border border-base-300 dark:border-zinc-700">
                        <div className="flex items-center gap-2">
                            <Filter size={18} className="text-red-500" />
                            <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-base-content/40">Filter</span>
                        </div>
                        <select 
                            className="select select-ghost select-sm font-black text-xs text-base-content focus:bg-transparent"
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="inprogress">In Progress</option>
                            <option value="done">Completed</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </div>
                </div>

                {/* --- Table Section --- */}
                <div className="bg-base-100 dark:bg-zinc-900 rounded-3xl md:rounded-[2.5rem] shadow-xl border border-base-200 dark:border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-base-200 dark:bg-zinc-800/50">
                                <tr className="text-base-content/40 uppercase text-[10px] tracking-widest border-none">
                                    <th className="py-6 pl-10">Recipient</th>
                                    <th>Location</th>
                                    <th>Schedule</th>
                                    <th>Status</th>
                                    <th>Donor</th>
                                    <th className="pr-10 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200 dark:divide-white/5">
                                {requests.map((req) => (
                                    <tr key={req._id} className="hover:bg-base-200/50 dark:hover:bg-zinc-800/50 transition-colors group">
                                        <td className="py-5 pl-10 font-black uppercase text-sm">{req.recipientName}</td>
                                        <td>
                                            <div className="flex items-center gap-2 text-xs text-base-content/60">
                                                <MapPin size={14} className="text-red-500" /> {req.upazila}, {req.district}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-xs font-black">{req.donationDate}</div>
                                            <div className="text-[10px] font-bold text-base-content/40 uppercase">{req.donationTime}</div>
                                        </td>
                                        <td>
                                            <span className={`badge border-none font-black text-[9px] uppercase px-3 py-3 ${getStatusStyle(req.donationStatus)}`}>
                                                {req.donationStatus}
                                            </span>
                                        </td>
                                        <td>
                                            {req.donorName ? (
                                                <div className="text-xs font-black">{req.donorName}</div>
                                            ) : (
                                                <span className="text-[10px] font-bold text-base-content/20 uppercase italic">Waiting...</span>
                                            )}
                                        </td>
                                        <td className="pr-10 text-right">
                                            <ActionButtons 
                                                req={req} 
                                                navigate={navigate} 
                                                handleDelete={handleDelete} 
                                                handleStatusUpdate={handleStatusUpdate}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Reusable Action Buttons with Dropdown ---
const ActionButtons = ({ req, navigate, handleDelete, handleStatusUpdate }) => (
    <div className="flex items-center justify-end gap-1">
        
        {/* Dropdown for Status Update (Only if inprogress) */}
        {req.donationStatus === 'inprogress' && (
            <div className="dropdown dropdown-left dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-xs text-amber-500 hover:bg-amber-500/10 rounded-lg">
                    <Edit size={18} />
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 dark:bg-zinc-800 rounded-xl w-40 border border-base-200 dark:border-white/5">
                    <li>
                        <button onClick={() => handleStatusUpdate(req._id, 'done')} className="text-emerald-500 text-xs font-bold uppercase">
                            <CheckCircle size={14} /> Mark Done
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleStatusUpdate(req._id, 'canceled')} className="text-red-500 text-xs font-bold uppercase">
                            <XCircle size={14} /> Cancel
                        </button>
                    </li>
                </ul>
            </div>
        )}

        
        <button onClick={() => handleDelete(req._id)} className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500/10 rounded-lg" title="Delete"><Trash2 size={18}/></button>
        <button onClick={() => navigate(`/request-details/${req._id}`)} className="btn btn-ghost btn-xs text-emerald-500 hover:bg-emerald-500/10 rounded-lg" title="View"><Eye size={18}/></button>
    </div>
);

export default MyDonationRequests;
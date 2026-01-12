
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { 
    Edit, Trash2, Eye, ChevronLeft, ChevronRight, Filter, 
    Calendar as CalendarIcon, MapPin, CheckCircle, XCircle 
} from 'lucide-react';
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
                    title: `Marked as ${newStatus}`,
                    timer: 1500,
                    showConfirmButton: false
                });
                fetchRequests();
            }
        } catch (err) {
            Swal.fire("Error", "Failed to update", "error");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Request?",
            text: "This cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/requests/${id}`);
                    if (res.data.success || res.data.deletedCount > 0) {
                        Swal.fire("Deleted", "", "success");
                        fetchRequests(); 
                    }
                } catch (err) {
                    Swal.fire("Error", "Failed to delete", "error");
                }
            }
        });
    };

    const getStatusStyle = (status) => {
        const s = status?.toLowerCase();
        if (s === 'pending') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        if (s === 'inprogress') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
        if (s === 'done') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
        if (s === 'canceled') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
        return 'bg-gray-100 text-gray-700';
    };

    if (loading) return <LoaderSpinner />;

    return (
        <div className="bg-base-100 dark:bg-zinc-950 min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-base-100 dark:bg-zinc-900 p-5 rounded-[2rem] border border-base-200 dark:border-white/5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-600 rounded-xl text-white shadow-lg">
                            <CalendarIcon size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                                {role === 'admin' ? 'Global Requests' : 'My Requests'}
                            </h2>
                            <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest">{totalCount} Total</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200 dark:bg-zinc-800 px-4 py-1.5 rounded-xl w-full md:w-auto">
                        <Filter size={16} className="text-red-500" />
                        <select 
                            className="select select-ghost select-sm font-black text-xs w-full focus:bg-transparent"
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
                        >
                            <option value="all">ALL STATUS</option>
                            <option value="pending">PENDING</option>
                            <option value="inprogress">IN PROGRESS</option>
                            <option value="done">DONE</option>
                            <option value="canceled">CANCELED</option>
                        </select>
                    </div>
                </div>

                {/* --- RESPONSIVE CONTENT --- */}
                {/* Mobile & Tablet Card List (< 1024px) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                    {requests.map((req) => (
                        <div key={req._id} className="bg-base-100 dark:bg-zinc-900 p-5 rounded-3xl border border-base-200 dark:border-white/5 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-black uppercase text-red-600 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-lg">
                                    {req.recipientName}
                                </span>
                                <span className={`badge border-none font-black text-[9px] uppercase px-3 py-3 ${getStatusStyle(req.donationStatus)}`}>
                                    {req.donationStatus}
                                </span>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-base-content/60">
                                    <MapPin size={14} className="text-red-500" />
                                    {req.upazila}, {req.district}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-base-content/60">
                                    <CalendarIcon size={14} className="text-red-500" />
                                    {req.donationDate} at {req.donationTime}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-base-200 dark:border-white/5">
                                <div className="text-[10px] uppercase font-black opacity-40">
                                    Donor: {req.donorName || 'None'}
                                </div>
                                <ActionButtons 
                                    req={req} 
                                    navigate={navigate} 
                                    handleDelete={handleDelete} 
                                    handleStatusUpdate={handleStatusUpdate}
                                    isMobile={true}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View (>= 1024px) */}
                <div className="hidden lg:block bg-base-100 dark:bg-zinc-900 rounded-[2.5rem] border border-base-200 dark:border-white/5 shadow-xl overflow-hidden">
                    <table className="table w-full">
                        <thead className="bg-base-200 dark:bg-zinc-800/50">
                            <tr className="text-base-content/40 uppercase text-[10px] tracking-widest border-none">
                                <th className="py-6 pl-10">Recipient</th>
                                <th>Location</th>
                                <th>Schedule</th>
                                <th>Status</th>
                                <th className="pr-10 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-200 dark:divide-white/5">
                            {requests.map((req) => (
                                <tr key={req._id} className="hover:bg-base-200/40 dark:hover:bg-zinc-800/40 transition-colors">
                                    <td className="py-5 pl-10 font-black uppercase text-sm">{req.recipientName}</td>
                                    <td className="text-xs font-bold text-base-content/60 italic">{req.upazila}, {req.district}</td>
                                    <td>
                                        <div className="text-xs font-black">{req.donationDate}</div>
                                        <div className="text-[10px] font-bold text-base-content/30 uppercase">{req.donationTime}</div>
                                    </td>
                                    <td>
                                        <span className={`badge border-none font-black text-[9px] uppercase px-3 py-3 ${getStatusStyle(req.donationStatus)}`}>
                                            {req.donationStatus}
                                        </span>
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

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 pt-6 pb-12">
                    <button 
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="btn btn-circle btn-sm btn-ghost border border-base-300 dark:border-white/10"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-widest">Page {currentPage + 1}</span>
                    <button 
                        disabled={requests.length < itemsPerPage}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="btn btn-circle btn-sm btn-ghost border border-base-300 dark:border-white/10"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ActionButtons = ({ req, navigate, handleDelete, handleStatusUpdate, isMobile = false }) => (
    <div className="flex items-center gap-1">
        {req.donationStatus === 'inprogress' && (
            <div className={`dropdown ${isMobile ? 'dropdown-top' : 'dropdown-left'} dropdown-end`}>
                <label tabIndex={0} className="btn btn-ghost btn-sm text-amber-500 hover:bg-amber-500/10 rounded-xl">
                    <Edit size={18} />
                </label>
                <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow-2xl bg-base-100 dark:bg-zinc-800 rounded-2xl w-44 border border-base-200 dark:border-white/5 mb-2">
                    <li><button onClick={() => handleStatusUpdate(req._id, 'done')} className="text-emerald-500 text-xs font-bold py-3"><CheckCircle size={16}/> MARK DONE</button></li>
                    <li><button onClick={() => handleStatusUpdate(req._id, 'canceled')} className="text-red-500 text-xs font-bold py-3"><XCircle size={16}/> CANCEL</button></li>
                </ul>
            </div>
        )}
        <button onClick={() => handleDelete(req._id)} className="btn btn-ghost btn-sm text-red-500 rounded-xl hover:bg-red-500/10"><Trash2 size={18}/></button>
        <button onClick={() => navigate(`/request-details/${req._id}`)} className="btn btn-ghost btn-sm text-emerald-500 rounded-xl hover:bg-emerald-500/10"><Eye size={18}/></button>
    </div>
);

export default MyDonationRequests;
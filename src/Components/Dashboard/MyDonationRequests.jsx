
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider'; 
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

const MyDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user, role } = useContext(AuthContext);
    

    const [requests, setRequests] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
 
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchRequests = async () => {
        setLoading(true);
        try {
            
            const endpoint = role === 'admin' ? '/donation-requests' : '/my-request';
            
            const res = await axiosSecure.get(`${endpoint}?size=${itemsPerPage}&page=${currentPage}`);
            
           
            let rawData = [];
            let count = 0;

            if (role === 'admin') {
               
                rawData = Array.isArray(res.data) ? res.data : res.data.request || [];
                count = res.data.totalRequest || rawData.length;
            } else {
                rawData = res.data.request || [];
                count = res.data.totalRequest || 0;
            }

           
            if (statusFilter !== 'all') {
                rawData = rawData.filter(req => req.donationStatus?.toLowerCase() === statusFilter.toLowerCase());
            }

            setRequests(rawData);
            setTotalCount(count);
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role) { 
            fetchRequests();
        }
    }, [currentPage, itemsPerPage, statusFilter, axiosSecure, role]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

  
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    
                    await axiosSecure.delete(`/requests/${id}`);
                    Swal.fire("Deleted!", "Request has been deleted.", "success");
                    fetchRequests();
                } catch (err) {
                    Swal.fire("Error", "Could not delete the request.", "error");
                }
            }
        });
    };

    if (loading) return <div className="text-center p-10 font-bold"><LoaderSpinner></LoaderSpinner></div>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    {role === 'admin' ? 'All Donation Requests' : 'My Donation Requests'}
                </h2>
                
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        <Filter size={16} /> Filter:
                    </div>
                    <select 
                        className="select select-bordered select-sm"
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(0);
                        }}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Donor Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id} className="hover:bg-gray-50">
                                <td className="font-bold">{req.recipientName}</td>
                                <td>{req.upazila}, {req.district}</td>
                                <td>
                                    <div className="text-sm font-medium">{req.donationDate}</div>
                                    <div className="text-xs text-gray-400">{req.donationTime}</div>
                                </td>
                                <td>
                                    <span className={`badge badge-sm font-bold uppercase ${
                                        req.donationStatus?.toLowerCase() === 'pending' ? 'badge-warning' :
                                        req.donationStatus?.toLowerCase() === 'inprogress' ? 'badge-info text-white' :
                                        req.donationStatus?.toLowerCase() === 'done' ? 'badge-success text-white' : 'badge-ghost'
                                    }`}>
                                        {req.donationStatus}
                                    </span>
                                </td>
                                <td>
                                    {req.donationStatus === 'inprogress' || req.donationStatus === 'done' ? (
                                        <div className="text-xs">
                                            <div className="font-bold">{req.donorName}</div>
                                            <div>{req.donorEmail}</div>
                                        </div>
                                    ) : (
                                        <span className="text-gray-300 italic text-xs">Waiting for donor</span>
                                    )}
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button onClick={() => navigate(`/dashboard/update-request/${req._id}`)} className="btn btn-ghost btn-xs text-blue-500"><Edit size={16}/></button>
                                        <button onClick={() => handleDelete(req._id)} className="btn btn-ghost btn-xs text-red-500"><Trash2 size={16}/></button>
                                        <button onClick={() => navigate(`/request-details/${req._id}`)} className="btn btn-ghost btn-xs text-gray-500"><Eye size={16}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-2">
                    <button disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev - 1)} className="btn btn-sm btn-circle"><ChevronLeft size={20} /></button>
                    {[...Array(totalPages).keys()].map(idx => (
                        <button key={idx} onClick={() => setCurrentPage(idx)} className={`btn btn-sm btn-circle ${currentPage === idx ? 'btn-error text-white' : 'btn-ghost'}`}>{idx + 1}</button>
                    ))}
                    <button disabled={currentPage + 1 >= totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="btn btn-sm btn-circle"><ChevronRight size={20} /></button>
                </div>
            )}
        </div>
    );
};

export default MyDonationRequests;
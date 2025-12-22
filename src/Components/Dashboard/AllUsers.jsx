

import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { ShieldCheck, UserCog, Ban, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    

    const [currentPage, setCurrentPage] = useState(0);
    const [size, setSize] = useState(5); // Items per page
    const [totalCount, setTotalCount] = useState(0);

    const fetchUsers = () => {

        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
                setTotalCount(res.data.length);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchUsers();
    }, [axiosSecure]);


    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Success', `User is now ${status}`, 'success');
                    fetchUsers();
                }
            });
    };


    const handleRoleChange = (email, role) => {
        axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Updated', `User promoted to ${role}`, 'success');
                    fetchUsers();
                }
            });
    };


    const displayedUsers = users
        .filter(user => filterStatus === 'all' ? true : user.status === filterStatus)
        .slice(currentPage * size, (currentPage + 1) * size);

    const totalPages = Math.ceil(users.filter(user => filterStatus === 'all' ? true : user.status === filterStatus).length / size);

    return (
        <div className="p-6 bg-base-100 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">User Management ({users.length})</h2>
                

                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Filter Status:</span>
                    <select 
                        className="select select-bordered select-sm"
                        value={filterStatus}
                        onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(0); }}
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto border rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Change Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-circle w-10 h-10">
                                                <img src={user?.mainPhotoURL} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{user?.name}</div>
                                            <div className="text-xs opacity-60">{user?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="capitalize text-sm font-semibold">{user?.role}</td>
                                <td>
                                    <span className={`badge badge-sm ${user?.status === 'active' ? 'badge-success' : 'badge-error'} text-white`}>
                                        {user?.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex gap-1">
                                        {user?.role === 'donor' && (
                                            <button onClick={() => handleRoleChange(user.email, 'volunteer')} className="btn btn-xs btn-outline btn-secondary">Volunteer</button>
                                        )}
                                        {user?.role !== 'admin' && (
                                            <button onClick={() => handleRoleChange(user.email, 'admin')} className="btn btn-xs btn-outline btn-primary">Admin</button>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    {user?.status === "active" ? (
                                        <button onClick={() => handleStatusChange(user?.email, "blocked")} className="btn btn-ghost btn-xs text-error"><Ban size={16} /></button>
                                    ) : (
                                        <button onClick={() => handleStatusChange(user?.email, "active")} className="btn btn-ghost btn-xs text-success"><CheckCircle size={16} /></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 gap-4">
                <button 
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="btn btn-sm btn-circle"
                >
                    <ChevronLeft size={20} />
                </button>
                <span className="font-bold text-sm">Page {currentPage + 1} of {totalPages || 1}</span>
                <button 
                    disabled={currentPage + 1 >= totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="btn btn-sm btn-circle"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default AllUsers;

import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Ban, CheckCircle, ChevronLeft, ChevronRight, Users, Filter, UserCog, ShieldCheck, MoreVertical } from 'lucide-react';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const [size] = useState(6); 
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        setLoading(true);
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, [axiosSecure]);

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: `User ${status === 'active' ? 'Activated' : 'Blocked'}`,
                        showConfirmButton: false,
                        timer: 1500,
                        background: 'var(--fallback-b1, #fff)',
                        color: 'var(--fallback-bc, #000)'
                    });
                    fetchUsers();
                }
            });
    };

    const handleRoleChange = (email, role) => {
        axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Role Updated',
                        text: `Promoted to ${role}`,
                        confirmButtonColor: '#ef4444'
                    });
                    fetchUsers();
                }
            });
    };

    const filteredUsers = users.filter(user => 
        filterStatus === 'all' ? true : user.status === filterStatus
    );

    const totalPages = Math.ceil(filteredUsers.length / size);
    const displayedUsers = filteredUsers.slice(currentPage * size, (currentPage + 1) * size);

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen font-body">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-base-100 dark:bg-zinc-900 p-6 rounded-3xl border border-base-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full lg:w-auto">
                        <div className="p-4 bg-red-600 rounded-2xl text-white shadow-lg shadow-red-500/20">
                            <Users size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tight uppercase">User Management</h2>
                            <p className="text-base-content/50 font-medium text-sm">Managing {users.length} total members</p>
                        </div>
                    </div>

                    {/* Filter Dropdown */}
                    <div className="w-full sm:w-auto flex items-center gap-3 bg-base-200 dark:bg-zinc-800 px-4 py-2 rounded-2xl border border-base-300">
                        <Filter size={16} className="text-red-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Filter</span>
                        <select 
                            className="select select-ghost select-sm font-bold text-xs focus:bg-transparent"
                            value={filterStatus}
                            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(0); }}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="blocked">Blocked</option>
                        </select>
                    </div>
                </div>

                {/* --- Main Content Area --- */}
                <div className="bg-base-100 dark:bg-zinc-900 rounded-3xl shadow-xl border border-base-200 overflow-hidden">
                    
                    {/* PC & Tablet View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-base-200/50">
                                <tr className="text-base-content/40 uppercase text-[10px] tracking-widest border-none">
                                    <th className="py-6 pl-8">User Info</th>
                                    <th>Role / Status</th>
                                    <th>Manage Role</th>
                                    <th className="pr-8 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200 dark:divide-white/5">
                                {displayedUsers.map(user => (
                                    <UserTableRow 
                                        key={user._id} 
                                        user={user} 
                                        handleRoleChange={handleRoleChange} 
                                        handleStatusChange={handleStatusChange} 
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View with Dropdown Buttons */}
                    <div className="md:hidden grid grid-cols-1 divide-y divide-base-200">
                        {displayedUsers.map(user => (
                            <UserMobileCard 
                                key={user._id} 
                                user={user} 
                                handleRoleChange={handleRoleChange} 
                                handleStatusChange={handleStatusChange} 
                            />
                        ))}
                    </div>

                    {/* Loading & Empty State */}
                    {loading && <div className=""><LoaderSpinner></LoaderSpinner></div>}
                    {!loading && displayedUsers.length === 0 && (
                        <div className="p-20 text-center text-base-content/30 italic">No users found.</div>
                    )}
                </div>

                {/* --- Pagination --- */}
                <div className="flex justify-between items-center bg-base-100 dark:bg-zinc-900 p-4 rounded-3xl border border-base-200 shadow-sm">
                    <p className="text-[10px] font-black uppercase text-base-content/40 tracking-widest ml-2">
                        Page {currentPage + 1} / {totalPages || 1}
                    </p>
                    <div className="flex gap-2">
                        <button 
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="btn btn-sm h-10 w-10 rounded-xl bg-base-200 dark:bg-zinc-800 border-none hover:bg-red-600 hover:text-white transition-all disabled:opacity-20"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button 
                            disabled={currentPage + 1 >= totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="btn btn-sm h-10 w-10 rounded-xl bg-base-200 dark:bg-zinc-800 border-none hover:bg-red-600 hover:text-white transition-all disabled:opacity-20"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- Table Row for PC/Tablet --- */
const UserTableRow = ({ user, handleRoleChange, handleStatusChange }) => (
    <tr className="hover:bg-base-200/30 transition-colors group">
        <td className="py-5 pl-8">
            <div className="flex items-center gap-4">
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 bg-base-300">
                        <img src={user?.mainPhotoURL || "https://i.ibb.co/mR709P1/user.png"} alt="Avatar" />
                    </div>
                </div>
                <div>
                    <div className="font-black text-sm text-base-content group-hover:text-red-600 transition-colors">{user?.name}</div>
                    <div className="text-xs font-medium text-base-content/40 italic">{user?.email}</div>
                </div>
            </div>
        </td>
        <td>
            <div className="flex flex-col gap-1">
                <span className="badge badge-neutral bg-zinc-800 dark:bg-zinc-700 text-white border-none font-black uppercase text-[9px] px-2 w-fit">
                    {user?.role}
                </span>
                <div className={`flex items-center gap-1.5 font-black uppercase text-[9px] ${user?.status === 'active' ? 'text-emerald-500' : 'text-red-500'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${user?.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    {user?.status}
                </div>
            </div>
        </td>
        <td>
            <div className="flex gap-2">
                {user?.role === 'donor' && (
                    <button onClick={() => handleRoleChange(user.email, 'volunteer')} className="btn btn-xs rounded-lg btn-outline border-base-300 text-[9px] font-black uppercase hover:bg-zinc-800">Volunteer</button>
                )}
                {user?.role !== 'admin' && (
                    <button onClick={() => handleRoleChange(user.email, 'admin')} className="btn btn-xs rounded-lg btn-outline border-base-300 text-[9px] font-black uppercase hover:bg-red-600 hover:border-red-600">Admin</button>
                )}
            </div>
        </td>
        <td className="pr-8 text-right">
            {user?.status === "active" ? (
                <button onClick={() => handleStatusChange(user?.email, "blocked")} className="btn btn-ghost btn-sm text-red-500 hover:bg-red-500/10 rounded-xl"><Ban size={18} /></button>
            ) : (
                <button onClick={() => handleStatusChange(user?.email, "active")} className="btn btn-ghost btn-sm text-emerald-500 hover:bg-emerald-500/10 rounded-xl"><CheckCircle size={18} /></button>
            )}
        </td>
    </tr>
);

/* --- Mobile Card with Dropdown --- */
const UserMobileCard = ({ user, handleRoleChange, handleStatusChange }) => (
    <div className="p-5 flex flex-col gap-4 bg-base-100 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 bg-base-300 shadow-sm">
                        <img src={user?.mainPhotoURL || "https://i.ibb.co/mR709P1/user.png"} alt="Avatar" />
                    </div>
                </div>
                <div className="max-w-[150px]">
                    <div className="font-black text-sm truncate">{user?.name}</div>
                    <div className="text-[10px] text-base-content/50 italic truncate">{user?.email}</div>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="badge badge-neutral text-[9px] font-black uppercase">{user?.role}</span>
                <span className={`text-[9px] font-black uppercase ${user?.status === 'active' ? 'text-emerald-500' : 'text-red-500'}`}>{user?.status}</span>
            </div>
        </div>
        
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-base-200 dark:border-zinc-800">
            {/* Mobile Dropdown */}
            <div className="dropdown dropdown-top dropdown-start">
                <div tabIndex={0} role="button" className="btn btn-xs btn-outline border-base-300 dark:border-zinc-700 text-[10px] font-black uppercase flex items-center gap-2">
                    <UserCog size={12} className="text-red-500" /> Manage Role
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-200 dark:bg-zinc-800 rounded-2xl w-48 border border-base-300 dark:border-zinc-700 mb-2">
                    {user?.role === 'donor' && (
                        <li>
                            <button onClick={() => handleRoleChange(user.email, 'volunteer')} className="text-xs font-bold py-3 hover:bg-base-300 dark:hover:bg-zinc-700 rounded-xl">
                                <ShieldCheck size={14} className="text-blue-500" /> Promote Volunteer
                            </button>
                        </li>
                    )}
                    {user?.role !== 'admin' && (
                        <li>
                            <button onClick={() => handleRoleChange(user.email, 'admin')} className="text-xs font-bold py-3 hover:bg-base-300 dark:hover:bg-zinc-700 rounded-xl">
                                <ShieldCheck size={14} className="text-red-600" /> Promote Admin
                            </button>
                        </li>
                    )}
                    {user?.role === 'admin' && (
                        <li className="p-3 text-[10px] italic text-center text-base-content/40">Already Admin</li>
                    )}
                </ul>
            </div>

            {/* Block/Unblock Action */}
            {user?.status === "active" ? (
                <button onClick={() => handleStatusChange(user?.email, "blocked")} className="btn btn-xs btn-ghost text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg px-4 font-black uppercase">
                    Block
                </button>
            ) : (
                <button onClick={() => handleStatusChange(user?.email, "active")} className="btn btn-xs btn-ghost text-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/30 rounded-lg px-4 font-black uppercase">
                    Unblock
                </button>
            )}
        </div>
    </div>
);

export default AllUsers;
import { Link, NavLink, useNavigate } from "react-router";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Aside = () => {
  const { logOut, role } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout error:", error));
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* --- Mobile Top Navbar --- */}
      <div className="lg:hidden p-4 bg-base-100 border-b border-base-200 flex justify-between items-center fixed top-0 w-full z-[60]">
        <span className="font-heading font-black text-red-600 tracking-tighter text-xl">
          Bludly <span className="text-xs font-medium text-base-content/50 ml-1">| {role}</span>
        </span>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-base-200 rounded-lg text-base-content">
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* --- Mobile Overlay --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden" 
          onClick={closeSidebar}
        ></div>
      )}

      {/* --- Main Aside --- */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-[58]
          flex flex-col transition-all duration-300 ease-in-out
          bg-base-100 border-r border-base-200 
          /* Mobile height: Total screen minus the top navbar height (mt-17)
             Desktop height: Full screen
          */
          h-[calc(100vh-4.25rem)] lg:h-screen mt-[4.25rem] lg:mt-0
          overflow-y-auto overflow-x-hidden
          ${isCollapsed ? "lg:w-20" : "lg:w-72"} 
          ${isOpen ? "translate-x-0 w-72 p-6 shadow-2xl" : "-translate-x-full lg:translate-x-0 py-6"} 
        `}
      >
        {/* Toggle Button (Desktop Only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-4 top-10 bg-red-600 text-white rounded-full p-1 mr-3 shadow-md z-50 transition-transform duration-300 hover:scale-110"
          style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronLeftIcon className="h-4 w-" />
        </button>

        {/* Brand Logo (Desktop Only) */}
        <div className={`mb-10 hidden lg:flex items-center gap-3 overflow-hidden transition-all px-4 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="min-w-[40px] h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-500/20">
            B
          </div>
          {!isCollapsed && (
            <div className="whitespace-nowrap">
              <Link to="/" className="text-2xl font-heading font-black text-red-600 tracking-tighter">Bludly</Link>
              <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/40 -mt-1">{role} Portal</p>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-col gap-2 flex-grow px-4">
          <NavItem to="/dashboard" icon={<HomeIcon className="h-5 w-5" />} label="Dashboard" isCollapsed={isCollapsed} onClick={closeSidebar} end />
          
          {/* Fixed role logic: (role === 'admin' || role === 'donor') */}
          {(role === "donor" || role === "admin") && (
            <NavItem to="/dashboard/add-requests" icon={<PlusCircleIcon className="h-5 w-5" />} label="Add Requests" isCollapsed={isCollapsed} onClick={closeSidebar} />
          )}

          {role === "admin" && (
            <NavItem to="/dashboard/all-users" icon={<UserCircleIcon className="h-5 w-5" />} label="All Users" isCollapsed={isCollapsed} onClick={closeSidebar} />
          )}

          <NavItem to="/dashboard/my-donation-requests" icon={<ClipboardDocumentListIcon className="h-5 w-5" />} label="Requests" isCollapsed={isCollapsed} onClick={closeSidebar} />
          <NavItem to="/dashboard/profile" icon={<UserCircleIcon className="h-5 w-5" />} label="My Profile" isCollapsed={isCollapsed} onClick={closeSidebar} />
        </nav>

        {/* --- Bottom Actions --- */}
        <div className="mt-auto pt-6 border-t border-base-200 flex flex-col gap-2 px-4 mb-4 pb-20 lg:pb-0">
          <NavItem to="/" icon={<HomeIcon className="h-5 w-5" />} label="Back to Home" isCollapsed={isCollapsed} isBackToHome onClick={closeSidebar} />
          
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 p-3.5 rounded-xl font-bold transition-all active:scale-95
              text-red-600 hover:bg-red-600 hover:text-white
              ${isCollapsed ? 'justify-center' : 'w-full'}
            `}
            title={isCollapsed ? "Sign Out" : ""}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ to, icon, label, isCollapsed, onClick, end = false, isBackToHome = false }) => {
  const activeClass = "bg-red-600 text-white shadow-lg shadow-red-500/20";
  const normalClass = "text-base-content/70 hover:bg-base-200 hover:text-red-600";
  const homeHover = "text-base-content/70 hover:bg-emerald-500 hover:text-white";

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      title={isCollapsed ? label : ""}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3.5 rounded-xl font-bold transition-all duration-200 whitespace-nowrap
        ${isActive ? activeClass : (isBackToHome ? homeHover : normalClass)}
        ${isCollapsed ? "justify-center" : "w-full"}`
      }
    >
      <div className="flex-shrink-0">{icon}</div>
      {!isCollapsed && <span className="transition-opacity duration-300">{label}</span>}
    </NavLink>
  );
};

export default Aside;
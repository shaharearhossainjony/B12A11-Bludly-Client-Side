import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );


  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleLogOut = () => {
    logOut()
      .then(() => navigate("/login"))
      .catch(console.error);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50 transition-colors duration-300">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 bg-base-100 rounded-box shadow text-red-500 z-[1]"
          >
            <li><NavLink className={'text-red-600'} to="/">Home</NavLink></li>
            <li><NavLink className={'text-red-600'} to="/search-requests">Search Requests</NavLink></li>
            <li><NavLink className={'text-red-600'} to="/donation-requests">Donation Requests</NavLink></li>
            <li><NavLink className={'text-red-600'} to="/create-payment-checkout">Fundings</NavLink></li>
            <li><NavLink className={'text-red-600'} to="/blogs">Blogs</NavLink></li>
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl font-bold text-red-600 font-heading">
          Bludly.
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 font-medium">
          <li><NavLink className={({isActive}) => isActive ? "bg-red-50 text-red-600" : "text-red-600"} to="/">Home</NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? "bg-red-50 text-red-600" : "text-red-600"} to="/search-requests">Search</NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? "bg-red-50 text-red-600" : "text-red-600"} to="/donation-requests">Requests</NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? "bg-red-50 text-red-600" : "text-red-600"} to="/create-payment-checkout">Fundings</NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? "bg-red-50 text-red-600" : "text-red-600"} to="/blogs">Blogs</NavLink></li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-4">
        
        {/* Theme Toggle Controller */}
        <label className="swap swap-rotate text-red-600">
          <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} />
          {/* sun icon */}
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
          {/* moon icon */}
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8.08,2.26,10.27,10.27,0,0,0,2,12.33,10.27,10.27,0,0,0,12.33,22.67,10.27,10.27,0,0,0,22.34,12.63,1,1,0,0,0,21.64,13Zm-9.31,7.66A8.27,8.27,0,0,1,4,12.33a8.27,8.27,0,0,1,6-8,10.23,10.23,0,0,0-.32,2.51,10.15,10.15,0,0,0,10.14,10.15,10,10,0,0,0,2.15-.26A8.32,8.32,0,0,1,12.33,20.66Z" /></svg>
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-red-500">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="user" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 w-52 bg-base-100 rounded-box shadow z-[1]">
              <li className="px-4 py-2 font-bold text-red-600 border-b border-gray-100 dark:border-gray-700">
                {user?.displayName || "Donor"}
              </li>
              <li><NavLink to="/dashboard" className="text-red-600">Dashboard</NavLink></li>
              <li><button onClick={handleLogOut} className="text-red-600">Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn bg-red-600 hover:bg-red-700 text-white border-none min-h-0 h-10 px-6">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
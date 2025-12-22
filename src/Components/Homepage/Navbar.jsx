import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => navigate("/login"))
      .catch(console.error);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-red-600">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 bg-base-100 rounded-box shadow text-red-500"
          >
            <li><NavLink className={'text-red-600'} to="/">Home</NavLink></li>
            <li><NavLink className={'text-red-600'} to="/search-requests">Search Requests</NavLink></li>
            <li><NavLink className={'text-red-600'} to="/donation-requests">Donation Requests</NavLink></li>
            <li><NavLink className={'text-red-600'} to="/create-payment-checkout">Fundings</NavLink></li>
            <li><NavLink className={'text-red-600'} to="/blogs">Blogs</NavLink></li>
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl font-bold text-red-600">
          Bludly
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
           <li><NavLink  className={'text-red-600'}  to="/">Home</NavLink></li>
           <li><NavLink  className={'text-red-600'}  to="/search-requests">Search Requests</NavLink></li>
          <li><NavLink  className={'text-red-600'}  to="/donation-requests">Donation Requests</NavLink></li>
          <li><NavLink className={'text-red-600'}   to="/create-payment-checkout">Fundings</NavLink></li>
          <li><NavLink  className={'text-red-600'}  to="/blogs">Blogs</NavLink></li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            {/* Avatar */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-purple-600">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="user"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-48 bg-base-100 rounded-box shadow"
              >
                <li className="px-3 py-2 text-sm font-semibold text-red-600">
                  {user.displayName || "User"}
                </li>
                <li><NavLink className={'text-red-600'} to="/dashboard">Dashboard</NavLink></li>
                <li>
                  <button className={'text-red-600'}  onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

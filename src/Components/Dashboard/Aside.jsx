import { Link, NavLink, useNavigate } from "react-router";
import {
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Aside = () => {
  const { logOut, role } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out");

        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <aside className="w-64 bg-gray-900 text-gray-200 min-h-screen p-5 flex flex-col">
      {/* Logo */}
      {role == "admin" && (
        <div className="text-2xl font-bold mb-10 text-white tracking-wide">
          Admin Dashboard
        </div>
      )}
       {role == "volunteer" && (
        <div className="text-2xl font-bold mb-10 text-white tracking-wide">
          Volunteer Dashboard
        </div>
      )}
      {role == "donor" && (
        <div className="text-2xl font-bold mb-10 text-white tracking-wide">
          Donor Dashboard
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
            }`
          }
        >
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </NavLink>

        {role == "donor" && (
          <NavLink
            to="/dashboard/add-requests"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <PlusCircleIcon className="h-5 w-5" />
            Add Requests
          </NavLink>
        )}

        {role == "admin" && (
          <NavLink
            to="/dashboard/all-users"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <UserCircleIcon className="h-5 w-5" />
            All Users
          </NavLink>
        )}

        {/* <NavLink
          to="/dashboard/my-request"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
            }`
          }
        >
          <ClipboardDocumentListIcon className="h-5 w-5" />
          My Request
        </NavLink> */}

        <NavLink
          to="/dashboard/my-donation-requests"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
            }`
          }
        >
          <ClipboardDocumentListIcon className="h-5 w-5" />
          My Donation Requests
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
            }`
          }
        >
          <UserCircleIcon className="h-5 w-5" />
          Profile
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="mt-auto flex">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full text-left hover:bg-red-600 rounded-lg"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Logout
        </button>

        <Link
          to={"/"}
          className="flex items-center gap-3 p-3 w-full text-left hover:bg-green-600 rounded-lg"
        >
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>
      </div>
    </aside>
  );
};

export default Aside;

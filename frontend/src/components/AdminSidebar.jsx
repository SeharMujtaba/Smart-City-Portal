import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

import {
  FaTachometerAlt,
  FaBell,
  FaNewspaper,
  FaTree,
  FaTools,
  FaExclamationTriangle,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <h2 className="logo">🏙 Smart Admin</h2>

      <NavLink to="/admin" end className={({ isActive }) => isActive ? "link active" : "link"}>
        <FaTachometerAlt />
        Dashboard
      </NavLink>

      <NavLink to="/admin/news" className={({ isActive }) => isActive ? "link active" : "link"}>
        <FaNewspaper />
        News
      </NavLink>

      <NavLink to="/admin/tourism" className={({ isActive }) => isActive ? "link active" : "link"}>
        <FaTree />
        Tourism
      </NavLink>

      <NavLink to="/admin/announcements" className={({ isActive }) => isActive ? "link active" : "link"}>
        <FaBell />
        Announcements
      </NavLink>

      {/* ✅ FIXED ROUTE */}
      <NavLink to="/admin/complaints" className={({ isActive }) => isActive ? "link active" : "link"}>
        <FaExclamationTriangle />
        Complaints
      </NavLink>

      <NavLink to="/admin/services" className={({ isActive }) => isActive ? "link active" : "link"}>
        <FaTools />
        Services
      </NavLink>

      <button className="logout" onClick={logout}>
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;
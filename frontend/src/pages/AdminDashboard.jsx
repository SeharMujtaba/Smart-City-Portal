import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaNewspaper,
  FaMapMarkedAlt,
  FaBullhorn,
  FaTools,
  FaUsers,
} from "react-icons/fa";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    news: 0,
    tourism: 0,
    announcements: 0,
    complaints: 0,
  });

  const [recentComplaints, setRecentComplaints] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard"
      );

      // SAFE STATS HANDLING
      setStats(res.data?.stats || {
        news: 0,
        tourism: 0,
        announcements: 0,
        complaints: 0,
      });

      // SAFE COMPLAINTS HANDLING
      setRecentComplaints(res.data?.complaints || []);
    } catch (err) {
      console.log("Dashboard API Error:", err);

      // fallback UI so page never breaks
      setStats({
        news: 0,
        tourism: 0,
        announcements: 0,
        complaints: 0,
      });

      setRecentComplaints([]);
    }
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>🏙 Smart Kashmir Control Center</h1>
        <p>Administrator Dashboard Overview</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <FaNewspaper />
          <h2>{stats.news}</h2>
          <p>News</p>
        </div>

        <div className="stat-card">
          <FaMapMarkedAlt />
          <h2>{stats.tourism}</h2>
          <p>Tourism</p>
        </div>

        <div className="stat-card">
          <FaBullhorn />
          <h2>{stats.announcements}</h2>
          <p>Announcements</p>
        </div>

        <div className="stat-card">
          <FaTools />
          <h2>{stats.complaints}</h2>
          <p>Complaints</p>
        </div>

      </div>

      {/* GRID SECTION */}
      <div className="dashboard-grid">

        {/* QUICK ACTIONS */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>

          <button onClick={() => navigate("/admin/news")}>
            Add News
          </button>

          <button onClick={() => navigate("/admin/tourism")}>
            Add Tourism
          </button>

          <button onClick={() => navigate("/admin/announcements")}>
            Add Announcement
          </button>

          <button onClick={() => navigate("/admin/complaints")}>
            View Complaints
          </button>
        </div>

        {/* INFO PANEL */}
        <div className="admin-info">
          <FaUsers className="users-icon" />
          <h2>Admin Panel</h2>
          <p>
            Manage all city modules including News, Tourism,
            Complaints, Services and Announcements from one place.
          </p>
        </div>

      </div>

      {/* RECENT COMPLAINTS */}
      <div className="recent-section-wrapper">

        <div className="recent-section">
          <h2>Recent Complaints</h2>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentComplaints.length === 0 ? (
                <tr>
                  <td colSpan="3" className="empty">
                    No complaints available
                  </td>
                </tr>
              ) : (
                recentComplaints.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <span className={`status ${item.status}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
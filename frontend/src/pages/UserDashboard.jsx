import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-page">

      {/* ================= LOGOUT MODAL ================= */}
      {showLogoutModal && (
        <div className="logout-modal-overlay">

          <div className="logout-modal">

            <div className="logout-icon">🚪</div>

            <h2>Confirm Logout</h2>

            <p>
              Are you sure you want to logout from
              <br />
              <strong>Smart Kashmir Portal?</strong>
            </p>

            <div className="logout-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ================= DASHBOARD ================= */}
      <div className="dashboard-card">

        <h1>🏙️ Smart Kashmir Dashboard</h1>

        <p>Welcome to your personalized Smart Kashmir Portal</p>

        <div className="dashboard-actions">

          <button onClick={() => navigate("/")}>🏠 Home</button>

          <button onClick={() => navigate("/tourism")}>🏔️ Tourism</button>

          <button onClick={() => navigate("/news")}>📰 News</button>

          <button onClick={() => navigate("/weather")}>⛅ Weather</button>

          <button onClick={() => navigate("/events")}>📅 Events</button>

          <button onClick={() => navigate("/complaints")}>📝 Complaints</button>

          <button onClick={() => navigate("/services")}>🛠️ Services</button>

          <button
            className="logout-btn"
            onClick={() => setShowLogoutModal(true)}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;
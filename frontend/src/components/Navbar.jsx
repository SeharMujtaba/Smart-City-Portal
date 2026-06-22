import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    user = null;
  }

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully 👋");

    setShowLogoutModal(false);

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  // ESC key closes modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowLogoutModal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <nav className="navbar">

        {/* LOGO */}
        <div className="logo" onClick={() => navigate("/")}>
          Smart Kashmir
        </div>

        {/* NAV LINKS */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/weather">Weather</Link>
          <Link to="/news">News</Link>
          <Link to="/events">Events</Link>
          <Link to="/tourism">Tourism</Link>
          <Link to="/services">Services</Link>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="nav-buttons">

          {!token ? (
            <>
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="register-btn"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              {user?.role === "admin" && (
                <button
                  className="login-btn"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </button>
              )}

              <button
                className="register-btn"
                onClick={() => setShowLogoutModal(true)}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </nav>

      {/* ================= LOGOUT MODAL ================= */}
      {showLogoutModal && (
        <div
          className="logout-modal-overlay"
          onClick={() => setShowLogoutModal(false)} // click outside closes
        >

          <div
            className="logout-modal"
            onClick={(e) => e.stopPropagation()} // prevent close on modal click
          >

            <h3>Confirm Logout</h3>

            <p>Are you sure you want to logout?</p>

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleConfirmLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default Navbar;
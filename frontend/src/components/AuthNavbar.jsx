import { useNavigate } from "react-router-dom";
import "./AuthNavbar.css";

function AuthNavbar() {
  const navigate = useNavigate();

  return (
    <div className="auth-navbar">

      <div
        className="auth-logo"
        onClick={() => navigate("/")}
      >
        Smart Kashmir
      </div>

      <div className="auth-links">

        <button onClick={() => navigate("/")}>
          Home
        </button>

      </div>

    </div>
  );
}

export default AuthNavbar;
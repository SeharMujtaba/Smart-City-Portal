import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import AuthNavbar from "../components/AuthNavbar";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      // Save token
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // Save user safely
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success("Login successful 🎉");

      setTimeout(() => {
        if (data?.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1200);

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNavbar />

      <div className="login-page">

        <div className="login-container">

          <h2>Welcome Back 👋</h2>

          <p className="subtitle">
            Login to access Smart Kashmir Portal
          </p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="switch-text">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Register
            </span>
          </p>

        </div>

      </div>
    </>
  );
}

export default Login;
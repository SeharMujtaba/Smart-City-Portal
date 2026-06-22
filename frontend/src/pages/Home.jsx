import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  // Safe navigation (checks login)
  const goToPage = (path) => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />

      <div className="home">

        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-overlay">

            <h1>Smart Kashmir Portal</h1>

            <p>
              Connecting Citizens with Smart Services,
              Real-Time Information and Digital Governance
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

            </div>

          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="features">

          <div className="glass-card" onClick={() => goToPage("/weather")}>
            <h2>🌦 Weather Updates</h2>
            <p>Get live weather information from across Kashmir.</p>
          </div>

          <div className="glass-card" onClick={() => goToPage("/news")}>
            <h2>📰 Latest News</h2>
            <p>Stay informed with the latest local news and announcements.</p>
          </div>

          <div className="glass-card" onClick={() => goToPage("/services")}>
            <h2>🛠 Smart Services</h2>
            <p>Access government services and request support online.</p>
          </div>

          <div className="glass-card" onClick={() => goToPage("/tourism")}>
            <h2>🏔 Tourist Attractions</h2>
            <p>Discover Kashmir's most beautiful destinations.</p>
          </div>

          <div className="glass-card" onClick={() => goToPage("/events")}>
            <h2>📢 Events</h2>
            <p>Stay updated with city events and activities.</p>
          </div>

          <div className="glass-card" onClick={() => goToPage("/complaints")}>
            <h2>🧾 Complaint Portal</h2>
            <p>Submit and track complaints online.</p>
          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Home;
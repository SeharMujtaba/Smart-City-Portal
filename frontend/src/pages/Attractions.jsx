import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Attractions.css";

function Attractions() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await API.get("/tourism");
        setPlaces(res.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <>
      <Navbar />

      <div className="tourism-page">
        <h1>🏔️ Explore Kashmir Tourism</h1>

        <div className="tourism-grid">
          {places.map((place) => (
            <div className="tourism-card" key={place._id}>
              
              <img
                src={place.image || "/tourism/default.jpg"}
                alt={place.name}
              />

              <h2>{place.name}</h2>
              <p>{place.description}</p>

              <button
                className="tour-btn"
                onClick={() => navigate(`/tourism/${place._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Attractions;
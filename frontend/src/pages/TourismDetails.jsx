import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./TourismDetails.css";

function TourismDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [related, setRelated] = useState([]);
  const [index, setIndex] = useState(0);

  // FETCH PLACE (SAFE + NO WARNINGS)
  const fetchPlace = useCallback(async () => {
    try {
      const res = await API.get(`/tourism/${id}`);
      const data = res.data;

      setPlace(data);

      const all = await API.get("/tourism");

      setRelated(
        (all.data || [])
          .filter((p) => p._id !== id)
          .slice(0, 3)
      );
    } catch (err) {
      console.log("Error loading place:", err);
      setPlace(null);
    }
  }, [id]);

  useEffect(() => {
    fetchPlace();
  }, [fetchPlace]);

  if (!place) {
    return (
      <>
        <Navbar />
        <div className="tour-details">
          <h2>Loading or Place not found...</h2>

          <button
            className="back-btn"
            onClick={() => navigate("/tourism")}
          >
            ← Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const images =
    place.images && place.images.length > 0
      ? place.images
      : [place.image];

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
  <>
    <Navbar />

    <div className="tour-details">

      {/* HEADER SECTION (BACK BUTTON FIX) */}
      <div className="top-bar">
        <button
          className="back-btn"
          onClick={() => navigate("/tourism")}
        >
          ← Back
        </button>
      </div>

      {/* IMAGE SLIDER */}
      <div className="slider">
        <img src={images[index]} alt={place.name} />

        {images.length > 1 && (
          <div className="slider-controls">
            <button onClick={prevImage}>◀</button>
            <button onClick={nextImage}>▶</button>
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="details-card">
        <div className="details-content">

          <h1>{place.name}</h1>

          <p><b>📍 Location:</b> {place.location}</p>
          <p><b>🏷 Category:</b> {place.category}</p>
          <p><b>🌤 Best Time:</b> {place.bestTimeToVisit}</p>

          <p className="description">
            {place.description}
          </p>

        </div>
      </div>

      {/* RELATED */}
      <h2 className="related-title">Related Places</h2>

      <div className="related-grid">
        {related.map((r) => (
          <div
            key={r._id}
            className="related-card"
            onClick={() => navigate(`/tourism/${r._id}`)}
          >
            <img src={r.image} alt={r.name} />
            <p>{r.name}</p>
          </div>
        ))}
      </div>

    </div>

    <Footer />
  </>
);
}

export default TourismDetails;
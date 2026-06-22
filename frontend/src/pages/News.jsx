import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./News.css";

function News() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("kashmir");
  const [loading, setLoading] = useState(false);

  const fetchNews = async (cat) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/news?category=${cat}`
      );

      setNews(res.data || []);
    } catch (err) {
      console.log(err);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  return (
    <>
      <Navbar />

      <div className="news-page">

        {/* CATEGORY BUTTONS */}
        <div className="category-bar">
          <button onClick={() => setCategory("kashmir")}>Kashmir</button>
          <button onClick={() => setCategory("pakistan")}>Pakistan</button>
          <button onClick={() => setCategory("world")}>World</button>
          <button onClick={() => setCategory("trending")}>Trending</button>
        </div>

        {loading ? (
          <p>Loading news...</p>
        ) : (
          <div className="news-grid">
            {news.map((item, i) => (
              <div key={i} className="news-card">

                <img
  src={item.image ? item.image : "/news-placeholder.jpg"}
  alt={item.title}
  onError={(e) => {
    e.target.src = "/news-placeholder.jpg";
  }}
/>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                {/* SIMPLE TEXT LINK (NOT BUTTON) */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="read-more"
                >
                  Read more →
                </a>

              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default News;
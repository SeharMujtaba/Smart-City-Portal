import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/AdminSidebar";
import "./AdminPages.css";

function AdminNews() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const res = await axios.get("http://localhost:5000/api/news");
    setNews(res.data || []);
  };

  const addNews = async () => {
    if (!title || !description) return toast.error("Fill all fields");

    await axios.post("http://localhost:5000/api/news", {
      title,
      description,
    });

    toast.success("News added");
    setTitle("");
    setDescription("");
    fetchNews();
  };

  const deleteNews = async (id) => {
    await axios.delete(`http://localhost:5000/api/news/${id}`);
    toast.success("Deleted");
    fetchNews();
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>📰 News Management</h1>

        <div className="form-box">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <button onClick={addNews}>Add News</button>
        </div>

        <div className="list-box">
          {news.map((n) => (
            <div className="card" key={n._id}>
              <h3>{n.title}</h3>
              <p>{n.description}</p>
              <button onClick={() => deleteNews(n._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminNews;
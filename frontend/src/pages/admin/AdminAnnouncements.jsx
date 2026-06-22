import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../../config/api";
import AdminSidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";
import "./AdminPages.css";

function AdminAnnouncements() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("General");

  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/announcements`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data || []);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ADD ANNOUNCEMENT
  const addAnnouncement = async () => {
    try {
      await axios.post(
        `${API_BASE}/api/announcements`,
        { title, message, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Announcement added");

      setTitle("");
      setMessage("");
      fetchData();
    } catch (err) {
      toast.error("Error adding announcement");
    }
  };

  // DELETE ANNOUNCEMENT
  const deleteAnnouncement = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Deleted");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>📢 Announcements</h1>

        {/* FORM */}
        <div className="form-box">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>General</option>
            <option>Urgent</option>
            <option>Event</option>
          </select>

          <button onClick={addAnnouncement}>Add Announcement</button>
        </div>

        {/* LIST */}
        <div className="list-box">
          {items.map((a) => (
            <div className="card" key={a._id}>
              <h3>{a.title}</h3>
              <p>{a.message}</p>

              <span className="tag">{a.type}</span>

              <button
                style={{ marginTop: "10px", background: "red", color: "white" }}
                onClick={() => deleteAnnouncement(a._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminAnnouncements;
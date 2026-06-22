import { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Complaints.css";

function Complaints() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // FETCH COMPLAINTS
  const fetchComplaints = async () => {
    try {
      setFetching(true);

      const res = await API.get("/complaints/my");
      const data = res.data;

      if (Array.isArray(data)) {
        setComplaints(data);
      } else if (Array.isArray(data?.complaints)) {
        setComplaints(data.complaints);
      } else {
        setComplaints([]);
      }
    } catch (err) {
      console.log(err);
      setComplaints([]);
    } finally {
      setFetching(false);
    }
  };

  // CREATE COMPLAINT
  const createComplaint = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/complaints", {
        title,
        description,
      });

      toast.success("Complaint submitted successfully ✅");

      setTitle("");
      setDescription("");

      await fetchComplaints();
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit complaint ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <>
      <Navbar />

      <div className="complaints-page">

        <h2 className="complaints-title">📝 My Complaints</h2>

        {/* FORM */}
        <div className="complaints-form">

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={createComplaint} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

        </div>

        {/* LIST */}
        <div className="complaints-list">

          {fetching ? (
            <p className="empty-msg">Loading complaints...</p>
          ) : (
            complaints.map((c) => (
              <div className="complaint-card" key={c._id}>
                <h4>{c.title}</h4>
                <p>{c.description}</p>
                <b>{c.status}</b>
              </div>
            ))
          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Complaints;
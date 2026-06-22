import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../../config/api";
import AdminSidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";
import "./AdminPages.css";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // =========================
  // FETCH COMPLAINTS
  // =========================
  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_BASE}/api/complaints/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data || []);
    } catch (err) {
      console.error("Fetch complaints error:", err);
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_BASE}/api/complaints/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated");
      fetchComplaints();
    } catch (err) {
      console.error("Update status error:", err);
      toast.error("Update failed");
    }
  };

  // =========================
  // DELETE COMPLAINT
  // =========================
  const deleteComplaint = async (id) => {
  try {
    await axios.delete(
      `${API_BASE}/api/complaints/admin/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Deleted");
    fetchComplaints();
  } catch (err) {
    console.log(err.response?.data || err.message);
    toast.error("Delete failed");
  }
};

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>📝 Complaints</h1>

        <div className="list-box">

          {/* LOADING STATE */}
          {loading ? (
            <p className="empty">Loading complaints...</p>
          ) : complaints.length === 0 ? (
            <p className="empty">No complaints found</p>
          ) : (
            complaints.map((c) => (
              <div className="card" key={c._id}>
                <h3>{c.title}</h3>
                <p>{c.description}</p>

                <span className={`status ${c.status?.toLowerCase()}`}>
                  {c.status}
                </span>

                <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                  
                  <button onClick={() => updateStatus(c._id, "Resolved")}>
                    Mark Resolved
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteComplaint(c._id)}
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminComplaints;
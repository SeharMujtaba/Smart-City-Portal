import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../../config/api";
import AdminSidebar from "../../components/AdminSidebar";
import "./AdminLayout.css";

function AdminServices() {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");

  const fetchServices = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/services/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServices(res.data || []);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>🛠 Service Requests</h1>

        <div className="list-box">
          {services.length === 0 ? (
            <p className="empty">No service requests found</p>
          ) : (
            services.map((s) => (
              <div key={s._id} className="card">
                <h3>{s.type}</h3>
                <p>{s.description}</p>

                <span className={`status ${s.status?.toLowerCase()}`}>
                  {s.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminServices;
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/AdminSidebar";
import "./AdminPages.css";

function AdminTourism() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    const res = await axios.get("http://localhost:5000/api/tourism");
    setPlaces(res.data || []);
  };

  const addPlace = async () => {
    if (!name || !location) return toast.error("Fill all fields");

    await axios.post("http://localhost:5000/api/tourism", {
      name,
      location,
    });

    toast.success("Place added");
    setName("");
    setLocation("");
    fetchPlaces();
  };

  const deletePlace = async (id) => {
    await axios.delete(`http://localhost:5000/api/tourism/${id}`);
    toast.success("Deleted");
    fetchPlaces();
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>🏔 Tourism Management</h1>

        <div className="form-box">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Place Name" />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
          <button onClick={addPlace}>Add Place</button>
        </div>

        <div className="list-box">
          {places.map((p) => (
            <div className="card" key={p._id}>
              <h3>{p.name}</h3>
              <p>{p.location}</p>
              <button onClick={() => deletePlace(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminTourism;
import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "./Services.css";

function Services() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    serviceType: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitRequest = async () => {
    try {
      await API.post("/services", form);

      toast.success("Service request submitted!");

      setForm({
        name: "",
        phone: "",
        serviceType: "",
        description: "",
      });
    } catch (err) {
      toast.error("Failed to submit request");
    }
  };

  return (
    <>
      <Navbar />

      <div className="service-page">
        <h1 className="service-title">
  <span className="service-icon">🏢</span>
  <span className="service-text">Service Request Portal</span>
</h1>

        <div className="service-form">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
          >
            <option value="">Select Service</option>
            <option value="Electricity">Electricity</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Road Repair">Road Repair</option>
          </select>

          <textarea
            name="description"
            placeholder="Describe your issue"
            value={form.description}
            onChange={handleChange}
          />

          <button onClick={submitRequest}>
            Submit Request
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Services;
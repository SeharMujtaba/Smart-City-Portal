import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/UserDashboard";
import Complaints from "./pages/Complaints";

import AdminDashboard from "./pages/AdminDashboard";

import Weather from "./pages/Weather";
import News from "./pages/News";
import Events from "./pages/Events";
import Attractions from "./pages/Attractions";
import TourismDetails from "./pages/TourismDetails";
import Services from "./pages/Services";

import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ADMIN PAGES
import AdminNews from "./pages/admin/AdminNews";
import AdminTourism from "./pages/admin/AdminTourism";
import AdminServices from "./pages/admin/AdminServices";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminComplaints from "./pages/admin/AdminComplaints";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
        <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
        <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/tourism" element={<ProtectedRoute><Attractions /></ProtectedRoute>} />
        <Route path="/tourism/:id" element={<ProtectedRoute><TourismDetails /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />

        {/* ADMIN */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/news" element={<ProtectedRoute><AdminNews /></ProtectedRoute>} />
        <Route path="/admin/tourism" element={<ProtectedRoute><AdminTourism /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
        <Route path="/admin/announcements" element={<ProtectedRoute><AdminAnnouncements /></ProtectedRoute>} />
        <Route path="/admin/complaints" element={<ProtectedRoute><AdminComplaints /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
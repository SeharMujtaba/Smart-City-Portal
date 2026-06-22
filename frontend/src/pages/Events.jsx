import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

import { getEvents } from "../services/eventService";

import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEvents();

      // ✅ IMPORTANT FIX:
      // backend sometimes returns:
      // { count: 3, data: [...] }
      const data = Array.isArray(response)
        ? response
        : response?.data || [];

      setEvents(data);
      setFilteredEvents(data);

    } catch (err) {
      console.error("Events API Error:", err);
      setError("Unable to load announcements.");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 SEARCH + FILTER SYSTEM
  useEffect(() => {
    let temp = [...events];

    // filter by type
    if (typeFilter !== "ALL") {
      temp = temp.filter((e) => e.type === typeFilter);
    }

    // search filter
    if (search.trim()) {
      temp = temp.filter((e) =>
        (e.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (e.message || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredEvents(temp);
  }, [search, typeFilter, events]);

  return (
    <>
      <Navbar />

      <div className="events-page">

        {/* HEADER */}
        <div className="events-header">
          <h1>City Events & Announcements</h1>
          <p>Real-time updates from Smart City Portal</p>
        </div>

        {/* CONTROLS */}
        <div className="events-controls">

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="Event">Event</option>
            <option value="Alert">Alert</option>
            <option value="Weather">Weather</option>
            <option value="Emergency">Emergency</option>
          </select>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="state-box">
            Loading events...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="state-box error">
            {error}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredEvents.length === 0 && (
          <div className="state-box">
            No events found.
          </div>
        )}

        {/* FEATURED EVENT */}
        {!loading && filteredEvents.length > 0 && (
          <div className="featured-event">
            <h2>🔥 Latest Update</h2>
            <EventCard event={filteredEvents[0]} />
          </div>
        )}

        {/* GRID */}
        <div className="events-grid">
          {filteredEvents.slice(1).map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Events;
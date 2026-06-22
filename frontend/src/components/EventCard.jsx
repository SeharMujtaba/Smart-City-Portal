import "./EventCard.css";

function EventCard({ event }) {
  
  // Convert event type into CSS class (safe + lowercase)
  const typeClass = event?.type ? event.type.toLowerCase() : "";

  // Format date safely
  const formattedDate = event?.createdAt
    ? new Date(event.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="event-card">

      {/* TOP SECTION: TYPE + DATE */}
      <div className="event-top">
        
        <span className={`event-badge ${typeClass}`}>
          {event?.type || "Update"}
        </span>

        {formattedDate && (
          <span className="event-date">
            {formattedDate}
          </span>
        )}

      </div>

      {/* TITLE */}
      <h3 className="event-title">
        {event?.title || "No Title"}
      </h3>

      {/* DESCRIPTION */}
      <p className="event-desc">
        {event?.message || event?.description || "No details available."}
      </p>

      {/* FOOTER */}
      <div className="event-footer">
        <span>Smart City Portal</span>
      </div>

    </div>
  );
}

export default EventCard;
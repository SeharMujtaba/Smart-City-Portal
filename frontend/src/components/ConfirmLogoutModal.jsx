import "./ConfirmLogoutModal.css";

function ConfirmLogoutModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>

        <div className="modal-actions">

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="logout-btn" onClick={onConfirm}>
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmLogoutModal;
import React from "react";
import "./index.scss";

interface InsufficientModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const InsufficientModal: React.FC<InsufficientModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="insufficient-overlay" role="dialog" aria-modal="true">
      <div className="insufficient-modal">
        <p>You have insufficient balance</p>
        <button className="insufficient-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
    </div>
  );
};

export default InsufficientModal;



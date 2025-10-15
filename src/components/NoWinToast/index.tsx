import React from "react";
import "./index.scss";

interface NoWinToastProps {
  isVisible: boolean;
}

const NoWinToast: React.FC<NoWinToastProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="no-win-toast" role="status" aria-live="polite">
      <span className="no-win-text">NO WIN</span>
    </div>
  );
};

export default NoWinToast;



import React from "react";
import "./index.scss";
import cup0Img from "../../image/cup0.png";
import beerModalImg from "../../image/beermodal.png";
import beerModalImg1 from "../../image/beer.png";
import bubleModalImg from "../../image/bubblemodal.png";
import waterModalImg from "../../image/water3.png";
import waterModalImg1 from "../../image/waterModal.png";

interface WinModalProps {
  isVisible: boolean;
  winAmount: number;
}

const WinModal: React.FC<WinModalProps> = ({ isVisible, winAmount }) => {
  if (!isVisible) return null;

  return (
    <div className="win-modal-overlay">
      <div className="win-madal-body">
        <div className="win-modal">
          <div className="win-modal-content">
            <div className="beer-glasses">
              <div className="beer-glass-beer-glass-1">
                <img src={cup0Img} alt="cup0Img" className="cup0Img" />
                <img
                  src={beerModalImg}
                  alt="beerModalImg"
                  className="beerModalImg"
                />
                <div className="waterModal">
                  <img
                    src={waterModalImg}
                    alt="waterModalImg"
                    className="waterModalImg"
                  />
                  <img
                    src={waterModalImg1}
                    alt="waterModalImg1"
                    className="waterModalImg1"
                  />
                </div>
                <img
                  src={bubleModalImg}
                  alt="bubleModalImg"
                  className="bubleModalImg"
                />
              </div>
              <div className="beer-glass-beer-glass-2">
                <img src={cup0Img} alt="cup0Img" className="cup0Img" />
                <img
                  src={beerModalImg1}
                  alt="beerModalImg1"
                  className="beerModalImg1"
                />
                <div className="waterModal">
                  <img
                    src={waterModalImg}
                    alt="waterModalImg"
                    className="waterModalImg"
                  />
                  <img
                    src={waterModalImg1}
                    alt="waterModalImg1"
                    className="waterModalImg1"
                  />
                </div>
                <img
                  src={bubleModalImg}
                  alt="bubleModalImg"
                  className="bubleModalImg"
                />
              </div>
            </div>
            <div className="win-text">
              <div className="win-label">WIN</div>
              <div className="win-amount">{winAmount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinModal;

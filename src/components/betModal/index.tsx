import React, { useState, useEffect } from "react";
import { GAME_CONFIG } from "../../config/constants";
import "./index.scss";
import closeButton from "../../image/close.png";

interface PropsI {
  bet: number;
  balance: number;
  betModal: boolean;
  setBet: any;
  setBetModal: any;
}

const BetControlModal = ({
  bet,
  balance,
  setBet,
  betModal,
  setBetModal,
}: PropsI) => {
  const [time, setTime] = useState(new Date());
  const [betValue, setBetValue] = useState<number>(0);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const betNumberArr = [
    1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 75, 100, 200, 300, 400, 500, 750, 1000,
    2000, 3000, 4000, 5000, 7500, 10000, 20000, 30000, 40000, 50000, 75000,
    100000,
  ];

  useEffect(() => {
    setBetValue(bet);
  }, [bet]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, GAME_CONFIG.CLOCK_UPDATE_INTERVAL);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const arr = betNumberArr.filter((item) => item <= balance);
  const maxIndex = Math.max(arr.length - 1, 0) > 30 ? 30 : arr.length - 1;
  const safeBetValue = Math.min(Math.max(betValue, 0), maxIndex);
  const percentageDenominator = Math.max(arr.length - 1, 1);
  const percentage = (safeBetValue / percentageDenominator) * 100;

  const sliderStyle =
    percentage < 90
      ? {
          background: `linear-gradient(
    to right, 
    #08a2f8 0%, 
    #8cbff2 ${percentage}%, 
    #1d222c ${percentage}%, 
    #1d222c 100%
  )`,
        }
      : {
          background: `linear-gradient(to right,rgb(255, 0, 0) ${percentage}%, #ccc ${percentage}%)`,
        };

  return (
    <div
      className="BetControlModal"
      style={betModal ? { marginTop: "0%" } : { marginTop: "100%" }}
    >
      <div className="top">
        <div className="top-left">
          <h6>Bet Setting</h6>
          <p>October Pub</p>
        </div>
        <div className="top-right">
          <p>
            {formattedHours}:{formattedMinutes}
          </p>
          <img
            src={closeButton}
            alt="closeButton"
            className="closeButton"
            onClick={() => setBetModal(false)}
          />
        </div>
      </div>
      <div className="body">
        <div className="body1">
          <div className="min">
            <p className="min-p">Min</p>
            <p>1</p>
          </div>
          <div className="bet">
            <p>DEM {betNumberArr[betValue]}</p>
          </div>
          <div className="min">
            <p className="min-p">Max</p>
            <p>{balance}</p>
          </div>
        </div>
        <div className="body2">
          <input
            type="range"
            onChange={(e: any) => {
              const numericValue = Number(e.target.value);
              setBetValue(numericValue);
            }}
            min={0}
            max={maxIndex}
            value={safeBetValue}
            className="slider"
            style={sliderStyle}
          />
        </div>
        <button
          className="body3"
          onClick={() => {
            setBet(safeBetValue);
            setBetModal(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default BetControlModal;

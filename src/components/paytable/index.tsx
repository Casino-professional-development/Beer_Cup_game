import React, { useState, useEffect } from "react";
import "./index.scss";
import { GAME_CONFIG } from "../../config/constants";

interface propsI {
  listComponentsFlag: string;
}

const PaytableComponents = ({ listComponentsFlag }: propsI) => {
  const [time, setTime] = useState(new Date());
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, GAME_CONFIG.CLOCK_UPDATE_INTERVAL);

    return () => {
      clearInterval(timerId);
    };
  }, []);
  return (
    <div
      className="paytable"
      style={
        listComponentsFlag === "paytable"
          ? { height: "100%" }
          : { height: "0%" }
      }
    >
      <div className="paytable-top">
        <div className="top-left">
          <h6>Rules</h6>
          <p>October Pub (RTP 96.00%)</p>
        </div>
        <div className="top-right">
          <p>
            {formattedHours}:{formattedMinutes}
          </p>
        </div>
      </div>
      <div className="payptable-body">
        <h1>PAYTABLE</h1>
        <div className="paytable-content">
          <table>
            <tbody>
              <tr>
                <td>Step</td>
                <td>Muliplier</td>
              </tr>
              <tr>
                <td>5</td>
                <td>100</td>
              </tr>
              <tr>
                <td>4</td>
                <td>30</td>
              </tr>
              <tr>
                <td>3</td>
                <td>12</td>
              </tr>
              <tr>
                <td>2</td>
                <td>5</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaytableComponents;

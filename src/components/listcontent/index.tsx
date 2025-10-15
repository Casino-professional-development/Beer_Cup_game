import React, { useState, useEffect } from "react";
import "./index.scss";
import { GAME_CONFIG } from "../../config/constants";
import sound1 from "../../image/sound1.png";
import sound2 from "../../image/sound2.png";
import turbo1 from "../../image/turbo1.png";
import turbo2 from "../../image/turbo2.png";

interface PropsI {
  listComponentsFlag: string;
  sound: boolean;
  setSound: any;
  turbo: boolean;
  setTurbo:any;
}

const ListContent = ({
  listComponentsFlag,
  sound,
  setSound,
  turbo,
  setTurbo,
}: PropsI) => {
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
      className="listContent"
      style={
        listComponentsFlag === "list"
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none" }
      }
    >
      <div className="top">
        <p>October Pub</p>
        <p>
          {formattedHours}:{formattedMinutes}
        </p>
      </div>
      <div className="body">
        <div className="bodycontent">
          <div className="bodycontent-cell" onClick={() => setSound(!sound)}>
            {sound ? (
              <img src={sound2} alt="sound2" />
            ) : (
              <img src={sound1} alt="sound1" />
            )}
            <p>sound</p>
          </div>
          <div className="bodycontent-cell" onClick={() => setTurbo(!turbo)}>
            {turbo ? (
              <img src={turbo2} alt="turbo2" />
            ) : (
              <img src={turbo1} alt="turbo1" />
            )}
            <p>turbo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListContent;

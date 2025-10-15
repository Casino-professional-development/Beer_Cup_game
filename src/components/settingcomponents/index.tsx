import React, { useState, useEffect } from "react";
import { GAME_CONFIG } from "../../config/constants";
import "./index.scss";

interface PropsI {
  listComponentsFlag: string;
  sound: boolean;
  setSound: any;
  turbo: boolean;
  setTurbo: any;
}

const SettingComponents = ({
  listComponentsFlag,
  sound,
  setSound,
  turbo,
  setTurbo,
}: PropsI) => {
  const [time, setTime] = useState(new Date());
  const [volume, setVolume] = useState<number>(25);
  const [music, setMusic] = useState<number>(25);
  const [mode, setMode] = useState<boolean>(false);
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

  const percentage = ((volume - 1) / 49) * 100;
  const percentage1 = ((music - 1) / 49) * 100;

  const sliderStyle = {
    background: `linear-gradient(
    to right, 
    #08a2f8 0%, 
    #8cbff2 ${percentage}%, 
    #242e3f ${percentage}%, 
#242e3f 100%
  )`,
  };

  const sliderStyle1 = {
    background: `linear-gradient(
    to right, 
    #08a2f8 0%, 
    #8cbff2 ${percentage1}%, 
    #242e3f ${percentage1}%, 
#242e3f 100%
  )`,
  };

  return (
    <div
      className="setting-content"
      style={
        listComponentsFlag === "setting" ? { height: "100%" } : { height: "0%" }
      }
    >
      <div className="setting-top">
        <div className="top-left">
          <h6>Settings</h6>
          <p>October Pub</p>
        </div>
        <div className="top-right">
          <p>
            {formattedHours}:{formattedMinutes}
          </p>
        </div>
      </div>
      <div className="setting-body">
        <div className="setting-cell">
          <h1>SOUND SETTINGS</h1>
          <div className="setting-cell1">
            <p>Sound</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={sound}
                onChange={() => setSound(!sound)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="setting-cell2">
            <p>Sound Volume</p>
            <input
              type="range"
              onChange={(e: any) => {
                const numericValue = Number(e.target.value);
                setVolume(numericValue);
              }}
              min={1}
              max={50}
              value={volume}
              className="slider1"
              style={sliderStyle}
            />
          </div>
          <div className="setting-cell2">
            <p>Music Volume</p>
            <input
              type="range"
              onChange={(e: any) => {
                const numericValue = Number(e.target.value);
                setMusic(numericValue);
              }}
              min={1}
              max={50}
              value={music}
              className="slider1"
              style={sliderStyle1}
            />
          </div>
        </div>
        <div className="setting-cell">
          <h1>SOUND SETTINGS</h1>
          <div className="setting-cell1">
            <p>Show Intro</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={turbo}
                onChange={() => setTurbo(!turbo)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="setting-cell2">
            <p>Turbo Mode</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={mode}
                onChange={() => setMode(!mode)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="setting-cell2"></div>
        </div>
      </div>
    </div>
  );
};

export default SettingComponents;

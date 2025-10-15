import React from "react";
import close from "../../image/close1.png";
import paytable from "../../image/paytable.png";
import rules from "../../image/rules.png";
import setting from "../../image/setting.png";
import "./index.scss";

interface PropsI {
  listComponentsFlag: string;
  setListComponentsFlag: any;
}

const ListComponents = ({
  listComponentsFlag,
  setListComponentsFlag,
}: PropsI) => {
  const handlePaytableclick = () => {
    setListComponentsFlag("paytable");
  };
  const handleRulesClick = () => {
    setListComponentsFlag("rules");
  };
  const handleSettingClick = () => {
    setListComponentsFlag("setting");
  };
  const handleCloseClick = () => {
    setListComponentsFlag("");
  };
  return (
    <div
      className="listcomponent"
      style={
        listComponentsFlag ? { marginLeft: "2vw" } : { marginLeft: "-12vw" }
      }
    >
      <div className="top">
        <div className="top-cell" onClick={handlePaytableclick}>
          <img src={paytable} alt="paytable" />
          <p
            style={
              listComponentsFlag === "paytable"
                ? { color: "#5ca2f8" }
                : { color: "white" }
            }
          >
            Paytable
          </p>
        </div>
        <div className="top-cell" onClick={handleRulesClick}>
          <img src={rules} alt="rules" />
          <p
            style={
              listComponentsFlag === "rules"
                ? { color: "#5ca2f8" }
                : { color: "white" }
            }
          >
            Rules
          </p>
        </div>
        <div className="top-cell" onClick={handleSettingClick}>
          <img src={setting} alt="setting" />
          <p
            style={
              listComponentsFlag === "setting"
                ? { color: "#5ca2f8" }
                : { color: "white" }
            }
          >
            Settings
          </p>
        </div>
      </div>
      <div className="under" onClick={handleCloseClick}>
        <img src={close} alt="close" />
        <p>close</p>
      </div>
    </div>
  );
};

export default ListComponents;

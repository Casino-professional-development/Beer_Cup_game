import React, { useState } from "react";
import "./index.scss";
import saveImg from "../../image/save.png";
import rulesImg from "../../image/rules.png";
import listImg from "../../image/list.png";
import ListComponents from "../ListComponents";
import ListContent from "../listcontent";
import RulesContent from "../rulesContent";
import SettingComponents from "../settingcomponents";
import PaytableComponents from "../paytable";

const ContentList = () => {
  const [sound, setSound] = useState<boolean>(true);
  const [turbo, setTurbo] = useState<boolean>(true);
  const [listComponentsFlag, setListComponentsFlag] = useState<string>("");
  const handleSaveClick = () => {
    console.log("save");
  };
  const handleRulesClick = () => {
    setListComponentsFlag("rules");
  };
  const handleListClick = () => {
    setListComponentsFlag("list");
  };
  return (
    <div className="content-list">
      <img src={saveImg} alt="saveImg" onClick={handleSaveClick} />
      <img src={rulesImg} alt="rulesImg" onClick={handleRulesClick} />
      <img src={listImg} alt="listImg" onClick={handleListClick} />
      <ListComponents
        listComponentsFlag={listComponentsFlag}
        setListComponentsFlag={setListComponentsFlag}
      />
      <ListContent
        listComponentsFlag={listComponentsFlag}
        sound={sound}
        setSound={setSound}
        turbo={turbo}
        setTurbo={setTurbo}
      />
      <RulesContent listComponentsFlag={listComponentsFlag} />
      <SettingComponents
        listComponentsFlag={listComponentsFlag}
        sound={sound}
        setSound={setSound}
        turbo={turbo}
        setTurbo={setTurbo}
      />
      <PaytableComponents listComponentsFlag={listComponentsFlag} />
    </div>
  );
};

export default ContentList;

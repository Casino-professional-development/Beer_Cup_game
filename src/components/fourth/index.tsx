import React from "react";
import pipes1IMG from "../../image/pipes1.png";
import EndbeerImg from "../../image/endbeer.png";
import AddbeerImg from "../../image/addbeer.png";
import BeerUnderModal from "../BeerModal";

const FourthStateComponent = () => {
  return (
    <div className="cupcell-container-item">
      <img className="cupcell-container-top" src={pipes1IMG} alt="pipes1IMG" />
      <div className="cupcell-container-body">
        <div className="Under">
          <p className="fourth-no-win-p">NO WIN</p>
        </div>
        <div className="cupcell-container-control">
          <BeerUnderModal result={"NO WIN"} />
          <img
            className="AddbeerImg"
            src={AddbeerImg}
            alt="AddbeerImg"
            style={{ opacity: 0 }}
          />
          <img
            className="EndbeerImg"
            src={EndbeerImg}
            alt="EndbeerImg"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default FourthStateComponent;

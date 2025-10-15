import React from "react";
import pipes1IMG from "../../image/pipes1.png";
import EndbeerImg from "../../image/endbeer.png";
import AddbeerImg from "../../image/addbeer.png";

const ZeroStateComponent = () => {
  return (
    <div className="cupcell-container-item">
      <img className="cupcell-container-top" src={pipes1IMG} alt="pipes1IMG" />
      <div className="cupcell-container-body" style={{ display: "none" }}>
        <div className="Under" style={{ opacity: 0 }}>
          <p>ZERO</p>
        </div>
        <div className="cupcell-container-control">
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

export default ZeroStateComponent;

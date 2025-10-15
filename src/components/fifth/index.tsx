import React from "react";
import EndbeerImg from "../../image/endbeer.png";
import AddbeerImg from "../../image/addbeer.png";
import pipes1IMG from "../../image/pipes1.png";
import { FifthStatePropsI } from "../../types";

const FifthStateComponent: React.FC<FifthStatePropsI> = ({value, bet}) => {
  const betNumberArr = [
    1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 75, 100, 200, 300, 400, 500, 750, 1000,
    2000, 3000, 4000, 5000, 7500, 10000, 20000, 30000, 40000, 50000, 75000,
    100000,
  ];
  return (
    <div className="cupcell-container-item">
          <img
            className="cupcell-container-top"
            src={pipes1IMG}
            alt="pipes1IMG"
          />
          <div className="cupcell-container-body">
            <div className="Under">
              <p style={{color:"red"}} className="under-p">{bet ? betNumberArr[bet] * value : value}</p>
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
  )
}

export default FifthStateComponent;
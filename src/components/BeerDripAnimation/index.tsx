import React from "react";
import dropImg from "../../image/drop.png";
import dropImg1 from "../../image/drop1.png";
import "./index.scss";

interface PropsI {
  dropFlag: boolean;
}

const BeerDripAnimation = ({ dropFlag }: PropsI) => {
  return (
    <div className="beerDrip">
      {dropFlag ? (
        <>
          <div className="start"></div>
          <img src={dropImg} alt="drop" className="drop" />
          <img src={dropImg} alt="drop" className="drop1" />
          <img src={dropImg} alt="drop" className="drop2" />
          <img src={dropImg1} alt="drop" className="drop3" />
        </>
      ) : (
        <>
          <div className="start"></div>
          <img src={dropImg} alt="drop" className="drop0" />
        </>
      )}
    </div>
  );
};

export default BeerDripAnimation;

import React, { useContext } from "react";
import { BeerContext } from "../../context/beer";
import { CheckFlagContext } from "../../context/checkflag";
import { BeerI, FirstStatePropsI } from "../../types";
import AddGlassCount from "../../context/addGlassCount";

import crossImg from "../../image/cross.png";
import pipes1IMG from "../../image/pipes1.png";
import EndbeerImg from "../../image/endbeer.png";
import AddbeerImg from "../../image/addbeer.png";
import effectImg from "../../image/pluseffect.png";

const FirstStateComponent: React.FC<FirstStatePropsI> = ({ id }) => {
  const { beers, setBeers } = useContext(BeerContext)!;
  const { addGlassCount, setAddGlassCount } = useContext(AddGlassCount)!;
  const { buttonsDisabled, setButtonsDisabled } = useContext(CheckFlagContext)!;

  const addGlassClick = (id: string) => {
    // Disable all buttons for 1 second
    setAddGlassCount(addGlassCount + 1);
    setButtonsDisabled(true);
    setTimeout(() => {
      setButtonsDisabled(false);
    }, 500);

    const updateBeer = beers.map((value: BeerI) => {
      return value.id === id ? { ...value, state: "second" } : value;
    });
    setBeers(updateBeer);
  };
  return (
    <div className="cupcell-container-item">
      <img className="cupcell-container-top" src={pipes1IMG} alt="pipes1IMG" />
      <div className="cupcell-container-body">
        <div className="cupcell-container-body-top">
          <div
            className="effect"
            onClick={buttonsDisabled ? undefined : () => addGlassClick(id)}
            style={{
              opacity: buttonsDisabled ? 0.5 : 1,
              cursor: buttonsDisabled ? "not-allowed" : "pointer",
            }}
          >
            <img src={effectImg} alt="effectImg" />
          </div>
          <img className="emptyGlassImg" src={crossImg} alt="AddbeerImg" />
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

export default FirstStateComponent;

import React, { useContext, useEffect, useRef, useState } from "react";
import { BeerContext } from "../../context/beer";
import { CheckFlagContext } from "../../context/checkflag";
import { BeerI, ThirdStatePropsI } from "../../types";
import cup0Img from "../../image/cup0.png";
import pipes1IMG from "../../image/pipes1.png";
import EndbeerImg from "../../image/endbeer.png";
import AddbeerImg from "../../image/addbeer.png";
import GlassEffect from "../../image/glassEffect.png";
import BeerImg from "../../image/beer.png";
import Bubble1 from "../../image/bubble1.png";
import Bubble2 from "../../image/bubble2.png";
import Bubble3 from "../../image/bubble3.png";
import Bubble4 from "../../image/bubble4.png";
import Bubble5 from "../../image/bubble5.png";
import GalssWall from "../../image/glasswall.png";
import emplyGlassEffect from "../../image/effect.png";
import BeerDripAnimation from "../BeerDripAnimation/index";
import water from "../../image/water.png";
import water1 from "../../image/water1.png";
import water2 from "../../image/water2.png";
import water3 from "../../image/water3.png";
import GraduationComponent from "../graduation";
import BeerUnderModal from "../BeerModal/index";
import AddGlassCount from "../../context/addGlassCount";
import { toast } from "react-toastify";

const ThirdStateComponent: React.FC<ThirdStatePropsI> = ({
  id,
  value,
  balance,
  bet,
  checkAddBeer,
  setTotalWin,
  setBalance,
  onLoseRound,
  onInsufficientBalance,
}) => {
  const { beers, setBeers } = useContext(BeerContext)!;
  const {
    checkFlag,
    allBeerValue,
    buttonsDisabled,
    setCheckFlag,
    setBeerFlag,
    setAllBeerValue,
    setButtonsDisabled,
  } = useContext(CheckFlagContext)!;
  const { addGlassCount, setAddGlassCount } = useContext(AddGlassCount)!;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tapRef = useRef<HTMLImageElement | null>(null);
  const [roundTime, setRoundTime] = useState<number>(0);
  const [play, setPlay] = useState<number>(0);
  const arr = [2, 5, 12, 30, 100];
  const bubbles = [Bubble1, Bubble2, Bubble3, Bubble4, Bubble5];
  const [dropFlag, setDropFlag] = useState<boolean>(true);
  const [beerUnderModalFlag, setBeerUnderModalFlag] = useState<boolean>(false);
  const count = arr.indexOf(value);
  const betNumberArr = [
    1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 75, 100, 200, 300, 400, 500, 750, 1000,
    2000, 3000, 4000, 5000, 7500, 10000, 20000, 30000, 40000, 50000, 75000,
    100000,
  ];
  useEffect(() => {
    setAllBeerValue(allBeerValue - value);
    setTimeout(() => {
      if (roundTime === 1500) setBalance(balance + 100);
      const updateBeerData = beers.map((item: BeerI) => {
        return item.id === id && item.value === 100
          ? { ...item, state: "fifth" }
          : { ...item };
      });
      setBeers(updateBeerData);
    }, roundTime);
  }, [roundTime]);

  const addBeerClick = (id: string, value: number) => {
    // Disable all buttons while resolving click
    if (addGlassCount * betNumberArr[bet] <= balance) {
      setAddGlassCount(1);
      setButtonsDisabled(true);
      setTimeout(() => {
        setButtonsDisabled(false);
      }, 2000);

      setPlay(play + 1);
      let beerFlag: any;
      // Mark this beer as having received an add-beer click
      setBeers(
        beers.map((beer: BeerI) =>
          beer.id === id ? { ...beer, checkAddBeer: true } : beer
        )
      );

      if (!checkAddBeer) setBalance(balance - betNumberArr[bet]);
      if (!checkFlag) {
        setTotalWin(0);
      }
      setCheckFlag(true);
      setBeerFlag(true);
      if (value === 0) {
        beerFlag = Math.random() < 0.48 ? 2 : Math.floor(Math.random() * 2) + 1;
      } else if (value === 2) {
        beerFlag = Math.random() < 0.18 ? 5 : Math.floor(Math.random() * 2) + 3;
      } else if (value === 5) {
        beerFlag =
          Math.random() < 0.081 ? 12 : Math.floor(Math.random() * 6) + 6;
      } else if (value === 12) {
        beerFlag =
          Math.random() < 0.031 ? 30 : Math.floor(Math.random() * 17) + 13;
      } else if (value === 30) {
        beerFlag =
          Math.random() < 0.0098 ? 100 : Math.floor(Math.random() * 69) + 31;
      }

      const updateBeerDataFunction = () => {
        const updateBeerData = beers.map((item: BeerI) => {
          return item.id === id
            ? isWinningMultiple
              ? beerFlag === 100
                ? {
                    ...item,
                    value: beerFlag,
                    state: "third",
                    flag: true,
                  }
                : {
                    ...item,
                    value: beerFlag,
                    state: "third",
                    flag: true,
                    checkAddBeer: true,
                  }
              : {
                  ...item,
                  value: 0,
                  state: "fourth",
                  flag: true,
                  checkAddBeer: true,
                }
            : { ...item };
        });
        setBeers(updateBeerData);
      };

      const isWinningMultiple =
        beerFlag === 2 ||
        beerFlag === 5 ||
        beerFlag === 12 ||
        beerFlag === 30 ||
        beerFlag === 100;

      if (isWinningMultiple) {
        setDropFlag(true);
        setAllBeerValue(allBeerValue - value + beerFlag);
        updateBeerDataFunction();
      } else {
        setDropFlag(false);
        setAllBeerValue(allBeerValue - value);
        setTimeout(() => {
          updateBeerDataFunction();
        }, 1000);
      }
      if (beerFlag === 100) setRoundTime(1500);
    } else {
      toast.error("Insufficient balance");
    }
  };

  const endBeerClick = (id: string, value: number) => {
    setBalance(balance + betNumberArr[bet] * value);
    setBeerUnderModalFlag(true);
    setAllBeerValue(allBeerValue - value);
    setTimeout(() => {
      const endBeerData = beers.map((item) => {
        return item.id === id ? { ...item, state: "fifth", flag: true } : item;
      });
      setBeers(endBeerData);
    }, 500);
  };

  return (
    <div
      className="cupcell-container-item"
      style={{ position: "relative" }}
      ref={containerRef}
    >
      {play > 0 ? <BeerDripAnimation key={play} dropFlag={dropFlag} /> : ""}
      <img
        className="cupcell-container-top"
        src={pipes1IMG}
        alt="pipes1IMG"
        ref={tapRef}
      />
      <div className="cupcell-container-body">
        {beerUnderModalFlag ? (
          ""
        ) : (
          <div className="fullMug">
            <img className="emptyGlassImg" src={cup0Img} alt="AddbeerImg" />
            <img
              className="emplyGlassEffect"
              src={emplyGlassEffect}
              alt="emplyGlassEffect"
            />
            <div className="reveal-window-body">
              <div className="bubble">
                {count !== -1 ? (
                  <img
                    src={bubbles[count]}
                    className={`bubble${count + 1}`}
                    alt={`Bubble${count}`}
                    id="bubbles"
                  />
                ) : (
                  ""
                )}
              </div>
              {dropFlag ? (
                <div
                  className="reveal-window"
                  style={{ height: `${23.5 * ((count + 1) / 5)}vw` }}
                >
                  <img className="BeerImg" src={BeerImg} alt="BeerImg" />
                </div>
              ) : (
                <div
                  className="reveal-window"
                  style={{ height: `${23.5 * ((count + 1.2) / 5)}vw` }}
                >
                  <img className="BeerImg" src={BeerImg} alt="BeerImg" />
                </div>
              )}
            </div>
            <div className="reveal-water-body">
              <div
                className="reveal-water"
                style={{
                  height: `${20 * ((count + 1) / 5)}vw`,
                }}
              >
                {count >= 0 ? (
                  <div className="waters">
                    <img src={water} alt={"water"} className="water" />
                    <img src={water1} alt={"water1"} className="water1" />
                    <img src={water2} alt={"water2"} className="water2" />
                    <img src={water3} alt={"water3"} className="water3" />
                    <img src={water1} alt={"water4"} className="water4" />
                    <img src={water} alt={"water5"} className="water5" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <img className="GlassEffect" src={GlassEffect} alt="GlassEffect" />
            <img className="GalssWall" src={GalssWall} alt="GalssWall" />
            {value > 0 ? <GraduationComponent value={value} /> : ""}
          </div>
        )}
        <div className="cupcell-container-control">
          {beerUnderModalFlag ? (
            <BeerUnderModal result={value * betNumberArr[bet]} />
          ) : (
            <>
              <img
                className="AddbeerImg"
                src={AddbeerImg}
                alt="AddbeerImg"
                onClick={
                  buttonsDisabled ? undefined : () => addBeerClick(id, value)
                }
                style={{
                  opacity: buttonsDisabled ? 0.5 : 1,
                  cursor: buttonsDisabled ? "not-allowed" : "pointer",
                }}
              />
              {value === 0 ? (
                <img
                  className="EndbeerImg"
                  src={EndbeerImg}
                  alt="EndbeerImg"
                  style={{ opacity: 0.5 }}
                />
              ) : (
                <img
                  className="EndbeerImg"
                  src={EndbeerImg}
                  alt="EndbeerImg"
                  onClick={
                    buttonsDisabled ? undefined : () => endBeerClick(id, value)
                  }
                  style={{
                    opacity: buttonsDisabled ? 0.5 : 1,
                    cursor: buttonsDisabled ? "not-allowed" : "pointer",
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThirdStateComponent;

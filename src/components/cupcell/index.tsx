import React, { useContext, memo } from "react";
import "./index.scss";
import { CheckFlagContext } from "../../context/checkflag";
import AnimatedCupCell from "../AnimatedCupCell";

import { CupCellPropsI } from "../../types";
import FirstStateComponent from "../first";
import ThirdStateComponent from "../third";
import FourthStateComponent from "../fourth";
import FifthStateComponent from "../fifth";
import ZeroStateComponent from "../zero";

const CupCell: React.FC<CupCellPropsI> = memo(
  ({
    activate,
    bet,
    balance,
    setTotalWin,
    setBalance,
    onLoseRound,
    onInsufficientBalance,
  }) => {
    const { checkFlag } = useContext(CheckFlagContext)!;

    const renderStateComponent = () => {
      if (activate.state === "first" && !checkFlag) {
        return <FirstStateComponent id={activate.id} />;
      } else if (activate.state === "second") {
        return (
          <ThirdStateComponent
            id={activate.id}
            value={activate.value}
            balance={balance}
            bet={bet}
            checkAddBeer={activate.checkAddBeer}
            setTotalWin={setTotalWin}
            setBalance={setBalance}
            onLoseRound={onLoseRound}
            onInsufficientBalance={onInsufficientBalance}
          />
        );
      } else if (activate.state === "third") {
        return (
          <ThirdStateComponent
            id={activate.id}
            value={activate.value}
            balance={balance}
            bet={bet}
            checkAddBeer={activate.checkAddBeer}
            setTotalWin={setTotalWin}
            setBalance={setBalance}
            onLoseRound={onLoseRound}
            onInsufficientBalance={onInsufficientBalance}
          />
        );
      } else if (activate.state === "fourth") {
        return <FourthStateComponent />;
      } else if (activate.state === "fifth") {
        return <FifthStateComponent value={activate.value} bet={bet} />;
      } else {
        return <ZeroStateComponent />;
      }
    };

    return (
      <div className="cupcell-container">
        <AnimatedCupCell state={activate.state} isActive={activate.flag}>
          {renderStateComponent()}
        </AnimatedCupCell>
      </div>
    );
  }
);

CupCell.displayName = "CupCell";

export default CupCell;

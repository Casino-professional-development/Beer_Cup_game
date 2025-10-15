import React, { useState, useContext, useMemo, useCallback } from "react";
import "./index.scss";
import "./bet-buttons.scss";
import "./transitions.scss";
import CupCell from "../cupcell";
import ContentList from "../contentList";
import WinModal from "../WinModal";
import InsufficientModal from "../modals/InsufficientModal/index";
import NoWinToast from "../NoWinToast";
import headerImg from "../../image/header.png";
import endtotoalbeerImg from "../../image/endbeer1.png";
import { BeerContext } from "../../context/beer";
import { CheckFlagContext } from "../../context/checkflag";
import { useUser } from "../../context/user";
import { BeerI } from "../../types";
import { GAME_CONFIG, INITIAL_BEERS } from "../../config/constants";
import { validateBetAmount } from "../../utils/validation";
import BetControlModal from "../betModal";

const ContentComponents: React.FC = () => {
  const [bet, setBet] = useState<number>(11);
  const [win] = useState<number>(0);
  const [totalWin, setTotalWin] = useState<number>(0);
  const [showWinModal, setShowWinModal] = useState<boolean>(false);
  const [betModal, setBetModal] = useState<boolean>(false);
  const [modalWinAmount, setModalWinAmount] = useState<number>(0);
  const [showNoWin, setShowNoWin] = useState<boolean>(false);
  const [showInsufficient, setShowInsufficient] = useState<boolean>(false);
  const { beers, setBeers } = useContext(BeerContext)!;
  const betNumberArr = [
    1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 75, 100, 200, 300, 400, 500, 750, 1000,
    2000, 3000, 4000, 5000, 7500, 10000, 20000, 30000, 40000, 50000, 75000,
    100000,
  ];

  const {
    allBeerValue,
    beerCheck,
    checkFlag,
    buttonsDisabled,
    setCheckFlag,
    setBeerFlag,
    setAllBeerValue,
  } = useContext(CheckFlagContext)!;
  const { userBalance, setUserBalance } = useUser();

  // Wrapper to match the expected setBalance type
  const handleSetBalance = React.useCallback(
    (value: React.SetStateAction<number>) => {
      if (typeof value === "function") {
        setUserBalance(value(userBalance));
      } else {
        setUserBalance(value);
      }
    },
    [setUserBalance, userBalance]
  );

  const loseRound = useCallback(() => {
    // Treat as immediate no-win: show toast and reset
    setShowNoWin(true);
    setTimeout(() => setShowNoWin(false), 2000);
    setCheckFlag(false);
    setBeerFlag(false);
    setAllBeerValue(0);
    setBeers(() => INITIAL_BEERS.map((b) => ({ ...b })));
  }, [setBeers, setCheckFlag, setBeerFlag, setAllBeerValue]);

  // Ensure middle mug is selected when appropriate and allow reselection
  const reselectionHandler = React.useCallback(() => {
    // Compute already collected winnings in this round (beers in fifth state)
    const alreadyCollectedTotal = beers
      .filter((b: BeerI) => b.state === "fifth" && (b.value ?? 0) > 0)
      .reduce(
        (sum: number, b: BeerI) => sum + (b.value || 0) * betNumberArr[bet],
        0
      );

    // Compute pending winnings (beers in third state - not yet collected)
    const pendingWinnings = beers
      .filter((b: BeerI) => b.state === "third" && (b.value ?? 0) > 0)
      .reduce(
        (sum: number, b: BeerI) => sum + (b.value || 0) * betNumberArr[bet],
        0
      );

    // Total winnings = already collected + pending
    const totalWinnings = alreadyCollectedTotal + pendingWinnings;

    // Check if there are any actual winning beers (not NO WIN cases)
    const hasWinningBeers = beers.some(
      (b: BeerI) =>
        (b.state === "fifth" || b.state === "third") && (b.value ?? 0) > 0
    );

    // Only show win modal if there are actual winning beers
    if (hasWinningBeers && totalWinnings > 0) {
      setModalWinAmount(totalWinnings);
      setShowWinModal(true);

      // Auto-dismiss modal after 3 seconds and reset game
      setTimeout(() => {
        setShowWinModal(false);
        // Reset check flags so user can select mugs again
        setCheckFlag(false);
        setBeerFlag(false);
        setAllBeerValue(0);
        // Restore beers to initial configuration so the middle mug is selected
        setBeers(() => INITIAL_BEERS.map((b) => ({ ...b })));
      }, 3000);
      // Count as win for this round (modal shows this amount)
      setTotalWin((prev) => prev + totalWinnings);
    } else if (alreadyCollectedTotal > 0) {
      // If there are no pending beers to collect but some were already collected,
      // show the win modal with that total as a win (do not re-add to balance)
      setModalWinAmount(alreadyCollectedTotal);
      setShowWinModal(true);

      setTimeout(() => {
        setShowWinModal(false);
        setCheckFlag(false);
        setBeerFlag(false);
        setAllBeerValue(0);
        setBeers(() => INITIAL_BEERS.map((b) => ({ ...b })));
      }, 3000);
      // Count collected beers as round win (modal shows this amount)
      setTotalWin((prev) => prev + alreadyCollectedTotal);
    } else {
      // If no winnings at all (including NO WIN cases), briefly show "NO WIN" toast and reset
      setShowNoWin(true);
      setTimeout(() => setShowNoWin(false), 2000);
      setCheckFlag(false);
      setBeerFlag(false);
      setAllBeerValue(0);
      setBeers(() => INITIAL_BEERS.map((b) => ({ ...b })));
    }
  }, [setBeers, setCheckFlag, setBeerFlag, setAllBeerValue, beers, bet]);

  // Collect all winnings and reset game
  const collectAllHandler = useCallback(() => {
    // Compute already collected winnings in this round (beers in fifth state)
    const alreadyCollectedTotal = beers
      .filter((b: BeerI) => b.state === "fifth" && (b.value ?? 0) > 0)
      .reduce(
        (sum: number, b: BeerI) => sum + (b.value || 0) * betNumberArr[bet],
        0
      );

    // Compute pending winnings (beers in third state - not yet collected)
    const pendingWinnings = beers
      .filter((b: BeerI) => b.state === "third" && (b.value ?? 0) > 0)
      .reduce(
        (sum: number, b: BeerI) => sum + (b.value || 0) * betNumberArr[bet],
        0
      );

    // Total winnings = already collected + pending
    const totalWinnings = alreadyCollectedTotal + pendingWinnings;

    // Check if there are any actual winning beers (not NO WIN cases)
    const hasWinningBeers = beers.some(
      (b: BeerI) =>
        (b.state === "fifth" || b.state === "third") && (b.value ?? 0) > 0
    );

    if (hasWinningBeers && totalWinnings > 0) {
      // Add winnings to balance
      setUserBalance(userBalance + totalWinnings);

      // Show win modal with collected amount
      setModalWinAmount(totalWinnings);
      setShowWinModal(true);

      // Auto-dismiss modal after 3 seconds and reset game
      setTimeout(() => {
        setShowWinModal(false);
        // Reset check flags so user can select mugs again
        setCheckFlag(false);
        setBeerFlag(false);
        setAllBeerValue(0);
        // Restore beers to initial configuration so the middle mug is selected
        setBeers(() => INITIAL_BEERS.map((b) => ({ ...b })));
      }, 3000);
      // Count as win for this round
      setTotalWin((prev) => prev + totalWinnings);
    } else {
      // If no actual winnings, show NO WIN toast
      setShowNoWin(true);
      setTimeout(() => setShowNoWin(false), 2000);
      setCheckFlag(false);
      setBeerFlag(false);
      setAllBeerValue(0);
      setBeers(() => INITIAL_BEERS.map((b) => ({ ...b })));
    }
  }, [
    bet,
    setUserBalance,
    setCheckFlag,
    setBeerFlag,
    setAllBeerValue,
    setBeers,
    beers,
    userBalance,
  ]);

  const addBetButtonClick = useCallback(
    (symbol: string) => {
      if (symbol === "+" && betNumberArr[bet + 1] < userBalance && bet < 30) {
        setBet(bet + 1);
      } else if (symbol === "-" && bet > 0) {
        setBet(bet - 1);
      } else {
        setBet(bet);
      }
    },
    [bet, userBalance]
  );

  // If there is no glass where Add Beer is available, behave like END ROUND automatically
  React.useEffect(() => {
    const hasAddBeerAvailable = beers.some(
      (b: BeerI) => b.state === "second" || b.state === "third"
    );
    if (!hasAddBeerAvailable) {
      reselectionHandler();
    }
  }, [beers, reselectionHandler]);

  const beerGlasses = useMemo(() => {
    return beers.map((value: BeerI) => (
      <CupCell
        key={value.id}
        activate={value}
        balance={userBalance}
        bet={bet}
        setTotalWin={setTotalWin}
        setBalance={handleSetBalance}
        onLoseRound={loseRound}
        onInsufficientBalance={() => setShowInsufficient(true)}
      />
    ));
  }, [beers, userBalance, bet, handleSetBalance, loseRound, setTotalWin]);

  return (
    <div className="contnet-components">
      <img className="headerImg" src={headerImg} alt="headerImg" />
      <div className="content-component">
        <ContentList />
        <div className="content-body">
          <div className="cups">
            <div
              className="cup-cells"
              role="group"
              aria-label="Beer glasses for betting"
            >
              {beerGlasses}
            </div>
          </div>
          <div className="content-bottom">
            <div className="content-bet">
              <div className="content-bet-sell">
                <div className="content-bet-control">
                  {checkFlag || buttonsDisabled ? (
                    <p
                      style={{ opacity: 0.4 }}
                      aria-label="Decrease bet (disabled)"
                    >
                      {" "}
                      -{" "}
                    </p>
                  ) : (
                    <button
                      onClick={() => addBetButtonClick("-")}
                      aria-label="Decrease bet"
                      className="bet-button"
                    >
                      -
                    </button>
                  )}
                  <p
                    aria-label={`Current bet amount: ${GAME_CONFIG.CURRENCY} ${bet}`}
                  >
                    {betNumberArr[bet]}
                  </p>
                  {checkFlag || buttonsDisabled ? (
                    <p
                      style={{ opacity: 0.4 }}
                      aria-label="Increase bet (disabled)"
                    >
                      {" "}
                      +{" "}
                    </p>
                  ) : (
                    <button
                      onClick={() => addBetButtonClick("+")}
                      aria-label="Increase bet"
                      className="bet-button"
                    >
                      +
                    </button>
                  )}
                </div>
                <p>BET</p>
              </div>
            </div>
            <div className="end-beer-control">
              {beerCheck && allBeerValue > 0 ? (
                <button
                  type="button"
                  className="collect-all-button"
                  aria-label="Collect all winnings"
                  onClick={buttonsDisabled ? undefined : collectAllHandler}
                  style={{
                    cursor: buttonsDisabled ? "not-allowed" : "pointer",
                    display: "inline-block",
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                    font: "inherit",
                    opacity: buttonsDisabled ? 0.5 : 1,
                  }}
                >
                  <p className="end-beer-control-p">COLLECT ALL</p>
                </button>
              ) : (
                // When collect isn't available show a clickable control to reselection
                <button
                  type="button"
                  className="end-beer-reset-button"
                  aria-label="Reselect mugs"
                  style={{
                    cursor: buttonsDisabled ? "not-allowed" : "pointer",
                    display: "inline-block",
                    background: "none",
                    border: "none",
                    padding: 0,
                    opacity: buttonsDisabled ? 0.5 : 1,
                  }}
                >
                  {/* Prefer showing the image when available, otherwise a text fallback */}
                  {!beerCheck ? (
                    <img
                      src={endtotoalbeerImg}
                      alt="endtotalbeerImg"
                      style={{ verticalAlign: "middle" }}
                      onClick={() => setBetModal(true)}
                    />
                  ) : (
                    <p
                      className="end-beer-control-p1"
                      onClick={buttonsDisabled ? undefined : reselectionHandler}
                    >
                      END ROUND
                    </p>
                  )}
                </button>
              )}
            </div>
            <div className="content-balance">
              <div className="content-balance-sell">
                <div className="content-balance-control">
                  <p
                    aria-label={`Current balance: ${GAME_CONFIG.CURRENCY} ${userBalance}`}
                  >
                    {GAME_CONFIG.CURRENCY} {userBalance}
                  </p>
                </div>
                <p>BALANCE</p>
              </div>
              {totalWin > 0 ? (
                <div className="content-balance-sell">
                  <div className="content-balance-control">
                    <p
                      aria-label={`Total winnings this session: ${GAME_CONFIG.CURRENCY} ${totalWin}`}
                    >
                      {GAME_CONFIG.CURRENCY} {totalWin}
                    </p>
                  </div>
                  <p>TOTAL WIN</p>
                </div>
              ) : null}
              {win <= 0 ? (
                ""
              ) : (
                <div className="content-balance-sell">
                  <div className="content-balance-control">
                    <p
                      aria-label={`Current winnings: ${GAME_CONFIG.CURRENCY} ${win}`}
                    >
                      {GAME_CONFIG.CURRENCY} {win}
                    </p>
                  </div>
                  <p>WIN</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <WinModal isVisible={showWinModal} winAmount={modalWinAmount} />
      <InsufficientModal
        isVisible={showInsufficient}
        onClose={() => setShowInsufficient(false)}
      />
      <NoWinToast isVisible={showNoWin} />
      <BetControlModal
        bet={bet}
        balance={userBalance}
        setBet={setBet}
        betModal={betModal}
        setBetModal={setBetModal}
      />
    </div>
  );
};

export default ContentComponents;

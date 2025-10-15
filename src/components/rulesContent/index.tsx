import React, { useState, useEffect } from "react";
import "./index.scss";
import { GAME_CONFIG } from "../../config/constants";
import play from "../../image/addbeer.png";
import colleect from "../../image/endbeer.png";
import bet from "../../image/bet.png";
import balance from "../../image/balance.png";
import win from "../../image/win.png";
import sidebar from "../../image/list.png";
import paytable from "../../image/paytable.png";
import settings from "../../image/setting.png";
import hash from "../../image/save.png";
import rules from "../../image/rules.png";

interface PropsI {
  listComponentsFlag: string;
}

const RulesContent = ({
  listComponentsFlag,
}: PropsI) => {
  const [time, setTime] = useState(new Date());
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, GAME_CONFIG.CLOCK_UPDATE_INTERVAL);

    return () => {
      clearInterval(timerId);
    };
  }, []);
  return (
    <div
      className="rulesContent"
      style={
        listComponentsFlag === "rules"
          ? { height: "100%" }
          : { height: "0%" }
      }
    >
      <div className="rulesContent-top">
        <div className="top-left">
          <h6>Rules</h6>
          <p>October Pub (RTP 96.00%)</p>
        </div>
        <div className="top-right">
          <p>
            {formattedHours}:{formattedMinutes}
          </p>
        </div>
      </div>
      <div className="content">
        <h1>GAME DESCRIPTION</h1>
        <div className="content-cell">
          <h6>Welcome to "October Pub" game!</h6>
          <p>
            Step into the enchanting world of the October Beer Festival - a
            jubilant celebration where the golden nectar flows like a river of
            dreams and the air carries the intoxicating aroma of hops and
            barley. Enter a realm where merriment knows no bounds and
            camaraderie sparkles as effervescently as the finest brews.
          </p>
          <p>
            Our October Pub welcomes you with lively chatter, animated
            conversations, laughter harmonizing with glass clinks, and a hum of
            camaraderie. It's a masterpiece, polished wood adorned with taps
            ready to bring forth liquid magic.
          </p>
          <p>
            In this intimate setting, the true festival essence thrives. You are
            the master of your beer destiny. Five empty glasses await your
            touch. With anticipation, you approach the taps - a symphony of
            options, each promising a unique journey for your taste buds.
          </p>
          <p>
            As each glass fills, you connect with the brewing process, a touch
            of alchemy turning simple ingredients into complex elixirs. Pouring
            becomes a ritual, a celebration of choice and a journey of taste.
          </p>
          <p>
            Amidst the bustling bar scene, you find your rhythm - exploring
            flavors, sharing stories, and perhaps engaging in friendly debates
            about brew merits. As the evening deepens, camaraderie's warm glow
            fills the space, turning strangers into friends and each sip into
            shared memory.
          </p>
          <p>
            Step into the October Pub, not just a patron, but a brewmaster of
            your experience. Here, the festival's spirit lives on, bee flowing
            with endless possibilities.
          </p>
          <h6>How to play?</h6>
          <p>
            Once you enter the game, you'll see an empty beer glass and
            placeholders with a plus sign on the bar counter. You can start
            pouring beer into the default center glass or activate more empty
            glasses by clicking on the plus sign placeholder. A total of 5
            glasses are involved in the round.
          </p>
          <p>
            To start the game, select a glass and place a bet using the panel at
            the bottom of the screen.
          </p>
          <p>
            Once the bet is placed, you can pour beer into the chosen glass. If
            the beer fills the glass up to the multiplier mark, you win.
          </p>
          <p>You can collect your winnings by clicking the "Collect" button.</p>
          <p>
            Alternatively, you can continue the game to potentially achieve a
            larger payout.
          </p>
          <p>
            If during pouring the beer runs out and the glass isn't filled up to
            the mark, you lose, and your entire accumulated bonus will be
            forfeited.
          </p>
          <p>
            You can switch between glasses at any moment, or choose to Collect
            your winnings. Each glass functions independently of the others and
            has its unique Collect functionality.
          </p>
        </div>
        <h1>GAMEPLAY</h1>
        <div className="content-cell1">
          <div className="content-cell1-cell">
            <div className="cell">
              <div className="left">
                <img src={play} alt="play" />
              </div>
              <div className="cell-right">
                <h6>Play</h6>
                <p>Click on this button and the game will start.</p>
              </div>
            </div>
            <div className="cell">
              <div className="left">
                <img src={bet} alt="bet" />
              </div>
              <div className="cell-right">
                <h6>Bet</h6>
                <p>
                  Displays the amount of the bet. Click Bet to open a Bet
                  settings menu. By clicking the Bet settings (coins+gear)
                  button you can open the bet settings interface, and set your
                  bet value.
                </p>
              </div>
            </div>
            <div className="cell">
              <div className="left">
                <img src={win} alt="Win" />
              </div>
              <div className="cell-right">
                <h6>Win</h6>
                <p>
                  Displays the win for the current round or the last win payout
                  step
                </p>
              </div>
            </div>
            <div className="cell">
              <div className="left">
                <img src={paytable} alt="paytable" />
              </div>
              <div className="cell-right">
                <h6>Paytable</h6>
                <p>
                  Displays all coefficients for each symbol combination,
                  description of the game features and all information about the
                  paylines. Click Info button to open Paytable.
                </p>
              </div>
            </div>
            <div className="cell">
              <div className="left">
                <img src={hash} alt="hash" />
              </div>
              <div className="cell-right">
                <h6>Hash</h6>
                <p>
                  By clicking on the Hash button, you will copy the hash of the
                  game round.
                </p>
              </div>
            </div>
          </div>

          <div className="content-cell1-cell">
            <div className="cell">
              <div className="left">
                <img src={colleect} alt="colleect" />
              </div>
              <div className="cell-right">
                <h6>Colleect</h6>
                <p>
                  Click on the Collect button to take your current winnings.
                </p>
              </div>
            </div>
            <div className="cell">
              <div className="left">
                <img src={balance} alt="balance" />
              </div>
              <div className="cell-right">
                <h6>Balance</h6>
                <p>Displays your account balance.</p>
              </div>
            </div>
            <div className="cell">
              <div className="left">
                <img src={sidebar} alt="sidebar" />
              </div>
              <div className="cell-right">
                <h6>Sidebar</h6>
                <p>
                  By clicking on the Sidebar (Burger button), you will open the
                  options panel, where you can quickly turn on / off the sound,
                  enter / exit full-screen mode. Also on the options panel are
                  buttons: rules, history and settings.
                </p>
              </div>
            </div>
            <div className="cell">
              <div className="left">
                <img src={settings} alt="settings" />
              </div>
              <div className="cell-right">
                <h6>Settings</h6>
                <p>
                  By clicking on the Settings button, you can open the interface
                  with the game parameters and change the sound settings.
                </p>
              </div>
            </div>
            <div className="cell">
              <div className="left">
                <img src={rules} alt="rules" />
              </div>
              <div className="cell-right">
                <h6>Rules</h6>
                <p>Displays full description of the game rules and features.</p>
              </div>
            </div>
          </div>
        </div>
        <h1>HOW TO CHECK PROVABLY FAIR?</h1>
        <div className="content-cell">
          <p>
            You can check provably fair at any moment by using any kind of
            SHA-256 hash generator. In order to do this follow these steps:
          </p>
          <p>
            1. Open the window with round information in the "History" block.
          </p>
          <p>
            2. Copy the information from the "Validation string" field, and
            paste in the "Data" field on the website of any hash generator.
          </p>
          <p>
            3. Click "Generate" button and then you will see a hash code that
            will match with hash of your round.
          </p>
        </div>
        <h1>RANDOMIZATION</h1>
        <div className="content-cell">
          <p>
            The outcome of the round is random and equally likely for all
            positions. A random number generator is used to determine positions.
            For more information, visit http://evoplay.games/RNG.Displays full
            description of the game rules and features.
          </p>
        </div>
        <h1>RETURN TO PLAYER</h1>
        <div className="content-cell">
          <p>The overall theoretical return to player is 96.00%.</p>
          <p>
            The RTP reflects the theoretical return across a very large number
            of plays over an extended period of time, and represents the
            long-term expected payback of the game which has been calculated by
            an independent testing company, in accordance with the required
            regulations.
          </p>
          <p>
            The outcome of any play during the game is pre-determined. Player
            choices do not affect the outcome of the game unless indicated
          </p>
          <p>Malfunction voids all pays and plays.</p>
        </div>

        <h1>ADDITIONAL INFORMATION</h1>
        <div className="content-cell">
          <p>Malfunction voids all pays and plays.</p>
          <p>Game rules dated 08.29.2023.</p>
          <p>
            The probability of obtaining the max win is lower than 1 in 100
            million rounds.
          </p>
          <p className="maxminbet">Min bet: DEM 1.00</p>
          <p className="maxminbet">Max bet: DEM 30,000.00</p>
          <p>Game version 0.47.0.</p>
        </div>
      </div>
    </div>
  );
};

export default RulesContent;

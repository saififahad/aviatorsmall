import React, { useRef } from "react";
import CanvasAnimation from "./Canvas";
import { useBetContext } from "./ContextAndHooks/BetContext";
import "./New.css";
const StageBoard = () => {
  const stateRef = useRef(null);
  const { state } = useBetContext();
  const { planeCrashed, gameStarted, planeValue } = state;
  return (
    <div className="stage-board" ref={stateRef} style={{ minHeight: "100vh" }}>
      <div className="counter-num text-center" id="auto_increment_number_div">
        {planeCrashed && (
          <div
            className="secondary-font f-40 flew_away_section mb-2"
            style={{ fontWeight: "bold", fontFamily: "sans-serif" }}
          >
            EMPTY FUEL!
          </div>
        )}
        {gameStarted && (
          <>
            <div
              id="auto_increment_number"
              className={`${planeCrashed ? "text-danger" : "text-cyan"}`}
            >
              {planeValue}
              <span>X</span>
            </div>
          </>
        )}
      </div>
      <img
        src="images/bg-rotate-old.svg"
        className="rotateimage"
        style={{ minHeight: "100vh" }}
      />
      <CanvasAnimation stateRef={stateRef} />
    </div>
  );
};

export default StageBoard;

import { memo, useCallback, useState, useEffect } from "react";
import { postData } from "./api/ClientFunction";
import { useBetContext } from "./ContextAndHooks/BetContext";
import { toast } from "react-toastify";
import { useAuth } from "./ContextAndHooks/AuthContext";
import { useSocket } from "./ContextAndHooks/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
export default function BetButtons({ id }) {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const { user } = useAuth();
  const phone = user?.phone;
  const [betId1, setBetId1] = useState(() => {
    const storedBetId1 = localStorage.getItem("betId1");
    return storedBetId1 ? parseInt(storedBetId1, 10) : 0;
  });
  const [betId2, setBetId2] = useState(() => {
    const storedBetId2 = localStorage.getItem("betId2");
    return storedBetId2 ? parseInt(storedBetId2, 10) : 0;
  });
  //0 normal bet and 1 for auto bet
  const [betType, setBetType] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cashDecrease, setCashDecrease] = useState(0);
  const [cashIncrease, setCashIncrease] = useState(0);
  const [autoCashOut, setAutoCashOut] = useState(false);
  const [rounds, setRounds] = useState(10);
  const [activeRound, setActiveRound] = useState(0);
  const [autoCashOutValue, setAutoCashOutValue] = useState(1);
  const { state, dispatch } = useBetContext();
  //
  /// ===== plane number listen =====

  const {
    extraBetAmount1,
    extraBetAmount2,
    gameStarted,
    withdrawn1,
    planeValue,
    withdrawn2,
    isBet1,
    isBet2,
  } = state;
  function handleAutoCashOutValue(id) {
    if (id === 1) {
      dispatch({ type: "cashOut1", payload: autoCashOutValue });
    } else {
      dispatch({ type: "cashOut2", payload: autoCashOutValue });
    }
  }

  const autoCashOutHandler = (e, id) => {
    setAutoCashOut(!autoCashOut);
  };
  useEffect(() => {
    if (id === 1) {
      dispatch({ type: "autoCashOut1", payload: autoCashOut });
    } else {
      dispatch({ type: "autoCashOut2", payload: autoCashOut });
    }
  }, [autoCashOut]);

  const handleDecreaseChange = (value) => {
    setCashDecrease(value);
  };
  const handleIncreaseChange = (value) => {
    // You can add validation or other logic here if needed
    setCashIncrease(value);
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function handleStart(e, id) {
    e.preventDefault();
    if (id === 1) {
      dispatch({ type: "rounds1", payload: rounds });
      dispatch({ type: "cashDecrease1", payload: cashDecrease });
      dispatch({ type: "cashIncrease1", payload: cashIncrease });
    } else {
      dispatch({ type: "rounds2", payload: rounds });
      dispatch({ type: "cashDecrease2", payload: cashDecrease });
      dispatch({ type: "cashIncrease2", payload: cashIncrease });
    }
    closeModal();
  }

  async function handleBet(id) {
    if (gameStarted) {
      toast.error("Game has already started...");
      return;
    }
    if (!autoCashOut) {
      const extraBetAmount = id === 1 ? extraBetAmount1 : extraBetAmount2;
      const isBetPlaced = id === 1 ? isBet1 : isBet2;
      if (user?.money >= extraBetAmount && !isBetPlaced) {
        const data = { phone, betAmount: extraBetAmount };
        const res = await postData("/bet/place", data);
        if (res.error) {
          toast.error("You Account Has Been blocked, you can't place bet!..");
        }
        if (res.status) {
          queryClient.invalidateQueries("userData");
          dispatch({ type: id === 1 ? "isBet1" : "isBet2", payload: true });
          id === 1 ? setBetId1(res.betId) : setBetId2(res.betId);
          if (id === 1) {
            localStorage.setItem("betId1", res.betId);
          } else {
            localStorage.setItem("betId2", res.betId);
          }
          if (socket) {
            socket.emit("betPlaced", 1);
          }
          toast.success("Bet Placed!...");
        }
      } else {
        toast.error("Insufficient Funds!...");
      }
    }
  }

  const handleBetTypeChange = (type) => {
    setBetType(type);
  };

  const bet_amount_decremental = useCallback(
    (id) => {
      if (id === 1) {
        dispatch({ type: "decExtra1" });
      } else {
        dispatch({ type: "decExtra2" });
      }
    },
    [dispatch]
  );

  const bet_amount_incremental = useCallback(
    (id) => {
      if (id === 1) {
        dispatch({ type: "incExtra1" });
      } else {
        dispatch({ type: "incExtra2" });
      }
    },
    [dispatch]
  );

  const select_direct_bet_amount = useCallback(
    (amount, id) => {
      if (id === 1) {
        dispatch({ type: "incExtra1", payload: amount });
      } else {
        dispatch({ type: "incExtra2", payload: amount });
      }
    },
    [dispatch]
  );
  useEffect(() => {
    const withdrawalKey = `withdrawn${id}`;

    const performWithdrawal = async () => {
      if (autoCashOut) {
        if (!withdrawn1 || !withdrawn2) {
          const data = !withdrawn1
            ? { phone, multiplier: planeValue, betId: betId1 }
            : { phone, multiplier: planeValue, betId: betId2 };
          //(data);
          const res = await postData("/bet/withdraw", data);
          if (res.status) {
            queryClient.invalidateQueries("userData");
            if (socket) {
              socket.emit("withdrawCount", 1);
            }
            dispatch({ type: withdrawalKey, payload: true });
            toast.success(res.message);
            if (data.betId === betId1) {
              dispatch({ type: "withdrawn1", payload: true });
              dispatch({ type: "isBet1", payload: false });
            } else {
              dispatch({ type: "withdrawn2", payload: true });
              dispatch({ type: "isBet2", payload: false });
            }
          }
        } else {
          toast.error("Money already debited!...");
        }
      }
    };
    if (
      planeValue == Number(autoCashOutValue) &&
      gameStarted &&
      betType === 1 &&
      (isBet1 === true || isBet2 === true) &&
      Number(autoCashOutValue) >= 1.2
    )
      performWithdrawal(); // Call the async function
  }, [autoCashOut, betId1, betId2, id, phone, planeValue, gameStarted]);
  useEffect(() => {
    const extraBetAmount = id === 1 ? extraBetAmount1 : extraBetAmount2;
    async function PlaceBet() {
      if (autoCashOut) {
        const isBetPlaced = id === 1 ? isBet1 : isBet2;

        if (user?.money > extraBetAmount && !isBetPlaced) {
          const data = { phone, betAmount: extraBetAmount };
          const res = await postData("/bet/place", data);
          if (res.error) {
            toast.error("You Account Has Been blocked, you can't place bet!..");
          }
          if (res.status) {
            queryClient.invalidateQueries("userData");
            dispatch({ type: id === 1 ? "isBet1" : "isBet2", payload: true });
            id === 1 ? setBetId1(res.betId) : setBetId2(res.betId);
            if (id === 1) {
              localStorage.setItem("betId1", res.betId);
            } else {
              localStorage.setItem("betId2", res.betId);
            }
            if (socket) {
              socket.emit("betPlaced", 1);
            }
            toast.success("Bet Placed!...");
          }
        }
      }
    }
    if (
      !gameStarted &&
      extraBetAmount < user?.money &&
      betType === 1 &&
      autoCashOut
    ) {
      PlaceBet();
    }
  }, [autoCashOut, user, gameStarted]);
  async function handleCashOut(id) {
    if (!gameStarted) {
      toast.error("game is not started yet!..");
      return; // Explicit return to prevent further execution
    }

    const withdrawalKey = `withdrawn${id}`;

    if (!withdrawn1 || !withdrawn2) {
      const data = !withdrawn1
        ? { phone, multiplier: planeValue, betId: betId1 }
        : { phone, multiplier: planeValue, betId: betId2 };
      let res;
      if (Number(planeValue) > 1.04) {
        res = await postData("/bet/withdraw", data);
      } else {
        return;
      }
      if (res.status) {
        queryClient.invalidateQueries("userData");
        if (socket) {
          socket.emit("withdrawCount", 1);
        }
        dispatch({ type: withdrawalKey, payload: true });
        toast.success(res.message);
        if (data.betId === betId1) {
          dispatch({ type: "withdrawn1", payload: true });
          dispatch({ type: "isBet1", payload: false });
        } else {
          dispatch({ type: "withdrawn2", payload: true });
          dispatch({ type: "isBet2", payload: false });
        }
      }
    } else {
      toast.error("Money already debited!...");
    }
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: "10000",
    },
  };
  return (
    <div className="bet-control double-bet" id="extra_bet_section">
      <div className="controls">
        <div className="navigation">
          <div className="navigation-switcher">
            <div
              className={`slider bet-btn ${betType === 0 ? "active" : ""}`}
              onClick={() => handleBetTypeChange(0)}
            >
              Bet
            </div>
            <div
              className={`slider auto-btn ${betType === 1 ? "active" : ""}`}
              onClick={() => handleBetTypeChange(1)}
            >
              Auto
            </div>
            <span className="active-line"></span>
          </div>
        </div>
        <div className="first-row auto-game-feature">
          <div className="bet-block">
            <div className="spinner">
              <div className="input">
                <input
                  id="bet_amount"
                  value={id === 1 ? extraBetAmount1 : extraBetAmount2}
                  className="extra_bet_amount"
                  disabled={autoCashOut}
                  onChange={(e) => {
                    // Remove non-numeric characters and validate as a number
                    const value = e.target.value.replace(/[^0-9.]/g, "");

                    // Check if the value is a valid number
                    const parsedValue = parseFloat(value);

                    // Update state only if the input is a valid number
                    if (!isNaN(parsedValue)) {
                      if (id === 1) {
                        dispatch({ type: "incExtra1", payload: parsedValue });
                      } else {
                        dispatch({ type: "incExtra2", payload: parsedValue });
                      }
                    } else {
                      if (id === 1) {
                        dispatch({ type: "incExtra1", payload: 10.0 });
                      } else {
                        dispatch({ type: "incExtra2", payload: 10.0 });
                      }
                    }
                  }}
                />
              </div>
              <div className="qty-buttons">
                <button
                  className="minus"
                  id="extra_minus_btn"
                  onClick={() => bet_amount_decremental(id)}
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <button
                  className="plus"
                  id="extra_plus_btn"
                  onClick={() => bet_amount_incremental(id)}
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
            <div className="bets-opt-list">
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(100, id)}
              >
                <span className="amt">100</span>
                <span className="currency">₹</span>
              </button>
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(200, id)}
              >
                <span className="amt">200</span>
                <span className="currency">₹</span>
              </button>
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(500, id)}
              >
                <span className="amt">500</span>
                <span className="currency">₹</span>
              </button>
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(1000, id)}
              >
                <span className="amt">1000</span>
                <span className="currency">₹</span>
              </button>
            </div>
          </div>
          {id === 1
            ? !isBet1 &&
              !gameStarted && (
                <div className="buttons-block" id="bet_button">
                  <button
                    className="btn btn-success bet font-family-title ng-star-inserted main_bet_btn"
                    id="extra_bet_now"
                    onClick={() => handleBet(id)}
                  >
                    <label className="font-family-title label">BET</label>
                  </button>
                </div>
              )
            : !isBet2 &&
              !gameStarted && (
                <div className="buttons-block" id="bet_button">
                  <button
                    className="btn btn-success bet font-family-title ng-star-inserted main_bet_btn"
                    id="extra_bet_now"
                    onClick={() => handleBet(id)}
                  >
                    <label className="font-family-title label">BET</label>
                  </button>
                </div>
              )}
          {id === 1
            ? gameStarted &&
              !isBet1 && (
                <div className="buttons-block" id="cancle_button">
                  <div
                    className="btn-tooltip f-14 mb-1"
                    id="waiting"
                    // style={{ display: "none" }}
                  >
                    Waiting for next round
                  </div>
                  <button
                    className="btn btn-danger bet font-family-title height-70 ng-star-inserted main_bet_btn"
                    id="extra_cancel_now"
                  >
                    <label className="font-family-title label">
                      Waiting For Next Round
                    </label>
                  </button>
                </div>
              )
            : gameStarted &&
              !isBet2 && (
                <div className="buttons-block" id="cancle_button">
                  <div className="btn-tooltip f-14 mb-1" id="waiting">
                    Waiting for next round
                  </div>
                  <button
                    className="btn btn-danger bet font-family-title height-70 ng-star-inserted main_bet_btn"
                    id="extra_cancel_now"
                    // onClick={() => cancle_now(id)}
                  >
                    <label className="font-family-title label">
                      Waiting For Next Round
                    </label>
                  </button>
                </div>
              )}
          {id === 1
            ? isBet1 &&
              !withdrawn1 && (
                <div className="buttons-block" id="cashout_button">
                  <button
                    className="btn btn-warning bet font-family-title ng-star-inserted"
                    onClick={() => handleCashOut(id)}
                    disabled={autoCashOut}
                  >
                    <label className="font-family-title label">CASH OUT</label>
                    <div
                      className="font-family-title label"
                      id="cash_out_amount"
                    ></div>
                  </button>
                </div>
              )
            : isBet2 &&
              !withdrawn2 && (
                <div className="buttons-block" id="cashout_button">
                  <button
                    className="btn btn-warning bet font-family-title ng-star-inserted"
                    onClick={() => handleCashOut(id)}
                    disabled={autoCashOut}
                  >
                    <label className="font-family-title label">CASH OUT</label>
                    <div
                      className="font-family-title label"
                      id="cash_out_amount"
                    ></div>
                  </button>
                </div>
              )}
        </div>
        <div className={`text-white ${betType == 0 ? "second-row" : ""}`}>
          <div style={{ display: "flex", gap: "24px" }}>
            <div className=" text-white form-check form-switch lg-switch d-flex align-items-center">
              <label className="form-check-label f-12 me-1" htmlFor="cashout">
                Auto Cash Out
              </label>

              <input
                className="form-check-input m-0"
                type="checkbox"
                role="cashout"
                id="main_checkout"
                onChange={(e) => autoCashOutHandler(e, id)}
                checked={autoCashOut}
              />
            </div>
            <div
              className="spinner small"
              style={{ maxWidth: "100px", height: "24px" }}
            >
              <div className="input full-width">
                <input
                  className="f-16 font-weight-bold"
                  type="Number"
                  id="main_incrementor"
                  required={autoCashOut}
                  value={autoCashOutValue}
                  disabled={!autoCashOut}
                  min={1}
                  onChange={(e) => {
                    setAutoCashOutValue(e.target.value);
                  }}
                />
                <div className="text text-x">
                  <span className="material-symbols-outlined">close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { useBetContext } from "../ContextAndHooks/BetContext";
import StageBoard from "./../StageBoard";
import { useLocation } from "react-router-dom";
import PreLoader from "../Preloader";
import { useSocket } from "../ContextAndHooks/SocketContext";
import Canvas from "../Canvas";
export default function Dashboard() {
  const location = useLocation();
  const socket = useSocket();
  const { state, dispatch } = useBetContext();
  const { gameStarted } = state;
  useEffect(() => {
    if (socket) {
      const handlePlaneCounter = (value) => {
        if (value !== 0) {
          dispatch({ type: "planeValue", payload: value });
        } else {
          dispatch({ type: "planeCrashed", payload: true });
        }
      };
      const handleGameStarted = (boolean) => {
        if (boolean === true) {
          dispatch({ type: "gameStarted", payload: true });
        } else {
          dispatch({ type: "planeCrashed", payload: true });
        }
      };
      socket.on("planeCounter", handlePlaneCounter);
      socket.on("gameStarted", handleGameStarted);
      return () => {
        socket.off("planeCounter", handlePlaneCounter);
        socket.off("gameStarted", handleGameStarted);
      };
    }
  }, [socket, dispatch]);

  useEffect(() => {
    const disableBackButton = () => {
      if (location.pathname === "/") {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
          window.history.go(1);
        };
      } else {
        window.onpopstate = null;
      }
    };
    disableBackButton();
    return () => {
      window.onpopstate = null;
    };
  }, [location]);

  return (
    <div
      className="dark-bg-main overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="main-container">
        <div className="right-sidebar">
          <div
            className="game-play"
            style={{ minHeight: "100vh", minWidth: "100vw" }}
          >
            {gameStarted ? <Canvas /> : <PreLoader />}
          </div>
        </div>
      </div>
    </div>
  );
}

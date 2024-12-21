import React, { useEffect, useState } from "react";
import { useSocket } from "./ContextAndHooks/SocketContext";
import "./New.css";
const HistoryTop = () => {
  const socket = useSocket();
  const [history, setHistory] = useState([]);
  const [ndata, setndata] = useState([]);
  useEffect(() => {
    if (history) {
      setndata(history.reverse());
    }
  }, [history]);
  useEffect(() => {
    if (socket) {
      socket.on("lastCrashed", (data) => {
        setHistory(data);
      });
    }
  }, [socket, history]);

  return (
    <div className="history-top  " >
      <div className="stats">
        <div className="payouts-wrapper " style={{height:"96px"}}>
          <div
            className="payouts-block container"
            style={{ overflowX: "scroll", direction: "ltr" }}
          >
            {ndata &&
              ndata.map((item, index) => (
                <div
                  key={index}
                  className={`bg1 custom-badge text-white ${
                    item > 2 ? "bg-warning" : "bg-danger"
                  }`}
                >
                  {item}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTop;

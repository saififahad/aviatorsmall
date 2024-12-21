import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetchData } from "./api/ClientFunction";
import { useAuth } from "./ContextAndHooks/AuthContext";
const LeftSidebar = () => {
  const { user } = useAuth();
  const [betType, setBetType] = useState(0);
  const [userBet, setUserBet] = useState([]);
  const [allBet, setAllBet] = useState([]);

  function generateRandomBets(count) {
    const bets = [];

    // Function to generate a random phone number
    function generateRandomPhoneNumber() {
      const prefix = "600";
      const randomNumber = Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, "0");
      return prefix + randomNumber;
    }

    // Function to generate a random date within a range
    function generateRandomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    }

    for (let i = 1; i <= count; i++) {
      const id = i.toString();
      const phone = generateRandomPhoneNumber();
      // Generate betAmount rounded to nearest 10 between 50 and 250
      const betAmount = Math.round((Math.random() * 200 + 50) / 10) * 10;

      const betTime = generateRandomDate(new Date(2022, 0, 1), new Date()); // Random date between January 1, 2022, and today

      // Generate withdrawTime only 50% of the time
      const withdrawTime =
        Math.random() < 0.5 ? generateRandomDate(betTime, new Date()) : null;

      // Calculate withdrawAmount such that it is greater than betAmount and rounded to nearest 10
      const withdrawAmount = withdrawTime
        ? Math.round((betAmount + Math.random() * 150 + 10) / 10) * 10
        : 0;

      // Calculate a multiplier, assuming you need to introduce logic for it to be greater than 0 when withdrawAmount is greater than 0
      const multiplier =
        withdrawAmount > 0 ? (withdrawAmount / betAmount).toFixed(2) : 0;

      bets.push({
        id: id,
        phone: phone,
        betAmount: betAmount,
        withdrawAmount: withdrawAmount,
        multiplier: multiplier,
        betTime: betTime.toISOString(),
        withdrawTime: withdrawTime ? withdrawTime.toISOString() : null,
      });
    }

    return bets;
  }

  // Generate 25 random bets
  const fakeBet = generateRandomBets(20);
  const handleBetTypeChange = (type) => {
    setBetType(type);
  };
  const { data, error, mutate } = useSWR(
    `/user/getmybets?phone=${user?.phone}`,
    fetchData,
    {
      refreshInterval: 20000, // Set the refresh interval to 20 seconds
    }
  );
  const { data: allbetData } = useSWR(`/user/getallbets`, fetchData, {
    refreshInterval: 5000,
  });
  useEffect(() => {
    if (data && data.data) {
      setUserBet(data.data);
    }
  }, [data]);
  useEffect(() => {
    if (allbetData) {
      setAllBet([...allbetData.data, ...fakeBet]);
    }
  }, [allbetData]);

  function formatDate(inputDate) {
    const optionsDate = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const optionsTime = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };

    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      optionsDate
    );
    const formattedTime = new Date(inputDate).toLocaleTimeString(
      "en-US",
      optionsTime
    );

    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div className="left-sidebar">
      <div className="tabs-navs">
        <div className="navigation">
          <div className="navigation-switcher">
            <div
              className={`slider  bet-btn ${betType === 0 ? "active" : ""}`}
              onClick={() => handleBetTypeChange(0)}
            >
              All Bets
            </div>
            <div
              className={`slider auto-btn ${betType === 1 ? "active" : ""}`}
              onClick={() => handleBetTypeChange(1)}
            >
              My Bets
            </div>
            <span className="active-line"></span>
          </div>
        </div>
      </div>
      <div className="contents-blocks">
        <div>
          {/* left All Bets Code.... */}
          {betType === 0 && (
            <div style={{ overflowY: "scroll" }}>
              <div className="list-data-tbl mt-2">
                <div className="list-header">
                  <div className="column-1">Phone</div>
                  <div className="column-2">Bet</div>
                  <div className="column-3">Mult.</div>
                  <div className="column-4">Cash out</div>
                  <div className="ps-2"></div>
                </div>
                <div className="list-body scroll-div list-body1">
                  {allBet.map((item, index) => (
                    <div className="list-items" key={index}>
                      <div className="column-1 users fw-normal">
                        {item?.phone}
                      </div>
                      <div className="column-2">
                        <button className="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
                          {item?.betAmount}₹
                        </button>
                      </div>
                      <div className="column-3">
                        <div className="bg3 custom-badge mx-auto">
                          {item?.multiplier}x
                        </div>
                      </div>
                      <div className="column-2">
                        <button className="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
                          {item?.withdrawAmount || 0}₹
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* right My Bets Code.... */}
          {betType === 1 && (
            <div style={{ overflowY: "scroll" }}>
              <div className="list-data-tbl mt-2">
                <div className="list-header">
                  <div className="column-1">Date</div>
                  <div className="column-2">Bet</div>
                  <div className="column-3">Mult.</div>
                  <div className="column-4">Cash out</div>
                  <div className="ps-2"></div>
                </div>
                <div className="list-body scroll-div list-body1">
                  {userBet.map((item, index) => (
                    <div className="list-items" key={index}>
                      <div className="column-1 users fw-normal">
                        {formatDate(item?.betTime)}
                      </div>
                      <div className="column-2">
                        <button className="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
                          {item?.betAmount}₹
                        </button>
                      </div>
                      <div className="column-3">
                        <div className="bg3 custom-badge mx-auto">
                          {item?.multiplier}x
                        </div>
                      </div>
                      <div className="column-2">
                        <button className="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
                          {item?.withdrawAmount || 0}₹
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

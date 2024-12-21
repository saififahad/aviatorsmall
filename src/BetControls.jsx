import BetButtons from "./BetButtons";

const BetControls = () => {
  return (
    <div className="bet-controls">
      <BetButtons id={1} />
      <BetButtons id={2} />
    </div>
  );
};

export default BetControls;

import React from "react";
import "./index.scss";

interface propsI {
  result: string | number;
}

const BeerUnderModal = ({ result }: propsI) => {
  return (
    <div className="beer-modal-container">
      {result === "NO WIN" ? (
        <p className="nowinP">{result}</p>
      ) : (
        <p className="windP">WIN: {result}</p>
      )}
    </div>
  );
};

export default BeerUnderModal;

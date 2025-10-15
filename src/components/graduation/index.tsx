import React from "react";
import "./index.scss";
import line from "../../image/line.png";

interface propsI {
  value: number;
}

const GraduationComponent = ({ value }: propsI) => {
  const numbers = [100, 30, 12, 5, 2];
  const num = numbers.indexOf(value);

  return (
    <div className="graduation">
      {numbers.map((item, index) => {
        return (
          <React.Fragment key={item}>
            {index <= num ? (
              <div className="graduation-cell" key={`cell-${item}`}>
                <div className="graduation-line">
                  <img src={line} alt="line" className={"line" + index} />
                </div>
                <div className="graduation-num">
                  {index < num - 1 ? (
                    <p key={`num-${item}`}>x{item}</p>
                  ) : index === num - 1 ? (
                    <p
                      style={{ color: "#47a700", textShadow: "0 0 10 #47a700" }}
                    >
                      x{item}
                    </p>
                  ) : index === num ? (
                    <p
                      style={{ color: "#c76117", textShadow: "0 0 10 #c76117" }}
                    >
                      x{item}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default GraduationComponent;

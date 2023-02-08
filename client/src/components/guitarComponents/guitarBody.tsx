import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import "../../styling/guitar.css";

interface FPROPS {
  currFrets: number[];
}

export const GuitarBody: React.FC<FPROPS> = ({ currFrets }) => {
  return (
    <div className="guitar-body-container">
      <div className="guitar-body">
        <div className="body-strings">
          <div className="body-string" id="body-string-5"></div>
          <div className="body-string" id="body-string-4"></div>
          <div className="body-string" id="body-string-3"></div>
          <div className="body-string" id="body-string-2"></div>
          <div className="body-string" id="body-string-1"></div>
          <div className="body-string" id="body-string-0"></div>
        </div>
      </div>
      {currFrets}
    </div>
  );
};

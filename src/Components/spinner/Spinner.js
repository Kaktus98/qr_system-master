import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="flex justify-content-center p-4 m-4">
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
      <span className="flex align-items-center ml-4">Prosím čakajte</span>
    </div>
  );
};

export default Spinner;

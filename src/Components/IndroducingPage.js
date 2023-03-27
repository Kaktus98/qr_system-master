import React, { useState } from "react";
//import Header from "./header/Header";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner/Spinner";

const IndroducingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    navigate("/login");
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="flex flex-column justify-content-center align-items-center mt-8 lg:flex-row lg:mr-4 lg:ml-4">
        <div className="w-10 lg:m-4">
          <button
            className="w-full h-7rem"
            type="button"
            onClick={handleClick}
            style={{
              fontSize: "1.5rem",
            }}
          >
            Povinná evidencia dochádzky
          </button>
        </div>

        <div className="w-10 lg:m-4">
          <button
            className="w-full h-7rem mt-3 lg:mt-0"
            type="button"
            style={{
              fontSize: "1.5rem",
            }}
          >
            Nepovinná evidencia dochádzky
          </button>
        </div>
      </div>
    );
  }
};

export default IndroducingPage;

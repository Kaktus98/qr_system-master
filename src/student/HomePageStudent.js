import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/spinner/Spinner";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    navigate("/studentOverview");

  };

  const handleClickScanner = () => {
    setIsLoading(true);
    navigate("/scanningQrCode");

  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="flex flex-column justify-content-center align-items-center mt-8 lg:flex-row lg:mr-4 lg:ml-4">
        <div className="w-10 lg:m-4">
          <button
            onClick={handleClickScanner}
            className="w-full h-7rem"
            style={{ fontSize: "2rem" }}
          >
            Naskenuj QR
          </button>
        </div>

        <div className="w-10 lg:m-4">
          <button
            className="w-full h-7rem mt-3 lg:mt-0"
            type="button"
            onClick={handleClick}
            style={{ fontSize: "2rem" }}
          >
            Prehľad
          </button>
        </div>
      </div>
    );
  }
};

export default HomePage;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

const QrCodePage = () => {
  const [code, setUuidCode] = useState("");
  const { state } = useLocation();
  const { id_predmet } = state; //useLocation uklada objekt z celej routy, ktorý obsahuje vsetky atributy od id_predmetu

  useEffect(() => {
    fetch(`http://localhost:8080/generate?id_predmet=${id_predmet}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve codeData");
        }
        return r.text();
      })
      .then((uuidCode) => {
        setUuidCode(uuidCode); // Vypíše novú hodnotu UUID
      })
      .catch((e) => console.error(e));
  }, [id_predmet]);


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <QRCode value={code} size={412} />
    </div>
  );
};

export default QrCodePage;

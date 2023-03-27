import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScanningPage = () => {
  const [showScanner, setShowScanner] = useState(true);
  const id_student = useSelector((state) => state.id);
  const [uuidCode, setData] = useState(null);
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(true);

  const notify = useCallback(() => {
    toast("Úspešne prihlásený!", {
      onClose: () =>
        setTimeout(() => {
          navigate("/studentOverview");
        }, 5000),
    });
  }, [navigate]);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (uuidCode) {
      fetch(`http://localhost:8080/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ uuidCode, id_student }),
      })
        .then((response) => {
          if (response.status === 204) {
            setShowScanner(false);
            notify();
            return Promise.resolve();
          } else return Promise.reject("Invalid scanning attempt");
        })
        .then((uuidCode) => {
          // spracovanie úspešnej odpovede
        })
        .catch((error) => {
          // spracovanie chyby
          console.error(error);
        });
    }
  }, [uuidCode, id_student, notify]);

  return (
    <div>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      {showScanner && (
        <div className="ml-3 mr-3 ">
          <QrReader
            onResult={(result, error) => {
              if (!!result && mounted) {
                setData(result?.text);
              }

              if (!!error) {
                //console.info(error);
              }
            }}
            style={{ width: "100%" }}
            scanDelay={500} //kazda nova snimka po 500 milsec
          />
        </div>
      )}
    </div>
  );
};
export default ScanningPage;

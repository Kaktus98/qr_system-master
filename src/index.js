import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
/* import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; */
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./reducer/Persistor.js";
import { persistor } from "./reducer/Persistor.js";
import "../node_modules/primeflex/primeflex.css"
import '../node_modules/primeicons/primeicons.css'
import "../node_modules/primereact/resources/themes/lara-light-indigo/theme.css";
import "../node_modules/primereact/resources/primereact.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
      <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

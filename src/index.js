import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import Calculator from "./Calculator";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Calculator />
  </StrictMode>,
  rootElement
);

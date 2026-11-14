import React from "react";
import { createRoot } from "react-dom/client";
import LegalPage from "./LegalPage.jsx";
import "./fonts.css";
import "./editorial-fonts.css";
import "./styles.css";
import "./legal.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LegalPage page={document.body.dataset.page} />
  </React.StrictMode>,
);

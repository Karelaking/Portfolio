import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";
import App from "./frontend/App";

AOS.init({
  duration: 7000,
  useClassNames: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App/>
  </StrictMode>
);

import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./frontend/pages/Root/Root";
import { BrowserRouter } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 7000,
  useClassNames: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <RouterProvider router={router}/> */}
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);

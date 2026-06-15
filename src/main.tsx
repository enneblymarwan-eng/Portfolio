  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router";
  import { SkyProvider } from "./app/SkyContext.tsx";
  import App from "./app/App.tsx";
  import CaseStudy from "./app/CaseStudy.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <SkyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/case-study" element={<CaseStudy />} />
        </Routes>
      </BrowserRouter>
    </SkyProvider>
  );
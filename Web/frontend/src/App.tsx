import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./page/MainPage";
import SearchPage from "./page/SearchPage";
import AnalysisPage from "./page/AnalysisPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:key" element={<AnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
}

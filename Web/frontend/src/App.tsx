import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./page/MainPage";
import SearchPage from "./page/SearchPage";
import AnalysisPage from "./page/AnalysisPage";

import LoadingPage from "./page/LoadingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<LoadingPage />} />
        <Route path="/search/:key" element={<SearchPage />} />
        <Route path="/analysis" element={<LoadingPage />} />
        <Route path="/analysis/:key" element={<AnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
}

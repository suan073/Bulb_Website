import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./components/page/MainPage";
import SearchPage from "./components/page/SearchPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

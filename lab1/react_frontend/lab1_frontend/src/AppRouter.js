import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import TournamentsListPage from "./TournamentListPage";
import TournamentDetailPage from "./TournamentDetailPage";

function AppRouter() {
  return (
    <Router basename="https://web2-react-frontend.onrender.com">
      <Routes>
        <Route path="/" element={<App />} /> {/* Landing page */}
        <Route path="/tournaments" element={<TournamentsListPage />} />
        <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

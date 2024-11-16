import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShoppingListPage from "../pages/ShoppingListPage";

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ShoppingListPage />} />
    </Routes>
  </Router>
);

export default AppRouter;

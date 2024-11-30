import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShoppingListPage from "../pages/ShoppingListPage";
import ShoppingListsOverview from "../pages/ShoppingListsOverview";

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ShoppingListsOverview />} />
      <Route path="/list/:id" element={<ShoppingListPage />} />
    </Routes>
  </Router>
);

export default AppRouter;

import React from "react";
import { Routes, Route } from "react-router-dom";
import ShoppingListPage from "../pages/ShoppingListPage";
import ShoppingListsOverview from "../pages/ShoppingListsOverview";

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<ShoppingListsOverview />} />
    <Route path="/list/:id" element={<ShoppingListPage />} />
  </Routes>
);

export default AppRouter;

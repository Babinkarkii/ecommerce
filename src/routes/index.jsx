import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
import AdminDashboard from "../pages/AdminDashboard";
import AddProductPage from "../pages/AddProductPage";
import CartPage from "../pages/CartPage";
import ProductListPage from "../pages/ProductListPage";
import UserDashboard from "../pages/UserDashboardPage";
import SignupPage from "../pages/SignUpPage";
import SuggestedProductPage from "../pages/SuggestedProductPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/suggested-products" element={<SuggestedProductPage />} />
      <Route path="/admin/add-product" element={<AddProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/productlist" element={<ProductListPage />} />
    </Routes>
  );
};

export default AppRoutes;

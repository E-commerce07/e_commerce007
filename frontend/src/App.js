import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

// Main Components
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Loading from "./components/Loading.js";
import SidebarMenu from "./components/categories.js";
// Custom hooks
import { useAuth } from "./hooks/useAuth";

// Pages
import About from "./pages/About.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import SellerDashboard from "./pages/SellerDashboard.js";
import Profile from "./pages/Profile.js";
import Cart from "./pages/Cart.js";
import Wishlist from "./pages/Wishlist.js";
import ProductDetail from "./pages/ProductDetail.js"; // Import ProductDetail

// Main App Component
export default function App() {
  return (
    <Router>
      <AppContent />
      {/* Extracted App content to ensure it uses Router context */}
    </Router>
  );
}

// Extracted App Content
function AppContent() {
  const {
    isAuthenticated,
    isAdmin,
    isSeller,
    loading,
    login,
    register,
    logout,
  } = useAuth();

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (!localCart) return;
    const parsedCart = JSON.parse(localStorage.getItem("cart"));
    setCart(parsedCart);
    console.log(parsedCart);
  }, [localStorage]);

  // Handling loading state if authentication state is pending
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        isSeller={isSeller}
        logout={logout}
        cart={cart}
        products={products}
        setProducts={setProducts}
        category={category}
      />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Home
                  cart={cart}
                  setCart={setCart}
                  products={products}
                  setProducts={setProducts}
                />
                {products ? (
                  <SidebarMenu
                    products={products}
                    setProducts={setProducts}
                    category={category}
                    setCategory={setCategory}
                  />
                ) : (
                  <div />
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} /> {/* About Page */}
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />{" "}
          {/* Cart Page */}
          <Route
            path="/wishlist"
            element={isAuthenticated ? <Wishlist /> : <Navigate to="/" />}
          />{" "}
          {/* Wishlist Page */}
          {/* Product Detail Route */}
          <Route path="/product/:id" element={<ProductDetail />} />{" "}
          {/* Product Detail Page */}
          {/* Authentication Routes */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? <Login login={login} /> : <Navigate to="/" />
            }
          />{" "}
          {/* Login Page */}
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register register={register} />
              ) : (
                <Navigate to="/" />
              )
            }
          />{" "}
          {/* Register Page */}
          {/* User-Specific Routes */}
          <Route
            path="/user"
            element={
              isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
            }
          />{" "}
          {/* Redirect logic for user-specific content */}
          {/* Profile Routes */}
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />{" "}
          {/* Profile Page */}
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              isAuthenticated && isAdmin ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />{" "}
          {/* Admin Dashboard */}
          {/* Seller Routes */}
          <Route
            path="/seller"
            element={
              isAuthenticated && isSeller ? (
                <SellerDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />{" "}
          {/* Seller Dashboard */}
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} /> {/* 404 Not Found Page */}
          {/* Add other routes below */}
        </Routes>
      </main>
      <Footer
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        isSeller={isSeller}
        logout={logout}
      />
    </>
  );
}

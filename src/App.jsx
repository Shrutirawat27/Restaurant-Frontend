import React from "react";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dishes from "./pages/Dishes";
import Footer from "./components/Footer";
import AdminDishes from "./pages/AdminDishes";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      {/* ✅ Scroll to top on every route change */}
      <ScrollToTop />

      {/* ✅ Navbar always visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dishes"
          element={
            <ProtectedRoute>
              <AdminDishes />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ✅ Footer always visible */}
      <Footer />

      <ToastContainer />
    </>
  );
};

export default App;

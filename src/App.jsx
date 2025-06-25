import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Dishes from './pages/Dishes';
import Footer from "./components/Footer";
import AdminDishes from "./pages/AdminDishes";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/" element={<Dishes />} /> */}
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
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;

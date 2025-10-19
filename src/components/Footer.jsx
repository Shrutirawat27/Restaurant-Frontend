import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2a374a] text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo + Description */}
        <div>
          <img
            src="/logo.png"
            alt="Zaika Logo"
            className="h-14 w-auto mb-4 object-contain"
          />
          <p className="text-sm leading-relaxed">
            Authentic Indian flavors with love. <br />
            Taste the tradition.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gray-100">Home</Link></li>
            <li><Link to="/menu" className="hover:text-gray-100">Menu</Link></li>
            <li><Link to="/about" className="hover:text-gray-100">About</Link></li>
            <li><Link to="/contact" className="hover:text-gray-100">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <p className="text-sm">
            <a
              href="https://www.google.com/maps/place/1051+Elmhurst+Rd,+Des+Plaines,+IL+60016"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-100"
            >
              1051 Elmhurst Rd. Des Plaines, IL 60016
            </a>
          </p>
          <p className="text-sm mt-2">
            Phone:{" "}
            <a href="tel:+12245781805" className="text-gray-300 hover:text-gray-100">
              +1.2245781805
            </a>
          </p>
          <p className="text-sm mt-2">
            Email:{" "}
            <a
              href="mailto:zaikaindiancuisine1051@gmail.com"
              className="text-gray-300 hover:text-gray-100 break-all"
            >
              zaikaindiancuisine1051@gmail.com
            </a>
          </p>
        </div>

        {/* Instagram Images */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Instagram</h3>
          <div className="grid grid-cols-3 gap-2">
            {["/insta4.png", "/insta5.png", "/insta3.png"].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`insta${index + 1}`}
                className="w-full h-16 object-cover rounded-sm"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-600 pt-6">
        &copy; {new Date().getFullYear()} Zaika Indian Cuisine. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaLeaf, FaUtensils, FaSmile } from "react-icons/fa";

const About = () => {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowMore(false);
  }, [location.pathname]);

  return (
    <section className="bg-gray-300 px-4 pt-4 pb-12 flex flex-col items-center min-h-[calc(100vh-64px)]">
      {/* Image + Text Section */}
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12 w-full">
        {/* Left Text */}
        <div className="md:w-1/2 w-full text-left">
          <h2 className="text-[32px] sm:text-[38px] md:text-[56px] font-bold text-[#2d2e2e] leading-tight mb-4">
            About Us
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
            At <span className="font-semibold text-green-600">Zaika Indian Cuisine</span>, we bring you the finest traditional Indian flavors made with fresh ingredients and love. Our chefs take pride in every dish served.
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Whether you're dining in or ordering out, we ensure a delicious experience with warm hospitality and the essence of Indian spices.
          </p>

          {/* Read More Button (Shown here only if not expanded) */}
          {!showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 mt-6 rounded font-semibold transition"
            >
              Why Choose Us?
            </button>
          )}
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full flex justify-center items-center">
          <img
            src="/AboutUs.png"
            alt="About Us"
            className="w-full max-w-[550px] h-auto object-contain"
          />
        </div>
      </div>

      {/* Expanded Section (Boxes) */}
      {showMore && (
        <>
          <h3 className="text-2xl font-bold text-green-700 mt-12 mb-6 text-center">Why Choose Us?</h3>
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl px-4">
            <div className="bg-gray-100 rounded-xl shadow-md p-6 flex items-start gap-4">
              <FaLeaf className="text-green-500 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-1">Fresh Ingredients</h4>
                <p className="text-gray-700">Handpicked veggies, herbs & spices in every dish.</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl shadow-md p-6 flex items-start gap-4">
              <FaUtensils className="text-green-500 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-1">Authentic Flavors</h4>
                <p className="text-gray-700">Recipes crafted with tradition, flavor, and love.</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl shadow-md p-6 flex items-start gap-4">
              <FaSmile className="text-green-500 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-1">Great Hospitality</h4>
                <p className="text-gray-700">Friendly service that makes every meal memorable.</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl shadow-md p-6 flex items-start gap-4">
              <FaUtensils className="text-green-500 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-1">Quick Delivery</h4>
                <p className="text-gray-700">Hot, fresh meals delivered to your door within 60 minutes.</p>
              </div>
            </div>
          </div>

          {/* Move Button Down When Expanded */}
          <button
            onClick={() => setShowMore(false)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 mt-10 rounded font-semibold transition"
          >
            Show Less
          </button>
        </>
      )}
    </section>
  );
};

export default About;

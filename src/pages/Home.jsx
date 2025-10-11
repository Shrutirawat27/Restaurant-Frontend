import React, { useState } from "react";
import Dishes from "./Dishes";
import About from "./About";
import Catering from "../components/Catering";
import Contact from "./Contact";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/Hero2.jpeg"
          alt="Delicious Indian Food"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text Content */}
        <div className="relative z-10 max-w-3xl text-center text-white px-6">
          <h2 className="text-[32px] sm:text-[38px] md:text-[56px] font-bold leading-tight mb-4">
            We’re Here For <br className="hidden md:block" /> Food & Delivery
          </h2>
          <p className="text-base sm:text-lg italic leading-relaxed mb-6">
            Enjoy authentic Indian flavors crafted by expert chefs and delivered hot to your door. <br />
            Fresh, tasty meals with rich spices — all within 60 minutes!
          </p>

          {/* Order Now opens modal */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            Order Now
          </button>
        </div>
      </section>

      {/* Modal with clickable logos */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-[90%] text-center relative animate-fadeIn">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Choose Your Delivery Partner
            </h3>

            <div className="flex justify-center gap-8">
              {/* Grubhub */}
              <a
                href="https://grubhub.com/restaurant/zaika-indian-cuisine-1051-elmhurst-rd-des-plaines/1134495?classicAffiliateId=%2Fr%2Fw%2F385185%2F&utm_source=restaurant.grubhub.com&utm_medium=OOL&utm_campaign=order%20online&utm_content=1134495"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/grubhub-logo.png"
                  alt="Grubhub"
                  className="w-20 h-20 hover:scale-110 transition-transform"
                />
              </a>

              {/* UberEats */}
              <a
                href="https://www.ubereats.com/store/zaika-indian-cuisine/hHOsgj-tQV6z2boNFIzrAQ?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/ubereats-logo.jpeg"
                  alt="UberEats"
                  className="w-20 h-20 hover:scale-110 transition-transform"
                />
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Special Dishes Section */}
      <Dishes />

      {/* About Us Section */}
      <About />

      {/* Catering Section */}
      <Catering />

      {/* Instagram Section */}
      <section className="bg-gray-300 py-16 px-4">
        <div className="text-center mb-10">
          <h2 className="text-[32px] sm:text-[36px] md:text-[44px] font-bold text-[#2d2e2e]">
            Follow Us On Instagram
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-2">@zaikachicago</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {["/insta1.png", "/insta2.png", "/insta3.png", "/insta4.png", "/insta5.png", "/insta6.png"].map(
            (src, index) => (
              <div key={index} className="overflow-hidden rounded shadow-sm">
                <img
                  src={src}
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )
          )}
        </div>

        <div className="text-center">
          <a
            href="https://www.instagram.com/zaikachicago"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold text-lg transition"
          >
            <FaInstagram className="w-6 h-6 mr-2" />
            Follow on Instagram
          </a>
        </div>
      </section>

      <Contact />
    </>
  );
}

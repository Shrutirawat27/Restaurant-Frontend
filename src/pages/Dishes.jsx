import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_REACT_APP_API_URL || process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log("Fetching from:", API);

    axios
      .get(`${API}/api/dishes`)
      .then((res) => {
        console.log("Fetched Dishes:", res.data);
        setDishes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching dishes:", err);
        setError("⚠️ Could not load dishes.");
      })
      .finally(() => setLoading(false));
  }, []);

  const specialDishes = dishes.filter(
    (dish) => dish?.special === true || dish?.special === "true"
  );

  return (
    <section className="bg-white py-16 px-4">
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            color: #38ac2c;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            background-color: white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            width: 40px;
            height: 40px;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 20px;
            font-weight: bold;
          }

          .swiper-pagination {
            position: relative;
            margin-top: 20px;
            text-align: center;
          }

          .swiper-pagination-bullet {
            background-color: #ccc;
            opacity: 1;
          }

          .swiper-pagination-bullet-active {
            background-color: #38ac2c;
          }
        `}
      </style>

      {/* Title */}
      <div className="text-center mb-10 max-w-2xl mx-auto px-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#38ac2c] mb-4">
          Our Special Dishes
        </h2>
        <p className="text-gray-600 text-base sm:text-lg italic">
          Discover the essence of Indian cuisine through our hand-picked specialties — made with authentic spices and love.
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="max-w-6xl mx-auto relative px-2">
        {loading ? (
          <p className="text-center text-gray-400">Loading special dishes...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : specialDishes.length === 0 ? (
          <p className="text-center text-gray-500">No special dishes available.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {specialDishes.map((dish, idx) =>
              dish && dish.name && dish.price ? (
                <SwiperSlide key={idx}>
                  <div className="h-full flex flex-col border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white min-h-[440px]">
                    <img
                      src={
                        dish.imageUrl
                          ? `${API}${dish.imageUrl}`
                          : "/default-dish.jpg"
                      }
                      alt={dish.name || "Dish"}
                      className="w-full h-64 sm:h-72 object-cover"
                    />
                    <div className="p-4 text-center flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-1">{dish.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                      </div>
                      <p className="text-green-600 font-bold text-base sm:text-lg mt-1">
                        ${dish.price}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        )}
      </div>
    </section>
  );
}

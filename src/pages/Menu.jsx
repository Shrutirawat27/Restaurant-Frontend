import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Menu() {
  const [menuDishes, setMenuDishes] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/dishes`)
      .then((res) => {
        const nonSpecialDishes = res.data.filter((dish) => !dish.special);
        setMenuDishes(nonSpecialDishes);
      })
      .catch((err) => console.error("Error fetching dishes:", err));
  }, []);

  // Group by category
  const groupedByCategory = menuDishes.reduce((acc, dish) => {
    const category = dish.category || "Others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(dish);
    return acc;
  }, {});

  return (
    <section className="bg-white py-16 px-4 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#2d2e2e] mb-10 text-center">
          Menu
        </h2>

        {/* No Items Case */}
        {Object.keys(groupedByCategory).length === 0 ? (
          <p className="text-gray-500 text-center">No items in menu yet.</p>
        ) : (
          Object.entries(groupedByCategory).map(([category, dishes]) => (
            <div
              key={category}
              className="bg-gray-100 rounded-xl p-6 md:p-8 shadow-md mb-10"
            >
              {/* Category Title */}
              <h3 className="text-2xl font-semibold text-green-600 mb-6">
                {category.toUpperCase()}
              </h3>

              {/* Dish List */}
              <div className="space-y-5">
                {dishes.map((item, index) => (
                  <div key={index}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </span>
                      <div className="flex-1 border-b-2 border-dotted border-gray-400 mx-2"></div>
                      <span className="text-lg font-semibold text-green-600 whitespace-nowrap">
                        ${item.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

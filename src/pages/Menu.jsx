import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Menu() {
  const [menuDishes, setMenuDishes] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/dishes`)
      .then((res) => {
        const nonSpecialDishes = res.data.filter((dish) => !dish.special);
        setMenuDishes(nonSpecialDishes);
      })
      .catch((err) => console.error("Error fetching dishes:", err))
      .finally(() => setLoading(false)); // ✅ Stop loading after request finishes
  }, []);

  const groupedByCategory = menuDishes.reduce((acc, dish) => {
    const category = dish.category || "Others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(dish);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <section className="bg-white py-16 px-4 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#2d2e2e] mb-10 text-center">
          Menu
        </h2>

        {/* ✅ Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-green-700 font-medium text-lg">
              Loading menu...
            </p>
          </div>
        ) : Object.keys(groupedByCategory).length === 0 ? (
          <p className="text-gray-500 text-center">No items in menu yet.</p>
        ) : (
          Object.entries(groupedByCategory).map(([category, dishes]) => {
            const isExpanded = expandedCategories[category];
            const visibleDishes = isExpanded ? dishes : dishes.slice(0, 3);
            const toggleText = isExpanded ? "Show Less" : "Load More";

            return (
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
                  {visibleDishes.map((item, index) => (
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

                {/* Load More / Show Less */}
                {dishes.length > 3 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="text-green-700 font-semibold hover:underline"
                    >
                      {toggleText}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

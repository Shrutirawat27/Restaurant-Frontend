import React from "react";

const cateringOptions = [
  {
    title: "Private Party",
    image: "/Privateparty.png",
  },
  {
    title: "Wedding Reception",
    image: "/Wedding.png",
  },
  {
    title: "Corporate Events",
    image: "/Corporate.png",
  },
  {
    title: "Birthday Party",
    image: "/Birthday.png",
  },
];

const Catering = () => {
  return (
    <section className="bg-white py-16 px-4">
      {/* Section Title */}
      <div className="max-w-6xl mx-auto text-center mb-12 px-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2d2e2e] leading-tight">
          Catering for Any Occasion
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mt-3 max-w-3xl mx-auto leading-relaxed">
          Whether it's a wedding, birthday, corporate event, or family gathering, our expert chefs bring the rich flavors of
          India to your table with freshly prepared, customized menus.
        </p>
      </div>

      {/* Catering Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 px-2">
        {cateringOptions.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 sm:h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-2 text-center">
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Catering;

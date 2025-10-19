import React from "react";
import { useNavigate } from "react-router-dom"; 

const cateringOptions = [
  {
    title: "Private Party",
    image: "/Privateparty2.jpg",
  },
  {
    title: "Wedding Reception",
    image: "/Wedding1.jpg",
  },
  {
    title: "Corporate Events",
    image: "/Corporate.png",
  },
  {
    title: "Birthday Party",
    image: "/Birthday2.jpg",
  },
];

const Catering = () => {
  const navigate = useNavigate(); 

  const handleRedirect = () => {
    navigate("/contact"); 
  };

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
            onClick={handleRedirect} 
            className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 sm:h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-2 text-center group-hover:bg-black/50 transition-colors duration-300">
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
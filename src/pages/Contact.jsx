import React from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

const contactDetails = [
  {
    title: "Address",
    info: "1051 Elmhurst Rd. Des Plaines, IL 60016",
    icon: <MapPinIcon />,
    type: "address",
    mapLink: "https://www.google.com/maps/place/1051+Elmhurst+Rd,+Des+Plaines,+IL+60016",
  },
  {
    title: "Call Us",
    info: "+1.8473788044",
    icon: <PhoneIcon />,
    type: "phone",
  },
  {
    title: "Email Us",
    info: "zaikaindiancuisine1051@gmail.com",
    icon: <EnvelopeIcon />,
    type: "email",
  },
  {
    title: "Opening Hours",
    info: "Mon–Sun: 11:30AM – 9:30PM\nTuesday: Closed",
    icon: <ClockIcon />,
    type: "text",
  },
];

const Contact = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-[36px] md:text-[44px] font-bold text-[#2d2e2e]">
          Need Help? Contact Us
        </h2>
      </div>

      {/* Google Map */}
      <div className="max-w-6xl mx-auto mb-12 rounded-lg overflow-hidden shadow-md w-full h-[400px]">
        <iframe
          title="Zaika Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1134169890915!2d-122.42067948468153!3d37.77848457975896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5f9c67e1%3A0x88d1e59e68244b2e!2sIndian%20Restaurant!5e0!3m2!1sen!2sin!4v1718678545619!5m2!1sen!2sin"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Contact Info Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-2">
        {contactDetails.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-gray-200 shadow-sm rounded-lg p-6"
          >
            <div className="bg-green-300 rounded-full p-4 w-16 h-16 flex items-center justify-center shrink-0">
              {React.cloneElement(item.icon, {
                className: "w-6 h-6 text-black",
              })}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>

              {item.type === "email" ? (
                <a
                  href={`mailto:${item.info}`}
                  className="text-gray-800 break-all hover:text-gray-900"
                >
                  {item.info}
                </a>
              ) : item.type === "phone" ? (
                <a
                  href={`tel:${item.info}`}
                  className="text-gray-800 hover:text-gray-900"
                >
                  {item.info}
                </a>
              ) : item.type === "address" ? (
                <a
                  href={item.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 break-all hover:text-gray-900"
                >
                  {item.info}
                </a>
              ) : (
                <p className="text-gray-600 whitespace-pre-line">{item.info}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contact;
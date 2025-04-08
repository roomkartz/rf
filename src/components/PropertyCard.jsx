import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";

const PropertyCard = ({ property }) => {
  return (
    <Link
      to={`/properties/${property._id}`}
      state={{ property }}
      className="flex flex-col sm:flex-row bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="sm:w-1/3 h-64 relative">
        <img
          src={
            (property.images && property.images[0]) ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
          }
          alt={property.address}
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
            property.status === "Closed"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {property.status}
        </span>
      </div>

      <div className="flex-1 p-6 space-y-4">
        <h3 className="text-2xl font-semibold flex items-center">
          <FiMapPin className="mr-1.5 h-5 w-5 text-gray-400" />
          {property.address}
        </h3>

        <div className="flex flex-col sm:flex-row justify-between text-gray-600">
          <p className="flex items-center mb-2 sm:mb-0">
            <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            {property.gender} only
          </p>

          <p className="text-lg font-semibold text-green-600">
            ₹{property?.rent?.toLocaleString()} <span className="text-sm text-gray-500">/month</span>
          </p>
        </div>

        <div className="flex space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                clipRule="evenodd"
              />
            </svg>
            {property.furnishing}
          </div>

          <div className="flex items-center">
            <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            {property.restriction}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

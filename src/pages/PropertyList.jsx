import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FiSearch, FiSliders, FiX, FiMapPin } from "react-icons/fi";
import PropertyCard from "../components/PropertyCard";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

        const res = await fetch(`${apiBaseUrl}/users/properties`);
        const data = await res.json();

        if (res.ok) {
          setProperties(data);
          setFilteredProperties(data);
          // Set initial max price from data
          setMaxPrice(Math.max(...data.map((p) => p.rent), 100000));
        } else {
          setError(data.error || "Failed to fetch properties.");
        }
      } catch (err) {
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const filterProperties = () => {
      let results = [...properties];

      // Filter by search term (address)
      if (searchTerm) {
        const normalizedSearch = searchTerm.toLowerCase().replace(/[^a-z0-9]/g, '');
        results = results.filter(property => {
          const normalizedAddress = property.address.toLowerCase().replace(/[^a-z0-9]/g, '');
          return normalizedAddress.includes(normalizedSearch);
        });
      }

      // Filter by max price
      results = results.filter(property => property.rent <= maxPrice);

      setFilteredProperties(results);
    };

    filterProperties();
  }, [searchTerm, maxPrice, properties]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering happens automatically via useEffect
  };

  const handlePriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setMaxPrice(Math.max(...properties.map((p) => p.rent), 100000));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 mt-6 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Available Properties
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Find your perfect living space
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by address..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  aria-label="Filters"
                >
                  <FiSliders className="h-5 w-5" />
                </button>
              </div>
            </div>
          </form>

          {/* Filters Panel */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <FiX className="mr-1" /> Reset all
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price: ₹{maxPrice.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={Math.max(...properties.map((p) => p.rent), 100000)}
                    value={maxPrice}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-yellow-400 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {filteredProperties.length} of {properties.length} properties
          </p>
          {filteredProperties.length === 0 && !loading && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {!loading && filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No properties found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
            <div className="mt-6">
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset all filters
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
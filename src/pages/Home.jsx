import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaSearch, FaComments, FaEye, FaStar, FaQuoteLeft } from "react-icons/fa";
import { BsHouseDoorFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropertyCard from "../components/PropertyCard";

const Home = () => {
  const role = localStorage.getItem("role");
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    document.title = "Home | Find Your Perfect Room";

    const fetchProperties = async () => {
      try {
        const res = await fetch("https://rb-gnyh.onrender.com/api/users/properties");
        const data = await res.json();
        setProperties(data);  // Update this if your API response is nested
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      }
    };

    fetchProperties();
  }, []);
  useEffect(() => {
    document.title = "Home | Find Your Perfect Room";
  }, []);
  return (
    <div className="relative bg-white min-h-screen text-[#2D3A45] overflow-hidden">
      {/* Background Blur Image */}
      <div className="fixed inset-0 z-0 opacity-90"
        style={{
          backgroundImage: "url('https://imgs.search.brave.com/0OKO6lMeixRsAPa3K7aALFqPPGy98VwT4tyIlNTp9H0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzU4LzI3LzI4/LzM2MF9GXzEwNTgy/NzI4MTNfZDlRSzNR/TnpRaXhDSjNWdHF6/VFNTdmQ5MjJxWERF/TEguanBn')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(1px)",
        }} />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-[#2D3A45]/30 text-white py-32 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Find Your <span className="text-[#FFD700]">Perfect</span> Room <br /> Without the Hassle
            </h1>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/properties"
                  className="flex items-center justify-center gap-2 bg-[#FFD700] text-[#2D3A45] font-semibold px-8 py-4 rounded-lg hover:bg-[#FFC000] transition shadow-lg hover:shadow-xl"
                >
                  <BsHouseDoorFill /> Explore Rooms
                </Link>
              </motion.div>

              {role !== "User" && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/owner"
                    className="flex items-center justify-center gap-2 border-2 border-[#FFD700] text-[#FFD700] px-8 py-3.5 rounded-lg hover:bg-[#FFD700] hover:text-[#2D3A45] transition shadow-lg hover:shadow-xl"
                  >
                    List Your Property
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Property Carousel */}
        <section className="py-20 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D3A45]">
                Featured Properties
              </h2>
              <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Check out some of the top-rated rooms available right now.
              </p>
            </motion.div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              loop
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {properties.map((item, i) => (
                <SwiperSlide key={item._id || i}>
                  <PropertyCard property={item} />
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D3A45]">
                Why Choose Us?
              </h2>
              <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We make finding or listing a room simple, secure, and stress-free.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Verified Listings",
                  desc: "Each property goes through a thorough verification process to ensure quality and authenticity.",
                  icon: <FaSearch className="text-3xl text-[#FFD700]" />,
                },
                {
                  title: "Instant Communication",
                  desc: "Connect directly with owners or tenants through WhatsApp or call instantly from the app.",
                  icon: <FaComments className="text-3xl text-[#FFD700]" />,
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-[#2D3A45]">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D3A45]">What Our Users Say</h2>
              <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Found my dream apartment in just 2 days! The verification process gave me peace of mind.",
                  author: "Sarah K.",
                  role: "Student",
                  rating: 5,
                },
                {
                  quote: "As a property owner, I appreciate how easy it is to list and manage my rooms.",
                  author: "Raj P.",
                  role: "Property Owner",
                  rating: 5,
                },
                {
                  quote: "No more dealing with brokers. Direct communication saved me time and money.",
                  author: "Abhay K.",
                  role: "Professional",
                  rating: 4,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <FaQuoteLeft className="text-2xl text-[#FFD700] mb-4" />
                  <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, j) => (
                      <FaStar
                        key={j}
                        className={j < testimonial.rating ? "text-[#FFD700]" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D3A45]">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-[#2D3A45] text-white py-24 px-6 text-center">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('https://imgs.search.brave.com/0OKO6lMeixRsAPa3K7aALFqPPGy98VwT4tyIlNTp9H0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzU4LzI3LzI4/LzM2MF9GXzEwNTgy/NzI4MTNfZDlRSzNR/TnpRaXhDSjNWdHF6/VFNTdmQ5MjJxWERF/TEguanBn')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Journey Today</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Browse verified rooms or list your own in just a few steps.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/properties"
                className="inline-flex items-center justify-center gap-2 bg-[#FFD700] text-[#2D3A45] font-semibold px-8 py-4 rounded-lg hover:bg-[#FFC000] transition shadow-lg hover:shadow-xl"
              >
                <BsHouseDoorFill /> Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Home;

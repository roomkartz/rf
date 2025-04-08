import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white text-[#2D3A45]">
      <Navbar />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Have a question or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          {/* <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-xl shadow-lg border"
          >
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="bg-[#FFD700] text-[#2D3A45] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFC000] transition shadow-lg"
            >
              Send Message
            </button>
          </motion.form> */}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-[#FFD700] text-2xl" />
              <p>Uma Chokdi, Vadodara, Gujarat</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#FFD700] text-2xl" />
              <p>+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-[#FFD700] text-2xl" />
              <p>contact.roomkartz@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;

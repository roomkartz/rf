import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const OwnerDashboard = () => {
  const dashboardCards = [
    {
      title: "My Listed Properties",
      description: "View and manage all your currently listed rooms or flats.",
      link: "/owner/properties",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      bgColor: "bg-white",
      textColor: "text-[#2D3A45]",
      accentColor: "text-[#AAAAAA]",  // Changed to lighter neutral color
      borderColor: "border-[#AAAAAA]/20"
    },
    {
      title: "Add New Property",
      description: "Quickly list a new property with all necessary details and media.",
      link: "/owner/add-property",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      bgColor: "bg-white",  // Changed to lighter gradient
      textColor: "text-[#2D3A45]",
      accentColor: "text-[#AAAAAA]",  // Changed to lighter neutral color
      borderColor: "border-transparent"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#f8f9fa] to-[#f1f2f4] min-h-screen text-[#2D3A45]">
      <Navbar />
      
      <div className="  max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className=" mt-6 text-4xl font-bold mb-2">Owner Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your properties </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link
                to={card.link}
                className={`block ${card.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl border ${card.borderColor} transition-all duration-300 h-full`}
              >
                <div className="flex items-start space-x-6">
                  <div className={`p-3 rounded-full ${card.accentColor}/10`}>
                    {React.cloneElement(card.icon, { className: `h-8 w-8 ${card.accentColor}` })}
                  </div>
                  <div>
                    <h2 className={`text-2xl font-semibold mb-3 ${card.textColor}`}>{card.title}</h2>
                    <p className={`${card.textColor}/80`}>{card.description}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <span className={`inline-flex items-center ${card.accentColor} font-medium`}>
                    View details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
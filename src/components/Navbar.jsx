import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const tokenResult = await user.getIdTokenResult();
        setUserRole(tokenResult.claims.role || null);
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { path: "/properties", label: "Properties" },
    { path: "/contact", label: "Contact us" },
  ];

  const authLink = isLoggedIn
    ? { label: "Logout", action: handleLogout }
    : { path: "/login", label: "Login" };

  return (
    <nav
      className={`fixed w-full z-50 bg-[#2D3A45] ${
        isScrolled ? "shadow-lg" : ""
      } transition-shadow duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center flex-shrink-0">
            <span className="text-2xl font-bold text-white">
              Room<span className="text-[#FFD700]">Rental</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-white text-lg font-medium ${
                  location.pathname === link.path ? "text-[#FFD700]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            {authLink.path ? (
              <Link
                to={authLink.path}
                className={`text-white text-lg font-medium ${
                  location.pathname === authLink.path ? "text-[#FFD700]" : ""
                }`}
              >
                {authLink.label}
              </Link>
            ) : (
              <button
                onClick={authLink.action}
                className="text-white text-lg font-medium"
              >
                {authLink.label}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#FFD700] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        style={{ height: isMenuOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden transition-height duration-300"
      >
        <div className="px-2 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <div key={link.label} className="px-3 py-2 rounded-md hover:bg-gray-800">
              <Link
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-white text-lg ${
                  location.pathname === link.path ? "text-[#FFD700]" : ""
                }`}
              >
                {link.label}
              </Link>
            </div>
          ))}
          <div className="px-3 py-2 rounded-md hover:bg-gray-800">
            {authLink.path ? (
              <Link
                to={authLink.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-white text-lg ${
                  location.pathname === authLink.path ? "text-[#FFD700]" : ""
                }`}
              >
                {authLink.label}
              </Link>
            ) : (
              <button
                onClick={() => {
                  authLink.action();
                  setIsMenuOpen(false);
                }}
                className="block text-white text-lg w-full text-left"
              >
                {authLink.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

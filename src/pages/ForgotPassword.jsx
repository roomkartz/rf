import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Navbar from "../components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSent(true);
    } catch (error) {
      console.error("Error sending reset email:", error);
      alert(error.message || "Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#2D3A45]">
      <Navbar />
      <div className="flex justify-center items-center px-6 py-20">
        <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Forgot Password
          </h2>

          {!isSent ? (
            <form onSubmit={handleSendResetEmail} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              />
              <button
                type="submit"
                className="w-full bg-[#FF6B6B] text-white py-2 rounded-lg font-semibold hover:bg-[#fa5252] transition"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <p className="text-center text-green-600 font-medium">
              A password reset link has been sent to your email.
            </p>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-[#FF6B6B] hover:underline text-sm"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

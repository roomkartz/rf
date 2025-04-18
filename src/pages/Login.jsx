import React, { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("user"); // "user" or "owner"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {},
      });
    }
  };

  const handleSendOTP = async () => {
    setError("");
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, "+91" + phone, appVerifier);
      setConfirmation(confirmationResult);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await confirmation.confirm(otp);
      const user = result.user;

      const response = await axios.post("https://rb-gnyh.onrender.com/api/users/owner", {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        role: "owner",
      });

      localStorage.setItem("uid", user.uid);
      localStorage.setItem("role", "owner");
      navigate("/owner");
    } catch (err) {
      setError("Invalid OTP or error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("uid", result.user.uid);
      localStorage.setItem("role", "user");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("uid", result.user.uid);
      localStorage.setItem("role", "user");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-around mb-4">
          <button
            onClick={() => setMode("user")}
            className={`px-4 py-2 rounded ${mode === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            User Login
          </button>
          <button
            onClick={() => setMode("owner")}
            className={`px-4 py-2 rounded ${mode === "owner" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Owner Login
          </button>
        </div>

        {mode === "user" && (
          <>
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="text-center my-4">or</div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 p-2 rounded"
            >
              <FcGoogle className="text-xl" /> Continue with Google
            </button>
          </>
        )}

        {mode === "owner" && (
          <>
            {step === 1 && (
              <>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border p-2 rounded mb-4"
                />
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white p-2 rounded"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border p-2 rounded mb-4"
                />
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full bg-green-600 text-white p-2 rounded"
                >
                  {loading ? "Verifying..." : "Verify OTP & Login"}
                </button>
              </>
            )}
          </>
        )}

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        <div id="recaptcha-container" />
      </div>
    </div>
  );
};

export default Login;

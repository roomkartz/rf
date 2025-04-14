import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Properties from "./pages/Properties";
import Home from "./pages/Home";
import PropertyList from "./pages/PropertyList";
import PropertyDetails from "./pages/PropertyDetails";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerProperties from "./pages/OwnerProperties";
import AddProperty from "./pages/AddProperty";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import "./index.css";
import OwnerAuth from "./pages/OwnerAuth";
import ContactUs from "./pages/ContactUs";

// ✅ ProtectedRoute component
const ProtectedRoute = ({ allowedRole, children }) => {
  const userRole = localStorage.getItem("role");
  return userRole === allowedRole ? children : <OwnerAuth />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* ✅ Owner protected routes */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRole="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/properties"
          element={
            <ProtectedRoute allowedRole="owner">
              <OwnerProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/add-property"
          element={
            <ProtectedRoute allowedRole="owner">
              <AddProperty />
            </ProtectedRoute>
          }
        />

        {/* Public auth pages */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ologin" element={<OwnerAuth />} />
      </Routes>
    </Router>
  );
}

export default App;

import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Header from "./components/Header";
import AddCar from "./Pages/AddCard";
import Login from "./sComponent/vlogin";
import SignUp from "./sComponent/vsignup";
import ForgetPassword from "./sComponent/vforgetPassword";
import ResetPassword from "./sComponent/vresetPassword";
import EditCar from "./Pages/EditCar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for the token when the app loads
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/admin/resetpassword" element={<ResetPassword />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Home />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddCar"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <AddCar />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:title"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <EditCar />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
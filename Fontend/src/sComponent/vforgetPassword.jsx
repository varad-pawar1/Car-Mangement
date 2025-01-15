import React, { useState } from "react";
import "./vforgetPassword.css";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/admin/forgetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send reset email.");
      }

      alert(result.msg);
      navigate("/login");
    } catch (error) {
      console.error("Error during password reset:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="forgetPassword-page">
      <div className="forgetPassword-container">
        <form onSubmit={handleSubmit} className="forgetPassword-formParent">
          <h3>Forget Password</h3>
          <div className="forgetPassword-inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="forgetPassword-input"
              placeholder="Enter your registered email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="forgetPassword-button">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;

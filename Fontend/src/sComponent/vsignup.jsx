import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./vsignup.css";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const name = event.target.signUpName.value.trim();
    const email = event.target.signUpEmail.value.trim();
    const password = event.target.signUpPassword.value.trim();
    const address = event.target.signUpAddress.value.trim();
    const phone = event.target.signUpPhone.value.trim();
    const gender = event.target.signUpGender.value.trim();

    if (!name || !email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/admin/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, address, phone, gender }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to sign up.");
      }

      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      setErrorMessage(`Sign Up Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signUp-page">
      <div className="signUp-container">
        <form onSubmit={handleSignUp} className="signUp-formParent">
          <h3>Sign Up with your Information</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="signUp-inputGroup">
            <label htmlFor="signUpName">Name</label>
            <input
              type="text"
              id="signUpName"
              name="signUpName"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="signUp-inputGroup">
            <label htmlFor="signUpEmail">Email</label>
            <input
              type="email"
              id="signUpEmail"
              name="signUpEmail"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="signUp-inputGroup">
            <label htmlFor="signUpPassword">Password</label>
            <input
              type="password"
              id="signUpPassword"
              name="signUpPassword"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="signUp-inputGroup">
            <label htmlFor="signUpAddress">Address</label>
            <input
              type="text"
              id="signUpAddress"
              name="signUpAddress"
              placeholder="Enter address"
            />
          </div>
          <div className="signUp-inputGroup">
            <label htmlFor="signUpPhone">Phone</label>
            <input
              type="text"
              id="signUpPhone"
              name="signUpPhone"
              placeholder="Enter phone number"
            />
          </div>
          <div className="signUp-inputGroup">
            <label htmlFor="signUpGender">Gender</label>
            <input
              type="text"
              id="signUpGender"
              name="signUpGender"
              placeholder="Enter gender"
            />
          </div>
          <button
            type="submit"
            className="signUp-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
          <p>
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

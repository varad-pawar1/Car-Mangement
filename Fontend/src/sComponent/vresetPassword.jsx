import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [token, setToken] = useState(""); // State to store the token
  const [newPassword, setNewPassword] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  // Extract token from the URL query string
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    setToken(tokenFromUrl); // Store the token in the state
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiBaseUrl}/admin/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }), // Use token from the state
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to reset password.");
      }

      alert(result.msg);
      navigate("/login")

    } catch (error) {
      console.error("Error during password reset:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.header}>Reset Password</h3>
          <div style={styles.inputGroup}>
            <label htmlFor="newPassword" style={styles.label}>
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to right, #cfd9df, #e2ebf0)",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    overflow: "auto",
  },
  container: {
    background: "#ffffff",
    padding: "20px 40px",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
    maxHeight: "80vh",
    overflowY: "auto",
    transition: "transform 0.3s ease-in-out",
  },
  form: {
    width: "100%",
  },
  header: {
    marginBottom: "20px",
    color: "#333333",
    fontSize: "1.8rem",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#333333",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #cccccc",
    borderRadius: "8px",
    backgroundColor: "#f7f7f7",
    fontSize: "1rem",
    transition: "border 0.3s ease-in-out",
  },
  button: {
    background: "#007bff",
    color: "#ffffff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
    width: "100%",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default ResetPassword;
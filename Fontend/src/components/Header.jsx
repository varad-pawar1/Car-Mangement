import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear("token");
      navigate("/login");
    }
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 shadow-sm">
      <div className="fs-4 fw-bold">
        <i className="fa-solid fa-car me-2"></i>CarDekho
      </div>
      <nav>
        <button className="btn btn-primary  mx-2">
          <NavLink className="text-white text-decoration-none" to="/">
            Home
          </NavLink>
        </button>
        <button className="btn btn-primary  mx-2">
          <NavLink className="text-white text-decoration-none" to="/AddCar">
            Add Car
          </NavLink>
        </button>
        <button className="btn mx-2" onClick={handleLogout}>
          <NavLink to="/">
            <i className="fa-solid fa-right-from-bracket fs-4 text-dark"></i>
          </NavLink>
        </button>
      </nav>
    </header>
  );
}

export default Header;

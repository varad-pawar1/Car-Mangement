import React, { useState, useEffect } from "react";
import Filters from "../components/Filters";
import CarCard from "../components/CarCard";
import axios from "axios";

function Home() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minMileage: "",
    maxMileage: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchCars = async () => {
    try {
      const token = localStorage.getItem("token");

      // Use axios to fetch data with token in headers
      const axiosResponse = await axios.get(`${apiBaseUrl}/car/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = axiosResponse.data;
      console.log(responseData);

      const mappedCars = responseData.cars.map((carData) => ({
        image: carData.carImageUrl,
        title: carData.title,
        model: carData.OEM_Specs.modelName,
        year: carData.OEM_Specs.yearOfModel,
        price: carData.price,
        maxSpeed: carData.OEM_Specs.maxSpeed,
        mileage: carData.mileage,
        power: carData.OEM_Specs.powerBhp,
        colors: carData.OEM_Specs.availableColors,
      }));

      // Apply filters
      const filteredCars = mappedCars.filter((car) => {
        const meetsPriceCriteria =
          (!filters.minPrice || car.price >= filters.minPrice) &&
          (!filters.maxPrice || car.price <= filters.maxPrice);
        const meetsMileageCriteria =
          (!filters.minMileage || car.mileage >= filters.minMileage) &&
          (!filters.maxMileage || car.mileage <= filters.maxMileage);
        const meetsColorCriteria =
          !filters.color || car.colors.includes(filters.color);

        return meetsPriceCriteria && meetsMileageCriteria && meetsColorCriteria;
      });

      setCars(filteredCars);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters]); // Re-fetch cars when filters change

  const deleteCar = async (title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the car with title: ${title}?`
    );
    if (!confirmDelete) {
      console.log("Deletion canceled by user.");
      return;
    }

    console.log("Deleting car with title:", title); // Log the title
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiBaseUrl}/car/product/${title}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete car: ${response.statusText}`);
      }

      console.log("Car deleted successfully!");
      setCars((prevCars) => prevCars.filter((car) => car.title !== title));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleRemoveFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      minMileage: "",
      maxMileage: "",
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = cars.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-3">
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            onRemoveFilters={handleRemoveFilters}
          />
        </div>
        <div className="col-9">
          <div className="row">
            {currentCars.map((car) => (
              <div className="col-md-4" key={car.title}>
                <CarCard car={car} deleteCar={deleteCar} />
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {/* Previous Button */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  style={{
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {/* Pagination Buttons with Ellipses */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;

                  if (
                    page === 1 ||
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1) 
                  ) {
                    return (
                      <li
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                        key={page}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </li>
                    );
                  } else if (
                    (page === currentPage - 2 && currentPage > 3) || // Left ellipsis
                    (page === currentPage + 2 && currentPage < totalPages - 2) // Right ellipsis
                  ) {
                    return (
                      <li className="page-item" key={page}>
                        <span className="page-link">...</span>
                      </li>
                    );
                  }
                  return null; // Hide pages not meeting conditions
                })}

                {/* Next Button */}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                  style={{
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

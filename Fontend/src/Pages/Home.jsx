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
  const fetchCars = async () => {
    try {
      const token = localStorage.getItem("token");

      // Use axios to fetch data with token in headers
      const axiosResponse = await axios.get(
        `${apiBaseUrl}/car/product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      const response = await fetch(
        `${apiBaseUrl}/car/product/${title}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
            {cars.map((car) => (
              <div className="col-md-4" key={car.id}>
                <CarCard car={car} deleteCar={deleteCar} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

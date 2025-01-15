import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CarTable from "../components/CarTable";
import { useNavigate } from "react-router-dom";

const CarForm = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carImageUrl: "",
    title: "",
    kmsOnOdometer: "",
    color: "",
    majorScratches: "",
    originalPaint: "",
    numberOfAccidents: "",
    numberOfPreviousBuyers: "",
    registrationPlace: "",
    price: "",
    mileage: "",
    OEM_Specs: {
      modelName: "",
      yearOfModel: "",
      listPrice: "",
      availableColors: "",
      powerBhp: "",
      maxSpeed: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name in prevData.OEM_Specs) {
        return {
          ...prevData,
          OEM_Specs: {
            ...prevData.OEM_Specs,
            [name]: value,
          },
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        alert("Token not found. Please log in again.");
        return;
      }

      // Send POST request with carDetails directly
      const response = await fetch(`${apiBaseUrl}/car/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ carDetails: formData }), // Send carDetails as expected
      });

      // Check if response is OK
      if (response.ok) {
        const responseData = await response.json();
        alert("Car details submitted successfully");
        navigate("/");
        console.log("Car details submitted successfully:", responseData);
      } else {
        console.error("Failed to submit car details:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting car details:", error.message);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Add Car Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Basic Car Details */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="carImageUrl" className="form-label">
                Image URL
              </label>
              <input
                type="url"
                className="form-control"
                id="carImageUrl"
                name="carImageUrl"
                placeholder="Enter image URL"
                value={formData.carImageUrl}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter car title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Additional fields */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="kmsOnOdometer" className="form-label">
                Kms On Odometer
              </label>
              <input
                type="number"
                className="form-control"
                id="kmsOnOdometer"
                name="kmsOnOdometer"
                placeholder="Enter kms"
                value={formData.kmsOnOdometer}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="color" className="form-label">
                Color
              </label>
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                placeholder="Enter car color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="majorScratches" className="form-label">
                Major Scratches
              </label>
              <select
                className="form-select"
                id="majorScratches"
                name="majorScratches"
                value={formData.majorScratches}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="originalPaint" className="form-label">
                Original Paint
              </label>
              <select
                className="form-select"
                id="originalPaint"
                name="originalPaint"
                value={formData.originalPaint}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="numberOfAccidents" className="form-label">
                Number of Accidents
              </label>
              <input
                type="number"
                className="form-control"
                id="numberOfAccidents"
                name="numberOfAccidents"
                placeholder="Enter number of accidents"
                value={formData.numberOfAccidents}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="numberOfPreviousBuyers" className="form-label">
                Number of Previous Buyers
              </label>
              <input
                type="number"
                className="form-control"
                id="numberOfPreviousBuyers"
                name="numberOfPreviousBuyers"
                placeholder="Enter number of previous buyers"
                value={formData.numberOfPreviousBuyers}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="registrationPlace" className="form-label">
                Registration Place
              </label>
              <input
                type="text"
                className="form-control"
                id="registrationPlace"
                name="registrationPlace"
                placeholder="Enter registration place"
                value={formData.registrationPlace}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="mileage" className="form-label">
                Mileage
              </label>
              <input
                type="number"
                className="form-control"
                id="mileage"
                name="mileage"
                placeholder="Enter mileage"
                value={formData.mileage}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* OEM Specifications */}
          <h4 className="mt-4">OEM Specifications</h4>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="modelName" className="form-label">
                Model Name
              </label>
              <input
                type="text"
                className="form-control"
                id="modelName"
                name="modelName"
                placeholder="Enter model name"
                value={formData.OEM_Specs.modelName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="yearOfModel" className="form-label">
                Year of Model
              </label>
              <input
                type="number"
                className="form-control"
                id="yearOfModel"
                name="yearOfModel"
                placeholder="Enter year of model"
                value={formData.OEM_Specs.yearOfModel}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="listPrice" className="form-label">
                List Price
              </label>
              <input
                type="number"
                className="form-control"
                id="listPrice"
                name="listPrice"
                placeholder="Enter list price"
                value={formData.OEM_Specs.listPrice}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="availableColors" className="form-label">
                Available Colors
              </label>
              <input
                type="text"
                className="form-control"
                id="availableColors"
                name="availableColors"
                placeholder="Enter available colors (comma-separated)"
                value={formData.OEM_Specs.availableColors}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="powerBhp" className="form-label">
                Power (BHP)
              </label>
              <input
                type="number"
                className="form-control"
                id="powerBhp"
                name="powerBhp"
                placeholder="Enter power in BHP"
                value={formData.OEM_Specs.powerBhp}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="maxSpeed" className="form-label">
                Max Speed
              </label>
              <input
                type="number"
                className="form-control"
                id="maxSpeed"
                name="maxSpeed"
                placeholder="Enter max speed"
                value={formData.OEM_Specs.maxSpeed}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      {/* <div className="mt-5 container">
        <CarTable />
      </div> */}
    </>
  );
};

export default CarForm;

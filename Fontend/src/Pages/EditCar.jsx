import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditCar = () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const { title } = useParams(); // Extract title from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carImageUrl: "",
    title: "",
    kmsOnOdometer: 0,
    color: "",
    majorScratches: "",
    originalPaint: "",
    numberOfAccidents: 0,
    numberOfPreviousBuyers: 0,
    registrationPlace: "",
    price: 0,
    mileage: 0,
    OEM_Specs: {
      modelName: "",
      yearOfModel: 0,
      listPrice: 0,
      availableColors: "",
      powerBhp: 0,
      maxSpeed: 0,
    },
  });

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await fetch(
          `${apiBaseUrl}/car/product/${title}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in Authorization header
              "Content-Type": "application/json", // Set Content-Type header (optional for GET requests but recommended)
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFormData(data.car); // Update formData with the fetched car data
        } else {
          console.error("Failed to fetch car data:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [title]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("OEM_Specs.")) {
      const key = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        OEM_Specs: {
          ...prevData.OEM_Specs,
          [key]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiBaseUrl}/car/product/${title}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`,
          },
          body: JSON.stringify({ carDetails: formData }),
        }
      );

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        alert("Car details updated successfully");
        console.log("Car details updated successfully:", data);
        navigate("/");
      } else {
        console.error("Failed to update car details:", await response.text());
      }
    } catch (error) {
      console.error("Error updating car details:", error.message);
    }
  };

  return (
    <div className="container my-4">
      <button
        className="btn btn-secondary px-4 mb-5"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h2 className="mb-4">Edit Car Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Car Details */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="carImageUrl" className="form-label">
              Car Image URL
            </label>
            <input
              type="url"
              className="form-control"
              id="carImageUrl"
              name="carImageUrl"
              value={formData.carImageUrl}
              onChange={handleChange}
              placeholder="Enter car image URL"
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
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter car title"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="kmsOnOdometer" className="form-label">
              Kms on Odometer
            </label>
            <input
              type="number"
              className="form-control"
              id="kmsOnOdometer"
              name="kmsOnOdometer"
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
            <input
              type="text"
              className="form-control"
              id="majorScratches"
              name="majorScratches"
              value={formData.majorScratches}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="originalPaint" className="form-label">
              Original Paint
            </label>
            <input
              type="text"
              className="form-control"
              id="originalPaint"
              name="originalPaint"
              value={formData.originalPaint}
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
              name="OEM_Specs.modelName"
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
              name="OEM_Specs.yearOfModel"
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
              name="OEM_Specs.listPrice"
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
              name="OEM_Specs.availableColors"
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
              name="OEM_Specs.powerBhp"
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
              name="OEM_Specs.maxSpeed"
              value={formData.OEM_Specs.maxSpeed}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Car Details
        </button>
      </form>
    </div>
  );
};

export default EditCar;

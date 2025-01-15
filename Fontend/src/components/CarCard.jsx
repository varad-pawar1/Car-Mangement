import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function CarCard({ car, deleteCar }) {
  const navigate = useNavigate();

  const handleEdit = (title) => {
    navigate(`/edit/${title}`);
  };

  return (
    <div className="card shadow-sm mb-5">
      <img src={car.image} className="card-img-top" alt={car.title} />
      <div className="card-body">
        <p className="card-text">
          <strong>Title:</strong> {car.title}
        </p>
        <p className="card-text">
          <strong>Model:</strong> {car.model}
        </p>
        <p className="card-text">
          <strong>Year:</strong> {car.year}
        </p>
        <p className="card-text">
          <strong>Price:</strong> {car.price}
        </p>
        <p className="card-text">
          <strong>Max Speed:</strong> {car.maxSpeed}
        </p>
        <p className="card-text">
          <strong>Mileage:</strong> {car.mileage}
        </p>
        <p className="card-text">
          <strong>Power:</strong> {car.power}
        </p>
        <div className="d-flex gap-2 align-items-center">
          <strong>Colors:</strong>
          {car.colors[0].split(" ").map((color, index) => (
            <span
              key={index}
              className="rounded-circle border"
              style={{
                backgroundColor: color,
                width: "15px",
                height: "15px",
                display: "inline-block",
              }}
            ></span>
          ))}
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between">
        {/* <button className="btn btn-info btn-sm">More Details</button> */}
        <button
          className="btn btn-warning "
          onClick={() => handleEdit(car.title)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger "
          onClick={() => deleteCar(car.title)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CarCard;

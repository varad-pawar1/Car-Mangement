import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const dummyCars = [
  {
    model: "Honda Civic",
    year: 2022,
    price: "25000 Rs",
    maxSpeed: "130 Km/h",
    mileage: "38 Km/l",
    power: "174 BHP",
    colors: ["red", "blue", "black"],
  },
  {
    model: "Toyota Camry",
    year: 2023,
    price: "30000 Rs",
    maxSpeed: "135 Km/h",
    mileage: "39 Km/l",
    power: "203 BHP",
    colors: ["white", "black"],
  },
  {
    model: "Ford Mustang",
    year: 2020,
    price: "40000 Rs",
    maxSpeed: "155 Km/h",
    mileage: "28 Km/l",
    power: "310 BHP",
    colors: ["red", "yellow", "blue"],
  },
  {
    model: "Chevrolet Cruze",
    year: 2022,
    price: "22000 Rs",
    maxSpeed: "145 Km/h",
    mileage: "36 Km/l",
    power: "153 BHP",
    colors: ["black", "gray"],
  },
];

function CarTable() {
  return (
    <div className="table-responsive">
      <h5 className="mb-3">Click On A Table Row To Choose</h5>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Max Speed</th>
            <th>Mileage</th>
            <th>Power</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {dummyCars.map((car, index) => (
            <tr key={index}>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.price}</td>
              <td>{car.maxSpeed}</td>
              <td>{car.mileage}</td>
              <td>{car.power}</td>
              <td>
                {car.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="rounded-circle border mx-1"
                    style={{
                      backgroundColor: color,
                      width: "15px",
                      height: "15px",
                      display: "inline-block",
                    }}
                  ></span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarTable;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Filters({ filters, onFilterChange, onRemoveFilters }) {
  return (
    <aside className="bg-light border rounded p-3">
      <h5>Find a Car</h5>
      <div className="mb-3">
        <label className="form-label">Min Price:</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter"
          name="minPrice"
          value={filters.minPrice}
          onChange={onFilterChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Max Price:</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={onFilterChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Min Mileage:</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter"
          name="minMileage"
          value={filters.minMileage}
          onChange={onFilterChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Max Mileage:</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter"
          name="maxMileage"
          value={filters.maxMileage}
          onChange={onFilterChange}
        />
      </div>
      <button className="btn btn-danger w-100" onClick={onRemoveFilters}>
        Remove All Filters
      </button>
    </aside>
  );
}

export default Filters;

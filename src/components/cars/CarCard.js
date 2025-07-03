import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <div className="image-container">
        <div 
          className="car-image" 
          style={{ backgroundImage: `url(${car.image})` }}
        />
        <div className="image-overlay">
          <span className="featured-badge">
            <i className="fas fa-star"></i> Featured
          </span>
          <span className="price-badge">${car.price.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="car-info">
        <div className="car-header">
          <div className="car-make-model">
            <span className="car-make">{car.make}</span>
            <span className="car-model">{car.model}</span>
          </div>
          <div className="car-year">{car.year}</div>
        </div>
        
        <div className="car-features-grid">
          <div className="car-feature">
            <i className="fas fa-tachometer-alt"></i>
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="car-feature">
            <i className="fas fa-gas-pump"></i>
            <span>{car.fuel}</span>
          </div>
          <div className="car-feature">
            <i className="fas fa-car"></i>
            <span>{car.body}</span>
          </div>
          <div className="car-feature">
            <i className="fas fa-cog"></i>
            <span>{car.transmission}</span>
          </div>
        </div>
        
        <div className="car-meta">
          <span className="car-color">
            <i className="fas fa-palette"></i> {car.color}
          </span>
          <span className="car-id">ID: {car.id}</span>
        </div>
        
        <div className="car-description">
          {car.description.substring(0, 100)}...
        </div>
        
        <Link to={`/car/${car.id}`} className="btn btn-secondary">
          View Full Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
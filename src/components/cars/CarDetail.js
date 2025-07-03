// src/components/cars/CarDetail.js
import React from 'react';

const CarDetail = ({ car }) => {
  if (!car) return <div className="loading">Loading car details...</div>;
  
  return (
    <div className="car-detail">
      <div 
        className="detail-image" 
        style={{ backgroundImage: `url(${car.image})` }}
      ></div>
      <div className="detail-info">
        <div className="detail-make">{car.make}</div>
        <div className="detail-model">{car.model}</div>
        <div className="detail-price">${car.price.toLocaleString()}</div>
        <div className="detail-description">{car.description}</div>
        
        <div className="specs-grid">
          <div className="spec">
            <i className="fas fa-calendar-alt"></i>
            <span>Year: {car.year}</span>
          </div>
          <div className="spec">
            <i className="fas fa-tachometer-alt"></i>
            <span>Mileage: {car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="spec">
            <i className="fas fa-gas-pump"></i>
            <span>Fuel: {car.fuel}</span>
          </div>
          <div className="spec">
            <i className="fas fa-car"></i>
            <span>Body: {car.body}</span>
          </div>
          <div className="spec">
            <i className="fas fa-paint-brush"></i>
            <span>Color: {car.color}</span>
          </div>
          <div className="spec">
            <i className="fas fa-cogs"></i>
            <span>Transmission: {car.transmission}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
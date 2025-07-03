// src/components/cars/CarForm.js
import React from 'react';

const CarForm = ({ 
  formData, 
  onChange, 
  onSubmit, 
  onCancel,
  isEditing 
}) => {
  return (
    <div className="admin-form">
      <h4>{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h4>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="car-make">Make *</label>
            <input 
              type="text" 
              id="car-make" 
              name="make"
              value={formData.make}
              onChange={onChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="car-model">Model *</label>
            <input 
              type="text" 
              id="car-model" 
              name="model"
              value={formData.model}
              onChange={onChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="car-year">Year *</label>
            <input 
              type="number" 
              id="car-year" 
              name="year"
              min="2000" 
              max="2025" 
              value={formData.year}
              onChange={onChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="car-price">Price ($) *</label>
            <input 
              type="number" 
              id="car-price" 
              name="price"
              value={formData.price}
              onChange={onChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="car-mileage">Mileage (mi)</label>
            <input 
              type="number" 
              id="car-mileage" 
              name="mileage"
              value={formData.mileage}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="car-fuel">Fuel Type</label>
            <select 
              id="car-fuel" 
              name="fuel"
              value={formData.fuel}
              onChange={onChange}
            >
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="car-transmission">Transmission</label>
            <select 
              id="car-transmission" 
              name="transmission"
              value={formData.transmission}
              onChange={onChange}
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="car-body">Body Style</label>
            <select 
              id="car-body" 
              name="body"
              value={formData.body}
              onChange={onChange}
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
              <option value="Truck">Truck</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="car-color">Color</label>
            <input 
              type="text" 
              id="car-color" 
              name="color"
              value={formData.color}
              onChange={onChange}
            />
          </div>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label htmlFor="car-image">Image URL</label>
            <input 
              type="text" 
              id="car-image" 
              name="image"
              value={formData.image}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="car-description">Description *</label>
          <textarea 
            id="car-description" 
            name="description"
            value={formData.description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Car' : 'Save Car'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
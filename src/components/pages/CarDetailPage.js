import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CarDetail = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!car) return <div className="loading">Loading car details...</div>;

  // Ensure we always have an array of images
  const images = car.images || [car.image || ''];
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="car-detail-page">
      <div className="gradient-background">
        <div className="gradient-overlay"></div>
        <div className="container">
          <div className="car-detail">
            {/* Image Gallery */}
            <div className="image-gallery">
              <div 
                className="main-image"
                style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
              >
                {images.length > 1 && (
                  <>
                    <button className="nav-button prev" onClick={prevImage}>
                      <FaChevronLeft />
                    </button>
                    <button className="nav-button next" onClick={nextImage}>
                      <FaChevronRight />
                    </button>
                    <div className="image-counter">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="thumbnail-container">
                  {images.map((img, index) => (
                    <div 
                      key={index}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      style={{ backgroundImage: `url(${img})` }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

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
                  <span>Mileage: {car.mileage?.toLocaleString()} mi</span>
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
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
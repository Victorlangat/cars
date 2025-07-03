import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import CarCard from '../cars/CarCard';
import { useCarService } from '../../services/carService';

const HomePage = () => {
  const { featuredCars } = useCarService();
  
  return (
    <div className="home-page">
      <div className="hero">
        <h2>Find Your Dream Car Today</h2>
        <p>Discover the perfect vehicle from our premium collection of luxury and performance cars. Exceptional quality, unbeatable prices.</p>
        <a href="/inventory" className="btn btn-primary">Browse Inventory</a>
      </div>

      <div className="featured-section">
        <div className="featured-content">
          <SectionTitle>Featured Vehicles</SectionTitle>
          <div className="featured-grid">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import CarCard from '../cars/CarCard';
import { useCarService } from '../../services/carService';

const InventoryPage = () => {
  const { cars } = useCarService();
  
  return (
    <div className="inventory-page">
      <SectionTitle>Our Inventory</SectionTitle>
      <div className="cars-grid">
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import CarCard from '../cars/CarCard';
import { useCarService } from '../../services/carService';
import { FaTrash } from 'react-icons/fa';

const InventoryPage = () => {
  const { cars, deleteCar } = useCarService(); 
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        // The carService now handles updating the cars list automatically
      } catch (error) {
        console.error('Failed to delete car:', error);
        alert('Failed to delete car');
      }
    }
  };

  return (
    <div className="inventory-page">
      <SectionTitle>Our Inventory</SectionTitle>
      <div className="cars-grid">
        {cars.map(car => (
          // Use car._id for the key as your backend uses _id from MongoDB
          <div key={car._id} className="car-card-wrapper"> 
            <CarCard car={car} />
            <button 
              onClick={() => handleDelete(car._id)} // Pass car._id to handleDelete
              className="delete-btn"
              style={{
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
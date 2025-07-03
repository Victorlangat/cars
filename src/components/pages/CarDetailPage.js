import React from 'react';
import CarDetail from '../cars/CarDetail';
import ContactForm from './ContactForm';
import { useParams } from 'react-router-dom';
import { useCarService } from '../../services/carService';

const CarDetailPage = () => {
  const { id } = useParams();
  const { getCarById } = useCarService();
  const car = getCarById(parseInt(id));
  
  return (
    <div className="car-detail-page">
      <div className="gradient-background">
        <div className="gradient-overlay"></div>
        <div className="container">
          <CarDetail car={car} />
          <ContactForm car={car} />
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
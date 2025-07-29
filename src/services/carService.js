import { useState, useEffect, useContext, createContext } from 'react';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState(() => {
    const savedCars = localStorage.getItem('carInventory');
    return savedCars ? JSON.parse(savedCars) : [
      {
        id: 1,
        make: "Mercedes-Benz",
        model: "S-Class 2023",
        year: 2023,
        price: 109900,
        mileage: 12000,
        fuel: "Hybrid",
        transmission: "Automatic",
        body: "Sedan",
        color: "Obsidian Black",
        description: "Luxury redefined...",
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753",
        featured: true
      },
      // ... other initial cars (same as before)
    ];
  });

  const featuredCars = cars.filter(car => car.featured);

  useEffect(() => {
    localStorage.setItem('carInventory', JSON.stringify(cars));
  }, [cars]);

  const getCarById = (id) => cars.find(car => car.id === id);
  
  const addCar = (carData) => {
    const newId = Math.max(...cars.map(c => c.id), 0) + 1;
    setCars(prev => [...prev, { ...carData, id: newId }]);
  };
  
  const updateCar = (id, updatedData) => {
    setCars(prev => prev.map(car => car.id === id ? { ...car, ...updatedData } : car));
  };
  
  const deleteCar = (id) => {
    setCars(prev => prev.filter(car => car.id !== id));
  };
  
  const toggleFeatured = (id) => {
    setCars(prev => prev.map(car => 
      car.id === id ? { ...car, featured: !car.featured } : car
    ));
  };

  return (
    <CarContext.Provider value={{
      cars,
      featuredCars,
      getCarById,
      addCar,
      updateCar,
      deleteCar,
      toggleFeatured
    }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarService = () => {
  const context = useContext(CarContext);
  if (!context) throw new Error('useCarService must be used within CarProvider');
  return context;
};
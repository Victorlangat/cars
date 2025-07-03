// src/services/carService.js
import { useState, useEffect, useContext, createContext } from 'react';

// Create a context for the car service
const CarContext = createContext();

// CarService provider component
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
        description: "Luxury redefined. The Mercedes-Benz S-Class sets new standards for comfort, technology and performance. With its cutting-edge driver assistance systems and premium interior, this vehicle offers an unparalleled driving experience.",
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {
        id: 2,
        make: "Porsche",
        model: "911 Carrera",
        year: 2022,
        price: 125500,
        mileage: 8000,
        fuel: "Premium",
        transmission: "Automatic",
        body: "Coupe",
        color: "Guards Red",
        description: "The iconic Porsche 911 Carrera delivers exhilarating performance with its turbocharged flat-six engine. Precision handling and timeless design make this sports car a true legend on the road.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {
        id: 3,
        make: "Land Rover",
        model: "Range Rover Sport",
        year: 2021,
        price: 89900,
        mileage: 22000,
        fuel: "Diesel",
        transmission: "Automatic",
        body: "SUV",
        color: "Santorini Black",
        description: "Combining rugged capability with refined luxury, the Range Rover Sport offers the perfect blend of off-road performance and on-road sophistication. Advanced terrain response system ensures confidence in any driving condition.",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1111&q=80"
      }
    ];
  });
  
  // Get featured cars (first 3 cars)
  const featuredCars = cars.slice(0, 3);
  
  // Save to localStorage whenever cars change
  useEffect(() => {
    localStorage.setItem('carInventory', JSON.stringify(cars));
  }, [cars]);
  
  // Get car by ID
  const getCarById = (id) => {
    return cars.find(car => car.id === id);
  };
  
  // Add a new car
  const addCar = (carData) => {
    const newId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;
    const newCar = { ...carData, id: newId };
    setCars(prevCars => [...prevCars, newCar]);
  };
  
  // Update an existing car
  const updateCar = (id, updatedData) => {
    setCars(prevCars => 
      prevCars.map(car => 
        car.id === id ? { ...car, ...updatedData } : car
      )
    );
  };
  
  // Delete a car
  const deleteCar = (id) => {
    setCars(prevCars => prevCars.filter(car => car.id !== id));
  };
  
  return (
    <CarContext.Provider
      value={{
        cars,
        featuredCars,
        getCarById,
        addCar,
        updateCar,
        deleteCar
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

// Custom hook to use the car service
export const useCarService = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarService must be used within a CarProvider');
  }
  return context;
};
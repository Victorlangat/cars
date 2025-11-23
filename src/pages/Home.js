import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Mock data for featured cars
const featuredCars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 24500,
    mileage: 15000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'New York, NY',
    isFeatured: true
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    price: 21900,
    mileage: 22000,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Los Angeles, CA',
    isFeatured: false
  },
  {
    id: 3,
    make: 'Ford',
    model: 'Mustang',
    year: 2023,
    price: 38500,
    mileage: 5000,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Miami, FL',
    isFeatured: true
  },
  {
    id: 4,
    make: 'BMW',
    model: 'X5',
    year: 2020,
    price: 42500,
    mileage: 18000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Chicago, IL',
    isFeatured: false
  }
];

const features = [
  {
    icon: '🔍',
    title: 'Easy Search',
    description: 'Find your perfect car with our advanced search and filtering options.'
  },
  {
    icon: '💰',
    title: 'Best Prices',
    description: 'Get the best deals with our competitive pricing and negotiation tools.'
  },
  {
    icon: '🛡️',
    title: 'Trusted Sellers',
    description: 'All sellers are verified to ensure a safe and secure transaction.'
  },
  {
    icon: '🚗',
    title: 'Wide Selection',
    description: 'Choose from thousands of cars from trusted sellers nationwide.'
  }
];

const Home = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>
                Find Your Perfect Car with <span className="hero-highlight">AutoMarket</span>
              </h1>
              <p className="hero-subtitle">
                Discover thousands of cars from trusted sellers. Buy and sell with confidence.
              </p>
              
              {/* Search Bar */}
              <div className="search-container">
                <div className="search-group">
                  <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search by make, model, or keyword..." 
                  />
                  <button className="search-button">
                    🔍
                  </button>
                </div>
              </div>

              <div className="hero-buttons">
                <Link to="/search" className="btn btn-primary">
                  Browse All Cars
                </Link>
                <Link to="/sell" className="btn btn-outline">
                  Sell Your Car
                </Link>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Car"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2>Why Choose AutoMarket?</h2>
            <p>We make buying and selling cars simple, safe, and convenient.</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-cars-section">
        <div className="featured-cars-container">
          <div className="section-header">
            <h2>Featured Cars</h2>
            <p>Hand-picked selection of quality vehicles</p>
          </div>

          <div className="cars-grid">
            {featuredCars.map((car) => (
              <div key={car.id} className="car-card">
                <div className="car-image">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                  />
                  {car.isFeatured && (
                    <div className="featured-badge">Featured</div>
                  )}
                </div>

                <div className="car-content">
                  <h3 className="car-title">{car.make} {car.model}</h3>
                  <p className="car-details">{car.year} • {car.mileage.toLocaleString()} miles</p>
                  <p className="car-location">{car.location}</p>
                  <p className="car-price">${car.price.toLocaleString()}</p>
                </div>

                <div className="car-footer">
                  <Link to={`/car/${car.id}`} className="btn-view-details">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/search" className="btn btn-outline">
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-card">
            <div className="cta-overlay"></div>
            <div className="cta-content">
              <h2>Ready to Sell Your Car?</h2>
              <p>
                List your car on AutoMarket and reach thousands of potential buyers. 
                It's fast, easy, and completely free.
              </p>
              <Link to="/sell" className="btn btn-cta">
                List Your Car Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

// Mock data for cars
const carsData = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 24500,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    isFeatured: true
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    price: 21900,
    mileage: 22000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    isFeatured: false
  },
  {
    id: 3,
    make: 'Ford',
    model: 'Mustang',
    year: 2023,
    price: 38500,
    mileage: 5000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    isFeatured: true
  },
  {
    id: 4,
    make: 'BMW',
    model: 'X5',
    year: 2020,
    price: 42500,
    mileage: 18000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    isFeatured: false
  },
  {
    id: 5,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 48900,
    mileage: 8000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    isFeatured: true
  },
  {
    id: 6,
    make: 'Audi',
    model: 'A4',
    year: 2021,
    price: 36500,
    mileage: 12500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Boston, MA',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    isFeatured: false
  },
  {
    id: 7,
    make: 'Mercedes',
    model: 'C-Class',
    year: 2022,
    price: 44500,
    mileage: 9500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Dallas, TX',
    image: 'https://images.unsplash.com/photo-1617814076660-2c02fbd2a4ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    isFeatured: true
  },
  {
    id: 8,
    make: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    price: 28900,
    mileage: 3000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    isFeatured: false
  }
];

const Search = () => {
  const [cars] = useState(carsData);
  const [filters, setFilters] = useState({
    make: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    fuelType: '',
    transmission: '',
    searchQuery: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  // Filter cars based on filters
  const filteredCars = cars.filter(car => {
    return (
      (filters.make === '' || car.make.toLowerCase().includes(filters.make.toLowerCase())) &&
      (filters.minPrice === '' || car.price >= parseInt(filters.minPrice)) &&
      (filters.maxPrice === '' || car.price <= parseInt(filters.maxPrice)) &&
      (filters.minYear === '' || car.year >= parseInt(filters.minYear)) &&
      (filters.maxYear === '' || car.year <= parseInt(filters.maxYear)) &&
      (filters.fuelType === '' || car.fuelType === filters.fuelType) &&
      (filters.transmission === '' || car.transmission === filters.transmission) &&
      (filters.searchQuery === '' || 
        car.make.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(filters.searchQuery.toLowerCase()))
    );
  });

  // Sort cars
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'year-new':
        return b.year - a.year;
      case 'year-old':
        return a.year - b.year;
      case 'mileage-low':
        return a.mileage - b.mileage;
      default:
        return 0;
    }
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      make: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      fuelType: '',
      transmission: '',
      searchQuery: ''
    });
    setSortBy('newest');
  };

  return (
    <div className="search-page">
      {/* Header Section */}
      <div className="search-header">
        <div className="search-header-content">
          <h1>Browse Our Car Collection</h1>
          <p>Find your perfect car from our wide selection of quality vehicles</p>
        </div>
      </div>

      <div className="search-container">
        {/* Filters Sidebar */}
        <div className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-filters" onClick={clearFilters}>
              Clear All
            </button>
          </div>

          {/* Search Box */}
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              name="searchQuery"
              placeholder="Search by make or model..."
              value={filters.searchQuery}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          {/* Make Filter */}
          <div className="filter-group">
            <label>Make</label>
            <select
              name="make"
              value={filters.make}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Makes</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="ford">Ford</option>
              <option value="bmw">BMW</option>
              <option value="tesla">Tesla</option>
              <option value="audi">Audi</option>
              <option value="mercedes">Mercedes</option>
              <option value="hyundai">Hyundai</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-inputs">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="filter-input"
              />
              <span>to</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="filter-input"
              />
            </div>
          </div>

          {/* Year Range */}
          <div className="filter-group">
            <label>Year Range</label>
            <div className="price-inputs">
              <input
                type="number"
                name="minYear"
                placeholder="Min"
                value={filters.minYear}
                onChange={handleFilterChange}
                className="filter-input"
              />
              <span>to</span>
              <input
                type="number"
                name="maxYear"
                placeholder="Max"
                value={filters.maxYear}
                onChange={handleFilterChange}
                className="filter-input"
              />
            </div>
          </div>

          {/* Fuel Type */}
          <div className="filter-group">
            <label>Fuel Type</label>
            <select
              name="fuelType"
              value={filters.fuelType}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Transmission */}
          <div className="filter-group">
            <label>Transmission</label>
            <select
              name="transmission"
              value={filters.transmission}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Transmissions</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          {/* Results Header */}
          <div className="results-header">
            <div className="results-count">
              <h3>{sortedCars.length} Cars Found</h3>
              <p>Based on your search criteria</p>
            </div>
            <div className="sort-options">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="year-new">Year (Newest)</option>
                <option value="year-old">Year (Oldest)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="mileage-low">Mileage (Low to High)</option>
              </select>
            </div>
          </div>

          {/* Cars Grid */}
          {sortedCars.length > 0 ? (
            <div className="cars-grid">
              {sortedCars.map(car => (
                <div key={car.id} className="car-card">
                  <div className="car-image">
                    <img src={car.image} alt={`${car.make} ${car.model}`} />
                    {car.isFeatured && <div className="featured-badge">Featured</div>}
                  </div>
                  
                  <div className="car-content">
                    <div className="car-header">
                      <h3 className="car-title">{car.make} {car.model}</h3>
                      <span className="car-year">{car.year}</span>
                    </div>
                    
                    <div className="car-details">
                      <div className="detail-item">
                        <span className="detail-label">Mileage:</span>
                        <span className="detail-value">{car.mileage.toLocaleString()} miles</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Fuel:</span>
                        <span className="detail-value">{car.fuelType}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Transmission:</span>
                        <span className="detail-value">{car.transmission}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{car.location}</span>
                      </div>
                    </div>
                    
                    <div className="car-price">${car.price.toLocaleString()}</div>
                    
                    <div className="car-actions">
                      <Link to={`/car/${car.id}`} className="btn-view-details">
                        View Details
                      </Link>
                      <button className="btn-save">
                        ♡ Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No cars found matching your criteria</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="btn-clear-search" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
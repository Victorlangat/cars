import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaChevronLeft, FaChevronRight, FaCalendarAlt, FaTachometerAlt, 
  FaGasPump, FaCar, FaPaintBrush, FaCogs, FaTrash 
} from 'react-icons/fa';

const CarDetail = () => {
  const { id } = useParams(); // 'id' from the URL parameter will be the MongoDB _id
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define your API base URL. It's good practice to use an environment variable.
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ensure the ID from useParams is correctly used in the API call
        const response = await axios.get(`${API_URL}/api/cars/${id}`); 
        if (!response.data) {
          throw new Error('Car not found');
        }
        setCar(response.data);
        // Reset image index if car changes or if images array is empty
        if (!response.data.images || response.data.images.length === 0) {
          setCurrentImageIndex(0); // Or set a default placeholder image if no images exist
        } else if (currentImageIndex >= response.data.images.length) {
          setCurrentImageIndex(0);
        }
      } catch (err) {
        console.error('Error fetching car details:', err);
        // Provide more user-friendly error messages based on the status code if needed
        if (err.response && err.response.status === 404) {
          setError('Car not found. It might have been deleted or the link is incorrect.');
        } else {
          setError('Failed to load car details. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) { // Only fetch if an ID is available
      fetchCar();
    }
  }, [id]); // Re-fetch when the 'id' parameter changes

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    
    try {
      // Use the fetched car's _id for deletion, not just the URL id, for robustness
      await axios.delete(`${API_URL}/api/cars/${car._id}`); 
      navigate('/inventory'); // Redirect to inventory after successful deletion
    } catch (err) {
      console.error('Failed to delete car:', err);
      setError('Failed to delete car: ' + (err.response?.data?.error || err.message));
    }
  };

  const nextImage = () => {
    if (car && car.images && car.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car && car.images && car.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  if (loading) return <div className="loading">Loading car details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  // If car is null after loading and no error, it means no car was found
  if (!car) return <div className="error">Car not found.</div>;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Image Gallery */}
        <div style={styles.gallery}>
          <div style={styles.mainImageContainer}>
            <img 
              src={car.images && car.images.length > 0 ? car.images[currentImageIndex] : '/images/default-car.jpg'} 
              alt={`${car.make} ${car.model}`} 
              style={styles.mainImage}
              onError={(e) => e.target.src = '/images/default-car.jpg'} // Fallback for broken image links
            />
            {car.images && car.images.length > 1 && (
              <>
                <button style={styles.navButtonLeft} onClick={prevImage}>
                  <FaChevronLeft />
                </button>
                <button style={styles.navButtonRight} onClick={nextImage}>
                  <FaChevronRight />
                </button>
                <div style={styles.imageCounter}>
                  {currentImageIndex + 1}/{car.images.length}
                </div>
              </>
            )}
          </div>

          {car.images && car.images.length > 1 && (
            <div style={styles.thumbnails}>
              {car.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    ...styles.thumbnail,
                    border: index === currentImageIndex ? '3px solid #1976d2' : '1px solid #ddd'
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                  onError={(e) => e.target.src = '/images/default-thumbnail.jpg'} // Fallback for broken thumbnail links
                />
              ))}
            </div>
          )}
        </div>

        {/* Car Info */}
        <div style={styles.info}>
          <h1 style={styles.title}>{car.make} {car.model}</h1>
          <h2 style={styles.price}>${car.price.toLocaleString()}</h2>
          <p style={styles.description}>{car.description}</p>
          
          <div style={styles.specs}>
            <div style={styles.specItem}>
              <FaCalendarAlt style={styles.specIcon} />
              <span>Year: {car.year}</span>
            </div>
            <div style={styles.specItem}>
              <FaTachometerAlt style={styles.specIcon} />
              <span>Mileage: {car.mileage.toLocaleString()} mi</span>
            </div>
            <div style={styles.specItem}>
              <FaGasPump style={styles.specIcon} />
              <span>Fuel: {car.fuel}</span>
            </div>
            <div style={styles.specItem}>
              <FaCar style={styles.specIcon} />
              <span>Body: {car.body}</span>
            </div>
            <div style={styles.specItem}>
              <FaPaintBrush style={styles.specIcon} />
              <span>Color: {car.color}</span>
            </div>
            <div style={styles.specItem}>
              <FaCogs style={styles.specIcon} />
              <span>Transmission: {car.transmission}</span>
            </div>
          </div>

          {car.features && car.features.length > 0 && (
            <div style={styles.featuresSection}>
              <h3 style={styles.featuresTitle}>Features</h3>
              <ul style={styles.featuresList}>
                {car.features.map((feature, index) => (
                  <li key={index} style={styles.featureItemDetail}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <button 
            onClick={handleDelete}
            style={styles.deleteButton}
          >
            <FaTrash /> Delete Car
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    padding: '30px'
  },
  gallery: {
    flex: '1',
    minWidth: '300px'
  },
  mainImageContainer: {
    position: 'relative',
    height: '400px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    marginBottom: '15px'
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  navButtonLeft: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,
    fontSize: '20px'
  },
  navButtonRight: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,
    fontSize: '20px'
  },
  imageCounter: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '14px',
    zIndex: 10
  },
  thumbnails: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    overflowX: 'auto',
    paddingBottom: '10px',
    '-webkit-overflow-scrolling': 'touch', // for smooth scrolling on iOS
    scrollbarWidth: 'thin', // For Firefox
    scrollbarColor: '#ccc #f5f5f5', // For Firefox
    '&::-webkit-scrollbar': { // For Webkit browsers
      height: '8px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ccc',
      borderRadius: '4px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f5f5f5'
    }
  },
  thumbnail: {
    width: '80px',
    height: '60px',
    borderRadius: '4px',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease, transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  info: {
    flex: '1',
    minWidth: '300px',
    paddingLeft: '20px' // Added padding for better separation
  },
  title: {
    margin: '0 0 5px 0',
    fontSize: '2.5rem',
    color: '#1e293b',
    fontWeight: '700'
  },
  price: {
    margin: '0 0 20px 0',
    color: '#3b82f6',
    fontSize: '1.8rem',
    fontWeight: '600'
  },
  description: {
    color: '#475569',
    lineHeight: '1.7',
    marginBottom: '25px',
    fontSize: '1rem'
  },
  specs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '20px'
  },
  specItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1rem',
    color: '#334155'
  },
  specIcon: {
    color: '#64748b',
    fontSize: '1.2rem'
  },
  featuresSection: {
    marginTop: '30px',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '20px'
  },
  featuresTitle: {
    fontSize: '1.5rem',
    color: '#1e293b',
    marginBottom: '15px'
  },
  featuresList: {
    listStyle: 'none',
    padding: '0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '10px'
  },
  featureItemDetail: {
    backgroundColor: '#f1f5f9',
    padding: '10px 15px',
    borderRadius: '6px',
    color: '#334155',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '&::before': {
      content: '"\\2713"', // Checkmark character
      color: '#22c55e',
      fontWeight: 'bold'
    }
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    marginTop: '30px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#dc2626',
      transform: 'translateY(-1px)'
    }
  }
};

export default CarDetail;
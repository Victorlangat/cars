import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sell.css';

const Sell = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Basic Information
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    
    // Vehicle Details
    fuelType: '',
    transmission: '',
    color: '',
    vin: '',
    
    // Additional Information
    description: '',
    features: [],
    
    // Contact Information
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    location: '',
    
    // Images
    images: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreviews, setImagePreviews] = useState([]);

  const carMakes = [
    'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 
    'Tesla', 'Hyundai', 'Kia', 'Nissan', 'Chevrolet', 'Volkswagen',
    'Subaru', 'Mazda', 'Lexus', 'Jeep', 'Volvo', 'Porsche', 'Other'
  ];

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Automatic', 'Manual'];
  const featuresList = [
    'Air Conditioning', 'Bluetooth', 'Backup Camera', 'Navigation System',
    'Sunroof/Moonroof', 'Leather Seats', 'Heated Seats', 'Apple CarPlay',
    'Android Auto', 'Keyless Entry', 'Push Button Start', 'Alloy Wheels',
    'Third Row Seating', 'Towing Package', 'Premium Sound System'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          features: [...prev.features, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          features: prev.features.filter(feature => feature !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 10) {
      alert('Maximum 10 images allowed');
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData(prev => ({ ...prev, images: newImages }));

    // Create image previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setFormData(prev => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Simulate successful submission
    alert('Your car has been listed successfully!');
    navigate('/');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.make && formData.model && formData.year && formData.price && formData.mileage;
      case 2:
        return formData.fuelType && formData.transmission && formData.color;
      case 3:
        return formData.contactName && formData.contactEmail && formData.contactPhone && formData.location;
      default:
        return true;
    }
  };

  return (
    <div className="sell-page">
      {/* Header Section */}
      <div className="sell-header">
        <div className="sell-header-content">
          <h1>Sell Your Car with AutoMarket</h1>
          <p>Reach thousands of buyers and sell your car fast</p>
        </div>
      </div>

      <div className="sell-container">
        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-steps">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className={`progress-step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
                <div className="step-number">{step}</div>
                <div className="step-label">
                  {step === 1 && 'Basic Info'}
                  {step === 2 && 'Details'}
                  {step === 3 && 'Contact'}
                  {step === 4 && 'Photos'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="sell-form">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Basic Information</h2>
              <p>Tell us about your vehicle</p>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="make">Make *</label>
                  <select
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Make</option>
                    {carMakes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="model">Model *</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="e.g., Camry, Civic, Mustang"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year">Year *</label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    placeholder="e.g., 2022"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price ($) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="e.g., 25000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mileage">Mileage *</label>
                  <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="e.g., 15000"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Vehicle Details */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>Vehicle Details</h2>
              <p>Add more details about your car</p>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fuelType">Fuel Type *</label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Fuel Type</option>
                    {fuelTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="transmission">Transmission *</label>
                  <select
                    id="transmission"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Transmission</option>
                    {transmissions.map(trans => (
                      <option key={trans} value={trans}>{trans}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="color">Color *</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="e.g., Red, Black, White"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="vin">VIN (Optional)</label>
                  <input
                    type="text"
                    id="vin"
                    name="vin"
                    value={formData.vin}
                    onChange={handleInputChange}
                    placeholder="Vehicle Identification Number"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Features & Options</label>
                <div className="features-grid">
                  {featuresList.map(feature => (
                    <label key={feature} className="feature-checkbox">
                      <input
                        type="checkbox"
                        value={feature}
                        checked={formData.features.includes(feature)}
                        onChange={handleInputChange}
                      />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your car's condition, maintenance history, and any special features..."
                  rows="4"
                />
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>Contact Information</h2>
              <p>How can buyers reach you?</p>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="contactName">Your Name *</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactEmail">Email *</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="e.g., john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactPhone">Phone *</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="e.g., (555) 123-4567"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., New York, NY"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Photos */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2>Add Photos</h2>
              <p>Upload clear photos of your car (up to 10 images)</p>

              <div className="image-upload-section">
                <div className="upload-area">
                  <input
                    type="file"
                    id="car-images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                  <label htmlFor="car-images" className="upload-label">
                    <div className="upload-icon">📷</div>
                    <h3>Click to upload photos</h3>
                    <p>or drag and drop</p>
                    <span>PNG, JPG, JPEG up to 10MB each</span>
                  </label>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="image-previews">
                    <h4>Uploaded Photos ({imagePreviews.length}/10)</h4>
                    <div className="previews-grid">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="image-preview">
                          <img src={preview} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-image"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn-secondary">
                ← Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button 
                type="button" 
                onClick={nextStep} 
                className="btn-primary"
                disabled={!isStepValid()}
              >
                Next →
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn-submit"
                disabled={formData.images.length === 0}
              >
                🚀 List My Car
              </button>
            )}
          </div>
        </form>

        {/* Tips Sidebar */}
        <div className="tips-sidebar">
          <h3>💡 Selling Tips</h3>
          <div className="tip-item">
            <h4>Price Right</h4>
            <p>Research similar cars in your area to set a competitive price.</p>
          </div>
          <div className="tip-item">
            <h4>Clear Photos</h4>
            <p>Take photos in good lighting from multiple angles.</p>
          </div>
          <div className="tip-item">
            <h4>Be Honest</h4>
            <p>Describe any issues or recent repairs accurately.</p>
          </div>
          <div className="tip-item">
            <h4>Quick Response</h4>
            <p>Respond to inquiries promptly to sell faster.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
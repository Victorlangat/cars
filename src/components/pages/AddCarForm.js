import React, { useState, useEffect } from 'react'; // Added useEffect
import { useNavigate } from 'react-router-dom';
// axios removed as it's handled by useCarService now
import { FaSave, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Accept onSubmit, onCancel, initialData, and isEditing props
const AddCarForm = ({ onSubmit, onCancel, initialData, isEditing }) => {
  const [formData, setFormData] = useState(initialData || { // Initialize with initialData
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuel: 'Gasoline',
    body: 'Sedan',
    color: '',
    transmission: 'Automatic',
    description: '',
    images: [''], // Changed from 'image' to 'images' for consistency with backend
    features: []
  });

  const [error, setError] = useState('');
  const [isSubmittingInternal, setIsSubmittingInternal] = useState(false); // Renamed to avoid prop clash
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // This navigate might not be needed if parent handles it

  // Update form data when initialData prop changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        images: initialData.images && initialData.images.length > 0 ? initialData.images : [''] // Ensure images is an array
      });
    } else {
        // Reset form for adding new car if no initialData is provided
        setFormData({
            make: '', model: '', year: '', price: '', mileage: '', fuel: 'Gasoline',
            body: 'Sedan', color: '', transmission: 'Automatic', description: '',
            images: [''], features: []
        });
    }
  }, [initialData]);


  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image URL changes (consistent with array)
  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  // Add new image field
  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  // Remove image field
  const removeImageField = (index) => {
    // Ensure there's always at least one empty image field
    if (formData.images.length === 1 && formData.images[0].trim() === '') return;
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages.length > 0 ? newImages : [''] }));
  };

  // Handle feature toggle
  const toggleFeature = (feature) => {
    setFormData(prev => {
      const newFeatures = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features: newFeatures };
    });
  };

  // Validate form data
  const validateForm = () => {
    setError(''); // Clear previous errors
    const requiredFields = ['make', 'model', 'year', 'price', 'mileage', 'fuel', 'body', 'color', 'transmission'];
    for (const field of requiredFields) {
      if (!formData[field] || String(formData[field]).trim() === '') { // Also check for empty strings after trim
        setError(`Please fill in the ${field} field`);
        return false;
      }
    }

    const validImages = formData.images.filter(url => url.trim() !== '');
    if (validImages.length === 0) {
      setError('At least one image URL is required');
      return false;
    }

    if (isNaN(formData.year) || parseInt(formData.year) <= 1900 || parseInt(formData.year) > new Date().getFullYear() + 1) {
      setError('Year must be a valid number (e.g., 2023)');
      return false;
    }
    
    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('Price must be a valid positive number');
      return false;
    }

    if (isNaN(formData.mileage) || parseInt(formData.mileage) < 0) {
      setError('Mileage must be a valid non-negative number');
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!validateForm()) return;

    setIsSubmittingInternal(true);

    try {
      const carData = {
        make: formData.make.trim(),
        model: formData.model.trim(),
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
        mileage: parseInt(formData.mileage),
        fuel: formData.fuel,
        body: formData.body,
        color: formData.color.trim(),
        transmission: formData.transmission,
        description: formData.description.trim(),
        images: formData.images.filter(url => url.trim() !== ''), // Ensure only valid URLs are sent
        features: formData.features,
        // createdAt and updatedAt will be handled by the backend
      };

      // Call the onSubmit prop passed from AdminDashboard
      await onSubmit(carData); 
      
      toast.success(`Car ${isEditing ? 'updated' : 'added'} successfully!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      setSuccess(true);
      // Navigation will be handled by AdminDashboard via onCancel or onSubmit success callback
      // setTimeout(() => navigate('/inventory'), 1500); // Removed direct navigation
    } catch (err) {
      console.error('Save error:', err);
      toast.error(err.response?.data?.message || err.message || `Failed to ${isEditing ? 'update' : 'add'} car`, {
        position: "top-center"
      });
      setError(err.response?.data?.error || err.message || `Failed to ${isEditing ? 'update' : 'add'} car`);
    } finally {
      setIsSubmittingInternal(false);
    }
  };

  // Handle cancel (delegated to parent)
  const handleCancelClick = () => { // Renamed to avoid prop clash
    onCancel();
  };

  const availableFeatures = [
    'Air Conditioning', 'Bluetooth', 'Navigation', 'Sunroof', 'Leather Seats',
    'Heated Seats', 'Backup Camera', 'Keyless Entry', 'Adaptive Cruise Control',
    'Lane Keeping Assist', 'Blind Spot Monitoring', 'Panoramic Roof', 'Heads-Up Display'
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isEditing ? 'Edit Vehicle' : 'Add New Car to Inventory'}</h2>
      
      {error && (
        <div style={styles.errorAlert}>
          <FaTimes style={{ marginRight: '10px' }} />
          {error}
        </div>
      )}

      {success && (
        <div style={styles.successAlert}>
          <FaCheckCircle style={{ marginRight: '10px' }} />
          Car {isEditing ? 'updated' : 'saved'} successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          {/* Basic Information Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Basic Information</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Make*</label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Model*</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Year*</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={styles.input}
                min="1900"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>
          </div>

          {/* Pricing & Mileage Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Pricing & Mileage</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Price ($)*</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                style={styles.input}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Mileage*</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                style={styles.input}
                min="0"
                required
              />
            </div>
          </div>

          {/* Specifications Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Specifications</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Fuel Type*</label>
              <select
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Body Type*</label>
              <select
                name="body"
                value={formData.body}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Color*</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Transmission*</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
              </select>
            </div>
          </div>

          {/* Features Section */}
          <div style={{ ...styles.section, gridColumn: '1 / -1' }}>
            <h3 style={styles.sectionTitle}>Features</h3>
            <div style={styles.featuresGrid}>
              {availableFeatures.map(feature => (
                <div key={feature} style={styles.featureItem}>
                  <input
                    type="checkbox"
                    id={`feature-${feature}`}
                    checked={formData.features.includes(feature)}
                    onChange={() => toggleFeature(feature)}
                    style={styles.checkbox}
                  />
                  <label htmlFor={`feature-${feature}`} style={styles.featureLabel}>
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div style={{ ...styles.section, gridColumn: '1 / -1' }}>
            <h3 style={styles.sectionTitle}>Description</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              rows="5"
              placeholder="Enter detailed description of the car..."
            />
          </div>

          {/* Images Section */}
          <div style={{ ...styles.section, gridColumn: '1 / -1' }}>
            <h3 style={styles.sectionTitle}>Images</h3>
            <p style={styles.sectionSubtitle}>Add image URLs (minimum 1 required)</p>
            {formData.images.map((url, index) => (
              <div key={index} style={styles.imageInputGroup}>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  style={styles.input}
                  placeholder="https://example.com/car-image.jpg"
                  required={index === 0}
                />
                {(formData.images.length > 1 || (formData.images.length === 1 && formData.images[0].trim() !== '')) && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    style={styles.removeImageButton}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              style={styles.addImageButton}
            >
              + Add Another Image URL
            </button>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleCancelClick} // Use internal handler
            style={styles.cancelButton}
            disabled={isSubmittingInternal}
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="submit"
            style={styles.submitButton}
            disabled={isSubmittingInternal}
          >
            {isSubmittingInternal ? 'Saving...' : (
              <>
                <FaSave /> {isEditing ? 'Update Vehicle' : 'Save to Inventory'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Styles remain the same (omitted for brevity)
const styles = {
    container: {
      padding: '32px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#f8fafc'
    },
    title: {
      marginBottom: '32px',
      fontSize: '28px',
      color: '#1e293b',
      fontWeight: '600',
      textAlign: 'center',
      position: 'relative',
      paddingBottom: '12px',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '4px',
        backgroundColor: '#3b82f6',
        borderRadius: '2px'
      }
    },
    errorAlert: {
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '24px',
      borderLeft: '4px solid #dc2626',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    successAlert: {
      backgroundColor: '#dcfce7',
      color: '#16a34a',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '24px',
      borderLeft: '4px solid #16a34a',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    form: {
      backgroundColor: '#ffffff',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '32px',
      marginBottom: '32px'
    },
    section: {
      backgroundColor: '#f8fafc',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    sectionTitle: {
      marginTop: '0',
      marginBottom: '16px',
      fontSize: '18px',
      color: '#334155',
      fontWeight: '600'
    },
    sectionSubtitle: {
      marginTop: '-12px',
      marginBottom: '16px',
      fontSize: '14px',
      color: '#64748b'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#334155',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #cbd5e1',
      borderRadius: '6px',
      fontSize: '15px',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      '&:focus': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59,130,246,0.1)',
        outline: 'none'
      }
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #cbd5e1',
      borderRadius: '6px',
      fontSize: '15px',
      backgroundColor: '#ffffff',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg width=\'12\' height=\'12\' viewBox=\'0 0 4 5\' xmlns=\'http://www.w3.org/2000/svg\'><path fill=\'%23333\' d=\'M2 0L0 2h4zm0 5L0 3h4z\'/></svg>")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      backgroundSize: '8px 10px',
      transition: 'all 0.2s ease',
      '&:focus': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59,130,246,0.1)',
        outline: 'none'
      }
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #cbd5e1',
      borderRadius: '6px',
      fontSize: '15px',
      resize: 'vertical',
      minHeight: '120px',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      '&:focus': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59,130,246,0.1)',
        outline: 'none'
      }
    },
    imageInputGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '12px'
    },
    removeImageButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '10px 12px',
      cursor: 'pointer',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#dc2626',
        transform: 'scale(1.05)'
      }
    },
    addImageButton: {
      backgroundColor: 'transparent',
      color: '#3b82f6',
      border: '1px dashed #3b82f6',
      borderRadius: '6px',
      padding: '10px 16px',
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: '8px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#f1f5f9',
        borderStyle: 'solid'
      }
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '12px'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      accentColor: '#3b82f6',
      cursor: 'pointer'
    },
    featureLabel: {
      cursor: 'pointer',
      fontSize: '14px',
      color: '#334155'
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '16px',
      marginTop: '24px',
      borderTop: '1px solid #f1f5f9',
      paddingTop: '24px'
    },
    cancelButton: {
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      padding: '12px 24px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '15px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#e2e8f0',
        color: '#475569'
      }
    },
    submitButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '12px 24px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '15px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#2563eb',
        transform: 'translateY(-1px)'
      },
      '&:disabled': {
        backgroundColor: '#94a3b8',
        cursor: 'not-allowed',
        transform: 'none'
      }
    },
    // Responsive adjustments
    '@media (max-width: 768px)': {
      container: {
        padding: '24px 16px'
      },
      form: {
        padding: '24px 16px'
      },
      formGrid: {
        gridTemplateColumns: '1fr'
      },
      buttonGroup: {
        flexDirection: 'column-reverse',
        gap: '12px'
      },
      cancelButton: {
        width: '100%',
        justifyContent: 'center'
      },
      submitButton: {
        width: '100%',
        justifyContent: 'center'
      }
    }
  };
export default AddCarForm;
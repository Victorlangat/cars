import React, { useState, useEffect, useCallback } from 'react';
import { FaCar, FaPlus, FaChartBar, FaCog, FaUser, FaSignOutAlt, FaEdit, FaTrash, FaEnvelope, FaCheck, FaTimes, FaBars, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
import Button from '../ui/Button';
import { useCarService } from '../../services/carService';
import AddCarForm from './AddCarForm';  
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { cars, addCar, updateCar, deleteCar, getCarById } = useCarService(); // Added getCarById
  const [formData, setFormData] = useState({
    _id: null, // Changed from 'id' to '_id' for backend consistency
    make: '',
    model: '',
    year: '', // Changed to empty string to allow initial data from service
    price: '', // Changed to empty string
    mileage: '', // Changed to empty string
    fuel: 'Gasoline',
    transmission: 'Automatic',
    body: 'Sedan',
    color: '',
    images: [''], // Changed from 'image' to 'images' for consistency
    description: '',
    features: [] // Added features
  });
  const [editingId, setEditingId] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/inquiries`);
        setInquiries(await response.json());
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setLoadingInquiries(false);
      }
    };
    if (activeTab === 'inquiries' || activeTab === 'dashboard') fetchInquiries();
  }, [activeTab]);

  const handleEdit = useCallback((carId) => { // Accept carId
    const carToEdit = getCarById(carId); // Fetch car data using getCarById
    if (carToEdit) {
      setFormData({
        _id: carToEdit._id,
        make: carToEdit.make,
        model: carToEdit.model,
        year: carToEdit.year,
        price: carToEdit.price,
        mileage: carToEdit.mileage,
        fuel: carToEdit.fuel,
        transmission: carToEdit.transmission,
        body: carToEdit.body,
        color: carToEdit.color,
        images: carToEdit.images || [''], // Ensure images is an array
        description: carToEdit.description,
        features: carToEdit.features || []
      });
      setEditingId(carId);
      setActiveTab('add-edit');
      setMobileMenuOpen(false);
    }
  }, [getCarById]); // Dependency on getCarById

  const handleCancel = useCallback(() => {
    setFormData({
      _id: null,
      make: '', model: '', year: '', price: '', mileage: '', fuel: 'Gasoline',
      body: 'Sedan', color: '', transmission: 'Automatic', description: '',
      images: [''], features: []
    });
    setEditingId(null);
  }, []);

  const updateInquiryStatus = async (id, status) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setInquiries(inquiries.map(inq => inq._id === id ? { ...inq, status } : inq));
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/inquiries/${id}`, {
        method: 'DELETE'
      });
      setInquiries(inquiries.filter(inq => inq._id !== id));
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const stats = {
    totalCars: cars.length,
    featuredCars: cars.filter(car => car.featured).length,
    averagePrice: cars.reduce((sum, car) => sum + car.price, 0) / (cars.length || 1),
    newInquiries: inquiries.filter(i => i.status === 'new').length
  };

  const navItems = [
    { id: 'dashboard', icon: <FaChartBar />, label: 'Dashboard' },
    { id: 'inventory', icon: <FaCar />, label: 'Inventory' },
    { id: 'add-edit', icon: <FaPlus />, label: 'Add Vehicle' },
    { id: 'inquiries', icon: <FaEnvelope />, label: 'Inquiries' }
  ];

  const DashboardContent = () => (
    <div className="dashboard-content">
      <div className={`stats-grid ${isMobile ? 'mobile' : ''}`}>
        {[
          { icon: <FaCar />, value: stats.totalCars, label: 'Total Vehicles' },
          { icon: <FaCar />, value: stats.featuredCars, label: 'Featured Vehicles' },
          { icon: <FaChartBar />, value: `$${Math.round(stats.averagePrice).toLocaleString()}`, label: 'Avg. Price' },
          { icon: <FaEnvelope />, value: stats.newInquiries, label: 'New Inquiries' }
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const InquiriesContent = () => (
    <div className="inquiries-content">
      {loadingInquiries ? (
        <div className="loading">Loading inquiries...</div>
      ) : inquiries.length === 0 ? (
        <div className="no-inquiries">
          <FaEnvelope />
          <p>No customer inquiries yet</p>
        </div>
      ) : (
        <div className="inquiries-list-container">
          {inquiries.map(inquiry => (
            <div key={inquiry._id} className={`inquiry-card ${inquiry.status}`}>
              <div className="inquiry-header">
                <h4>{inquiry.name}</h4>
                <span className={`status-badge ${inquiry.status}`}>
                  {inquiry.status}
                </span>
              </div>
              <div className="inquiry-details">
                <p><strong>Email:</strong> {inquiry.email}</p>
                {inquiry.phone && <p><strong>Phone:</strong> {inquiry.phone}</p>}
                {inquiry.car && <p><strong>Car:</strong> {inquiry.car.make} {inquiry.car.model}</p>}
                <p><strong>Message:</strong></p>
                <div className="message">{inquiry.message}</div>
              </div>
              <div className="inquiry-footer">
                <span className="date">
                  {new Date(inquiry.createdAt).toLocaleString()}
                </span>
                <div className="actions">
                  {inquiry.status === 'new' && (
                    <>
                      <Button onClick={() => updateInquiryStatus(inquiry._id, 'contacted')}>
                        <FaCheck /> Contacted
                      </Button>
                      <Button onClick={() => updateInquiryStatus(inquiry._id, 'rejected')}>
                        <FaTimes /> Reject
                      </Button>
                    </>
                  )}
                  <Button onClick={() => window.confirm('Delete inquiry?') && deleteInquiry(inquiry._id)}>
                    <FaTrash /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const InventoryContent = () => (
    <div className="inventory-content">
      <div className="content-header">
        <h2>Vehicle Inventory</h2>
        <Button onClick={() => { 
          handleCancel(); // Reset form for new car
          setActiveTab('add-edit'); 
          setMobileMenuOpen(false); 
        }}>
          <FaPlus /> Add New Car
        </Button>
      </div>
      {cars.length === 0 ? (
        <div className="no-cars">
          <FaCar />
          <p>No cars in inventory</p>
        </div>
      ) : (
        <div className={`cars-grid ${isMobile ? 'mobile' : ''}`}>
          {cars.map(car => (
            <div key={car._id} className="car-card"> {/* Use car._id here */}
              {/* Ensure car.images[0] is used for display if it's an array */}
              <div className="car-image" style={{ backgroundImage: `url(${car.images && car.images[0] || ''})` }} />
              <div className="car-info">
                <h4>{car.make} {car.model}</h4>
                <p>${car.price.toLocaleString()}</p>
                <div className="car-actions">
                  <Button onClick={() => handleEdit(car._id)}> {/* Pass car._id to handleEdit */}
                    <FaEdit /> Edit
                  </Button>
                  <Button onClick={() => window.confirm('Delete this car?') && deleteCar(car._id)}> {/* Pass car._id to deleteCar */}
                    <FaTrash /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const FormContent = () => (
    <AddCarForm
      onSubmit={(data) => {
        editingId ? updateCar(editingId, data) : addCar(data);
        handleCancel();
        setActiveTab('inventory');
      }}
      onCancel={() => {
        handleCancel();
        setActiveTab('inventory');
      }}
      // Pass the formData with _id for editing
      initialData={editingId ? getCarById(editingId) : formData}
      isEditing={!!editingId}
    />
  );

  return (
    <div className={`admin-dashboard ${isMobile ? 'mobile' : ''}`}>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <FaCar className="brand-icon" />
            <h1>Linnka Motors</h1>
          </div>

          {isMobile ? (
            <button 
              className="mobile-menu-button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimesCircle /> : <FaBars />}
            </button>
          ) : (
            <div className="nav-menu">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {isMobile && mobileMenuOpen && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu-content">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`mobile-nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => { 
                    setActiveTab(item.id); 
                    setMobileMenuOpen(false); 
                  }}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span className="mobile-nav-label">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      <main className="main-content">
        <div className="content-header">
          <h2>
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'inventory' && 'Vehicle Inventory'}
            {activeTab === 'inquiries' && 'Customer Inquiries'}
            {activeTab === 'add-edit' && (editingId ? 'Edit Vehicle' : 'Add New Vehicle')}
          </h2>
        </div>
        
        {activeTab === 'dashboard' && <DashboardContent />}
        {activeTab === 'inquiries' && <InquiriesContent />}
        {activeTab === 'inventory' && <InventoryContent />}
        {activeTab === 'add-edit' && <FormContent />}
      </main>
    </div>
  );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { FaCar, FaPlus, FaChartBar, FaCog, FaUser, FaSignOutAlt, FaEdit, FaTrash, FaEnvelope, FaCheck, FaTimes, FaBars, FaTimesCircle } from 'react-icons/fa';
import CarForm from '../cars/CarForm';
import Button from '../ui/Button';
import { useCarService } from '../../services/carService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { cars, addCar, updateCar, deleteCar } = useCarService();
  const [formData, setFormData] = useState({
    id: '',
    make: '',
    model: '',
    year: 2023,
    price: '',
    mileage: '',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    body: 'Sedan',
    color: '',
    image: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/inquiries`);
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setLoadingInquiries(false);
      }
    };
    
    if (activeTab === 'inquiries' || activeTab === 'dashboard') {
      fetchInquiries();
    }
  }, [activeTab]);

  // Handlers
  const handleEdit = (car) => {
    setFormData({
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuel: car.fuel,
      transmission: car.transmission,
      body: car.body,
      color: car.color,
      image: car.image,
      description: car.description
    });
    setEditingId(car.id);
    setActiveTab('add-edit');
    setMobileMenuOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      make: '',
      model: '',
      year: 2023,
      price: '',
      mileage: '',
      fuel: 'Gasoline',
      transmission: 'Automatic',
      body: 'Sedan',
      color: '',
      image: '',
      description: ''
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateCar(editingId, formData);
    } else {
      addCar(formData);
    }
    handleCancel();
    setActiveTab('inventory');
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        setInquiries(inquiries.map(inq => 
          inq._id === id ? { ...inq, status } : inq
        ));
      }
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/inquiries/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setInquiries(inquiries.filter(inq => inq._id !== id));
      } else {
        throw new Error('Failed to delete inquiry');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  // Stats calculation
  const stats = {
    totalCars: cars.length,
    featuredCars: cars.filter(car => car.featured).length,
    averagePrice: cars.length ? Math.round(cars.reduce((sum, car) => sum + car.price, 0) / cars.length) : 0,
    newInquiries: inquiries.filter(i => i.status === 'new').length
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', icon: <FaChartBar />, label: 'Dashboard' },
    { id: 'inventory', icon: <FaCar />, label: 'Inventory' },
    { id: 'add-edit', icon: <FaPlus />, label: 'Add Vehicle' },
    { id: 'inquiries', icon: <FaEnvelope />, label: 'Inquiries' }
  ];

  // Componentized sections
  const DashboardContent = () => (
    <div className="dashboard-content">
      <div className={`stats-grid ${isMobile ? 'mobile' : ''}`}>
        {[
          { icon: <FaCar />, value: stats.totalCars, label: 'Total Vehicles' },
          { icon: <FaCar />, value: stats.featuredCars, label: 'Featured Vehicles' },
          { icon: <FaChartBar />, value: `$${stats.averagePrice.toLocaleString()}`, label: 'Avg. Price' },
          { icon: <FaEnvelope />, value: stats.newInquiries, label: 'New Inquiries' }
        ].map((stat, index) => (
          <div key={index} className="stat-card">
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
                      <Button 
                        onClick={() => updateInquiryStatus(inquiry._id, 'contacted')}
                        icon={<FaCheck />}
                      >
                        Contacted
                      </Button>
                      <Button 
                        onClick={() => updateInquiryStatus(inquiry._id, 'rejected')}
                        icon={<FaTimes />}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this inquiry?')) {
                        deleteInquiry(inquiry._id);
                      }
                    }}
                    icon={<FaTrash />}
                  >
                    Delete
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
        <h2>Current Inventory</h2>
        <Button 
          onClick={() => {
            setActiveTab('add-edit');
            setMobileMenuOpen(false);
          }}
          icon={<FaPlus />}
        >
          Add New Car
        </Button>
      </div>
      
      {cars.length === 0 ? (
        <div className="no-cars">
          <FaCar />
          <p>No cars in inventory. Add a new car to get started.</p>
        </div>
      ) : (
        <div className={`cars-grid ${isMobile ? 'mobile' : ''}`}>
          {cars.map(car => (
            <div key={car.id} className="car-card">
              <div 
                className="car-image" 
                style={{ backgroundImage: `url(${car.image})` }}
              ></div>
              <div className="car-info">
                <h4>{car.make} {car.model}</h4>
                <p>${car.price.toLocaleString()}</p>
                <div className="car-actions">
                  <Button 
                    onClick={() => handleEdit(car)}
                    icon={<FaEdit />}
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this car?')) {
                        deleteCar(car.id);
                      }
                    }}
                    icon={<FaTrash />}
                  >
                    Delete
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
    <div className="form-content">
      <div className="content-header">
        <h2>{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
        <Button 
          onClick={() => {
            handleCancel();
            setActiveTab('inventory');
          }}
        >
          Back to Inventory
        </Button>
      </div>
      <CarForm 
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          handleCancel();
          setActiveTab('inventory');
        }}
        isEditing={!!editingId}
      />
    </div>
  );

  return (
    <div className={`admin-dashboard ${isMobile ? 'mobile' : ''}`}>
      {/* Responsive Navbar */}
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

        {/* Mobile menu overlay */}
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
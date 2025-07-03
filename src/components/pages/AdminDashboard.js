import React, { useState } from 'react';
import { FaCar, FaPlus, FaChartBar, FaCog, FaUser, FaSignOutAlt, FaEdit, FaTrash } from 'react-icons/fa';
import CarForm from '../cars/CarForm';
import Button from '../ui/Button';
import { useCarService } from '../../services/carService';

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
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Calculate stats based on car data
  const stats = {
    totalCars: cars.length,
    featuredCars: cars.filter(car => car.featured).length,
    averagePrice: cars.length ? Math.round(cars.reduce((sum, car) => sum + car.price, 0) / cars.length) : 0,
    newLeads: 12 // Static for now
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      updateCar(editingId, formData);
      setEditingId(null);
    } else {
      addCar(formData);
    }
    
    // Reset form
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
    
    // Return to inventory view
    setActiveTab('inventory');
  };
  
  const handleEdit = (car) => {
    setFormData(car);
    setEditingId(car.id);
    setActiveTab('add-edit');
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteCar(id);
      if (editingId === id) {
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
      }
    }
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
    setActiveTab('inventory');
  };
  
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-overview">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(233, 79, 62, 0.1)' }}>
                  <FaCar style={{ color: '#e94f3e' }} />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalCars}</h3>
                  <p>Total Vehicles</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(76, 175, 80, 0.1)' }}>
                  <FaCar style={{ color: '#4CAF50' }} />
                </div>
                <div className="stat-info">
                  <h3>{stats.featuredCars}</h3>
                  <p>Featured Vehicles</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(33, 150, 243, 0.1)' }}>
                  <FaChartBar style={{ color: '#2196F3' }} />
                </div>
                <div className="stat-info">
                  <h3>${stats.averagePrice.toLocaleString()}</h3>
                  <p>Avg. Price</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                  <FaUser style={{ color: '#FFC107' }} />
                </div>
                <div className="stat-info">
                  <h3>{stats.newLeads}</h3>
                  <p>New Leads</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'inventory':
        return (
          <div className="admin-inventory">
            <div className="admin-header">
              <h3>Current Inventory</h3>
              <Button 
                variant="primary" 
                onClick={() => setActiveTab('add-edit')}
                icon={<FaPlus style={{ marginRight: '8px' }} />}
              >
                Add New Car
              </Button>
            </div>
            
            <div className="admin-cars-list">
              {cars.length > 0 ? (
                <div className="admin-cars-grid">
                  {cars.map(car => (
                    <div className="admin-car-card" key={car.id}>
                      <div 
                        className="admin-car-image" 
                        style={{ backgroundImage: `url(${car.image})` }}
                      ></div>
                      <div className="admin-car-info">
                        <div className="admin-car-make">{car.make}</div>
                        <div className="admin-car-model">{car.model}</div>
                        <div className="admin-car-price">${car.price.toLocaleString()}</div>
                        <div className="admin-actions">
                          <Button 
                            variant="secondary" 
                            onClick={() => handleEdit(car)}
                            icon={<FaEdit />}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="danger" 
                            onClick={() => handleDelete(car.id)}
                            icon={<FaTrash />}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-cars">
                  <FaCar className="no-cars-icon" />
                  <p>No cars in inventory. Add a new car to get started.</p>
                  <Button 
                    variant="primary" 
                    onClick={() => setActiveTab('add-edit')}
                    icon={<FaPlus />}
                  >
                    Add Your First Car
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'add-edit':
        return (
          <div className="admin-form-section">
            <div className="admin-header">
              <h3>{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
              <Button 
                variant="secondary" 
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
        
      default:
        return <div>Select a section</div>;
    }
  };
  
  return (
    <div className="admin-dashboard-container">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <FaCar />
            </div>
            <h2>Linnka Motors</h2>
          </div>
          <p>Admin Dashboard</p>
        </div>
        
        <div className="sidebar-menu">
          <button 
            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartBar className="menu-icon" />
            <span>Dashboard</span>
          </button>
          
          <button 
            className={`menu-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <FaCar className="menu-icon" />
            <span>Inventory</span>
          </button>
          
          <button 
            className={`menu-item ${activeTab === 'add-edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-edit')}
          >
            <FaPlus className="menu-icon" />
            <span>Add Vehicle</span>
          </button>
        </div>
        
        <div className="sidebar-footer">
          <button className="menu-item">
            <FaCog className="menu-icon" />
            <span>Settings</span>
          </button>
          <button className="menu-item logout">
            <FaSignOutAlt className="menu-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="admin-main">
        <div className="page-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import InventoryPage from './components/pages/InventoryPage';
import CarDetailPage from './components/pages/CarDetailPage';
import AdminDashboard from './components/pages/AdminDashboard';
import AboutPage from './components/pages/AboutPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        
        <div className="main-content">
          <div className="page-container">
            <div className="page-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/car/:id" element={<CarDetailPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
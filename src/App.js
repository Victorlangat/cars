import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Sell from './pages/Sell';
import Login from './pages/Login'; // ✅ Import actual Login
import Register from './pages/Register'; // ✅ Import actual Register
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/login" element={<Login />} /> {/* ✅ Now using real Login */}
            <Route path="/register" element={<Register />} /> {/* ✅ Now using real Register */}
          </Routes>
        </main>
        <div style={{ background: '#f7fafc', padding: '2rem', textAlign: 'center' }}>
          <p>AutoMarket Footer</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
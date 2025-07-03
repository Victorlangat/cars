// src/components/pages/ContactForm.js
import React, { useState } from 'react';

const ContactForm = ({ car }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in the ${car ? `${car.make} ${car.model}` : 'vehicle'}. Please contact me with more information.`
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const recipientEmail = 'linnkamotors@gmail.com'; // New: Our recipient email
    const subject = `Inquiry about ${car ? `${car.make} ${car.model}` : 'a vehicle'}`; // New: Email Subject
    const body = `
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      
      Message:
      ${formData.message}
    `; // New: Email Body

    // Open default email client with pre-filled details
    window.open(`mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);

    alert('Thank you for your inquiry! Your email client should open shortly with pre-filled details. Please send the email to complete your inquiry.');
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: `I'm interested in the ${car ? `${car.make} ${car.model}` : 'vehicle'}. Please contact me with more information.`
    });
  };
  
  return (
    <div className="contact-form">
      <h4>Contact Seller</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Send Inquiry</button>
      </form>
    </div>
  );
};

export default ContactForm;
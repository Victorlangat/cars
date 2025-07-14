import React, { useState } from 'react';
import './ContactForm.css'; // Make sure to create this CSS file

const ContactForm = ({ car }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in the ${car ? `${car.make} ${car.model}` : 'vehicle'}. Please contact me with more information.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }
  
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
  
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/inquiries`;
      console.log('Submitting to:', apiUrl); // Debug log
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          car: car ? { make: car.make, model: car.model } : null
        })
      });
  
      // First check if response is OK
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server responded with:', errorData);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
  
      // Then try to parse as JSON
      const responseData = await response.json();
      console.log('Submission successful:', responseData);
  
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: `I'm interested in the ${car ? `${car.make} ${car.model}` : 'vehicle'}. Please contact me with more information.`
      });
    } catch (error) {
      console.error('Submission failed:', {
        error: error.message,
        stack: error.stack
      });
      setSubmitStatus('error');
      setErrorMessage(
        error.message.includes('Failed to fetch') 
          ? 'Network error. Please check your connection.'
          : error.message.includes('Server error')
            ? 'The server encountered an error. Please try again later.'
            : 'Failed to submit your inquiry. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="contact-form">
      <h4>Contact Seller</h4>
      {submitStatus === 'success' && (
        <div className="alert alert-success">
          Thank you for your inquiry! We'll contact you shortly.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="alert alert-danger">
          {errorMessage || 'There was an error sending your inquiry. Please try again later.'}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Enter your message"
            ></textarea>
          </div>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className="ms-2">Sending...</span>
            </>
          ) : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
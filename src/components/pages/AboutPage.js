import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const AboutPage = () => {
  const services = [
    {
      title: "Vehicle Sourcing",
      description: "We source high-quality vehicles from trusted suppliers worldwide, ensuring you get the best options.",
      icon: "🌍"
    },
    {
      title: "Import Financing",
      description: "Through our partnership with Cars and Cargo, we offer competitive financing options for vehicle imports.",
      icon: "💰"
    },
    {
      title: "Customs Clearance",
      description: "Full handling of import documentation and customs clearance for hassle-free vehicle acquisition.",
      icon: "📑"
    },
    {
      title: "Vehicle Sales",
      description: "Wide selection of new and pre-owned luxury vehicles with transparent pricing.",
      icon: "🚗"
    },
    {
      title: "Maintenance",
      description: "Expert maintenance and repair services by certified technicians using genuine parts.",
      icon: "🔧"
    },
    {
      title: "Delivery",
      description: "Nationwide delivery options with professional vehicle transportation services.",
      icon: "🚚"
    }
  ];

  return (
    <div className="about-page">
      <div className="hero-section">
        <h1>About Linnka Motors</h1>
        <p>Your trusted partner in automotive excellence since 2010</p>
      </div>

      <div className="container">
        <SectionTitle>Our Partnership</SectionTitle>
        <div className="partnership-section">
          <div className="partnership-card">
            <h3>In Collaboration with <span className="partner-name">Cars and Cargo</span></h3>
            <p>
              We're proud to partner with <span className="partner-name">Cars and Cargo</span>, Nairobi's leading vehicle financing and import specialist, 
              to provide you with seamless vehicle acquisition services. This strategic partnership allows us to offer:
            </p>
            <ul className="partnership-benefits">
              <li><span className="benefit-icon">💙</span> Competitive financing rates for vehicle imports</li>
              <li><span className="benefit-icon">💙</span> Expert guidance through the import process</li>
              <li><span className="benefit-icon">💙</span> Streamlined customs clearance</li>
              <li><span className="benefit-icon">💙</span> End-to-end logistics support</li>
              <li><span className="benefit-icon">💙</span> Flexible payment plans tailored to your needs</li>
            </ul>
            <p className="partnership-closing">
              Together with <span className="partner-name">Cars and Cargo</span>, we're revolutionizing how Kenyans access quality vehicles with transparent pricing 
              and exceptional service.
            </p>
          </div>
        </div>

        <SectionTitle>Our Services</SectionTitle>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
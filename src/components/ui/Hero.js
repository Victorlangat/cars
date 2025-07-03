// src/components/ui/Hero.js
import React from 'react';
import Button from './Button';

const Hero = ({ title, description, buttonText, buttonLink }) => {
  return (
    <div className="hero">
      <h2>{title}</h2>
      <p>{description}</p>
      <Button to={buttonLink} variant="primary">
        {buttonText}
      </Button>
    </div>
  );
};

export default Hero;
// src/components/ui/SectionTitle.js
import React from 'react';

const SectionTitle = ({ children }) => {
  return (
    <div className="section-title">
      <h2>{children}</h2>
    </div>
  );
};

export default SectionTitle;
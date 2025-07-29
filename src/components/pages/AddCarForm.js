import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const AddCarForm = ({ onSubmit, onCancel, initialData = {}, isEditing }) => {
  const [formData, setFormData] = useState({
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
    description: '',
    isImported: false,
    ...initialData
  });

  const inputRefs = useRef({
    make: React.createRef(),
    model: React.createRef(),
    year: React.createRef(),
    price: React.createRef(),
    mileage: React.createRef(),
    color: React.createRef(),
    image: React.createRef(),
    description: React.createRef()
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    if (focusedField && inputRefs.current[focusedField]?.current) {
      const input = inputRefs.current[focusedField].current;
      input.focus();
      
      // Only set selection for non-number inputs
      if (input.type !== 'number' && input.type !== 'url') {
        const valueLength = input.value.length;
        input.setSelectionRange(valueLength, valueLength);
      }
    }
  }, [formData, focusedField]);

  const InputField = ({ name, label, type = 'text', required = false, ...props }) => (
    <div className="form-group">
      <label htmlFor={name}>{label}{required && ' *'}</label>
      <input
        ref={inputRefs.current[name]}
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setTimeout(() => setFocusedField(null), 100)}
        required={required}
        className="form-control"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...props}
      />
    </div>
  );

  const SelectField = ({ name, label, options, required = false }) => (
    <div className="form-group">
      <label htmlFor={name}>{label}{required && ' *'}</label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className="form-control"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const TextareaField = ({ name, label, required = false }) => (
    <div className="form-group full-width">
      <label htmlFor={name}>{label}{required && ' *'}</label>
      <textarea
        ref={inputRefs.current[name]}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setTimeout(() => setFocusedField(null), 100)}
        className="form-control"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );

  return (
    <div className="form-content">
      <div className="content-header">
        <h2>{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
        <button
          className="mobile-back-button"
          onClick={onCancel}
        >
          <FaArrowLeft />
          Back to Inventory
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">
          <InputField name="make" label="Make" required placeholder="e.g. Toyota" />
          <InputField name="model" label="Model" required placeholder="e.g. Camry" />
          <InputField name="year" label="Year" type="number" required min="1900" max={new Date().getFullYear() + 1} />
          <InputField name="price" label="Price" type="number" required min="0" step="100" placeholder="e.g. 25000" />
          <InputField name="mileage" label="Mileage" type="number" min="0" placeholder="e.g. 15000" />
          
          <SelectField name="fuel" label="Fuel Type" options={[
            { value: 'Gasoline', label: 'Gasoline' },
            { value: 'Diesel', label: 'Diesel' },
            { value: 'Electric', label: 'Electric' },
            { value: 'Hybrid', label: 'Hybrid' }
          ]} />

          <SelectField name="transmission" label="Transmission" options={[
            { value: 'Automatic', label: 'Automatic' },
            { value: 'Manual', label: 'Manual' },
            { value: 'CVT', label: 'CVT' }
          ]} />

          <SelectField name="body" label="Body Style" options={[
            { value: 'Sedan', label: 'Sedan' },
            { value: 'SUV', label: 'SUV' },
            { value: 'Truck', label: 'Truck' },
            { value: 'Coupe', label: 'Coupe' },
            { value: 'Convertible', label: 'Convertible' }
          ]} />

          <InputField name="color" label="Color" placeholder="e.g. Red" />
          <InputField name="image" label="Image URL" type="url" required placeholder="https://example.com/car.jpg" />

          <TextareaField name="description" label="Description" />

          <div className="form-group full-width">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isImported"
                checked={formData.isImported}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              Imported Vehicle
            </label>
          </div>
        </div>

        <div className="button-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(AddCarForm);
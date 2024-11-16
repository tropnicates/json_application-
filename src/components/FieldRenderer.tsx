import React from 'react';

interface FieldRendererProps {
    field: any;
    formData: { [key: string]: string };  // Add this line to pass form data
    onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
const FieldRenderer: React.FC<FieldRendererProps> = ({ field, formData, onFieldChange, onRadioChange }) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'textarea':
        return (
          <div key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              id={field.id}
              type={field.type}
              name={field.id}  // Ensure the name attribute is correct
              value={formData[field.id] || ''}  // Use the form data for the value
              onChange={onFieldChange}  // Bind the field change handler
              placeholder={field.placeholder}
              required={field.required}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <select
              id={field.id}
              name={field.id}  // Ensure the name attribute is correct
              value={formData[field.id] || ''}  // Use the form data for the value
              onChange={onFieldChange}  // Bind the field change handler
              required={field.required}
              className="w-full p-2 border rounded mt-1"
            >
              {field.options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case 'radio':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            {field.options.map((option: any) => (
              <div key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  name={field.id}  // Ensure the name attribute is correct
                  value={option.value}
                  onChange={onRadioChange}  // Bind the radio button change handler
                  checked={formData[field.id] === option.value}  // Check the radio button based on formData
                  required={field.required}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

export default FieldRenderer;

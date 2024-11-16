import React from 'react';

interface FieldRendererProps {
  field: any;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field }) => {
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
          <select id={field.id} required={field.required} className="w-full p-2 border rounded mt-1">
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
                name={field.id}
                value={option.value}
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

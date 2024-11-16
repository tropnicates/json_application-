import React from 'react';

interface FormPreviewProps {
  jsonSchema: any;
}

const FormPreview: React.FC<FormPreviewProps> = ({ jsonSchema }) => {
  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'textarea':
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              required={field.required}
              aria-label={field.label} // Ensures accessibility
              className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            <select
              id={field.id}
              required={field.required}
              aria-label={field.label} // Ensures accessibility
              className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
            {field.options.map((option: any) => (
              <div key={option.value} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={option.value}
                  name={field.id}
                  value={option.value}
                  required={field.required}
                  aria-label={option.label} // Ensures accessibility
                  className="mr-2"
                />
                <label htmlFor={option.value} className="text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-gray-800 dark:text-white">{jsonSchema.formTitle}</h2>
      <p className="text-gray-600 dark:text-gray-300">{jsonSchema.formDescription}</p>
      {jsonSchema.fields && jsonSchema.fields.map(renderField)}
    </div>
  );
};

export default FormPreview;

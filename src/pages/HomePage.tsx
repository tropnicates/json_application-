import React, { useEffect, useState } from 'react';
import JsonEditor from '../components/JsonEditor';
import FormPreview from '../components/FormPreview';
import useFormSchema from '../hooks/useFormSchema';

const HomePage: React.FC = () => {
  const { jsonSchema, updateSchema } = useFormSchema();
  const [jsonValue, setJsonValue] = useState<string>(
    JSON.stringify(
      {
        formTitle: 'Project Requirements Survey',
        formDescription: 'Please fill out this survey about your project needs',
        fields: [
          {
            id: 'name',
            type: 'text',
            label: 'Full Name:',
            required: true,
            placeholder: 'Enter your full name',
          },
          {
            id: 'email',
            type: 'email',
            label: 'Email Address:',
            required: true,
            placeholder: 'you@example.com',
          },
        ],
      },
      null,
      2
    )
  );

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    updateSchema(jsonValue);
  }, [jsonValue, updateSchema]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Export entered form data as JSON and update the form
  const exportJson = () => {
    const dataToExport = {
      name: formData.name,
      email: formData.email,
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formData.json';
    link.click();

    // Update form data with the exported JSON values (simulating the input as if the form data is updated after export)
    setFormData(dataToExport);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-4 gap-4 bg-gray-50">
      <div className="w-full md:w-1/2 h-full p-4 bg-white shadow-md rounded-md overflow-auto">
        <JsonEditor jsonValue={jsonValue} setJsonValue={setJsonValue} />
      </div>
      <div className="w-full md:w-1/2 h-full p-4 bg-white shadow-md rounded-md overflow-auto">
        {/* <FormPreview jsonSchema={jsonSchema} /> */}
        <div className="space-y-4">
          <label className="block">
            Full Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your full name"
            />
          </label>
          <label className="block">
            Email Address:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="you@example.com"
            />
          </label>
          {/* Export JSON Button */}
          <button
            onClick={exportJson}
            className="p-2 bg-blue-500 text-white rounded mt-2"
          >
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

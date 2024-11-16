import React, { useEffect, useState } from 'react';
import JsonEditor from '../components/JsonEditor';
import useFormSchema from '../hooks/useFormSchema';

const HomePage: React.FC = () => {
  const { updateSchema } = useFormSchema();
  const [jsonValue, setJsonValue] = useState<string>(JSON.stringify(
    {
      formTitle: 'Project Requirements Survey',
      formDescription: 'Please fill out this survey about your project needs',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          required: true,
          placeholder: 'Enter your full name',
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          required: true,
          placeholder: 'you@example.com',
          validation: {
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            message: 'Please enter a valid email address',
          },
        },
        {
          id: 'companySize',
          type: 'select',
          label: 'Company Size',
          required: true,
          options: [
            { value: '1-50', label: '1-50 employees' },
            { value: '51-200', label: '51-200 employees' },
            { value: '201-1000', label: '201-1000 employees' },
            { value: '1000+', label: '1000+ employees' },
          ],
        },
        {
          id: 'industry',
          type: 'radio',
          label: 'Industry',
          required: true,
          options: [
            { value: 'tech', label: 'Technology' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'finance', label: 'Finance' },
            { value: 'retail', label: 'Retail' },
            { value: 'other', label: 'Other' },
          ],
        },
        {
          id: 'timeline',
          type: 'select',
          label: 'Project Timeline',
          required: true,
          options: [
            { value: 'immediate', label: 'Immediate (within 1 month)' },
            { value: 'short', label: 'Short-term (1-3 months)' },
            { value: 'medium', label: 'Medium-term (3-6 months)' },
            { value: 'long', label: 'Long-term (6+ months)' },
          ],
        },
        {
          id: 'comments',
          type: 'textarea',
          label: 'Additional Comments',
          required: false,
          placeholder: 'Any other details you\'d like to share...',
        },
      ],
    },
    null,
    2
  ));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companySize: '',
    industry: '',
    timeline: '',
    comments: '',
  });

  useEffect(() => {
    updateSchema(jsonValue);
  }, [jsonValue, updateSchema]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle radio button change
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Export entered form data as JSON and update the form
  const exportJson = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in both Full Name and Email Address before exporting.');
      return;
    }

    const dataToExport = {
      name: formData.name,
      email: formData.email,
      companySize: formData.companySize,
      industry: formData.industry,
      timeline: formData.timeline,
      comments: formData.comments,
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formData.json';
    link.click();

    // Update form data with the exported JSON values (simulating the input as if the form data is updated after export)
    setFormData(dataToExport);
  };

  // Copy JSON schema from the editor
  const copyJson = () => {
    navigator.clipboard.writeText(jsonValue)
      .then(() => {
        alert('JSON schema copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy JSON schema. Please try again.');
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-4 gap-4 bg-gray-50">
      <div className="w-full md:w-1/2 h-full p-4 bg-white shadow-md rounded-md overflow-auto">
        <JsonEditor jsonValue={jsonValue} setJsonValue={setJsonValue} />
        <button
          onClick={copyJson}
          className="p-2 bg-green-500 text-white rounded mt-2"
        >
          Copy JSON
        </button>
      </div>
      <div className="w-full md:w-1/2 h-full p-4 bg-white shadow-md rounded-md overflow-auto">
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
              required
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
              required
            />
          </label>
          <label className="block">
            Company Size:
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            >
              <option value="">Select Company Size</option>
              <option value="1-50">1-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-1000">201-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </label>
          <label className="block">
            Industry:
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="industry"
                  value="tech"
                  onChange={handleRadioChange}
                  checked={formData.industry === 'tech'}
                />
                Technology
              </label>
              <label>
                <input
                  type="radio"
                  name="industry"
                  value="healthcare"
                  onChange={handleRadioChange}
                  checked={formData.industry === 'healthcare'}
                />
                Healthcare
              </label>
              <label>
                <input
                  type="radio"
                  name="industry"
                  value="finance"
                  onChange={handleRadioChange}
                  checked={formData.industry === 'finance'}
                />
                Finance
              </label>
              <label>
                <input
                  type="radio"
                  name="industry"
                  value="retail"
                  onChange={handleRadioChange}
                  checked={formData.industry === 'retail'}
                />
                Retail
              </label>
              <label>
                <input
                  type="radio"
                  name="industry"
                  value="other"
                  onChange={handleRadioChange}
                  checked={formData.industry === 'other'}
                />
                Other
              </label>
            </div>
          </label>
          <label className="block">
            Project Timeline:
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            >
              <option value="">Select Timeline</option>
              <option value="immediate">Immediate (within 1 month)</option>
              <option value="short">Short-term (1-3 months)</option>
              <option value="medium">Medium-term (3-6 months)</option>
              <option value="long">Long-term (6+ months)</option>
            </select>
          </label>
          <label className="block">
            Additional Comments:
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Any other details you would like to share"
            />
          </label>
          <button
            onClick={exportJson}
            className="p-2 bg-blue-500 text-white rounded mt-4"
          >
            Export Form Data as JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

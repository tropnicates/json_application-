// HomePage.tsx
import React, { useEffect } from 'react';
import JsonEditor from '../components/JsonEditor';
import FormPreview from '../components/FormPreview';
import useFormSchema from '../hooks/useFormSchema';

const HomePage: React.FC = () => {
  const { jsonSchema, updateSchema } = useFormSchema();
  const [jsonValue, setJsonValue] = React.useState<string>(
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

  useEffect(() => {
    updateSchema(jsonValue);
  }, [jsonValue,updateSchema]);

  return (
    <div className="flex flex-col md:flex-row h-screen p-4 gap-4 bg-gray-50">
      <div className="w-full md:w-1/2 h-full p-4 bg-white shadow-md rounded-md overflow-auto">
        <JsonEditor jsonValue={jsonValue} setJsonValue={setJsonValue} />
      </div>
      <div className="w-full md:w-1/2 h-full p-4 bg-white shadow-md rounded-md overflow-auto">
        <FormPreview jsonSchema={jsonSchema} />
      </div>
    </div>
  );
};

export default HomePage;

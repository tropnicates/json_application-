import { useState } from 'react';

const useFormSchema = () => {
  const [jsonSchema, setJsonSchema] = useState<any>({});

  const updateSchema = (jsonValue: string) => {
    try {
      const parsedSchema = JSON.parse(jsonValue);
      setJsonSchema(parsedSchema);
    } catch (error) {
      console.error('Invalid JSON schema:', error);
    }
  };

  return {
    jsonSchema,
    updateSchema,
  };
};

export default useFormSchema;

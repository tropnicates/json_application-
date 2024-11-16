import React from 'react';

interface JsonEditorProps {
  jsonValue: string;
  setJsonValue: React.Dispatch<React.SetStateAction<string>>;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonValue, setJsonValue }) => {
  return (
    <div className="mb-4">
      <label htmlFor="json-editor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        JSON Editor
      </label>
      <textarea
        id="json-editor"
        value={jsonValue}
        onChange={(e) => setJsonValue(e.target.value)}
        className="w-full h-72 p-2 border rounded mt-1 bg-gray-50 dark:bg-gray-800 dark:text-white"
        placeholder="Enter JSON data here..."
        aria-label="JSON editor"
      />
    </div>
  );
};

export default JsonEditor;

// components/FormSubmissionSuccess.tsx
import React from 'react';

interface FormSubmissionSuccessProps {
  resetForm: () => void;
}

const FormSubmissionSuccess: React.FC<FormSubmissionSuccessProps> = ({ resetForm }) => (
  <div className="p-4 text-center">
    <h2 className="text-xl font-bold text-green-600">Form Submitted Successfully!</h2>
    <button
      onClick={resetForm}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Submit Another Response
    </button>
  </div>
);

export default FormSubmissionSuccess;

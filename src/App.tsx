import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const exportJson = (jsonValue: string) => {
    const blob = new Blob([jsonValue], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formSchema.json';
    link.click();
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleDarkMode}
        className="p-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded shadow"
      >
        Toggle Dark Mode
      </button>

      <HomePage />
    </div>
  );
};

export default App;

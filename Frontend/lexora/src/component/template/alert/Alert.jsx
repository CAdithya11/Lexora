import React, { useState, useEffect } from 'react';
import { CheckCircle, CircleX, X } from 'lucide-react';

const Alert = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-999 top-4 right-4 bg-white shadow-md rounded-lg p-4 border border-gray-200 flex items-center space-x-3 max-w-md w-full
     transition-transform transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}"
    >
      {type == 'error' ? (
        <CircleX className="text-red-500 w-6 h-6" />
      ) : type == 'success' ? (
        <CheckCircle className="text-green-500 w-6 h-6" />
      ) : (
        <CheckCircle className="text-red-500 w-6 h-6" />
      )}
      <div className="flex-grow">
        <p className="text-gray-800 font-semibold">{message}</p>
        <p className="text-gray-600 text-sm">Anyone with a link can now view this file.</p>
      </div>
      <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Alert;

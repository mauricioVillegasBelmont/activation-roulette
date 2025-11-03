import React from 'react';
import './TextInput.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ 
  label, 
  error, 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'text-input-container';
  const widthClasses = fullWidth ? 'text-input-full-width' : '';
  const containerClasses = `${baseClasses} ${widthClasses}`.trim();
  
  const inputBaseClasses = 'text-input';
  const inputErrorClasses = error ? 'text-input-error' : '';
  const inputClasses = `${inputBaseClasses} ${inputErrorClasses} ${className}`.trim();
  
  return (
    <div className={containerClasses}>
      {label && (
        <label className="text-input-label">
          {label}
        </label>
      )}
      <input 
        className={inputClasses}
        {...props}
      />
      {error && (
        <span className="text-input-error-message">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextInput;
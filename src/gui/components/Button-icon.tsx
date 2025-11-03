import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const ButtonIcon: React.FC<ButtonProps> = ({ 
  children, 
  size = 'medium', 
  className = '',
  ...props 
}) => {
  const baseClasses = 'btn';
  // const variantClasses = `btn-${variant}`;
  const sizeClasses = `btn-${size}`;
  
  const classes = `${baseClasses} ${sizeClasses} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default ButtonIcon;
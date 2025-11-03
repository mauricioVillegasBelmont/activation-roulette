import React from 'react';
import './Button.css';
import logo from "assets/isotipo.svg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?:number;
  disabled?: boolean;
}

const ButtonSpin: React.FC<ButtonProps> = ({
  size = 200,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'spin-btn bg-white px-3 py-3 md:px-5 md:py-5 lg:px-7 lg:py-7';

  const classes = `${baseClasses} ${className}`;

  return (
    <button className={classes} {...props} style={{ width: `${size}px`, height: `${size}px` }} disabled={disabled}>
      <img src={logo} alt="Spin Roulette" />
    </button>
  );
};

export default ButtonSpin;
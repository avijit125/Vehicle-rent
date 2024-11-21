import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string; // New className prop
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'contained',
  color = 'primary',
  disabled = false,
  className = "", // Default to an empty string if no className is provided
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${className}`}
    >
      {label}
    </MuiButton>
  );
};

export default Button;

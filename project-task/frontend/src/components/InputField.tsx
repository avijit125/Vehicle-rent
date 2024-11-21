import React from 'react';
import { TextField } from '@mui/material';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  error?: any;
  className?: string;  // New prop to allow custom classNames
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  register,
  required,
  error,
  className = "",  // Default to an empty string if no className is provided
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        {...register(name, { required })}
        error={!!error}
        helperText={error}
        className={`rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}  // Merge the custom className here
      />
    </div>
  );
};

export default InputField;


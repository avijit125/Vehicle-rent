import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { z } from 'zod';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await registerUser(data);
      alert('Registration successful');
      navigate('/login');
      console.log(response);
    } catch (error) {
      alert('Registration failed');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    <div>
      <InputField 
        name="firstName" 
        label="First Name" 
        register={register} 
        required={true} 
        error={errors.firstName?.message} 
        className="input-field"
      />
    </div>
    
    <div>
      <InputField 
        name="lastName" 
        label="Last Name" 
        register={register} 
        required={true} 
        error={errors.lastName?.message} 
        className="input-field"
      />
    </div>
    
    <div>
      <InputField 
        name="email" 
        label="Email" 
        register={register} 
        required={true} 
        error={errors.email?.message} 
        className="input-field"
      />
    </div>

    <div>
      <InputField 
        name="password" 
        label="Password" 
        register={register} 
        required={true} 
        error={errors.password?.message} 
        className="input-field"
      />
    </div>
    
    <div>
      <Button 
        label={isSubmitting ? 'Registering...' : 'Register'} 
        onClick={() => {}} 
        disabled={isSubmitting} 
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      />
    </div>
    
    <div className="text-center mt-4">
      <p className="text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  </form>
</div>

  );
};

export default Register;

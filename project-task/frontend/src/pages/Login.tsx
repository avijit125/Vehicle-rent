import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { z } from 'zod';
import { loginUser } from '../services/api';
import { useAuth } from '../contexts/AuthContext'; // Use the auth context
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const Login: React.FC = () => {
  const { login } = useAuth(); 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
        console.log(data);
      const response = await loginUser(data);
      login(response.token);
      alert('Login successful');
      navigate('/booking');
      console.log(response);
    } catch (error) {
      alert('Login failed');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
      
      <Button 
        label={isSubmitting ? 'Logging in...' : 'Login'} 
        onClick={() => {}} 
        disabled={isSubmitting} 
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out" 
      />
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </form>
  </div>
  
  );
};

export default Login;

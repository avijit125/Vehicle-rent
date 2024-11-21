import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useNavigate } from 'react-router-dom';
import { fetchVehicleTypes, fetchVehicleModels, createBooking } from '../services/api';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SelectChangeEvent } from '@mui/material';

const bookingSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  vehicleId: z.number().min(1, "Vehicle ID is required"),
  startDate: z.date().refine((date) => date >= new Date(), "Start date must be in the future"),
  endDate: z.date().refine((date) => date > new Date(), "End date must be in the future"),
});

const BookingForm: React.FC = () => {
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [models, setModels] = useState<{ id: string; model: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    const fetchTypes = async () => {
      const types = await fetchVehicleTypes('2'); // default '2' wheels
      setVehicleTypes(types);
    };
    fetchTypes();
  }, []);

  const handleVehicleTypeChange = async (event: SelectChangeEvent<string>) => {
    const value = event.target.value; // value is now correctly typed as string
    setSelectedVehicleType(value);
    const vehicleModels = await fetchVehicleModels(value);
    setModels(vehicleModels);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        alert('You must be logged in to book a vehicle.');
        navigate('/login');
        return;
      }

      // Prepare data for API
      const bookingData = {
        ...data,
        vehicleId: Number(data.vehicleId),
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      };

      const bookingResponse = await createBooking(bookingData, token); // Pass Bearer token
      alert('Booking Successful');
      navigate('/confirmation', { state: bookingResponse });
    } catch (error) {
      alert('Booking failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Booking Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <InputField
            name="userName"
            label="Your Name"
            register={register}
            required={true}
            error={errors.userName?.message}
          />
        </div>

        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
            <Select
              {...register('vehicleType', { required: true })}
              value={selectedVehicleType}
              onChange={handleVehicleTypeChange}
              labelId="vehicle-type-label"
            >
              <MenuItem value="">
                <em>Select Vehicle Type</em>
              </MenuItem>
              {vehicleTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.vehicleType && (
            <p className="text-red-500 text-sm mt-1">{JSON.stringify(errors.vehicleType?.message)}</p>
          )}
        </div>

        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel id="vehicle-id-label">Vehicle ID</InputLabel>
            <Select {...register('vehicleId', { required: true })} value={selectedModel} onChange={(e) => {
              setSelectedModel(e.target.value);
              setValue('vehicleId', e.target.value);
            }} labelId="vehicle-id-label">
              <MenuItem value="">
                <em>Select Vehicle ID</em>
              </MenuItem>
              {models.map(({ id, model }) => (
                <MenuItem key={id} value={id}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.vehicleId && (
            <p className="text-red-500 text-sm mt-1">{JSON.stringify(errors.vehicleId?.message)}</p>
          )}
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="mb-4">
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => {
                setStartDate(date);
                setValue('startDate', date?.toDate());
              }}
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{JSON.stringify(errors.startDate?.message)}</p>
            )}
          </div>

          <div className="mb-4">
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => {
                setEndDate(date);
                setValue('endDate', date?.toDate());
              }}
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{JSON.stringify(errors.endDate?.message)}</p>
            )}
          </div>
        </LocalizationProvider>

        <div>
          <Button
            label={loading ? 'Submitting...' : 'Submit Booking'}
            onClick={() => {}}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingForm;


import {create} from 'zustand';
import axios from 'axios';

const useCaptainStore = create((set, get) => ({
  // State Variables
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  vehicleColor: '',
  vehiclePlate: '',
  vehicleCapacity: '',
  vehicleType: '',
  token:'',
  
  captain: null,
  isLoading: false,
  isAuthorized: false,
  error: null,

  // Setter Methods for Form Fields
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setVehicleColor: (vehicleColor) => set({ vehicleColor }),
  setVehiclePlate: (vehiclePlate) => set({ vehiclePlate }),
  setVehicleCapacity: (vehicleCapacity) => set({ vehicleCapacity }),
  setVehicleType: (vehicleType) => set({ vehicleType }),

  // Reset Form Fields
  resetFormFields: () => set({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    vehicleColor: '',
    vehiclePlate: '',
    vehicleCapacity: '',
    vehicleType: '',
    token:''
  }),

  // Login Action
  login: async () => {
    const { email, password } = get();
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, { email, password });
      
      if (response.status === 200) {
        const { captain, token } = response.data;
        set({ 
          captain, 
          isAuthorized: true, 
          isLoading: false,
          token 
        });
        return { success: true, captain };
      }
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        isLoading: false,
        isAuthorized: false 
      });
      return { success: false, error: error.response?.data?.message };
    }
  },

  // Signup Action
  signup: async () => {
    const { 
      email, password, firstName, lastName, 
      vehicleColor, vehiclePlate, vehicleCapacity, vehicleType 
    } = get();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType
      }
    };

    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      
      if (response.status === 201) {
        const { captain, token } = response.data;
        set({ 
          captain, 
          token,
          isAuthorized: true, 
          isLoading: false 
        });
        return { success: true, captain };
      }
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Signup failed', 
        isLoading: false,
        isAuthorized: false 
      });
      return { success: false, error: error.response?.data?.message };
    }
  },

  // Logout Action
  logout: async () => {
    const token = get().token;
    set({ isLoading: true, error: null });
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ 
        captain: null, 
        isAuthorized: false, 
        isLoading: false,
        token:''
      });
      return { success: true };
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Logout failed', 
        isLoading: false 
      });
      return { success: false, error: error.response?.data?.message };
    }
  },

  logout: async (navigate) => {
    const token = localStorage.getItem('captain-token');
    set({ isLoading: true, error: null });
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      get().resetFormFields()
      navigate('/captain-login');
      return { success: true };
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Logout failed', 
        isLoading: false 
      });
      return { success: false, error: error.response?.data?.message };
    }
  }

}));

export default useCaptainStore;
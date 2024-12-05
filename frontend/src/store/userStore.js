import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set,get) => ({
  email: '', 
  password: '',
  firstName: '',
  lastName: '',
  user: null,
  token:'', 

  isLoading:false,
  isAuthorized: false, 
  error: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setUser: (user) => set({ user, isAuthorized: !!user }),

  resetStore : ()=>{
    set({email:'',
         password:'',
         firstName:'',
         lastName:'',
         user:null,
         token:'',
         isLoading:false,
         error: null,
    })
  },

  

  login: async () => {
    const { email, password } = get();
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { email, password }
      );

      if (response.status === 200) {
        const data = response.data;
        set({
          user: data.user,
          token: data.token,
          isLoading: false,
          isAuthorized: true,
        });
        return { success: true };
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', isLoggingIn: false });
      return { success: false, error: error?.message };
    }
  },

  // Signup function
  signup: async () => {
    const { email, password, firstName, lastName } = get();
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          fullname: { firstname: firstName, lastname: lastName },
          email,
          password,
        }
      );

      if (response.status == 201) {
        const data = response.data;
        set({
          user: data.user,
          token: data.token,
          isLoading: false,
          isAuthorized: true,
        });
        return { success: true };
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Signup failed', isSigningUp: false });
      return { success: false, error: error?.message };
    }
  },

  // Logout function
  logout: async () => {
    const { token } = get();
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status === 200) {
        get().resetStore()
        return { success: true };
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Logout failed', isSigningOut: false });
      return { success: false, error: error?.message };
    }
  },
}));

export default useUserStore;

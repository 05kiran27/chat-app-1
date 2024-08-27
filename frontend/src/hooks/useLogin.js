import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userName, password) => {
    setLoading(true);
    try {
      // Perform the login API request
      const res = await fetch('https://chat-app-1-ulyf.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });

      // Parse the response
      const data = await res.json();

      // Check if response is okay
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Ensure the token is present in the response
      if (!data.token) {
        console.log("if not token printing data -> ", data)
        throw new Error('No token received');
      }

      // Store user data and token in localStorage
      localStorage.setItem('chat-user', JSON.stringify(data));
      localStorage.setItem('chat-token', data.token);

      // Update authentication context
      setAuthUser(data);

      // Notify user of successful login
      toast.success('Login successful');
    } catch (error) {
      // Notify user of error
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

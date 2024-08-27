import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext();

    const signup = async ({ firstName, lastName, userName, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ firstName, lastName, userName, password, confirmPassword, gender });
        // console.log('password => ' , password);
        // console.log('confirm password => ', confirmPassword);

        if (!success) {
        return;
        }

        setLoading(true); // Start loading before making API call
        try {
        // console.log('trying to go to backend');
        const res = await fetch('https://chat-app-1-ulyf.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, userName, password, confirmPassword, gender }), // confirmPassword is usually not sent to the backend
        });

        const data = await res.json();

        // console.log("data from useSignup hook => ", data);

        if(data.error){
          throw new Error(data.error)
        }

        if (!data.token) {
          console.log("if not token printing data -> ", data)
          throw new Error('No token received in useSignup hook');
        }

        // local storage
        localStorage.setItem("chat-user", JSON.stringify(data));
        // context
        setAuthUser(data);

        // console.log('data => ', data);

        if (res.ok) {
            toast.success('Signup successful!');
        } else {
            toast.error(data.message || 'Signup failed');
        }
        } catch (error) {
        toast.error(error.message || 'An unexpected error occurred');
        } finally {
        setLoading(false);
        }
    };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ firstName, lastName, userName, password, confirmPassword, gender }) {
//   if (!firstName || !lastName || !userName || !password || !confirmPassword || !gender) {
//     toast.error('All fields are required');
//     return false;
//   }

//   if (password !== confirmPassword) {
//     toast.error('Password and confirm password do not match');
//     return false;
//   }

  if (password.length < 6) {
    toast.error('Please make the password greater than 6 characters');
    return false;
  }

  return true; // Validation successful
}

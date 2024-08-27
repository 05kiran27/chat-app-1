import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('chat-token');
        console.log("printing token from useGetConversations hook ", token);

        // Ensure token exists
        if (!token) {
          throw new Error('Token not found');
        }

        const res = await fetch('http://localhost:5000/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch conversations');
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;

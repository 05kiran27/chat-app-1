import React, { useState, useEffect } from 'react'; // Add useEffect to imports
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                // You should retrieve the token here (e.g., from localStorage)
                const token = localStorage.getItem('chat-token');
                const res = await fetch(`http://localhost:3000/api/message/${selectedConversation._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });

                const data = await res.json();
                if (data.error) {
                    throw Error(data.error);
                }
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) {
            getMessages();
        }

    }, [selectedConversation?._id, setMessages]); // Correct dependencies array

    return { messages, loading };
};

export default useGetMessages; // Ensure default export

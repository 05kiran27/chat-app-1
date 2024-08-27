// useSendMessage hook (frontend)
import React, { useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('chat-token');
            if (!token) throw new Error('Token not found');

            const res = await fetch(`http://localhost:5000/api/message/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ message })
            });

            console.log("response from backend after sending message => ", res);

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Assuming data.newMessage includes senderId
            setMessages([...messages, data.newMessage]); // Add new message to state
        } catch (error) {
            toast.error(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;

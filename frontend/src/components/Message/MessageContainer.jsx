import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { BsChatLeftDots } from "react-icons/bs";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    
    useEffect(() => {
        // Cleanup function to reset selectedConversation when the component unmounts
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        
        <div className='md:min-w-[450px] flex flex-col'>
            {selectedConversation ? (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span>
                        <span className='text-gray-900 font-bold'>{selectedConversation.firstName}</span>
                    </div>

                    {/* Messages */}
                    <Messages />
                    <MessageInput />
                </>
            ) : (
                <NoChatSelected/>
            )}
        </div>
    );
}

const NoChatSelected = () => {
    const {authUser} = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full flex-col gap-2'>
            <div className='px-4 text-center sm:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome {authUser.user.firstName}</p>
                <p>Select a chat to start messaging</p>
            </div>
            <BsChatLeftDots className='h-8 w-8' />
        </div>
    );
}

export default MessageContainer;

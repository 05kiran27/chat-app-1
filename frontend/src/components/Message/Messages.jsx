import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeleton/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

// const Messages = () => {
//   const {messages, loading} = useGetMessages();
//   console.log("messages -> ", messages);
//   return (
//     <div className='px-4 flex-1 overflow-auto'>

//       {!loading && 
//         messages.length > 0 && 
//         messages.map((message) => <Message key={message._id} message= {message}/>)
//       }
//       {loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx}/>)}

//       {!loading && messages.length === 0 && (
//         <p className='text-center'> Send a message to start conversation</p>
//       )}
//     </div>
//   )
// }

// export default Messages


const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef(null); // Ref for the last message

  // Scroll to the latest message whenever messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle cases where messages might be an object with a newMessage
  const messageList = Array.isArray(messages) ? messages : [messages.newMessage];

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {/* {loading && [...Array(6)].map((_, idx) => <MessageSkeleton key={idx} />)} */}
      {!loading && messageList.map((message, index) => (
        <div key={message._id} ref={index === messageList.length - 1 ? lastMessageRef : null}>
          <Message message={message} />
        </div>
      ))}
      {loading && [...Array(6)].map((_, idx) => <MessageSkeleton key={idx} />)}
      
      {!loading && messageList.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;


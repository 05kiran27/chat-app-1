import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client"; // Import `io` from socket.io-client

// Create a context for the socket
const SocketContext = createContext(); 

// Custom hook to use socket context
export const useSocketContext = () => {
    return useContext(SocketContext);
}

// SocketContextProvider component
export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext(); // Access the authenticated user

    useEffect(() => {
        // Initialize socket connection if authUser exists
        if (authUser) {
            // console.log("authUser in socketContext-> ", authUser);
            const socketInstance = io("http://localhost:5000", {
                query: {
                    userId: authUser.user._id, // Pass user ID to socket server
                }
            });

            setSocket(socketInstance);

            // Listen for online users
            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Optional: Consolidate if both events serve the same purpose
            socketInstance.on("online-users", (users) => {
                setOnlineUsers(users);
            });

            // Cleanup: Close socket on unmount or authUser change
            return () => {
                socketInstance.close(); // Close socket connection to prevent memory leaks
                setSocket(null); // Reset socket state
                setOnlineUsers([]); // Clear online users state
            };
        } else {
            // Reset socket and onlineUsers if no authUser
            if (socket) {
                socket.close();
                setSocket(null); 
                setOnlineUsers([]); 
            }
        }
    }, [authUser]); // Effect runs when authUser changes

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

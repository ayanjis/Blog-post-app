/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

export const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]); // add notifications state here

  const token = localStorage.getItem("token");
  let decodedToken = null;
  let authorizUser_id = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
      authorizUser_id = decodedToken.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    if (token && authorizUser_id) {
      const socket = io("http://localhost:5000", {
        query: { userId: authorizUser_id },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        if (socket) {
          socket.close();
          setSocket(null);
        }
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, authorizUser_id]);

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, notifications, setNotifications }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// /* eslint-disable react/prop-types */
// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { jwtDecode } from "jwt-decode";

// const SocketContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   const token = localStorage.getItem("token");
//   let decodedToken = null;
//   let authorizUser_id = null;
//   if (token) {
//     try {
//       decodedToken = jwtDecode(token);
//       authorizUser_id = decodedToken.userId;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }
//   }

//   useEffect(() => {
//     if (token && authorizUser_id) {
//       const socket = io("http://localhost:5000", {
//         query: { userId: authorizUser_id },
//       });
//       setSocket(socket);

//       socket.on("getOnlineUsers", (users) => {
//         setOnlineUsers(users);
//       });

//       return () => {
//         if (socket) {
//           socket.close();
//           setSocket(null);
//         }
//       };
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, authorizUser_id]);

//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

import { useEffect, useContext } from 'react';
import { useSocketContext, SocketContext } from '../context/socketContext';

export default function useLikeListener() {
  const { socket } = useSocketContext();
  const { notifications, setNotifications } = useContext(SocketContext);
  console.log(notifications);
  localStorage.setItem('notifications', JSON.stringify(notifications));

  useEffect(() => {
    if (!socket) return;

    const handleNewLike = (notification) => {
      setNotifications((prevNotifications) =>
        prevNotifications.includes(notification) ? prevNotifications : [...prevNotifications, notification]
      );
    };

    socket.on('newLike', handleNewLike);

    return () => socket.off('newLike', handleNewLike);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return { notifications, setNotifications };
}

// import { useEffect, useState } from 'react';
// import { useSocketContext } from '../context/socketContext';

// export default function useLikeListener() {
//   const { socket } = useSocketContext();
//   const [notifications, setNotifications] = useState([]);
//   console.log(notifications);

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewLike = (notification) => {
//       setNotifications((prevNotifications) =>
//         prevNotifications.includes(notification) ? prevNotifications : [...prevNotifications, notification]
//       );
//     };

//     socket.on('newLike', handleNewLike);

//     return () => socket.off('newLike', handleNewLike);
//   }, [socket]);

//   return { notifications, setNotifications };
// }
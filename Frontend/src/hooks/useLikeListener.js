import { useEffect, useState } from 'react';
import { useSocketContext } from '../context/socketContext';

export default function useLikeListener() {
  const { socket } = useSocketContext();
  const [notifications, setNotifications] = useState([]);
  console.log(notifications);

  useEffect(() => {
    if (!socket) return;

    const handleNewLike = (notification) => {
      setNotifications((prevNotifications) =>
        prevNotifications.includes(notification) ? prevNotifications : [...prevNotifications, notification]
      );
    };

    socket.on('newLike', handleNewLike);

    return () => socket.off('newLike', handleNewLike);
  }, [socket]);

  return { notifications };
}




// import {useEffect, useState} from 'react'
// import { useSocketContext } from '../context/socketContext'

// export default function useLikeListener() {
//   const {socket} = useSocketContext()
//   const [notification, setNotification] = useState([])

//   useEffect(() => {
//     socket?.on('newLike', (newLike) => {
//       setNotification([...notification, newLike])
//     })

//     return () => socket?.off('newLike')

// },[socket, notification, setNotification])
// }

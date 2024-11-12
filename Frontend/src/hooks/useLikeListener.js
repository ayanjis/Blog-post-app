import { useEffect, useState } from 'react';
import { useSocketContext } from '../context/socketContext';

export default function useLikeListener() {
  const { socket } = useSocketContext();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // const handleNewLike = (likeData) => {
     
    // };

    socket?.on('newLike',  (newLike) => {
            setNotifications([...notifications, newLike])
          });

    return () => socket?.off('newLike', notifications);
  }, [socket]);

  return { notifications }; // Ensure this returns an object containing notifications
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

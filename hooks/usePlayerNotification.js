import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebase';

export const usePlayerNotification = (gameId, playerId) => {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!gameId || !playerId) return;

    const notificationRef = ref(db, `games/${gameId}/players/${playerId}/notification`);
    const unsubscribe = onValue(notificationRef, (snapshot) => {
      if (snapshot.exists()) {
        setNotification(snapshot.val());
      } else {
        setNotification('');
      }
    });

    return () => unsubscribe();
  }, [gameId, playerId]);

  return notification;
};

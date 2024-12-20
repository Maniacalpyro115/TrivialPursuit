import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebase';

export const usePlayerList = (gameId) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (!gameId) return;

    const playersRef = ref(db, `games/${gameId}/players`);
    const unsubscribe = onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        const playersData = snapshot.val();
        // Include player IDs in the array
        const playerList = Object.keys(playersData).map((id) => ({
          id, // Player ID
          ...playersData[id], // Player details
        }));
        setPlayers(playerList);
      } else {
        setPlayers([]);
      }
    });

    return () => unsubscribe();
  }, [gameId]);

  return players;
};

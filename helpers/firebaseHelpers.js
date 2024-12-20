import { ref, set } from 'firebase/database';
import { db } from '@/firebase';

// Generate a unique game ID (you could use a library like uuid instead)
const generateGameId = () => Math.random().toString(36).substring(2, 8);

export const startNewGame = async (playerName) => {
  const gameId = generateGameId();
  const playerId = generateGameId(); // Unique ID for the player

  const gameRef = ref(db, `games/${gameId}`);
  await set(gameRef, {
    leadPlayer: playerId,
    categories: [],
    usedQuestions: [],
    players: {
      [playerId]: { name: playerName, score: 0 },
    },
  });

  return { gameId, playerId };
};

import React, { createContext, useState, useContext } from 'react';

// Create the Game context
const GameContext = createContext();

// Provider component
export const GameProvider = ({ children }) => {
  const [gameId, setGameId] = useState(null);

  return (
    <GameContext.Provider value={{ gameId, setGameId }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for using the Game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

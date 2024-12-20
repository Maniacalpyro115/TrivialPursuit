import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ref, set } from 'firebase/database';
import { db } from '@/firebase';
import { useGame } from '@/contexts/GameContext';

export default function StartScreen() {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();
  const { setGameId } = useGame(); // Get setGameId from context

  const handleStartGame = async () => {
    if (!playerName.trim()) {
      Alert.alert('Error', 'Please enter your name.');
      return;
    }

    try {
      const gameId = Math.random().toString(36).substring(2, 8);
      const playerId = Math.random().toString(36).substring(2, 8);

      // Save the game to Firebase
      const gameRef = ref(db, `games/${gameId}`);
      await set(gameRef, {
        leadPlayer: playerId,
        players: {
          [playerId]: { name: playerName, score: 0 },
        },
      });

      // Save gameId to context and navigate to the lobby
      setGameId(gameId);
      router.push('/');
    } catch (error) {
      console.error('Error creating game:', error);
      Alert.alert('Error', 'Failed to create a game.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start a New Game</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={playerName}
        onChangeText={setPlayerName}
      />
      <Button title="Start Game" onPress={handleStartGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1D1D1D',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
    color: '#FFF',
  },
});

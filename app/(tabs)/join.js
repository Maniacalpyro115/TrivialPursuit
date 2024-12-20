import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { ref, get, update } from 'firebase/database';
import { db } from '@/firebase';
import { usePlayerNotification } from '@/hooks/usePlayerNotification';

export default function JoinScreen() {
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const notification = usePlayerNotification(gameId, playerId);

  const handleJoinGame = async () => {
    if (!gameId.trim() || !playerName.trim()) {
      Alert.alert('Error', 'Please enter a game ID and your name.');
      return;
    }

    try {
      const gameRef = ref(db, `games/${gameId}`);
      const snapshot = await get(gameRef);

      if (!snapshot.exists()) {
        Alert.alert('Error', 'Game not found. Please check the Game ID.');
        return;
      }

      const playerId = Math.random().toString(36).substring(2, 8);
      const playersRef = ref(db, `games/${gameId}/players/${playerId}`);
      await update(playersRef, { name: playerName, score: 0, notification: 'Welcome to the game!' });

      setPlayerId(playerId);
      Alert.alert('Success', 'You’ve joined the game!');
    } catch (error) {
      console.error('Error joining game:', error);
      Alert.alert('Error', 'Failed to join the game. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a Game</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Game ID"
        value={gameId}
        onChangeText={setGameId}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={playerName}
        onChangeText={setPlayerName}
      />
      <Button title="Join Game" onPress={handleJoinGame} />
      {notification ? <Text style={styles.notification}>{notification}</Text> : null}
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
  notification: {
    marginTop: 16,
    fontSize: 16,
    color: '#FFD700',
  },
});

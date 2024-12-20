import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ref, update, remove } from 'firebase/database';
import { useGame } from '@/contexts/GameContext';
import { usePlayerList } from '@/hooks/usePlayerList';
import { db } from '@/firebase';

export default function LobbyScreen() {
  const { gameId } = useGame();
  const players = usePlayerList(gameId);

  const [categories, setCategories] = useState({
    blue: '',
    pink: '',
    yellow: '',
    purple: '',
    green: '',
    orange: '',
  });

  const CATEGORY_MAP = {
    general: { id: 9, label: 'General Knowledge' },
    science: { id: 17, label: 'Science & Nature' },
    history: { id: 23, label: 'History' },
    entertainment: { id: 11, label: 'Entertainment' },
    sports: { id: 21, label: 'Sports' },
    geography: { id: 22, label: 'Geography' },
  };
  
  const categoryOptions = Object.entries(CATEGORY_MAP).map(([key, { label, id }]) => ({
    label,
    value: key,
    id,
  }));
  
  const handleCategoryChange = (color, value) => {
    const updatedCategories = {
      ...categories,
      [color]: {
        name: CATEGORY_MAP[value].label,
        id: CATEGORY_MAP[value].id,
      },
    };
    setCategories(updatedCategories);
  
    if (gameId) {
      const categoriesRef = ref(db, `games/${gameId}/categories`);
      update(categoriesRef, updatedCategories);
    }
  };
  

  const handleRemovePlayer = async (playerId) => {
    try {
      if (!gameId || !playerId) return;
      const playerRef = ref(db, `games/${gameId}/players/${playerId}`);
      await remove(playerRef);
      console.log(`Player with ID ${playerId} removed successfully`);
    } catch (error) {
      console.error('Error removing player:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lobby</Text>
      <Text style={styles.gameId}>Game ID: {gameId}</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Players</Text>
        {players && players.length > 0 ? (
          players.map((player) => (
            <View key={player.id} style={styles.card}>
              <Text style={styles.playerName}>{player.name}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemovePlayer(player.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noPlayers}>Waiting for players to join...</Text>
        )}
        <Text style={styles.subtitle}>Select Categories</Text>
        {Object.keys(categories).map((color) => (
          <View key={color} style={[styles.dropdownContainer, styles[`${color}Background`]]}>
            <Text style={styles.dropdownLabel}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Text>
            <Picker
              selectedValue={categories[color]}
              onValueChange={(value) => handleCategoryChange(color, value)}
              style={styles.dropdown}
            >
              {categoryOptions.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  gameId: {
    fontSize: 18,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFF',
    marginVertical: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2C2C2C',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 18,
    color: '#FFF',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  noPlayers: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 16,
  },
  dropdownContainer: {
    marginBottom: 12,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#FFF',
    flex: 1,
  },
  dropdown: {
    flex: 2,
    color: '#FFF',
    backgroundColor: 'transparent',
  },
  blueBackground: { backgroundColor: '#5A82B8' },
  pinkBackground: { backgroundColor: '#D97D97' },
  yellowBackground: { backgroundColor: '#E3C15D' },
  purpleBackground: { backgroundColor: '#957193' },
  greenBackground: { backgroundColor: '#6FA96F' },
  orangeBackground: { backgroundColor: '#D68951' },
});

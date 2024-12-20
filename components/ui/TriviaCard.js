import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const colors = [
  { bg: '#5A82B8', text: '#FFFFFF' }, // Blue
  { bg: '#D97D97', text: '#FFFFFF' }, // Pink
  { bg: '#E3C15D', text: '#000000' }, // Yellow
  { bg: '#957193', text: '#FFFFFF' }, // Purple
  { bg: '#6FA96F', text: '#FFFFFF' }, // Green
  { bg: '#D68951', text: '#FFFFFF' }, // Orange
];

export default function TriviaCard({ data }) {
  const [visibleAnswers, setVisibleAnswers] = useState({});

  // Toggle answer visibility for a specific question
  const toggleAnswer = (index) => {
    setVisibleAnswers((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const color = colors[index % colors.length];
          return (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: color.bg }]}
              onPress={() => toggleAnswer(index)}>
              <Text style={[styles.category, { color: color.text }]}>
                {item.category}
              </Text>
              {visibleAnswers[index] ? (
                <Text style={[styles.answer, { color: color.text }]}>
                  {item.answer}
                </Text>
              ) : (
                <Text style={[styles.question, { color: color.text }]}>
                  {item.question}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D', // Dark background
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-end', // Align category to the top-right corner
    marginBottom: 8,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  answer: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

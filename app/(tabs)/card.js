import React from 'react';
import TriviaCard from '@/components/ui/TriviaCard';

export default function TabTwoScreen() {
  // Dummy data for testing
  const triviaData = [
    { category: 'Geography', question: 'What is the capital of France?', answer: 'Paris' },
    { category: 'History', question: 'Who was the first President of the USA?', answer: 'George Washington' },
    { category: 'Science', question: 'What planet is known as the Red Planet?', answer: 'Mars' },
    { category: 'Sports', question: 'Which sport is known as the "king of sports"?', answer: 'Soccer' },
    { category: 'Entertainment', question: 'Who directed the movie "Inception"?', answer: 'Christopher Nolan' },
    { category: 'Arts & Literature', question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci' },
  ];

  return <TriviaCard data={triviaData} />;
}

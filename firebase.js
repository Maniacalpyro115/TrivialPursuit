// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu_EabNfZBOj4P7Z1SNv9wnYfmbp-2J0Y",
  authDomain: "trivialpursuit-c3c10.firebaseapp.com",
  databaseURL: "https://trivialpursuit-c3c10-default-rtdb.firebaseio.com",
  projectId: "trivialpursuit-c3c10",
  storageBucket: "trivialpursuit-c3c10.firebasestorage.app",
  messagingSenderId: "491540962377",
  appId: "1:491540962377:ios:d0e80c383ba32cc0ef3398",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Realtime Database instance
export const db = getDatabase(app);

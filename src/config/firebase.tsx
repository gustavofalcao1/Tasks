import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const  app  =  initializeApp({
  apiKey: "AIzaSyDqbNeLEb5VdkzXQz7unJQMThsyStugsaY",
  authDomain: "tasks-4b2a5.firebaseapp.com",
  projectId: "tasks-4b2a5",
  storageBucket: "tasks-4b2a5.appspot.com",
  messagingSenderId: "279254459723",
  appId: "1:279254459723:web:664a13092e9ea1e0f774ce",
  measurementId: "G-9MGHCNB458"
});

export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const firebaseFirestore = getFirestore(app);
export default app;
import firebase from 'firebase'
import 'firebase/storage'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqbNeLEb5VdkzXQz7unJQMThsyStugsaY",
  authDomain: "tasks-4b2a5.firebaseapp.com",
  projectId: "tasks-4b2a5",
  storageBucket: "tasks-4b2a5.appspot.com",
  messagingSenderId: "279254459723",
  appId: "1:279254459723:web:664a13092e9ea1e0f774ce",
  measurementId: "G-9MGHCNB458"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase
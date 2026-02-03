import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlnSjHbXfilbq_NvWs-5IU016Z-Nkq6Xc",
  authDomain: "pet-cuidado-dogs.firebaseapp.com",
  projectId: "pet-cuidado-dogs",
  storageBucket: "pet-cuidado-dogs.firebasestorage.app",
  messagingSenderId: "1097505833379",
  appId: "1:1097505833379:web:67e1538d3fab4d604eda16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
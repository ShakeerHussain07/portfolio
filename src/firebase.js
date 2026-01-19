// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu9rq5rX9FCp0AN82E8CCtIHmIxzgbfKk",
  authDomain: "projects-84b5c.firebaseapp.com",
  projectId: "projects-84b5c",
  storageBucket: "projects-84b5c.firebasestorage.app",
  messagingSenderId: "1014467221222",
  appId: "1:1014467221222:web:b952ed9daf0296b25b8d27",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

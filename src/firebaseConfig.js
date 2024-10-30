// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAlam2WkqikpYe4aRmAW4MYp5HarcauDNk",
    authDomain: "blocklyraspberry.firebaseapp.com",
    projectId: "blocklyraspberry",
    storageBucket: "blocklyraspberry.appspot.com",
    messagingSenderId: "413848459084",
    appId: "1:413848459084:web:91938431ca44c546bd21e9",
    measurementId: "G-Z7FLDFX4KS"
  };

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo dịch vụ Authentication và Firestore
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, db };

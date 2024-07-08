'use client';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCRnpi1WHSxt8ywlJAM1Ff0LUJb8JFQcqA",
  authDomain: "ebuddy-test-b76d5.firebaseapp.com",
  projectId: "ebuddy-test-b76d5",
  storageBucket: "ebuddy-test-b76d5.appspot.com",
  messagingSenderId: "869875325541",
  appId: "1:869875325541:web:b5e6e6f95739e86a1e048c",
  measurementId: "G-GZD7YCJ18E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


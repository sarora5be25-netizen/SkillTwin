import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHcsdHEGCiNEpVrwZIZrC0lnixX6NqOm8",
  authDomain: "skilltwin-60111.firebaseapp.com",
  projectId: "skilltwin-60111",
  storageBucket: "skilltwin-60111.firebasestorage.app",
  messagingSenderId: "905431248698",
  appId: "1:905431248698:web:29a57f17ceab3d590dea03",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
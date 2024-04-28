import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCbOfS69rwxEz9AASnh_PQyHlHcZRcs0-E",
  authDomain: "lead-management-36cec.firebaseapp.com",
  databaseURL: "https://lead-management-36cec-default-rtdb.firebaseio.com",
  projectId: "lead-management-36cec",
  storageBucket: "lead-management-36cec.appspot.com",
  messagingSenderId: "854412744116",
  appId: "1:854412744116:web:641300375a3e79285f4ee1",
  measurementId: "G-J10H48DSZP"
};
const app = initializeApp(firebaseConfig);
var db = getFirestore();
const auth = getAuth();

export { app, auth ,db };

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const provider = new firebase.auth.GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyB_qErAfyqDZ4de5v602331AQSj9vygSjE",
  authDomain: "discord-91b36.firebaseapp.com",
  projectId: "discord-91b36",
  storageBucket: "discord-91b36.appspot.com",
  messagingSenderId: "975333923039",
  appId: "1:975333923039:web:adccc3f602f897d12af16a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, provider, storage };

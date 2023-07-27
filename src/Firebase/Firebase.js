import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const provider = new firebase.auth.GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyAa3ebhr3YthSJ113kND2BSujG1-76XIU0",
  authDomain: "convoconnect-32c35.firebaseapp.com",
  projectId: "convoconnect-32c35",
  storageBucket: "convoconnect-32c35.appspot.com",
  messagingSenderId: "143812242275",
  appId: "1:143812242275:web:39a36385aabb74f3370156",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, provider, storage };

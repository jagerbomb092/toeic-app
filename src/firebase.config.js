import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBMN-fX4brLaxmbZ43d-WsyDOE26mYZUxY",
  authDomain: "toeic-project.firebaseapp.com",
  databaseURL: "https://toeic-project-default-rtdb.firebaseio.com",
  projectId: "toeic-project",
  storageBucket: "toeic-project.appspot.com",
  messagingSenderId: "405474862706",
  appId: "1:405474862706:web:f20d7ad71b4d5b326f84eb",
  measurementId: "G-ELG6JML98V",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage();

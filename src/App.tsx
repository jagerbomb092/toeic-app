// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import styles from "./App.module.scss";
import Home from "./01.module/Home/Home";
let firebaseConfig = {
  apiKey: "AIzaSyBMN-fX4brLaxmbZ43d-WsyDOE26mYZUxY",
  authDomain: "toeic-project.firebaseapp.com",
  databaseURL: "https://toeic-project-default-rtdb.firebaseio.com",
  projectId: "toeic-project",
  storageBucket: "toeic-project.appspot.com",
  messagingSenderId: "405474862706",
  appId: "1:405474862706:web:f20d7ad71b4d5b326f84eb",
  measurementId: "G-ELG6JML98V",
};

if (!firebase.apps.length) {
  firebase.initializeApp({});
} else {
  firebase.app(); // if already initialized, use that one
}

export default class App extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver();
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  unregisterAuthObserver() {
    firebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }));
  }

  render() {
    console.log(firebase.auth().currentUser!);
    if (!this.state.isSignedIn) {
      return (
        <div
          className={styles.App}
          style={{
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/toeic-project.appspot.com/o/CommonDoc%2FLogin%2F3338561_better_three_hours_too_soon-wallpaper-1920x1080.jpg?alt=media&token=44ae424d-44ea-4fe0-9973-1c672d63f306")`,
            height: window.innerHeight,
            width: window.innerWidth,
          }}
        >
          <div className={styles.App__wrapper}>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      );
    }
    return (
      <Home
        signOut={() => {
          firebase.auth().signOut();
        }}
        inforUser={{
          Uid:firebase.auth().currentUser!.uid as string,
          LoginName: firebase.auth().currentUser!.displayName as string,
          PhotoUrl: firebase.auth().currentUser!.photoURL as string,
          Email:firebase.auth().currentUser!.email?firebase.auth().currentUser!.email as string:"",
          PhoneNumber:firebase.auth().currentUser!.email?firebase.auth().currentUser!.phoneNumber as string:"",
        }}
      />
    );
  }
}

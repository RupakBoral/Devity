import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZG_SgbQ91wL0AqJp5sxbznvXKoWQDzqw",
  authDomain: "devity-c6e38.firebaseapp.com",
  projectId: "devity-c6e38",
  storageBucket: "devity-c6e38.firebasestorage.app",
  messagingSenderId: "936656276105",
  appId: "1:936656276105:web:5c665b7799cd72f0fd5458",
  measurementId: "G-6NF0JXJ8Q2",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth, firebase };

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyBnZtS0nQW7mxW8wJTkO33oCSR4bT45n5I",
  authDomain: "product-hunt-849a3.firebaseapp.com",
  databaseURL: "https://product-hunt-849a3.firebaseio.com",
  projectId: "product-hunt-849a3",
  storageBucket: "product-hunt-849a3.appspot.com",
  messagingSenderId: "342075991127",
  appId: "1:342075991127:web:32d5850e2937b070f1af12"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {
    db,
    firebase
}
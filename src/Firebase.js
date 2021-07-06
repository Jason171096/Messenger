import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCVmR6JnxXf0kU4yp1a3lyfIr2F0vGuoII",
    authDomain: "messenger-reactapp.firebaseapp.com",
    projectId: "messenger-reactapp",
    storageBucket: "messenger-reactapp.appspot.com",
    messagingSenderId: "314438303988",
    appId: "1:314438303988:web:2f6483a55877c2893fdea1"
  })

const db = firebaseApp.firestore()

export default db 
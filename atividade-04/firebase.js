import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeM6l-h9ZUAH2Ai21sI357EYnt97abqSo",
  authDomain: "aula-dpm.firebaseapp.com", 
  projectId: "aula-dpm",
  storageBucket: "aula-dpm.firebasestorage.app",
  messagingSenderId: "297431398510",
  appId: "1:297431398510:web:56afc889948c1190234e7f",
  measurementId: "G-42TPE8PXWS"
};

initializeApp(firebaseConfig);

const auth = getAuth();

export const handleSignUp = (email, password) => {

  createUserWithEmailAndPassword(auth, email, password).catch(function (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

export const toggleSignIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Senha incorreta.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      throw error; 
    });
}


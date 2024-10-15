// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBIEEIfLncL4xZnf7pg8-4pDvrMCdixnhQ",
  authDomain: "netflix-clone-2f2c0.firebaseapp.com",
  projectId: "netflix-clone-2f2c0",
  storageBucket: "netflix-clone-2f2c0.appspot.com",
  messagingSenderId: "248029700916",
  appId: "1:248029700916:web:eb5e34686f428c6f8a3b61",
  measurementId: "G-S4PB3ZCNYV"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore

const signup = async (name, email, password) =>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password); 
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email, password)=> {
    try {
       await signInWithEmailAndPassword(auth, email, password);
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = () => {
    signOut(auth);
}
export {auth, db, login, signup, logout};
// const analytics = getAnalytics(app);
import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// 1) when seeding the database you'll have to uncomment this!
//import { seedDatabase } from '../seed'

const config = {
  apiKey: 'AIzaSyCE1_IrOVluiWG5RucizBrV84X9aN5Cpkw',
  authDomain: 'king-of-padel.firebaseapp.com',
  projectId: 'king-of-padel',
  storageBucket: 'king-of-padel.appspot.com',
  messagingSenderId: '615035447945',
  appId: '1:615035447945:web:cf522ad54ddd158b4b3458',
  measurementId: 'G-JMRCC4E6CP',
};

let firebase = null;

if (typeof window !== 'undefined') {
  firebase = Firebase.initializeApp(config);
  firebase.auth().signInAnonymously();
}

// 2) when seeding the database you'll have to uncomment this!
//seedDatabase(index)
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

export { firebase };

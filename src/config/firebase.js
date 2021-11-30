import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDWTYQYs1xvDIg9O4PfUNh8crJIiMh23Rw',
  authDomain: 'minhas-colas-app.firebaseapp.com',
  databaseURL: 'https://minhas-colas-app-default-rtdb.firebaseio.com',
  projectId: 'minhas-colas-app',
  storageBucket: 'minhas-colas-app.appspot.com',
  messagingSenderId: '983722823284',
  appId: '1:983722823284:web:39c4d11b80234dbbe38b21'
};

const app = initializeApp(firebaseConfig);
export default app
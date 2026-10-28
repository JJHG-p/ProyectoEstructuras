import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBHXCuTHMdyp6oAVNpNZSlJjMcUcSZg5YI',
    authDomain: 'marketplace-uao.firebaseapp.com',
    databaseURL: 'https://marketplace-uao-default-rtdb.firebaseio.com',
    projectId: 'marketplace-uao',
    messagingSenderId: '550140891850',
    appId: '1:550140891850:web:79ed8b70aaa67e77f45a33'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
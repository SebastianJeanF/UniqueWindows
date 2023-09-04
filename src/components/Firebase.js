// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import 'firebase/storage';
// TODO: Encapsulate firebase config in .env file

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: 'AIzaSyAixDtR_IBch4sf0uKpKD5JQsG8HHGhF9A',
	authDomain: 'uniquewindows-84b19.firebaseapp.com',
	projectId: 'uniquewindows-84b19',
	storageBucket: 'uniquewindows-84b19.appspot.com',
	messagingSenderId: '717619028052',
	appId: '1:717619028052:web:eac9d8133e1be11e334dc1',
	measurementId: 'G-T6GVYMX9EE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);

// Source: https://www.youtube.com/watch?v=DGQFHxRnk2g

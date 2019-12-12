import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyDxO1G6R1vuqt6AytXf-8KA0HvJ9p8E78U',
	authDomain: 'tenedores-05.firebaseapp.com',
	databaseURL: 'https://tenedores-05.firebaseio.com',
	projectId: 'tenedores-05',
	storageBucket: 'tenedores-05.appspot.com',
	messagingSenderId: '170916380249',
	appId: '1:170916380249:web:d9a5eaeff43677509e3b48'
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

import React from 'react';
import { SocialIcon } from 'react-native-elements';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import { FacebookApi } from '../../utils/Social';
import Loading from '../Loading';

export default function LoginFacebook() {
	const login = async () => {
		try {
			await Facebook.initializeAsync(FacebookApi.application_id);

			const {
				type,
				token,
				expires,
				permissions,
				declinedPermissions
			} = await Facebook.logInWithReadPermissionsAsync({
				permission: [ FacebookApi.permission ]
			});

			if (type === 'success') {
        const credentials = firebase.auth.FacebookAuthProvider.credential(token);
        await firebase
          .auth()
          .signInWithCredential(credentials)
          .then(() => {
            console.log('Login correcto...');
          })
          .catch(() => {
            console.log('Error accediendo con Facebook,intetelo de nuevo más tarde');
          })
      }

			// if (type === 'success') {
			// 	const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
			// 	Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
			// } else {
			// 	// type === 'cancel'
			// }
		} catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
	};
	return <SocialIcon title="Iniciar sesión con Facebook" button type="facebook" onPress={login} />;
}

import React, { Fragment,useState } from 'react';
import { SocialIcon } from 'react-native-elements';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import { FacebookApi } from '../../utils/Social';
import Loading from '../Loading';

export default function LoginFacebook(props) {
	const { toastRef, navigation } = props;
	const [ isLoading, setIsLoading ] = useState(false);

	const login = async () => {
		setIsLoading(true);
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
						navigation.navigate('MyAccount')
					})
					.catch(() => {
						toastRef.current.show('Error accediendo con Facebook,intetelo de nuevo más tarde');
					});
			} else if (type === 'cancel') {
				toastRef.current.show('Inicio de sesión cancelado');
			} else {
				toastRef.current.show('Error desconocido, intentelo de nuevo más tarde');
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
		setIsLoading(false);
	};
	return (
		<Fragment>
			<SocialIcon title="Iniciar sesión con Facebook" button type="facebook" onPress={login} />
			<Loading isVisible={isLoading} text='Iniciando sesión'/>
		</Fragment>
	);
}

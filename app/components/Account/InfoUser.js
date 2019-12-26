import React from 'react';
import { StyleSheet, View, Text, YellowBox } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function InfoUser(props) {
	YellowBox.ignoreWarnings([ 'Setting a timer' ]);
	const { 
		userInfo,
		userInfo: { uid, displayName, email, photoURL },
		setReloadData,
		toastRef,
		setIsLoading,
		setTextLoading
	} = props;

	const changeAvatar = async () => {
		const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		const resultPermissionsCamera = resultPermissions.permissions.cameraRoll.status;
		if (resultPermissions === 'denied') {
			toastRef.current.show('es necessario aceptar los permisos.');
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [ 4, 3 ]
			});

			if (result.cancelled) {
				toastRef.current.show('has cerrado la galeria de imagenes, sin seleccinar ninguna.');
			} else {
				uploadImage(result.uri, uid).then((data) => {
					updatePhotoUrl(uid);
				});
			}
		}
	};

	const uploadImage = async (uri, nameImage) => {
		setTextLoading('Actualizando Avatar');
		setIsLoading(true);
		const response = await fetch(uri);
		const blob = await response.blob();
		const ref = firebase.storage().ref().child(`avatar/${nameImage}`);
		return ref.put(blob);
	};

	const updatePhotoUrl = (uid) => {

		firebase
			.storage()
			.ref(`avatar/${uid}`)
			.getDownloadURL()
			.then(async (result) => {
				const update = {
					photoURL: result
				};
				await firebase.auth().currentUser.updateProfile(update);
				setReloadData(true);
				setIsLoading(false);
			})
			.catch((error) =>	toastRef.current.show('error al recuperar el avatar del servidor'));
	};

	return (
		<View style={styles.viewUserInfo}>
			<Avatar
				rounded
				size="large"
				showEditButton
				onPress={changeAvatar}
				containerStyle={styles.userInfoAvatar}
				source={{
					uri: photoURL ? photoURL : 'https://api.adorable.io/avatars/200/abott@adorable.png'
				}}
			/>
			<View>
				<Text style={styles.displayName}>{displayName ? displayName : 'Anónimo'}</Text>
				<Text>{email ? email : ''}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewUserInfo: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#f2f2f2',
		paddingTop: 30,
		paddingBottom: 30
	},
	userInfoAvatar: {
		marginRight: 20
	},
	displayName: {
		fontWeight: 'bold'
	}
});
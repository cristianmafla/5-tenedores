import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';

export default () => {
	const Register = () => {
		console.log('Usuario registrado....');
	};
	return (
		<View style={styles.formContainer} behavior="padding" enabled>
			<Input
				placeholder="Correo electronico"
				containerStyle={styles.formContainer}
				onChange={() => {
					console.log('email actualizado');
				}}
				rightIcon={<Icon type="material-community" name="at" iconStyle={styles.iconRight} />}
			/>

			<Input
				placeholder="Contraseña"
				password={true}
				secureTextEntry={true}
				containerStyle={styles.inputForm}
				onChange={() => {
					console.log('CONTRASENA actualizado');
				}}
				rightIcon={<Icon type="material-community" name="eye-outline" iconStyle={styles.iconRight} />}
			/>

			<Input
				placeholder="Confirmar contraseña"
				password={true}
				secureTextEntry={true}
				containerStyle={styles.inputForm}
				onChange={() => {
					console.log('repetir contraseñaCONTRASENA actualizado');
				}}
				rightIcon={<Icon type="material-community" name="eye-outline" iconStyle={styles.iconRight} />}
			/>
			<Button
				title={'Unirse'}
				containerStyle={styles.btnContainerRegister}
				buttonStyle={styles.btnRegister}
				onPress={Register}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30
	},
	inputForm: {
		width: '100%',
		marginTop: 20
	},
	iconRight: {
		color: '#c1c1c1'
	},
	btnContainerRegister: {
		marginTop: 20,
		width: '95%'
	},
	btnRegister: {
		backgroundColor: '#00a680'
	}
});

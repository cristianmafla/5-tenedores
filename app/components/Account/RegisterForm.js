import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/Validation';
import * as firebase from 'firebase';
import { withNavigation } from 'react-navigation'
import Loading from '../Loading';

const RegisterForm =  (props) => {
  const { navigation } = props;
	const { toastRef } = props;
	const [ hidePassword, setHidePassword ] = useState(true);
	const [ hideConfirmPassword, setHideConfirmPassword ] = useState(true);
	const [ isVisibleLoading, setIsVisibleLoading ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	const Register = async () => {
    setIsVisibleLoading(true);
		if (!email || !password || !confirmPassword) {
			toastRef.current.show('Todos los campos son obligatorios');
		} else if (!validateEmail(email)) {
			toastRef.current.show('el formato del email no es valido');
		} else if (password !== confirmPassword) {
			toastRef.current.show('las contraseñas no coinciden');
		} else {
			await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((data) => {
          navigation.navigate("MyAccount");
				})
				.catch((error) => {
					toastRef.current.show('error creando la cuenta, intentelo más tarde');
					console.log('error creando la cuenta ============>', error);
				});
    }
    setIsVisibleLoading(false);
	};

	return (
		<View style={styles.formContainer} behavior="padding" enabled>
			<Input
				placeholder="Correo electronico"
				containerStyle={styles.formContainer}
				onChange={(e) => setEmail(e.nativeEvent.text)}
				rightIcon={<Icon type="material-community" name="at" iconStyle={styles.iconRight} />}
			/>

			<Input
				placeholder="Contraseña"
				password={true}
				secureTextEntry={hidePassword}
				containerStyle={styles.inputForm}
				onChange={(e) => setPassword(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type="material-community"
						name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
						iconStyle={styles.iconRight}
						onPress={() => {
							setHidePassword(!hidePassword);
						}}
					/>
				}
			/>

			<Input
				placeholder="Confirmar contraseña"
				password={true}
				secureTextEntry={hideConfirmPassword}
				containerStyle={styles.inputForm}
				onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type="material-community"
						name={hideConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
						iconStyle={styles.iconRight}
						onPress={() => {
							setHideConfirmPassword(!hideConfirmPassword);
						}}
					/>
				}
			/>
			<Button
				title={'Unirse'}
				containerStyle={styles.btnContainerRegister}
				buttonStyle={styles.btnRegister}
				onPress={Register}
			/>
			<Loading text="Creando cuenta" isVisible={isVisibleLoading} />
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

export default withNavigation(RegisterForm);

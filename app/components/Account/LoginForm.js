import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/Validation';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';
import Loading from '../Loading';

const LoginForm = (props) => {
	const { toastRef, navigation } = props;
	const [ hidePassword, setHidePassword ] = useState(true);
	const [ isVisibleLoading, setIsVisibleLoading ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const login = async () => {
		setIsVisibleLoading(true);
		console.log('login ==================>', email, password);
		if (!email || !password) {
			toastRef.current.show('Todos los campos son obligatorios');
		} else if (!validateEmail(email)) {
			toastRef.current.show('El formato de correo no es correcto');
		} else {
			await firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(() => navigation.navigate('MyAccount'))
				.catch((error) => {
					console.log('error logueando en firebase ===================>', error);
					toastRef.current.show('correo o contraseña incorrecta, intente de nuevo.');
				});
		}
		setIsVisibleLoading(false);
	};

	return (
		<View style={styles.formContainer}>
			<Input
				placeholder="Correo electrónico"
				containerStyle={styles.inputForm}
				onChange={(e) => setEmail(e.nativeEvent.text)}
				rightIcon={<Icon type="material-community" iconStyle={styles.iconRight} name="at" />}
			/>
			<Input
				placeholder="Contraseña"
				containerStyle={styles.inputForm}
				password={true}
				secureTextEntry={hidePassword}
				onChange={(e) => setPassword(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type="material-community"
						iconStyle={styles.iconRight}
						name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
						onPress={() => setHidePassword(!hidePassword)}
					/>
				}
			/>
			<Button
				title="Iniciar sesión"
				containerStyle={styles.btnContainerLogin}
				buttonStyle={styles.btnLogin}
				onPress={login}
			/>
			<Loading isVisible={isVisibleLoading} text={'iniciando sesión'} />
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
	btnContainerLogin: {
		marginTop: 20,
		width: '95%'
	},
	btnLogin: {
		backgroundColor: '#00a680'
	}
});

export default withNavigation(LoginForm);

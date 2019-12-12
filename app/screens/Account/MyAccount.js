import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { View, Text } from 'react-native';

import Loading from '../../components/Loading';

export default (params) => {
	const [ login, setLogin ] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			!user ? setLogin(false) : setLogin(true);
		});
	}, []);
	if (login === null) {
		return <Loading isVisible={true} text="Cargando..."/>;
	}

	if (login) {
		return (
			<View>
				<Text>Usuario logeado</Text>
			</View>
		);
	}

	return (
		<View>
			<Text>Usuario no logeado</Text>
		</View>
	);
};

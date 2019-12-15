import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';

export default (params) => (
	<View>
		<Text>UserLogged...</Text>
		<Button title="Cerrar sesión" onPress={() => firebase.auth().signOut()} />
	</View>
);

// const styles = StyleSheet.create({
//   btnCloseSession:{
//     ba
//   }
// })

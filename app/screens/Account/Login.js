import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const Login = (params) => {
	return (
		<ScrollView>
			<Image
				source={require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
				style={styles.logo}
				resizeMode="contain"
			/>
			<View style={styles.viewContainer}>
				<Text>Form Login ...</Text>
				<Text>Create Account</Text>
			</View>
			<Divider style={styles.divider} />
      <View style={styles.viewContainer}>
        <Text>Login Facebook...</Text>
      </View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 150,
		marginTop: 20
	},
	viewContainer: {
		marginRight: 40,
		marginLeft: 40
	},
	divider: {
		backgroundColor: '#00a680',
		margin: 40
	}
});

export default withNavigation(Login);

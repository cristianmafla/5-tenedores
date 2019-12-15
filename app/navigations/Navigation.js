import React from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import RestaurantsStacks from './RestaurantsStacks';
import TopListsScreenStacks from './TopListsStacks';
import SearchScreenStacks from './SearchStack';
import AccountScreenStacks from './AccountStacks';

const NavigationStacks = createBottomTabNavigator(
	{
		Restaurants: {
			screen: RestaurantsStacks,
			navigationOptions: () => ({
				tabBarLabel: 'Restaurantes',
				tabBarIcon: ({ tintColor }) => (
					<Icon type="material-community" name="silverware-fork-knife" size={22} color={tintColor} />
				)
			})
		},
		TopLists: {
			screen: TopListsScreenStacks,
			navigationOptions: () => ({
				tabBarLabel: 'Ranking',
				tabBarIcon: ({ tintColor }) => (
					<Icon type="material-community" name="compass-outline" size={22} color={tintColor} />
				)
			})
		},
		Search: {
			screen: SearchScreenStacks,
			navigationOptions: () => ({
				tabBarLabel: 'Buscar',
				tabBarIcon: ({ tintColor }) => (
					<Icon type="material-community" name="magnify" size={22} color={tintColor} />
				)
			})
		},
		Account: {
			screen: AccountScreenStacks,
			navigationOptions: () => ({
				tabBarLabel: 'Cuenta',
				tabBarIcon: ({ tintColor }) => (
					<Icon type="material-community" name="home-outline" size={22} color={tintColor} />
				)
			})
		}
	},
	{
		initialRouteName: 'Account',
		order: [ 'Account', 'Restaurants', 'TopLists', 'Search' ],
		tabBarOptions: {
			inactiveTintColor: '#646464',
			activeTintColor: '#00a680'
		}
	}
);

export default createAppContainer(NavigationStacks);

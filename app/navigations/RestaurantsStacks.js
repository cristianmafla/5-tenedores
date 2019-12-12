import { createStackNavigator } from 'react-navigation-stack'
import RestaurantsScreen from '../screens/Restaurants'

const RestaurantsScreeenStacks = createStackNavigator({
    Restaurants:{
      screen:RestaurantsScreen,
      navigationOptions: () => ({
        title:'Restaurantes'
      })
    }
})

export default RestaurantsScreeenStacks
import React from 'react';
import Weather from './containers/Weather';
import Map from './containers/Map'

import {createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

const AppNavigator=createStackNavigator({
  Weather:Weather,
  Map:Map
},{
  initialRouteName:"Weather",
  navigationOptions:{
    title:'Weather Now',
    headerStyle: {
        backgroundColor:'#EA4C89'
    },
    headerTintColor:'#fff',
    headerTintStyle:{
        fontWeight:'bold'
    }
  }
})

const AppContainer=createAppContainer(AppNavigator);
export default AppContainer;


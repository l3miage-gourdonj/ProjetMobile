import React, {} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NasaPictureOfDayScreen from "./screens/NasaPictureOfDayScreen";
import AsteroidListScreen from "./screens/AsteroidListScreen";
import AsteroidDetailsScreen from "./screens/AsteroidDetailsScreen";
const Stack = createNativeStackNavigator();
export const API_KEY = 'TqDNQshe5sgNbKkfFfJFO8ngedXKMCOnmBMc2gC3';
const App = (): JSX.Element => {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="NasaPictureOfDay" screenOptions={{headerShown:false}}>
      <Stack.Screen name="NasaPictureOfDay" component={NasaPictureOfDayScreen} />
      <Stack.Screen name="AsteroidList" component={AsteroidListScreen}/>
      <Stack.Screen name="AsteroidDetails" component={AsteroidDetailsScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;


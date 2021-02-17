import React,{useState} from 'react';
import { StyleSheet, LogBox } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'
import MealsNavigator from './navigation/MealsNavigator'
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import mealsReducer from './store/reducers/meals';


enableScreens();
LogBox.ignoreLogs([
  "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo- constants).",
]);

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

const fetchFonts =()=>{
 return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
const [fontLoaded,setFontLoaded]= useState(false);
if(!fontLoaded){
 return <AppLoading startAsync={fetchFonts}
  onFinish={()=> setFontLoaded(true)} 
  onError={console.log('Error loading assets')}/>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}


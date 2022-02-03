import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Login from './Login';
import Otp from './Otp';
import Home from './Home';
import AddAccount from './AddAccount';
import Barcode from './BarcodeScanner';
import ConfirmAccount from './ConfirmAccount';
import TokenScreen from './TokenScreeen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Stack = createNativeStackNavigator ();

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () =>(
    <AuthStack.Navigator initialRouteName={"AccountSetup"} screenOptions={{headerShown: true}}>
        <AuthStack.Screen name="AccountSetup" 
            component={Login} 
            options={{ 
                title: 'Account Setup',
                headerStyle: {
                    backgroundColor: '#003478',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            />
            <AuthStack.Screen name="otp" 
            component={Otp} 
            options={{ 
                title: 'Account Setup - Verify OTP',
                headerStyle: {
                    backgroundColor: '#003478',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            />

            <AuthStack.Screen name="home" 
            component={Home} 
            options={{ 
                headerShown: false
            }}
            />

            <AuthStack.Screen name="addAccount" 
            component={AddAccount} 
            options={{ 
                title: 'Add Account',
                headerStyle: {
                    backgroundColor: '#003478',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            />

            <AuthStack.Screen name="barcode" 
            component={Barcode} 
            options={{ 
                headerShown: false
            }}
            />

        <AuthStack.Screen name="confirmAccount" 
            component={ConfirmAccount} 
            options={{ 
                title: 'Account NickName',
                headerStyle: {
                    backgroundColor: '#003478',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        />

        
        <AuthStack.Screen name="tokenscreen" 
            component={TokenScreen} 
            options={{ 
                headerShown: false
            }}
        />

    </AuthStack.Navigator>
)


const MainStackScreen = () => (
    <Stack.Navigator initialRouteName={"home"} screenOptions={{headerShown: true}}>
            <Stack.Screen name="home" 
            component={Home} 
            options={{ 
                headerShown: false
            }}
            />

            <Stack.Screen name="addAccount" 
            component={AddAccount} 
            options={{ 
                title: 'Add Account',
                headerStyle: {
                    backgroundColor: '#003478',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            />

            <Stack.Screen name="barcode" 
            component={Barcode} 
            options={{ 
                headerShown: false
            }}
            />

        <Stack.Screen name="confirmAccount" 
            component={ConfirmAccount} 
            options={{ 
                title: 'Account NickName',
                headerStyle: {
                    backgroundColor: '#003478',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        />

        
        <Stack.Screen name="tokenscreen" 
            component={TokenScreen} 
            options={{ 
                headerShown: false
            }}
        />
            
        </Stack.Navigator>
)




const Loading = () => {
    return (
    <View style={styles.loaderContainer}>
    </View>
);
};


const styles = StyleSheet.create({
   loaderContainer:{
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#fff'
   }
});



function Main() {
    const [isloading, setloading] = React.useState(true);
    const [isauth, setauth] = React.useState(false);

    const isAuth = async() => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            setauth(true)
        }
        setloading(false);
        if(token){
            const data = await axios.get('https://authfactor.herokuapp.com/userdata',  {headers: { Authorization: `Bearer ${token}`}})
            if(data.data.success == true) {
                const jsonValue = JSON.stringify(data.data.user)
                await AsyncStorage.setItem('data', jsonValue)
            }
        }
    }

    React.useEffect(async() => {
        isAuth();
    }, []);

    return (
    <NavigationContainer >
        {isloading ? (<Loading />) : 
            isauth ? (<MainStackScreen />) :
        (<AuthStackScreen />) 
        }
    </NavigationContainer>
    );
}

export default Main;



import React from 'react'
import { StyleSheet, Text, View,Dimensions , ToastAndroid} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

var width = Dimensions.get('window').width;

const Otp = ({route, navigation}) => {
const {email} = route.params;


const MatchOtp = async(otp) => {

    const data  = await axios.post('https://authfactor.herokuapp.com/matchOtp', {email, otp})


    if(data?.data?.success === false) {
        ToastAndroid.showWithGravityAndOffset(
            'Please enter a valid OTP',
            4000,
            ToastAndroid.TOP,
            150,
            280
        );
        return;
    }

    const jsonValue = JSON.stringify(data.data.user)
    await AsyncStorage.setItem('token', data.data.token)
    await AsyncStorage.setItem('data', jsonValue)

    navigation.dispatch(CommonActions.reset({
        index: 1,
        routes: [{ name: 'home' }]
    }));

}
    return (
        <View style={styles.container}>
            <Text style={styles.title}>VERIFY YOUR ACCOUNT</Text>
            <Text style={styles.subtitle}>OTP IS SENT TO {`${email}`}</Text>
            <View style={styles.otpcontainer}>
            <OTPInputView
                style={{width: '80%', height: 200, color:'black'}}
                pinCount={4}
                autoFocusOnLoad={false}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled = {(code => MatchOtp(code))}
            />
            </View>
        </View>
    )
}

export default Otp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 8,
    },
    title: {
        color:'#043474',
        fontWeight: '700',
        fontSize: width*0.08,
        marginTop: 45,
    },
    subtitle:{
        marginLeft:30,
        marginVertical: 8,
        fontSize: 18,
        color: 'black',
    },
    otpcontainer:{
        marginLeft:'auto',
        marginRight: 'auto',
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },
    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    underlineStyleBase: {
        width: 60,
        height: 60,
        borderWidth: 0,
        borderWidth: 4,
        borderColor: '#043474',
        color:'#043474',
        backgroundColor: '#ffffff',
        fontSize: 26,
    },
    underlineStyleHighLighted: {
        borderColor: "#043474",
    },
})

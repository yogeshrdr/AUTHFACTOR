import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ActivityIndicator, ToastAndroid} from 'react-native';
import React from 'react';
import Header from './components/header';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import logo from '../assets/qr.png'; 
import totp from 'totp-generator';
import RBSheet from "react-native-raw-bottom-sheet";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


var width = Dimensions.get('window').width;

const second = () => (new Date()).getUTCSeconds() % 30;
var loading = 0.7;

const TokenScreen = ({navigation, route}) => {
    const [isloading , setloading] = React.useState(false);
    const [timeotp, settimeotp] = React.useState(null);
    const [time, setTime] = React.useState(second);
    const {id ,secret, imageurl} = route.params;

    const refRBSheet = React.useRef();
    const onPressBtn = () => {
        refRBSheet.current.open()
    }

    console.log(imageurl);
    
    useFocusEffect(
        React.useCallback(() => {
            const token = totp(secret);
            console.log("first time token",token);
            settimeotp(token);
        }, [])
    );


    useFocusEffect(
        React.useCallback(() => {
            const timer = setInterval(() =>{
                const nxttime = second();
                setTime((prevTime) => {
                    if (prevTime > nxttime) {
                        const token = totp(secret);
                        console.log(token);
                        settimeotp(token);
                    }
                    return nxttime;
                });
                loading = nxttime/10;
            }, 1000)
            
            return (() => {
                clearInterval(timer);
            })
        }, [])
    );


    const onDeleteaccount = async() => {
        setloading(true);
        const token = await AsyncStorage.getItem('token');
        const data = await axios.post('https://authfactor.herokuapp.com/deleteAccount', {accountId: id},  {headers: { Authorization: `Bearer ${token}`}})

        if(data.data.success == true) {
            const jsonValue = JSON.stringify(data.data.user)
            await AsyncStorage.setItem('data', jsonValue)

            setloading(false);

            navigation.replace('home');
        }else{
            setloading(false);
            ToastAndroid.showWithGravityAndOffset(
                'Some Error Occurred',
                4000,
                ToastAndroid.TOP,
                150,
                280
            );
        }
    }


    return (
    <View style={styles.container}>
        <Header  title = "HEROKU:YOGESH YADAV" navigation={navigation} isbtn={true} onPressBtn={onPressBtn}/>
        <View style={styles.tokenView}>
            <Image source={{uri: imageurl}} style={{ resizeMode: 'contain', width: '50%', height: '30%'}}/>
            <Text style={styles.tokentext}>{timeotp}</Text>
            <Text style={styles.tokenresettext}>YOUR TOKEN EXPIRES IN : {30-time}</Text>
        </View>

        <RBSheet
                ref={refRBSheet}
                closeOnDragDown={false}
                closeOnPressMask={!isloading}
                customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }
                }}
            >
                <Text style={styles.Modaltext}>Do You Want to Delete</Text>
                <TouchableOpacity style={styles.buttonModalContainer} onPress={() => onDeleteaccount()} disabled={isloading}>
                {isloading ? 
                <Text style={styles.buttonModaltext}>
                    <ActivityIndicator size="small" color="#043474" />
                </Text> : 
                <Text style={styles.buttonModaltext}>Delete</Text>
                }  
                </TouchableOpacity>
            </RBSheet>
    </View>
  );
};

export default TokenScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingBottom: 20,
    },
    zerocontainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    headingText:{
        color:'#043474',
        fontWeight: '700',
        fontSize: 18,
        marginTop: 45,
    },
    addAccoutnTouch:{
        fontWeight: '700',
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    addAccoutntext:{
        color:'black',
        fontWeight: '600',
        fontSize: 30,
        marginTop: 15,
    },
    buttonModalContainer:{
        padding:10,
        backgroundColor:'#FFF',
        borderRadius:10,
        borderWidth:2,
        borderColor: '#043474',
        marginTop:30,
        width: width*0.85,
        padding: 12,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttonModaltext:{
        fontSize:20,
        color:'black',
        textAlign:'center',
        letterSpacing:1,
    },
    Modaltext:{
        color:'#043474',
        fontWeight: '700',
        fontSize: width*0.05,
        marginLeft:'auto',
        marginRight: 'auto',
        marginTop: 10,
    },
    loading:{
        minHeight: 10,
        backgroundColor: 'black',
        width: width*loading
    },
    tokenView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tokentext:{
        color:'#043474',
        fontWeight: '700',
        fontSize: 60,
        marginTop: 45,
    },
    tokenresettext:{
        color:'#043474',
        fontWeight: '700',
        fontSize: 20,
        marginTop: 45,
    }
});

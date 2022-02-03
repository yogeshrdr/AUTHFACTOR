import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity,  ToastAndroid, ActivityIndicator} from 'react-native';
import React from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import * as api from '../apis/index';
import axios from 'axios';

var width = Dimensions.get('window').width;


const Login = ({navigation}) => {
    const [email, setemail] = React.useState(null);
    const refRBSheet = React.useRef();
    const [isloading, setloading] = React.useState(false);

    const onSubmit = async() =>{
        var emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(email == null || email === undefined){
            ToastAndroid.showWithGravityAndOffset(
                'Please enter a valid Email',
                4000,
                ToastAndroid.TOP,
                150,
                280
            );
            return;
        }
        if(!email.match(emailregex)){
            ToastAndroid.showWithGravityAndOffset(
                'Please enter a valid Email',
                4000,
                ToastAndroid.TOP,
                150,
                280
            );
            return;
        }
        setloading(true);
        // refRBSheet.current.open()
        const data = await axios.post('https://authfactor.herokuapp.com/login', {email});
        setloading(false);
        if(data.data.success == true){
            navigation.navigate('otp', {email});
            return;
        }

        
        ToastAndroid.showWithGravityAndOffset(
            'Please enter a valid Email',
            4000,
            ToastAndroid.TOP,
            150,
            280
        );
        
    }


    const onFinalSubmit = (smstype) =>{
        navigation.navigate('otp', {smstype, email});
    }


    return (
    
        <View style={styles.container}>
            <Text style={styles.headingText}>LET"S TURN THIS PHONE INTO A SECURE ACCOUNT</Text>
            <Text style={styles.text}>ENTER YOUR AUTHFACTOR EMAIL</Text>
            <TextInput
                style={styles.input}
                onChangeText={setemail}
                value={email}
                placeholder="Enter Email"
                // keyboardType="numeric"
                // maxLength={10}
            />
            <Text style={styles.textBottom}>Make sure you use the same email across all devices</Text>
            
            <TouchableOpacity style={styles.buttonModalContainer} onPress={() => onSubmit()} disabled={isloading}>
                {isloading ? 
                <Text style={styles.buttonModaltext}>
                    <ActivityIndicator size="small" color="#043474" />
                </Text> : 
                <Text style={styles.buttonModaltext}>Submit</Text>
                }  
            </TouchableOpacity>
    
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={false}
                closeOnPressMask={false}
                customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }
                }}
            >
                <Text style={styles.Modaltext}>Choose Your SMS Type</Text>
                <TouchableOpacity style={styles.buttonModalContainer} onPress={() => onFinalSubmit('whatsapp')}>
                    <Text style={styles.buttonModaltext}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonModalContainer} onPress={() => onFinalSubmit('sms')}>
                    <Text style={styles.buttonModaltext}>SMS</Text>
                </TouchableOpacity>
            </RBSheet>
        </View>
        
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor:'#fff',
    },
    headingText:{
        color:'#043474',
        fontWeight: '700',
        fontSize: width*0.08,
        marginTop: 45,
    },
    text:{
        color: 'black',
        fontSize: width*0.038,
        marginTop: 20,
    },
    textBottom:{
        color:'#043474',
        fontSize: width*0.032,
        marginTop: 10,
    },
    input: {
        backgroundColor:'#ffffff',
        borderBottomWidth:1,
        fontSize:23,
        marginLeft:'auto',
        marginRight:'auto',
        width: width*0.95,
        padding:10,
        borderRadius:10,
        marginTop: 10
    },
    buttonContainer:{
        padding:10,
        backgroundColor:'#00C473',
        borderRadius:10,
        elevation:5,
        marginTop:30,
        width: width*0.85,
        padding: 12,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttontext:{
        fontSize:20,
        color:'#fff',
        textAlign:'center',
        letterSpacing:1,
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
    }
});

import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity,  ActivityIndicator, ToastAndroid, Image} from 'react-native';
import React from 'react';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

var width = Dimensions.get('window').width;

const ConfirmAccount = ({route, navigation}) => {
    const {name, secret,issuer, period, imageurl} = route.params;
    const [text, onChangeText] = React.useState(name);
    const [isloading , setloading] = React.useState(false);

    
    const onConfirmSubmit = async() => {
        setloading(true);
        const token = await AsyncStorage.getItem('token');
        const data = await axios.post('https://authfactor.herokuapp.com/addAccount', {name: text, secret, issuer, period, imageurl},  {headers: { Authorization: `Bearer ${token}`}})


        if(data.data.success == true) {
            const jsonValue = JSON.stringify(data.data.user)
            await AsyncStorage.setItem('data', jsonValue)
            setloading(false);

            navigation.dispatch(CommonActions.reset({
                index: 1,
                routes: [{ name: 'home' }]
            }));

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
            <Text style={styles.nickheader}>Add NickName to Add Account</Text>
            <Image
                style={{ resizeMode: 'contain', width: '40%', height: '30%', marginLeft:'auto', marginRight: 'auto'}}
                source={{
                    uri: imageurl
                }}
            />

            <TextInput style={styles.input} style={styles.input} onChangeText={onChangeText} value={text} placeholder="Enter NickName"/>
            <TouchableOpacity style={styles.buttonModalContainer} onPress={() => onConfirmSubmit()} disabled={isloading }>
            {isloading ? 
                <Text style={styles.buttonModaltext}>
                    <ActivityIndicator size="small" color="#043474" />
                </Text> : 
                <Text style={styles.buttonModaltext}>Submit</Text>
                } 
            </TouchableOpacity>
        </View>
    );
};

export default ConfirmAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor:'#fff',
        alignItems: 'center',
    },
    nickheader:{
        color:'#043474',
        fontWeight: '700',
        fontSize: width*0.06,
        marginTop: 45,
    },
    input: {
        backgroundColor:'#ffffff',
        borderWidth:1,
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
});

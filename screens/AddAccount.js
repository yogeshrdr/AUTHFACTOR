import { StyleSheet, Text, View , Image, TouchableOpacity, Dimensions, Button} from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from '../assets/qr.png'; 


var width = Dimensions.get('window').width;

const AddAccount = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Scan the QR Code on the webiste where you are enabling 2FA</Text>
        <Image source={logo} style={{ resizeMode: 'contain', width: '30%', height: '50%'}}/>
        <TouchableOpacity style={styles.buttonModalContainer} onPress={() => navigation.navigate('barcode')}>
                    <Text style={styles.buttonModaltext}>Scan QR Code</Text>
        </TouchableOpacity>
    </View>
  );
};

export default AddAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        alignItems: 'center',
    },
    headerText:{
        fontSize:20,
        fontWeight: '700',
        margin: 10,
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

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,  Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import parse from 'url-parse';
import axios from 'axios';


export default function Barcode({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async({ type, data }) => {
        setScanned(true);
        const { protocol, host, pathname, query } = parse(data, true);
        const { secret, issuer, period } = query;

        if (protocol === 'otpauth:' && host === 'totp' && secret){
            var name = pathname.replace(/^\//, '');
            name = name.replace("%20", " ");
            console.log(issuer)
            const data = await axios.post('https://authfactor.herokuapp.com/companyName', {issuer})
            const imageurl = data.data.imageurl

            navigation.replace('confirmAccount',  {type, data, name, secret,issuer, period, imageurl })
        }else{
            
            Alert.alert('Try Again', 'Barcode is Wrong', [
                { text: 'OK', onPress: () => setScanned(false) },
            ]);
        }
        
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
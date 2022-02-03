import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import Header from './components/header';
import RBSheet from "react-native-raw-bottom-sheet";
import List from './components/List';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

var width = Dimensions.get('window').width;
const Home = ({navigation}) => {
    const [account, setAccount] = React.useState([]);
    const refRBSheet = React.useRef();

    useFocusEffect(
        React.useCallback(() => {
            getasyncStorage();
        }, [])
    );

    const getasyncStorage = async() => {
        const value = await AsyncStorage.getItem('data');
        const data  = JSON.parse(value);
        
        if(data.account){
            setAccount(data.account);
        }

    }


    const onPressBtn = () => {
            refRBSheet.current.open()
    }
    
    const onListPress = (data) => {
        navigation.navigate('tokenscreen', {id:  data._id , secret: data.secret, imageurl: data.imageurl});
    }


    return (
    <View style={styles.container}>
        <Header  title = "AUTHFACTOR" navigation={navigation} onPressBtn={onPressBtn} isbtn={true} />
        {account.length <=0 && (
            <View style={styles.zerocontainer}>
                <TouchableOpacity style={styles.addAccoutnTouch} onPress={() => navigation.navigate('addAccount')}>
                    <Icon name="pluscircleo" type="antdesign" color="black" size={50} />
                    <Text style={styles.addAccoutntext}>Add Account</Text>
                </TouchableOpacity>
            </View>
        )
        }
        {account.length > 0 && 
        <ScrollView>
            {account.map((data, index) => (
                <TouchableOpacity key={index} style={styles.touchable} onPress={() => onListPress(data)}>
                    <View style={styles.viewcontainer}>
                    <Image source={{uri: data.imageurl}} style={{ resizeMode: 'contain', width: '30%', height: '100%'}}/>
                    <Text style={styles.listtext}>{data.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
        
        }

        <RBSheet
                ref={refRBSheet}
                closeOnDragDown={false}
                closeOnPressMask={true}
                customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }
                }}
            >
                <Text style={styles.Modaltext}>menu Bar</Text>
                <TouchableOpacity style={styles.buttonModalContainer} onPress={() => navigation.navigate('addAccount')}>
                    <Text style={styles.buttonModaltext}>Add Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonModalContainer} onPress={() => navigation.navigate('addAccount')}>
                    <Text style={styles.buttonModaltext}>Profile</Text>
                </TouchableOpacity>
            </RBSheet>
    </View>
  );
};

export default Home;

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
    touchable:{
        padding: 20,
        borderBottomWidth:1,
    },
    listtext:{
        fontSize: 18,
    },
    viewcontainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

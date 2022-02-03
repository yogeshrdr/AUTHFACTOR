import React from 'react';
import { Dimensions, StyleSheet, Text, View} from 'react-native';
import { Icon } from 'react-native-elements';



var width = Dimensions.get('window').width;

export default function Header({ title, navigation, onPressBtn, isbtn }) {

return (
    <View style={styles.header}>
    <View>
        <Text style={styles.headerText}>{title}</Text>
    </View>
    <View>
        {isbtn && <Icon name="dots-three-vertical" type="entypo" color="#fff" size={30} onPress={() => onPressBtn()}/>} 
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
header: {
    width: width,
    height: '10%',
    flexDirection: 'row',
    paddingTop:20,
    paddingLeft:20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003478',
},
headerText: {
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 1,
    color:'#fff',
},
Menuicon: {
    fontWeight: '400',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
}
});

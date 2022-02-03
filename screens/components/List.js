import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

const List = ({data, navigation, onListPress}) => {
    return (
    <TouchableOpacity style={styles.touchable} onPress={() => onListPress()}>
        <Text style={styles.listtext}>{data.name}</Text>
    </TouchableOpacity>
    );
};

export default List;

const styles = StyleSheet.create({
    touchable:{
        padding: 20,
        borderBottomWidth:1,
    },
    listtext:{
        fontSize: 24,
    }
});
